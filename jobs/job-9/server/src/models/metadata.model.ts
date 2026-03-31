import CONSTANTS from '../config/constants.config';
import CustomError from '../custom/error.custom';
import SnowflakeService from '../services/snowflake.service';
import Metadata from '../schemas/metadata.schema';

export default class MetadataModel {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  static async integrationSync(): Promise<{ status: string }> {
    // Clear the data in MongoDB.
    await Metadata.deleteMany({});
    // Fetch all the tables metadata from the schema.
    const tablesMetadata = await SnowflakeService.execute(
      `SHOW TABLES IN ${CONSTANTS.DATA.SNOWFLAKE.TABLE};`
    );
    // Fetch the columns list of each table.
    const tablesColumns = await SnowflakeService.execute(`
    SELECT
      t.TABLE_NAME,
      t.TABLE_SCHEMA,
      ARRAY_AGG(OBJECT_CONSTRUCT(COLUMN_NAME, DATA_TYPE)) AS COLUMNS
    FROM
      INFORMATION_SCHEMA.TABLES AS t
    JOIN
      INFORMATION_SCHEMA.COLUMNS AS c
      ON t.TABLE_CATALOG = c.TABLE_CATALOG
      AND t.TABLE_SCHEMA = c.TABLE_SCHEMA
      AND t.TABLE_NAME = c.TABLE_NAME
    GROUP BY
      t.TABLE_NAME,
      t.TABLE_SCHEMA;
    `);
    if (!tablesMetadata?.length || !tablesColumns?.length) {
      return { status: 'fail' };
    }
    // Prepare the data to insert to MongoDB.
    for (let i = 0; i < tablesMetadata.length; i += 1) {
      const columnsData = tablesColumns.find((t) => t.TABLE_NAME === tablesMetadata[i].name);
      tablesMetadata[i].columns = columnsData.COLUMNS.map((column: { [x: string]: unknown }) => ({
        name: Object.keys(column)[0],
        type: column[Object.keys(column)[0]],
      }));
    }
    // Insert the data into MongoDB.
    await Metadata.insertMany(tablesMetadata);
    return { status: 'success' };
  }

  /**
   * Get tables metadata.
   *
   * This function gets a page number and a limit number and returns the metadata tables by pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The limit number.
   * @return {Promise<object>}
   */
  static async tables(page: number, limit: number): Promise<object> {
    const options = {
      skip: (page - 1) * limit,
      limit,
    };
    const totalRecords = await Metadata.countDocuments({});
    const result = await Metadata.find({}, null, options);
    return {
      data: result,
      page,
      limit,
      totalRecords,
    };
  }
}
