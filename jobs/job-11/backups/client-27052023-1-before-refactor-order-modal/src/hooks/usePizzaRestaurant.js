import { useEffect, useState } from 'react';
import SocketIOProvider from '../providers/socket.io.provider';

const { socket } = SocketIOProvider;

const usePizzaRestaurant = (getOrderData) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    user: null,
    orders: [],
  });

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const onOrdersStatusEvent = (orders) => {
      if (!isConnected || !orders?.length) {
        return;
      }
      const sortedData = orders
        .sort((a, b) => b.stageLevel - a.stageLevel);
      setRestaurantData([...sortedData]);
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('ordersStatus', onOrdersStatusEvent);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('ordersStatus', onOrdersStatusEvent);
    };
  }, []);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleCheckoutClick = () => {
    const orderData = getOrderData();

    try {
      const data = {
        user: {
          firstName: 'Or',
        },
        orders: [{
          size: 'S',
          toppies: [{
            name: 'Peperoni',
            segmentation: 'R_HALF',
          }],
        },
        {
          size: 'S',
          toppies: [{
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          }],
        },
        {
          size: 'S',
          toppies: [{
            name: 'Peperoni',
            segmentation: 'R_HALF',
          },
          {
            name: 'Peperoni',
            segmentation: 'R_HALF',
          }],
        }],
      };
      socket.emit('incomingOrders', data);
    } catch (error) {
      // ToDo: Handler error.
      console.log(error);
    }
    toggleModal();
  };

  return {
    isConnected,
    isOpenModal,
    restaurantData,
    toggleModal,
    setRestaurantData,
    handleCheckoutClick,
  };
};

export default usePizzaRestaurant;
