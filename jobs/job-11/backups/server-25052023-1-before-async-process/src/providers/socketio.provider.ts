import { Server, Socket } from 'socket.io';
import http from 'http';
import Logger from './logger.provider';
import CustomError from '../custom/error.custom';
import CONSTANTS from '../config/constants.config';
import RestaurantService from '../services/restaurant.service';

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000; // 5 seconds

export default class SocketService {
  private static io: Server | undefined;
  private static updateInterval: NodeJS.Timeout | null = null;
  private static newOrdersArrived = false;
  private static connectedSockets: Set<string> = new Set();

  public static async initiate(server: http.Server): Promise<void> {
    try {
      this.io = new Server(server);
      this.io.on('connection', async (socket: Socket) => {
        Logger.info('Client connected:', socket.id);
        await this.processOrders();
        socket.on('placeOrders', async (orders) => {
          Logger.info('Received orders:', orders);
          await this.processOrders(orders);
          this.newOrdersArrived = true;
          if (!this.updateInterval && this.connectedSockets.size > 0) {
            this.startStatusUpdate(socket);
          }
        });
        socket.on('disconnect', () => {
          Logger.info('Client disconnected:', socket.id);
          this.connectedSockets.delete(socket.id);
          if (!this.connectedSockets.size && this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
          }
        });
        this.connectedSockets.add(socket.id);
        if (!this.updateInterval) {
          this.startStatusUpdate(socket);
        }
      });
      Logger.info('SocketIO provider initiated successfully');
    } catch (err) {
      throw new CustomError({
        message: `Error on socket io provider: ${err}`,
        status: 500,
      });
    }
  }

  private static async processOrders(orders?: any[] | undefined) {
    if (!orders?.length) {
      orders = await RestaurantService.getUnfinishedOrders();
    }
    orders.forEach(async (order: any) => {
      await RestaurantService.processOrder(order);
    });
  }

  private static startStatusUpdate(socket: Socket): void {
    if (!this.updateInterval) {
      this.updateInterval = setInterval(async () => {
        const orders = await RestaurantService.getUnfinishedOrders();
        socket.emit('orderStatusUpdate', orders);
        if (!orders.length && !this.newOrdersArrived) {
          clearInterval(this.updateInterval!);
          this.updateInterval = null;
        }
        this.newOrdersArrived = false;
        // ToDo: Call retryOrder
      }, 1000);
    }
  }
}
