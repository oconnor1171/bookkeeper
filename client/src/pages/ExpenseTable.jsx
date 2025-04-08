// ExpenseTable.jsx — Excel-style Table with Add, Delete, Totals, Edit

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const categoryOptions = ['Utilities', 'Marketing', 'Travel', 'Meals', 'Software'];

const EditableInput = ({ value, onChange }) => (
  <input
    className="border rounded p-1 w-full"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const EditableDropdown = ({ value, onChange, options }) => (
  <select
    className="border rounded p-1 w-full"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Select</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

const EditableDate = ({ value, onChange }) => (
  <DatePicker
    className="border rounded p-1 w-full"
    selected={value ? new Date(value) : null}
    onChange={(date) => onChange(date)}
    dateFormat="yyyy-MM-dd"
  />
);

export default function ExpenseTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/transactions')
      .then((res) => {
        console.log('✅ Transactions fetched:', res.data);  // ← ADD THIS
        setData(res.data);
      })
      .catch((err) => {
        console.error('❌ Error fetching transactions:', err);
      });
  }, []);

  const updateCell = async (rowIndex, key, value) => {
    const updated = [...data];
    updated[rowIndex][key] = value;
    setData(updated);
    try {
      const id = updated[rowIndex]._id;
      await axios.put(`/api/transactions/${id}`, { [key]: value });
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  const addRow = async () => {
    const newRow = {
      category: '',
      business: '',
      amount: 0,
      merchant: '',
      date: new Date(),
      connectedBusiness: '',
      bankAccount: '',
      comments: ''
    };
    try {
      const res = await axios.post('/api/transactions', newRow);
      setData((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add row:', err);
    }
  };

  const deleteRow = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      setData((prev) => prev.filter((row) => row._id !== id));
    } catch (err) {
      console.error('Failed to delete row:', err);
    }
  };

  const totalAmount = data.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0).toFixed(2);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold">📊 Transactions</h1>
        <button onClick={addRow} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Row</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Category</th>
            <th className="border p-2">Business</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Merchant</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Connected Business</th>
            <th className="border p-2">Bank Account</th>
            <th className="border p-2">Comments</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row._id}>
              <td className="border p-2">
                <EditableDropdown value={row.category} onChange={(val) => updateCell(i, 'category', val)} options={categoryOptions} />
              </td>
              <td className="border p-2">
                <EditableInput value={row.business} onChange={(val) => updateCell(i, 'business', val)} />
              </td>
              <td className="border p-2">
                <EditableInput value={row.amount} onChange={(val) => updateCell(i, 'amount', parseFloat(val))} />
              </td>
              <td className="border p-2">
                <EditableInput value={row.merchant} onChange={(val) => updateCell(i, 'merchant', val)} />
              </td>
              <td className="border p-2">
                <EditableDate value={row.date} onChange={(val) => updateCell(i, 'date', val)} />
              </td>
              <td className="border p-2">
                <EditableInput value={row.connectedBusiness} onChange={(val) => updateCell(i, 'connectedBusiness', val)} />
              </td>
              <td className="border p-2">
                <EditableInput value={row.bankAccount} onChange={(val) => updateCell(i, 'bankAccount', val)} />
              </td>
              <td className="border p-2">
                <EditableInput value={row.comments} onChange={(val) => updateCell(i, 'comments', val)} />
              </td>
              <td className="border p-2 text-center">
                <button onClick={() => deleteRow(row._id)} className="text-red-600">🗑</button>
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td colSpan="2" className="p-2 border text-right">Total</td>
            <td className="p-2 border">${totalAmount}</td>
            <td colSpan="6" className="border"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
