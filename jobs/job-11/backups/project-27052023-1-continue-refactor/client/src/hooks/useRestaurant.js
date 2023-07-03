import { useEffect, useState } from 'react';
import SocketIOProvider from '../providers/socket.io.provider';

const { socket } = SocketIOProvider;

const useOrders = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ordersData, setOrdersData] = useState([]);

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
      setOrdersData([...sortedData]);
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
    ordersData,
    toggleModal,
    setOrdersData,
    handleCheckoutClick,
  };
};

export default useOrders;
