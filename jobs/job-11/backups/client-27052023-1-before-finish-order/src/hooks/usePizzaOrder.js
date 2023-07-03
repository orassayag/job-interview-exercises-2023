import { useEffect, useState } from 'react';

const usePizzaOrder = ({
  isOpenModal,
  toggleModal,
  onCheckoutClick,
}) => {
  const [pizzasData, setPizzasData] = useState([]);
  const [toppiesData, setToppiesData] = useState({});
  const [sizeData, setSizeData] = useState('');

  useEffect(() => {
  }, []);

  const handleSizeChange = () => {

  };

  const handleSegmentationClick = (e) => {
    const { name, innerText } = e.target;
    const updatedToppiesData = { ...toppiesData };
    if (updatedToppiesData[name] && updatedToppiesData[name] === innerText) {
      delete updatedToppiesData[name];
    } else {
      updatedToppiesData[name] = innerText;
    }
    setToppiesData(updatedToppiesData);
  };

  const handleAddClick = () => {

  };

  const handleResetClick = () => {

  };

  const handleCheckoutClick = () => {
    // ToDo: Call onCheckoutClick from here and pass all the data about the order.

  };

  const handleCancelClick = () => {
    // ToDo: Delete here all the orders.
  };

  const validateOrder = () => {

  };

  const validateCheckout = () => {

  };

  return {
    toppiesData,
    sizeData,
    countData: pizzasData,
    handleSizeChange,
    handleSegmentationClick,
    handleCheckoutClick,
    handleCancelClick,
  };
};

export default usePizzaOrder;
