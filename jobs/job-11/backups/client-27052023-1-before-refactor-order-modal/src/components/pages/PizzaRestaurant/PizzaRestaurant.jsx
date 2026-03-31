import { Reorder, AnimatePresence } from 'framer-motion';
import PizzaOrder from '../PizzaOrder/PizzaOrder';
import usePizzaRestaurant from '../../../hooks/usePizzaRestaurant';
import './PizzaRestaurant.scss';
/*
ToDo:
# Load all toppies and sizes from the server.
# Screen shot the User Model Data for Amit - In the meantime use chance for all the details.
# Fix all the bugs exists in the project. Move each file and check.
# Fix the script bug.
# Change the browser title.
# Change the package.json project name and description.
# Add loader if not connected yet.
# If no orders - Display a message of no orders.
# Separate to components.
# Move all settings to config file.
# Add the user details modal + Add Yup Validation.
# Add yup Validation to order (User).
# Handle errors from the server.
# Add redux-toolkit.
# When disconnected and have orders - display a message.
*/

export default function PizzaRestaurant() {
  const {
    isConnected,
    isOpenModal,
    restaurantData,
    toggleModal,
    setRestaurantData,
    handleCheckoutClick,
  } = usePizzaRestaurant();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-8">
        <div>
          <button
            type="button"
            onClick={toggleModal}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
          >
            Order
          </button>
          <PizzaOrder
            isOpenModal={isOpenModal}
            toggleModal={toggleModal}
            onCheckoutClick={handleCheckoutClick}
          />
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <Reorder.Group values={restaurantData.orders} onReorder={setRestaurantData}>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="order-head px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      className="order-head px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Order Id
                    </th>
                    <th
                      className="order-head px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      className="order-head px-0 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Toppies
                    </th>
                    <th
                      className="order-head px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Total Time
                    </th>
                    <th
                      className="order-head px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Stage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {restaurantData.orders.map((order) => (
                      <Reorder.Item
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        as="tr"
                        key={order._id}
                        value={order.stageLevel}
                        dragListener={false}
                      >
                        <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src="https://randomuser.me/api/portraits/thumb/women/63.jpg"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap user-name">
                                {order.user.firstName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order._id}</p>
                        </td>
                        <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order.size}</p>
                        </td>
                        <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order.toppiesCount}</p>
                        </td>
                        <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order.processTime || 'N/A'}</p>
                        </td>
                        <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
                          <span
                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                          >
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative">{order.stage}</span>
                          </span>
                        </td>
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </Reorder.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
