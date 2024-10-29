import React, { useEffect, useState } from 'react';
import commonaxios from '../axios/axiosinstance';

const SupplierComponent = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await commonaxios.get('/supplier/getsuppliers'); 
                setSuppliers(response.data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-red-600 text-center mt-4">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Suppliers List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Supplier No</th>
                            <th className="px-4 py-2 text-left">Supplier Name</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-left">Tax No</th>
                            <th className="px-4 py-2 text-left">Country</th>
                            <th className="px-4 py-2 text-left">Mobile No</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier._id} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2">{supplier.supplierNo}</td>
                                <td className="px-4 py-2">{supplier.supplierName}</td>
                                <td className="px-4 py-2">{supplier.address}</td>
                                <td className="px-4 py-2">{supplier.taxNo}</td>
                                <td className="px-4 py-2">{supplier.country}</td>
                                <td className="px-4 py-2">{supplier.mobileNo}</td>
                                <td className="px-4 py-2">{supplier.email}</td>
                                <td className="px-4 py-2">{supplier.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierComponent;
