import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import CashPaymentForm from "./CashPaymentForm"; // Trang mới để nhập thông tin thanh toán

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentPage />} />
        <Route path="/cash-payment" element={<CashPaymentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
