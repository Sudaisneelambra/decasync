import { useEffect, useState } from "react";

const ItemList = ({ Items, index, orderItems, setOrderItems, isItemAdded }) => {

/**states */
  const [discount, setDiscount] = useState(10);
  const [unit, setUnit] = useState(0);

/**handle item changes of selection */
  const handleItemChange = (method, field) => {
    if (isItemAdded) {
        alert("Item added confirmed, you can't change");
        return;
    }
    if (method === "decrement") {
        if (unit === 0) {
            alert("You cannot decrement quantity below 0");
        } else {
            setUnit((prev) => prev - 1);
        }
    } else if (method === "increment") {
        setUnit((prev) => prev + 1);
    }
  };


  /**calculate Total Amt */
  const totalAmount = (unitPrice, unit) => {
    return unitPrice * unit;
  };


  /**calculate net total amt */
  const netTotal = (unitPrice, unit, discount) => {
    return (unitPrice * unit * (100 - discount)) / 100;
  };

  
  useEffect(() => {
    const confirmAdd = () => {
      const updated = [...orderItems];
      if (unit === 0) {
        updated.splice(index, 1);
      } else {
        const itemData = {
        id: Items._id,
        itemNo: Items.itemNo,
        itemName: Items.itemName,
        stockUnit: Items.stockUnit,
        unitPrice: Items.unitPrice,
        orderQty: unit,
        itemAmount: totalAmount(Items.unitPrice, unit),
        discount: discount,
        netAmount: netTotal(Items.unitPrice, unit, discount),
        };

        if (!updated[index]) {
          updated[index] = itemData;
        } else {
          updated[index] = { ...updated[index], ...itemData };
        }
      }
      setOrderItems(updated);
    };

    confirmAdd();
  }, [unit]);

  return (
    <div
      key={Items._id}
      className="min-w-[250px] max-w-[250px] h-auto border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center p-4"
    >
      <span className="text-lg font-semibold text-gray-800">{Items.itemName}</span>
      <div className="w-[80%] h-[100px] mb-2">
        <img src={Items.itemImages[0]} alt="image" className="w-full h-full rounded-md" />
      </div>
      <h1 className="text-gray-700">
        Stock Unit: <span className="font-bold">{Items?.stockUnit}</span>
      </h1>
      <h1 className="text-gray-700">
        Unit Price: <span className="font-bold"> ₹{Items?.unitPrice.toFixed(2)}</span>
      </h1>
      <h1 className="flex justify-center items-center gap-4 my-2">
        <button
          className="py-1 px-3 border border-gray-400 rounded-md bg-black text-white hover:bg-gray-800 transition"
          onClick={() => handleItemChange("decrement", Items)}
        >
          -
        </button>
        <span className="text-xl font-bold">{unit}</span>
        <button
          className="py-1 px-3 border border-gray-400 rounded-md bg-black text-white hover:bg-gray-800 transition"
          onClick={() => handleItemChange("increment", Items)}
        >
          +
        </button>
      </h1>
      <h1 className="text-gray-700">
        Item Amount: <span className="font-bold"> ₹{totalAmount(Items?.unitPrice, unit).toFixed(2)}</span>
      </h1>
      <h1 className="text-gray-700">
        Discount: <span className="font-bold">{discount}%</span>
      </h1>
      <h1 className="text-gray-700">
        Net Amount: <span className="font-bold"> ₹{netTotal(Items?.unitPrice, unit, discount).toFixed(2)}</span>
      </h1>
      {isItemAdded && orderItems[index] && (
        <span className="text-green-600 font-semibold mt-2">Item added to order!</span>
      )}
    </div>
  );
};

export default ItemList;
