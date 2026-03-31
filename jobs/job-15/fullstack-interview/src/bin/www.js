import server from '../app.js';
import CONSTANTS from '../config/constants.config.js';
import CustomEventEmitter from '../custom/event.emitter.custom.js';
import AppointmentsController from '../controllers/providers.controller.js';
import providers from '../../providers/providers.json' assert { type: 'json' };

// Perform here all the one-time events after the server initiated successfully.
CustomEventEmitter.on(CONSTANTS.EVENTS.SERVER_UP, async () => {
  // Load all the appointments and the products (Simulate to initiate the database connection).

  // ToDo: Load from real world data.
  /*   const appointments = await NetworksUtils.sendRequest({
      url: `${CONSTANTS.DATA.BASE_URL}?page=0&results=100`,
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    }); */
  AppointmentsController.initiate(providers);
});

export default server;
