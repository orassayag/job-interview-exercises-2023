import express from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import {
  MongoClient,
  Db,
  MongoError,
  InsertOneOptions,
  MongoClientOptions,
} from "mongodb";

interface Order {
  id: string;
  toppings: string[];
}

interface Pizza {
  orderId: string;
  toppings: string[];
}

interface Chef {
  id: number;
  capacity: number;
  busy: boolean;
}

interface Station {
  name: string;
  time: number;
  capacity: number;
  busy: boolean;
}

const app = express();
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = new SocketIOServer(server);

let orders: Order[] = [];
let pizzas: Pizza[] = [];
let chefs: Chef[] = [
  { id: 1, capacity: 1, busy: false },
  { id: 2, capacity: 1, busy: false },
];
let stations: Station[] = [
  { name: "dough", time: 7000, capacity: 2, busy: false },
  { name: "topping", time: 4000, capacity: 2, busy: false },
  { name: "oven", time: 10000, capacity: 1, busy: false },
  { name: "serving", time: 5000, capacity: 1, busy: false },
];

// Connect to MongoDB
let db: Db;
MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if (err) {
    console.error("Failed to connect to MongoDB");
    return;
  }
  console.log("Connected to MongoDB");
  db = client.db("pizza-restaurant");
});

// Handle socket connections
io.on("connection", (socket: Socket) => {
  console.log(`Socket ${socket.id} connected`);

  // Receive orders from the client
  socket.on("placeOrder", (order: Order) => {
    console.log(`Received order ${order.id}`);
    orders.push(order);
    processOrders();
  });

  // Fetch completed orders from the database
  socket.on("getCompletedOrders", () => {
    /* collection.find({}).toArray((err, result: Order[]) => {
  if (err) {
    console.error('Failed to fetch completed orders from the database');
    return;
  }
  console.log('Completed orders fetched from the database:', result); */
    // Emit the completed orders to the client or perform any other required actions
  });

  // Disconnect socket
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

function processOrders() {
  if (orders.length === 0) return;

  const order = orders.shift();
  console.log(`Processing order ${order!.id}`);

  const chefsAvailable = chefs.filter((chef) => !chef.busy);
  const stationsAvailable = stations.filter((station) => !station.busy);

  if (chefsAvailable.length === 0 || stationsAvailable.length === 0) {
    console.log(
      `No available resources for order ${order!.id}. Retrying later...`
    );
    orders.push(order!);
    return;
  }

  const chef = chefsAvailable.shift();
  const doughStation = stationsAvailable.find(
    (station) => station.name === "dough"
  );
  const toppingStation = stationsAvailable.find(
    (station) => station.name === "topping"
  );
  const ovenStation = stationsAvailable.find(
    (station) => station.name === "oven"
  );
  const servingStation = stationsAvailable.find(
    (station) => station.name === "serving"
  );

  if (
    !chef ||
    !doughStation ||
    !toppingStation ||
    !ovenStation ||
    !servingStation
  ) {
    console.log(
      `No available resources for order ${order!.id}. Retrying later...`
    );
    orders.push(order!);
    return;
  }

  chef.busy = true;
  doughStation.busy = true;
  toppingStation.busy = true;
  ovenStation.busy = true;
  servingStation.busy = true;

  prepareDough(order!, chef, doughStation)
    .then(() => applyToppings(order!, chef, toppingStation))
    .then(() => cookPizza(order!, chef, ovenStation))
    .then(() => servePizza(order!, chef, servingStation))
    .then(() => {
      console.log(`Completed order ${order!.id}`);
      chef.busy = false;
      doughStation.busy = false;
      toppingStation.busy = false;
      ovenStation.busy = false;
      servingStation.busy = false;
      saveCompletedOrder(order!);
      processOrders();
    })
    .catch((error) => {
      console.error(`Failed to process order ${order!.id}: ${error}`);
      chef.busy = false;
      doughStation.busy = false;
      toppingStation.busy = false;
      ovenStation.busy = false;
      servingStation.busy = false;
      orders.push(order!);
      processOrders();
    });
}

function prepareDough(
  order: Order,
  chef: Chef,
  station: Station
): Promise<void> {
  return new Promise((resolve) => {
    console.log(`Chef ${chef.id} is preparing dough for order ${order.id}`);
    setTimeout(() => {
      console.log(`Dough prepared for order ${order.id}`);
      resolve();
    }, station.time);
  });
}

function applyToppings(
  order: Order,
  chef: Chef,
  station: Station
): Promise<void> {
  return new Promise((resolve) => {
    console.log(`Chef ${chef.id} is applying toppings for order ${order.id}`);
    setTimeout(() => {
      console.log(`Toppings applied for order ${order.id}`);
      resolve();
    }, station.time);
  });
}

function cookPizza(order: Order, chef: Chef, station: Station): Promise<void> {
  return new Promise((resolve) => {
    console.log(`Chef ${chef.id} is cooking pizza for order ${order.id}`);
    setTimeout(() => {
      console.log(`Pizza cooked for order ${order.id}`);
      resolve();
    }, station.time);
  });
}

function servePizza(order: Order, chef: Chef, station: Station): Promise<void> {
  return new Promise((resolve) => {
    console.log(`Chef ${chef.id} is serving pizza for order ${order.id}`);
    setTimeout(() => {
      console.log(`Pizza served for order ${order.id}`);
      const pizza: Pizza = {
        orderId: order.id,
        toppings: order.toppings.map((topping) => topping.name),
      };
      pizzas.push(pizza);
      resolve();
    }, station.time);
  });
}

async function saveCompletedOrder(order: Order) {
  try {
    await db.collection("completedOrders").insertOne(order);
    console.log(`Completed order ${order.id} saved to the database`);
  } catch (err) {
    console.error(
      `Failed to save completed order ${order.id} to the database: ${err}`
    );
  }
}
