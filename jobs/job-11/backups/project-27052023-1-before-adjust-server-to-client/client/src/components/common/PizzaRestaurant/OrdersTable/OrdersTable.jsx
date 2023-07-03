import { Reorder, AnimatePresence } from 'framer-motion';
import PizzaRestaurantHelper from '../../../pages/PizzaRestaurant/PizzaRestaurant.helper';
import TableHeader from '../TableHeader/TableHeader';
import DefaultColumn from '../DefaultColumn/DefaultColumn';
import UserColumn from '../UserColumn/UserColumn';
import StageColumn from '../StageColumn/StageColumn';

export default function OrdersTable({
  orders,
  setRestaurantData,
}) {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <Reorder.Group values={orders} onReorder={setRestaurantData}>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {PizzaRestaurantHelper.columns.map((column) => (
                  <TableHeader
                    key={column.title}
                    {...column}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {orders.map((order) => (
                  <Reorder.Item
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    as="tr"
                    key={order._id}
                    value={order.stageLevel}
                    dragListener={false}
                  >
                    <UserColumn
                      firstName={order.firstName}
                      lastName={order.lastName}
                      gender={order.gender}
                      imageId={order.imageId}
                    />
                    {/*                     <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
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
                    </td> */}
                    {PizzaRestaurantHelper.columns
                      .filter((column) => column.isColumnType).map((column) => (
                        <DefaultColumn
                          key={column.title}
                          value={order[column.fieldName]}
                        />
                      ))}
                    {/*                     <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
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
                    </td> */}
                    <StageColumn
                      stage={order.stage}
                    />
                    {/*                     <td className="order-body px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
                      <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        />
                        <span className="relative">{order.stage}</span>
                      </span>
                    </td> */}
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </Reorder.Group>
      </div>
    </div>
  );
}
