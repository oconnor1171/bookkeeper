import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExpenseTable from './pages/ExpenseTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseTable />} />
      </Routes>
    </Router>
  );
}

export default App;
