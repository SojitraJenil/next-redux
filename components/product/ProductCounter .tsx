import React, { useState } from "react";

const ProductCounter = ({ initialPrice }: any) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const totalPrice = initialPrice * quantity;

  return (
    <div className="pt-2 ps-2 flex items-center space-x-2">
      <button
        className="p-2 px-3 bg-red-200 rounded-md"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        className="w-10 border-b border-black bg-transparent text-center"
        type="text"
        value={quantity}
        readOnly
      />
      <button
        className="p-2 px-3 bg-green-200 rounded-md"
        onClick={handleIncrement}
      >
        +
      </button>
      <span className="ml-4 text-lg font-semibold">
        {totalPrice.toFixed(2)}$
      </span>
    </div>
  );
};

export default ProductCounter;
