import React, { useEffect, useState } from 'react';
import commonaxios from '../axios/axiosinstance';

const ItemComponent = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await commonaxios.get('/items/getAllItems'); 
                setItems(response.data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-red-600 text-center mt-4">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Items List</h2>
            <div className="overflow-x-auto">
                <table className=" bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Item No</th>
                            <th className="px-4 py-2 text-left">Item Name</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Brand</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Stock Unit</th>
                            <th className="px-4 py-2 text-left">Unit Price</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2">{item.itemNo}</td>
                                <td className="px-4 py-2">{item.itemName}</td>
                                <td className="px-4 py-2">{item.inventoryLocation}</td>
                                <td className="px-4 py-2">{item.brand}</td>
                                <td className="px-4 py-2">{item.category}</td>
                                <td className="px-4 py-2">{item.stockUnit}</td>
                                <td className="px-4 py-2">${item.unitPrice.toFixed(2)}</td>
                                <td className="px-4 py-2">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemComponent;
