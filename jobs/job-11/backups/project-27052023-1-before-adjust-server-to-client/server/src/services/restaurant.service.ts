import CONSTANTS from '../config/constants.config';
import Logger from '../providers/logger.provider';
import MongoDBProvider from '../providers/mongodb.provider';
import OrderModel from '../bl/models/order.model';
import UserModel from '../bl/models/user.model';
import STATUS from '../bl/enums/status.enum';
import STAGE from '../bl/enums/stage.enum';
import WORKER from '../bl/enums/worker.enum';
import LocalOrderModel from '../models/localOrder.model';
import LocalWorkerModel from '../models/localWorker.model';
import ObjectsUtils from '../utils/objects.utils';
import TimesUtils from '../utils/times.utils';

export default class RestaurantService {
  private static workers: LocalWorkerModel[];

  public static initiate() {
    RestaurantService.workers = Object.values(STAGE).reduce((acc: LocalWorkerModel[], cur) => {
      const { WORKER_TYPE, WORKERS_COUNT } = CONSTANTS.RESTAURANT.STAGES[cur];
      const workers = Array.from(
        { length: WORKERS_COUNT },
        () => new LocalWorkerModel(WORKER_TYPE as WORKER)
      );
      acc.push(...workers);
      return acc;
    }, []);
  }

  public static async incomingOrders(data: any): Promise<void> {
    // Since I don't have on this local project replicas, I can't perform transaction.
    // But on production we will do transaction for the 2 creates operations.

    try {
      if (!data || !data.user || !data.orders?.length) {
        // ToDo: Error.
        return;
      }
      // ToDo: Validate the orders from the client.
      const orders = data.orders.map((order: any) => new LocalOrderModel(order));
      // Check if the user already exists by email - If exists just update the details.
      // If not exists - Create it in the database.

      // ToDo: Move this to local user.
      const user = new UserModel({
        firstName: data.user.firstName,
      });
      await user.save();
      // Insert the order into the database.
      await OrderModel.insertMany(
        orders.map((order: LocalOrderModel) => {
          return {
            userId: user._id,
            size: order.size,
            toppies: order.toppies,
          };
        })
      );
      // Process the order by stages.
      await this.processNextOrder();
    } catch (error) {
      Logger.error('Error processing order:', error);
    }
  }

  public static async processNextOrder(): Promise<void> {
    try {
      const theOrders = await this.getOldestPendingOrders();
      if (!theOrders || !theOrders.length) {
        return;
      }
      // Process the order by stages.
      theOrders.forEach(async (theOrder: any) => {
        await this.processStage(theOrder, STAGE.DOUGH);
      });
    } catch (error) {
      Logger.error('Error processing order:', error);
    }
  }

  private static async processStage(order: any, stage: STAGE): Promise<void> {
    try {
      const { NAME, PREVIOUS_STAGE, NEXT_STAGE, WORKER_TYPE, WORK_TIME_SECONDS } =
        CONSTANTS.RESTAURANT.STAGES[stage];
      const workerIndex = this.getWorkerIndex(WORKER_TYPE as WORKER);
      if (workerIndex === null || workerIndex === -1) {
        // Loop until the next worker will be available.
        setTimeout(async () => {
          this.processStage(order, stage);
        }, 0);
        return;
      }
      const worker = this.workers[workerIndex];
      Logger.info(
        `Process: Worker ${worker.name} (${worker.type}) working on order Id ${order._id} (${order.userId}) from stage ${PREVIOUS_STAGE} into stage ${NAME}.`
      );
      this.workers[workerIndex].orderId = order._id;
      await OrderModel.findByIdAndUpdate(order._id, {
        stage,
        previousStage: PREVIOUS_STAGE,
        status: STATUS.PROCESS,
      });
      // ToDo: Fix the topping logic.
      // Special logic for the topping stage
      if (stage === STAGE.TOPPING) {
        const toppings = order.toppies;
        const numToppingsPerWorker = 2;
        const numWorkersNeeded = Math.ceil(toppings.length / numToppingsPerWorker);
        const workerPromises = [];
        for (let i = 0; i < numWorkersNeeded; i++) {
          const toppingsSlice = toppings.slice(
            i * numToppingsPerWorker,
            (i + 1) * numToppingsPerWorker
          );
          const workerPromise = await this.handleToppings(toppingsSlice, WORK_TIME_SECONDS);
          workerPromises.push(workerPromise);
        }
        await Promise.all(workerPromises);
      } else {
        // Default logic for other stages
        await this.delay(WORK_TIME_SECONDS);
      }
      await OrderModel.findByIdAndUpdate(order._id, { stage, status: STATUS.DONE });
      this.workers[workerIndex].orderId = '';
      // Process to the next stage.
      if (stage === STAGE.SERVING) {
        await this.finishOrder(order);
      } else {
        await this.processStage(order, NEXT_STAGE as STAGE);
      }
      // Process to the next order (If exists).
      await this.processNextOrder();
    } catch (error) {
      Logger.info(`Error processing order Id ${order._id} on the ${stage} stage`, error);
      await OrderModel.findByIdAndUpdate(order._id, { stage: STAGE.ERROR, status: STATUS.ERROR });
    }
  }

  private static async finishOrder(order: any): Promise<void> {
    const { NAME, PREVIOUS_STAGE } = CONSTANTS.RESTAURANT.STAGES[STAGE.DONE];
    Logger.info(
      `Process: order Id ${order._id} (${order.userId}) from stage ${PREVIOUS_STAGE} into stage ${NAME}.`
    );
    await OrderModel.findByIdAndUpdate(order._id, {
      stage: STAGE.DONE,
      previousStage: PREVIOUS_STAGE,
      status: STATUS.DONE,
    });
  }

  private static async handleToppings(toppings: any[], workTimeSeconds: number): Promise<void> {
    for (const topping of toppings) {
      console.log(topping);
      await this.delay(4);
    }
    // Delay for the remaining work time
    const remainingWorkTime = workTimeSeconds - toppings.length * 4;
    if (remainingWorkTime > 0) {
      await this.delay(remainingWorkTime);
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
    return OrderModel.find({ stage: { $ne: STAGE.DONE } }).sort({ createdAt: 1 });
  }

  public static async getOldestPendingOrders(): Promise<any[]> {
    return OrderModel.find({ stage: STAGE.PENDING }).sort({ createdAt: 1 });
  }

  public static async streamOrdersToClient(): Promise<any[]> {
    // ToDo: Move to configs.
    const orders = await OrderModel.find({}).sort({ createdAt: 1 }).limit(50).populate({
      path: 'userId',
      select: 'firstName',
    });
    return orders.map((order) => {
      return {
        ...ObjectsUtils.getObjProperties(order, ['_id', 'size', 'stage']),
        processTime: order.stage === STAGE.DONE ? TimesUtils.getProcessTime(order) : null,
        toppiesCount: order.toppies.length,
        stageLevel: CONSTANTS.RESTAURANT.STAGES[order.stage].LEVEL,
        user: {
          firstName: (order.userId as any).firstName,
        },
      };
    });
  }
}
