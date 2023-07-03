import express, { Router } from 'express';
import JoiMiddleware from '../../middlewares/joi.middleware';
import MetadataController from '../../controllers/metadata.controller';
import tables from '../../validations/tables.validation';
import CustomError from '../../custom/error.custom';

export default class TablesRoutes {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Initiate.
   *
   * Initiate all the storyboards routes.
   * @return {Router}
   */
  public static initiate(): Router {
    const router: Router = express.Router();
    /**
     * @swagger
     * /api/metadata/integration/sync:
     *   post:
     *     tags:
     *       - Metadata
     *     description: Sync the data from Snowflake into MongoDB.
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: The result status.
     *         schema:
     *           type: object
     *           properties:
     *             status:
     *               type: string
     *               default: string
     *       500:
     *         description: Internal server error.
     */
    router.post('/integration/sync', MetadataController.integrationSync);

    /**
     * @swagger
     * /api/metadata/tables:
     *   get:
     *     tags:
     *       - Metadata
     *     description: Return the tables records by pagination.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: page
     *         description: The page number. The default is 1.
     *         in: query
     *         schema:
     *           type: integer
     *         default: 1
     *         required: true
     *       - name: limit
     *         description: The number of items to return per page. The default is 10.
     *         in: query
     *         schema:
     *           type: integer
     *         default: 10
     *         required: true
     *     responses:
     *       200:
     *         description: The tables records by pagination.
     *         schema:
     *           type: object
     *           properties:
     *             data:
     *               type: array
     *               items:
     *                 properties:
     *                   _id:
     *                     type: string
     *                     default: string
     *                   created_on:
     *                     type: string
     *                     default: string
     *                   name:
     *                     type: string
     *                     default: string
     *                   database_name:
     *                     type: string
     *                     default: string
     *                   schema_name:
     *                     type: string
     *                     default: string
     *                   kind:
     *                     type: string
     *                     default: string
     *                   comment:
     *                     type: string
     *                     default: string
     *                   cluster_by:
     *                     type: string
     *                     default: string
     *                   rows:
     *                     type: number
     *                     default: 0
     *                   bytes:
     *                     type: number
     *                     default: 0
     *                   owner:
     *                     type: string
     *                     default: string
     *                   retention_time:
     *                     type: number
     *                     default: 0
     *                   automatic_clustering:
     *                     type: string
     *                     default: string
     *                   change_tracking:
     *                     type: string
     *                     default: string
     *                   search_optimization:
     *                     type: string
     *                     default: string
     *                   search_optimization_progress:
     *                     type: string
     *                     default: string
     *                   search_optimization_bytes:
     *                     type: string
     *                     default: string
     *                   is_external:
     *                     type: string
     *                     default: string
     *                   columns:
     *                     type: array
     *                     items:
     *                       properties:
     *                          name:
     *                            type: string
     *                            default: string
     *                          type:
     *                            type: string
     *                            default: string
     *                          _id:
     *                            type: string
     *                            default: string
     *                   __v:
     *                     type: number
     *                     default: 0
     *             page:
     *                type: number
     *                default: 1
     *             limit:
     *                type: number
     *                default: 10
     *             totalRecords:
     *                type: number
     *                default: 24
     *       400:
     *         description: Bad Request (Request validation may have failed).
     *       500:
     *         description: Internal server error.
     */
    router.get('/tables', JoiMiddleware.validate({ query: tables }), MetadataController.tables);

    return router;
  }
}

/* {
  "data": [
    {
      "_id": "6467f0bfecd9682fd2ddbc36",
      "created_on": "2021-11-10T05:04:44.572Z",
      "name": "CALL_CENTER",
      "database_name": "SNOWFLAKE_SAMPLE_DATA",
      "schema_name": "TPCDS_SF100TCL",
      "kind": "TABLE",
      "comment": "",
      "cluster_by": "LINEAR( cc_call_center_sk )",
      "rows": 60,
      "bytes": 18944,
      "owner": "",
      "retention_time": 1,
      "automatic_clustering": "OFF",
      "change_tracking": "OFF",
      "search_optimization": "OFF",
      "search_optimization_progress": null,
      "search_optimization_bytes": null,
      "is_external": "N",
      "columns": [
        {
          "name": "CC_STATE",
          "type": "TEXT",
          "_id": "6467f0bfecd9682fd2ddba8c"
        },
        { */
