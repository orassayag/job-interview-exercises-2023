class PizzaRestaurantHelper {
  constructor() {
    this.stageColors = {
      PENDING: 'gray',
      DOUGH: 'purple',
      TOPPING: 'blue',
      OVEN: 'yellow',
      SERVING: 'pink',
      DONE: 'green',
      ERROR: 'red',
    };
    this.genders = {
      M: 'men',
      F: 'women',
    };
    this.columns = [
      {
        title: 'User',
        px: '7',
        isColumnType: false,
      },
      {
        title: 'Order Id',
        px: '5',
        isColumnType: true,
        fieldName: '_id',
      },
      {
        title: 'Size',
        px: '3',
        isColumnType: true,
        fieldName: 'size',
      },
      {
        title: 'Toppies',
        px: '0',
        isColumnType: true,
        fieldName: 'toppiesCount',
      },
      {
        title: 'Process Time',
        px: '2',
        isColumnType: true,
        fieldName: 'processTime',
      },
      {
        title: 'Stage',
        px: '7',
        isColumnType: false,
      },
    ];
  }
}

export default new PizzaRestaurantHelper();
