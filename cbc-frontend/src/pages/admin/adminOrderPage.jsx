import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import Loading from "../../components/loading.jsx";

Modal.setAppElement("#root");

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // TODO: Implement orders API endpoint in backend
  // For now, orders feature is disabled
  useEffect(() => {
    setOrders([]);
    setIsLoading(false);
  }, []);

  function openOrderModal(order) {
    setActiveOrder(order);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setActiveOrder(null);
  }

  return (
    <div className="w-full h-full p-6 overflow-y-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">
          Order Management
        </h1>
      </div>

      {/* Loading */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">

          {/* ORDER DETAILS MODAL */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="bg-white max-w-3xl mx-auto mt-20 p-6 rounded-xl outline-none shadow-xl"
            overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
          >
            {activeOrder && (
              <div className="space-y-4">

                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-secondary">
                    Order Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-red-500 font-bold text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><strong>Order ID:</strong> {activeOrder.orderId}</p>
                  <p><strong>Status:</strong> {activeOrder.status}</p>
                  <p><strong>Name:</strong> {activeOrder.name}</p>
                  <p><strong>Email:</strong> {activeOrder.email}</p>
                  <p><strong>Phone:</strong> {activeOrder.phone}</p>
                  <p><strong>Date:</strong> {new Date(activeOrder.date).toLocaleString()}</p>
                </div>

                <div>
                  <p className="font-semibold">Address:</p>
                  <p className="text-sm text-gray-600">
                    {activeOrder.address}
                  </p>
                </div>

                {/* ORDER ITEMS */}
                {activeOrder.items && (
                  <div>
                    <h3 className="font-semibold mb-2">Items</h3>
                    <table className="w-full border text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2">Product</th>
                          <th className="p-2">Qty</th>
                          <th className="p-2">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeOrder.items.map((item, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.quantity}</td>
                            <td className="p-2">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="text-right text-lg font-bold text-secondary">
                  Total: Rs. {activeOrder.total?.toFixed(2)}
                </div>

              </div>
            )}
          </Modal>

          {/* ORDERS TABLE */}
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-accent text-secondary">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Total (Rs)</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.orderId || index}
                  onClick={() => openOrderModal(order)}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-t hover:bg-gray-200 transition`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{order.orderId}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3 font-semibold">
                    {order.total?.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}
