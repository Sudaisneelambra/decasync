import React, { useEffect, useState } from 'react';
import commonaxios from '../axios/axiosinstance'; 

const PurchaseOrderComponent = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await commonaxios.get('/purchase/allpurchaseorder'); 
                console.log(response.data.data);
                
                setPurchaseOrders(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseOrders();
    }, []);

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-red-600 text-center mt-4">Error: {error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Purchase Orders</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Purchase ID</th>
                        <th className="px-4 py-2 text-left">Order Items</th>
                        <th className="px-4 py-2 text-left">Discount</th>
                        <th className="px-4 py-2 text-left">Total Amount</th>
                        <th className="px-4 py-2 text-left">Net Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseOrders.map((order) => (
                        <tr key={order._id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2">{order.purchaseId}</td>
                            <td className="px-4 py-2">
                                <ul>
                                    {order.orderItems.map((item, index) => (
                                        <li key={index}>
                                            {item.itemName} (Qty: {item.orderQuantity}, Price: ₹{item.unitPrice.toFixed(2)}, Total: ₹{item.totalPrice.toFixed(2)})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="px-4 py-2">{order.discount}%</td>
                            <td className="px-4 py-2">₹{order.totalAmt.toFixed(2)}</td>
                            <td className="px-4 py-2">₹{order.netAmount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PurchaseOrderComponent;
