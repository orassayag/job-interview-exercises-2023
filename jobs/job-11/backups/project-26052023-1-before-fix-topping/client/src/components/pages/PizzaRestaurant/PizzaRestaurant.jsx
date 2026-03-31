import React, { Fragment } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { Transition } from '@headlessui/react';
import useOrders from '../../../hooks/useOrders';

/*
ToDo:
# Add loader if not connected.
# Add yup Validation to order.
# If no orders - Display a message of no orders.
# Separate to components.
# Move all settings to config file.
# Add the user details modal + Add Yup Validation.
# Handle errors from the server.
# Add redux-toolkit.
# When disconnected and have orders - display a message.
*/

export default function PizzaRestaurant() {
  const {
    isConnected,
    isOpenModal,
    ordersData,
    toggleModal,
    setOrdersData,
    handleCheckoutClick,
  } = useOrders();

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
          <Transition show={isOpenModal} as={Fragment}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"> </div>
                </div>
              </Transition.Child>
              <Transition.Child
                enter="transition duration-300 ease-out transform"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition duration-150 ease-in transform"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
              >
                <div className="mdlToppings bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 flex justify-center p-8">
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 justify-between">
                      <div className="px-3 mb-1 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" forHtml="grid-zip">
                          Size
                        </label>
                        <div className="flex flex-wrap ml-5 mr-2 -mx-3 mb-2">
                          <div className="flex flex-wrap mr-4">
                            <div className="leading-1 mr-1 font-bold">
                              S
                            </div>
                            <i className="fa-duotone fa-pizza-slice small" />
                          </div>
                          <div className="flex flex-wrap mr-4">
                            <div className="leading-1 mr-1 font-bold">
                              M
                            </div>
                            <i className="fa-duotone fa-pizza-slice medium" />
                          </div>
                          <div className="flex flex-wrap mr-4">
                            <div className="leading-1 mr-1 font-bold">
                              L
                            </div>
                            <i className="fa-duotone fa-pizza-slice large" />
                          </div>
                          <div className="flex flex-wrap mr-4">
                            <div className="leading-1 mr-1 font-bold">
                              XL
                            </div>
                            <i className="fa-duotone fa-pizza-slice extra-large" />
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 px-1 mb-2 mr-4 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" forHtml="grid-zip">
                          Count
                        </label>
                        <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="1" />
                      </div>
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" forHtml="grid-password">
                          Toppies
                        </label>
                        <div className="flex">
                          <div className="toppies-column">
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                          </div>
                          <div className="toppies-column">
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                            <div className="toppie hover:bg-blue-100">
                              <div className="flex w-24 relative top-1 left-1">
                                <i className="fa-duotone fa-pepper-hot"></i>
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">Pepperoni</label>
                              </div>
                              <ul className="w-full segmentations relative right-1">
                                <li className="pizza-item full">full</li>
                                <li className="pizza-item rSide">rSide</li>
                                <li className="pizza-item lSide">lSide</li>
                                <li className="quarter"></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-warp justify-end mt-4">
                      <button
                        type="button"
                        onClick={toggleModal}
                        className="px-4 py-3 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition duration-300 ease-in-out"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-4 ml-5 py-3 border border-transparent rounded text-white bg-indigo-600 hover:bg-indigo-500 transition duration-300 ease-in-out"
                        onClick={handleCheckoutClick}
                      >
                        Checkout
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </Transition>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
          >
            <Reorder.Group values={ordersData} onReorder={setOrdersData}>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 w-30 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      className="px-5 w-30 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Order Id
                    </th>
                    <th
                      className="px-5 w-20 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      className="px-5 w-30 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Toppies Count
                    </th>
                    <th
                      className="px-5 w-30 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Total Time
                    </th>
                    <th
                      className="px-5 w-40 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Stage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {ordersData.map((order) => (
                      <Reorder.Item
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        as="tr"
                        key={order._id}
                        value={order.stageLevel}
                        dragListener={false}
                      >
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
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
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order._id}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order.size}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order.toppiesCount}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
                          <p className="text-gray-600 whitespace-no-wrap">{order.processTime || 'N/A'}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
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
