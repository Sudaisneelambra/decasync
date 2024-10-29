import React, { useContext, useEffect, useState } from 'react';
import commonaxios from '../axios/axiosinstance';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/context';

const ItemForm = () => {

    /**states */
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [itemCount, setItemCount] = useState();
    const { setLoadingValue } = useContext(MyContext);
    const [formData, setFormData] = useState({
        itemName: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplier: '',
        stockUnit: '',
        unitPrice: '',
        itemImages: [],
        status: 'Enabled',
    });

    /**input value changes */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    /**file change */
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            itemImages: [...prev.itemImages, ...files],
        }));
    };


    /**handle submit */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key !== 'itemImages') {
                data.append(key, formData[key]);
            }
        });
        data.append('itemNo', itemCount ? itemCount + 1 : 1);
        formData.itemImages.forEach((file) => {
            data.append('itemImages', file);
        });

        /**submitting form */
        try {
            setLoadingValue(true);
            const response = await commonaxios.post('/items/createItem', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setLoadingValue(false);
                console.log('Success:', response.data);
                formData.itemImages = [];
                alert('Item added successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            setLoadingValue(false);
        }
    };


    /**useEffect */
    useEffect(() => {
        const fetchData = async () => {
            const data = await commonaxios.get('/supplier/getsuppliers');
            if (data) {
                setSuppliers(data.data.data);
            }
        };

        fetchData();
        getItemCount();
    }, []);

    /**fetch the total count */
    const getItemCount = async () => {
        try {
            const res = await commonaxios.get('/items/totalcount');
            setItemCount(res.data.count);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 my-10">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-700">Item No: {itemCount ? itemCount + 1001 : 1}</h1>
                <h2 className="text-2xl font-bold text-center text-blue-600">Add Item</h2>
            </div>

            <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="inventoryLocation" className="block text-sm font-medium text-gray-700">Inventory Location</label>
                <input
                    type="text"
                    id="inventoryLocation"
                    name="inventoryLocation"
                    value={formData.inventoryLocation}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Supplier</label>
                <select
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.supplierName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="stockUnit" className="block text-sm font-medium text-gray-700">Stock Unit</label>
                <select
                    id="stockUnit"
                    name="stockUnit"
                    value={formData.stockUnit}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Stock Unit</option>
                    <option value="kg">Kg</option>
                    <option value="pcs">Pieces</option>
                    <option value="liters">Liters</option>
                </select>
            </div>

            <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price</label>
                <input
                    type="number"
                    id="unitPrice"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                />
            </div>

            <div>
                <label htmlFor="itemImages" className="block text-sm font-medium text-gray-700">Item Images</label>
                <input
                    type="file"
                    id="itemImages"
                    name="itemImages"
                    multiple
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                </select>
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                Submit
            </button>
        </form>
    );
};

export default ItemForm;
