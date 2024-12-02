import React, { useState } from "react";

const CashPaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false); // Thêm state để kiểm tra thành công

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sau khi gửi thông tin, hiển thị thông báo thành công
    setOrderSuccess(true);
    // Reset lại form sau khi gửi thông tin
    setFormData({
      name: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Payment information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Number phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Confirm
        </button>
      </form>

      {/* Hiển thị thông báo khi đặt hàng thành công */}
      {orderSuccess && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #28a745",
            borderRadius: "4px",
            backgroundColor: "#eaffea",
            textAlign: "center",
            color: "#28a745",
            fontWeight: "bold",
          }}
        >
          Order successful! Thank you for shopping.
        </div>
      )}
    </div>
  );
};

export default CashPaymentForm;
