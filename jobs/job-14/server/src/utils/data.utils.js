import CustomError from '../custom/error.custom.js';

export default class DataUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  static sortData(data, comparator) {
    const sortArray = data?.map((el, index) => [el, index]);
    sortArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (!order) {
        return a[1] - b[1];
      }
      return order;
    });
    // return sortArray.map((el) => this.selectProperties(el[0], ['gender']));
    return sortArray.map((el) => el[0]);
  }

  static compareOrder(a, b, sortBy) {
    if (b[sortBy] < a[sortBy]) {
      return -1;
    }
    if (b[sortBy] > a[sortBy]) {
      return 1;
    }
    return 0;
  }

  static comparatorFormat(sortOrder, sortBy) {
    return sortOrder === 'desc'
      ? (a, b) => this.compareOrder(a, b, sortBy)
      : (a, b) => -this.compareOrder(a, b, sortBy);
  }

  static prepareData({
    data,
    pageNumber = 1,
    pageSize = 10,
    sortBy = 'firstName',
    sortOrder = 'asc',
  }) {
    const indexPageNumber = pageNumber - 1;
    return this.sortData(data, this.comparatorFormat(sortOrder, sortBy))
      .slice(indexPageNumber * pageSize, indexPageNumber * pageSize + pageSize);
  }

  static selectProperties(obj, properties) {
    const newObj = {};
    properties.forEach((name) => {
      newObj[name] = obj[name];
    });
    return newObj;
  }
}
