import CurrenciesData from '../currencies.json'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import InputField from "./components/InputField";
import InputFieldRO from "./components/InputFieldRO";
import TextArea from "./components/TextArea";
import { Heading, SmallHeading } from "./components/Typography";
import React from 'react'
import Button from './components/Button';

const EditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formedData = location.state?.formData;
  const [currencies, setCurrencies] = useState(CurrenciesData);
  const [formData, setFormData] = useState(formedData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update input fields for Quantity, Price and Total Price
  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const items = [...formData.items];
    const item = items[index];

    if (name === "price" || name === "quantity") {
      item[name] = parseFloat(value);
      item.totalPrice = item.price * item.quantity;
    } else {
      item[name] = value;
    }

    const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);

    setFormData({
      ...formData,
      items,
      totalPrice,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { item: "", price: "", quantity: "1", totalPrice: "" },
      ],
    });
  };

  const removeItem = (index) => {
    const items = [...formData.items];
    items.splice(index, 1);
    setFormData({
      ...formData,
      items,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/preview", { state: { formData } });
  };

  return (
    <div>
      <Heading
        title="Create New Invoice"
        className="border-b-2 border-slate-100 pb-[2rem] mb-[1.2rem] "
      />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[10px] bg-slate-100 pb-[1rem] pt-[.5rem] px-[.9rem] rounded-[10px] ">
          <InputField
            title="Recipient name"
            onChange={handleInputChange}
            type="text"
            name="recipientName"
            value={formData.recipientName}
            className={"text-black"}
          />
          <InputField
            title="Recipient email"
            onChange={handleInputChange}
            type="email"
            name="recipientEmail"
            value={formData.recipientEmail}
          />
        </div>

        <InputField
          title="Client name"
          onChange={handleInputChange}
          type="text"
          name="clientName"
          value={formData.clientName}
        />
        <InputField
          title="Project Description"
          onChange={handleInputChange}
          type="text"
          name="projectDescription"
          value={formData.projectDescription}
        />
        <div className="grid grid-cols-2 gap-[10px] rounded-[10px] ">
          <InputField
            title="Issued On"
            onChange={handleInputChange}
            type="date"
            name="issuedOn"
            value={formData.issuedOn}
          />
          <InputField
            title="Due On"
            onChange={handleInputChange}
            type="date"
            name="dueOn"
            value={formData.dueOn}
          />
          <InputField
            title="Bill From"
            onChange={handleInputChange}
            type="text"
            name="billFrom"
            value={formData.billFrom}
          />
          <InputField
            title="Bill To"
            onChange={handleInputChange}
            type="text"
            name="billTo"
            value={formData.billTo}
          />
        </div>

        <label>
          <select
            name="currency"
            id="currency"
            value={formData.currency}
            onChange={handleInputChange}
          >
            {Object.keys(currencies).map((currency) => {
              return <option key={currency}>{currency} </option>;
            })}
          </select>
        </label>
        <SmallHeading title="Invoice Items" className="invoice-items" />
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-[51%_15%_10%_19%] gap-2">
            <InputField
              title="Item"
              onChange={(event) => handleItemChange(event, index)}
              type="text"
              name="item"
              value={item.item}
            />
            <InputField
              title="Price"
              onChange={(event) => handleItemChange(event, index)}
              type="number"
              name="price"
              value={item.price}
            />
            <InputField
              title="Qty"
              onChange={(event) => handleItemChange(event, index)}
              type="number"
              name="quantity"
              value={item.quantity}
            />
            <InputFieldRO
              title="Total Price"
              type="number"
              name="totalPrice"
              value={item.totalPrice}
            />
            <button type="button" onClick={() => removeItem(index)}>
              Remove Item
            </button>
          </div>
        ))}
        <button
          className="font-bold text-purple-800"
          type="button"
          onClick={addItem}
        >
          + Add Item
        </button>
        <TextArea
          title="Additional Notes"
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />
        <div className="py-[2rem]">
          <Button type="submit" title="Preview" className="bg-purple-800" />
        </div>
      </form>
    </div>
  );
}



export default EditPage