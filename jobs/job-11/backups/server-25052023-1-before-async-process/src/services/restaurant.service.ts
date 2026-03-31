import CONSTANTS from '../config/constants.config';
import Logger from '../providers/logger.provider';
import OrderModel from '../bl/models/order.model';
import STATUS from '../bl/enums/status.enum';
import STAGE from '../bl/enums/stage.enum';
import WORKER from '../bl/enums/worker.enum';

class Worker {
  public type: WORKER;
  public orderId: string = '';
  constructor(type: WORKER) {
    this.type = type;
  }
}

export default class RestaurantService {
  private static workers: Worker[];

  public static initiate() {
    RestaurantService.workers = Object.values(STAGE).reduce((acc: Worker[], cur) => {
      const { WORKER_TYPE, WORKERS_COUNT } = CONSTANTS.RESTAURANT.STAGES[cur];
      const workers = Array.from(
        { length: WORKERS_COUNT },
        () => new Worker(WORKER_TYPE as WORKER)
      );
      acc.push(...workers);
      return acc;
    }, []);
  }

  public static async processOrder(order: any): Promise<void> {
    // Check if the user already exists by email - If exists just update the details.
    // If not exists - Create it in the database.
    // ToDo: Call the users service.

    try {
      // Insert the order into the database.
      const newOrder = await OrderModel.create({
        userId: 'sdkfhisdhfiuw',
        stage: STAGE.PENDING,
        status: STATUS.PENDING,
        price: order.price,
        comments: order.comments,
        toppies: order.toppies,
      });

      // Process the order by stages.
      await this.processStage(newOrder, STAGE.DOUGH);
      await this.processStage(newOrder, STAGE.TOPPING);
      await this.processStage(newOrder, STAGE.OVEN);
      await this.processStage(newOrder, STAGE.SERVING);
    } catch (error) {
      Logger.error('Error processing order:', error);
      // Handle the error case.
    }
  }

  private static async processStage(order: any, stage: STAGE): Promise<void> {
    try {
      const { NAME, PREVIOUS_STAGE, WORKER_TYPE, WORK_TIME_SECONDS } =
        CONSTANTS.RESTAURANT.STAGES[stage];
      Logger.info(`Process order Id ${order._id} from stage ${PREVIOUS_STAGE} into stage ${NAME}.`);
      const workerIndex = this.getWorkerIndex(WORKER_TYPE as WORKER);
      if (!workerIndex || workerIndex === -1) {
        // ToDo: Handle the busy case.
        return;
      }
      this.workers[workerIndex].orderId = order._id;
      await OrderModel.findByIdAndUpdate(order._id, {
        stage,
        previousStage: PREVIOUS_STAGE,
        status: STATUS.PROCESS,
      });
      await this.delay(WORK_TIME_SECONDS);
      await OrderModel.findByIdAndUpdate(order._id, { stage, status: STATUS.DONE });
      this.workers[workerIndex].orderId = '';
    } catch (error) {
      Logger.info(`Error processing order Id ${order._id} on the ${stage} stage`, error);
      await OrderModel.findByIdAndUpdate(order._id, { stage: STAGE.ERROR, status: STATUS.ERROR });
    }
  }

  private static getWorkerIndex(workerType: WORKER): number | null {
    const index = this.workers.findIndex((worker) => worker.type === workerType && !worker.orderId);
    return index !== -1 ? index : null;
  }

  private static delay(seconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  public static async getUnfinishedOrders(): Promise<any[]> {
    return OrderModel.find({ status: { $ne: STAGE.DONE } });
  }
}
