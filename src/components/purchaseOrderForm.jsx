import React, { useState, useEffect, useContext } from 'react';
import common from '../axios/axiosinstance';
import style from '../css/purchaseorder.module.css';
import ItemList from './itemsList';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/context';

const PurchaseOrderForm = () => {

    const navigate = useNavigate()

    const {setLoadingValue} = useContext(MyContext)

    const [isItemAdded, setIsItemAdded] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [itemTotal, setItemTotal] = useState(0);
    const [discount, setDiscount] = useState(10);
    const [discountAmt, setDiscountAmt] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [items, setItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [totalAmt,setTotalAmt]= useState(0)
    const [submit,setSubmit]= useState(false)

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await common.get('/supplier/getsuppliers');
      if (response) {
        setSuppliers(response.data.data.filter(supplier => supplier.status === 'Active'));
      }
    };

    /**get all items */
    const fetchItems = async () => {
      const response = await common.get('/items/getAllItems');
      if (response) {
        setItems(response.data.data);
      }
    };

    fetchItems();
    fetchSuppliers();
  }, []);


  /**calculations */
  const calculateDiscount = (dis) => {
    const total = orderItems.reduce((acc, curr) => {
        const itemDiscount = (curr.unitPrice * curr.orderQty) ;
        return acc + itemDiscount;
    }, 0);   
    setTotalAmt(total)
    const discount = (total*dis)/100
    setNetAmount(total - discount)
    setDiscountAmt(discount)
    
};


/**add button functionality */
  const addItem = () => {
    console.log(orderItems);
    setIsItemAdded(true)
    setItemTotal(orderItems?.length)
    calculateDiscount(discount)
    console.log(discountAmt);
    setSubmit(true)
  };



  /**submission of form */
  const submission = async()=>{

    if(!selectedSupplier){
        alert('Please select a supplier')
    }else if(orderItems.length==0 || !submit){
        alert('Please add items to the order')
    }else{
        const data= {
            "supplierName":selectedSupplier,
            "purchaseId":'ORD12345',
            "orderItems": orderItems,
            "discount": discount,
            "discountAmt":discountAmt,
            "totalAmt":totalAmt,
            "netAmount": netAmount,            
        }

        try{
            setLoadingValue(true)
            const respons = await common.post('/purchase/savepurcase',data)

            if(respons){
                setLoadingValue(false)
                alert('Order submitted successfully')
                navigate('/')
            }
        } catch(err){
            setLoadingValue(false)
            alert('purchse order failed')
        }

    }
  }


  return (
    <div className={style['purchase-order-form']}>
      <h2>Order Details</h2>
      <label>
        Order No (auto-generated):
        <input type="text" value="ORD12345" readOnly />
      </label>

      <label>
        Order Date:
        <input type="date" value={new Date().toISOString().substring(0, 10)} readOnly />
      </label>

      <label>
        Supplier Name:
        <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.supplierName}
            </option>
          ))}
        </select>
      </label>
      
      <h2>Item List</h2>
      <div className={`${style.one} border-2 w-[100%] h-auto flex flex-col gap-2`}>
        {items.map((item, index) => (
          <ItemList key={item._id} Items={item} index={index} orderItems={orderItems} setOrderItems={setOrderItems} isItemAdded={isItemAdded} />
        ))}
      </div>

      <div className="  flex justify-center">
      {
        !isItemAdded  &&(
            <h1 type="button" onClick={addItem} className='w-[100%] rounded-md bg-[#3232a3] text-center py-1 mt-4 text-[20px] text-[white]'>
                Add Item
            </h1>
        )
      }
      {
        isItemAdded && (
            <h1 type="button" onClick={()=>{setIsItemAdded(false),setSubmit(false)}}  className='w-[100%] rounded-md bg-[#3232a3] text-center py-1 mt-4 text-[20px] text-[white]'>
                edit
            </h1>
        )
      }
      
      </div>

      <h2>Order Summary</h2>
      <label>
        Item Total:
        <input type="number" value={itemTotal} readOnly />
      </label>

      <label>
        Discount:
        <input type="" value={`${discount} %`} readOnly />
      </label>
      <label>
        Discount Amount:
        <input type="" value={`₹ ${discountAmt} `} readOnly />
      </label>

      <label>
        Net Amount:
        <input type="" value={ `₹ ${netAmount}`} readOnly />
      </label>
      <div className="w-full flex justify-center">
        <button onClick={()=>submission()}>Place Order</button>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
