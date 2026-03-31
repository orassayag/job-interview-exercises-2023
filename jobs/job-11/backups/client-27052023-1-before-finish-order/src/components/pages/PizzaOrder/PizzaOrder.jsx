import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import PizzaOrderHelper from './PizzaOrder.helper';
import ToppieSelect from '../../common/ToppieSelect/ToppieSelect';
import usePizzaOrder from '../../../hooks/usePizzaOrder';

export default function PizzaOrder({
  isOpenModal,
  toggleModal,
  onCheckoutClick,
}) {
  const {
    toppiesData,
    sizeData,
    countData,
    handleSizeChange,
    handleSegmentationClick,
    handleCheckoutClick,
    handleCancelClick,
  } = usePizzaOrder({
    isOpenModal,
    toggleModal,
    onCheckoutClick,
  });

  return (
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
              <div className="flex flex-warp justify-between">
                <div className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                  Build your master pizzas
                </div>
                <div id="ex2">
                  <span className="fa-stack has-badge" data-count="2">
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className="fa fa-pizza-slice fa-stack-1x fa-inverse" />
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 justify-between">
                <div className="w-full px-3 mb-1 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" forHtml="grid-zip">
                    Size
                  </label>
                  <div className="flex flex-wrap w-full justify-around ml-5 mr-2 -mx-3 mb-2">
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
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" forHtml="grid-password">
                    Toppies
                  </label>
                  <div className="flex">
                    {[PizzaOrderHelper.toppiesLeftColumn, PizzaOrderHelper.toppiesRightColumn]
                      .map(({ id, list }) => (
                        <div key={id} className="toppies-column">
                          {list.map((toppie) => (
                            <ToppieSelect
                              key={toppie.name}
                              selected={toppiesData[toppie.name]}
                              {...toppie}
                              onSegmentationClick={handleSegmentationClick}
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-warp justify-start mt-4">
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="px-2 bg-gray-600 py-1 text-white border border-gray-200 rounded text-gray-600 hover:bg-gray-500 hover:border-gray-300 transition duration-300 ease-in-out"
                    >
                      Reset order
                    </button>
                    <button
                      type="button"
                      className="px-3 ml-2 py-1 border border-transparent rounded text-white bg-indigo-600 hover:bg-indigo-500 transition duration-300 ease-in-out"
                      onClick={handleCheckoutClick}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-warp justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCancelClick}
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
  );
}
