import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
const images = require.context("./image", false, /\.(png|jpe?g|gif)$/);
const PaymentPage = () => {
  const products = [
    {
      id: 1,
      name: "Rolex Watch",
      price: 500000,
      image: images("./rolexwatch.png"),
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 500,
      image: images("./smartwatch.png"),
    },
    {
      id: 3,
      name: "Casio Watch",
      price: 600,
      image: images("./casiowatch.png"),
    },
  ];
  const banks = [
    {
      id: 1,
      name: "Vietcombank",
      image: images("./vietcombank.png"),
    },
    {
      id: 2,
      name: "Techcombank",
      image: images("./techcombank.png"),
    },
    {
      id: 3,
      name: "ACB",
      image: images("./ACB.png"),
    },
  ];
  const ewallet = [
    {
      id: 1,
      name: "MoMo",
      image: images("./momo.png"),
    },
    {
      id: 2,
      name: "PayPal",
      image: images("./paypal.png"),
    },
  ];

  // State để lưu phương thức thanh toán, trạng thái thanh toán và các sản phẩm đã chọn
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Danh sách phương thức thanh toán
  const paymentMethods = [
    "Credit card",
    "E-wallet",
    "Cash on Delivery",
    "Code QR",
  ];

  // Xử lý khi người dùng chọn sản phẩm
  const handleProductSelection = (productId) => {
    setSelectedProducts(
      (prevSelected) =>
        prevSelected.includes(productId)
          ? prevSelected.filter((id) => id !== productId) // Bỏ chọn sản phẩm
          : [...prevSelected, productId] // Thêm sản phẩm vào danh sách đã chọn
    );
  };
  const handleProductRemoval = (productId) => {
    setSelectedProducts(
      (prevSelected) => prevSelected.filter((id) => id !== productId) // Xóa sản phẩm khỏi danh sách đã chọn
    );
  };
  // Tính tổng số tiền của các sản phẩm đã chọn
  const totalAmount = selectedProducts
    .map((productId) => products.find((product) => product.id === productId))
    .reduce((total, product) => total + product.price, 0);

  // Xử lý thanh toán
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select payment method!");
      return;
    }
    if (paymentMethod === "Cash on Delivery") {
      navigate("/cash-payment"); // Điều hướng đến trang nhập thông tin
    } else if (paymentMethod === "Code QR") {
      alert("Scan the QR code to complete the transaction.");
    } else {
      setIsPaymentSuccessful(true);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>PaymentPage</h1>

      {/* Thông tin sản phẩm và checkbox chọn sản phẩm */}
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="checkbox"
            checked={selectedProducts.includes(product.id)}
            onChange={() => handleProductSelection(product.id)}
            style={{ marginRight: "20px" }}
          />
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "20px",
            }}
          />
          <div>
            <h3 style={{ margin: "0 0 10px", color: "green" }}>
              {product.name}
            </h3>
            <p
              style={{
                margin: "0",
                fontSize: "18px",
                fontWeight: "bold",
                color: "pink",
              }}
            >
              Price: {product.price.toLocaleString()} $
            </p>
          </div>
          {/* Nút xóa sản phẩm */}
          {selectedProducts.includes(product.id) && (
            <button
              onClick={() => handleProductRemoval(product.id)}
              style={{
                marginLeft: "20px",
                padding: "5px 10px",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      {/* Tổng số tiền thanh toán */}
      <div
        style={{
          textAlign: "right",
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Total amount: {totalAmount.toLocaleString()} $
      </div>

      {/* Dropdown chọn phương thức thanh toán */}
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="paymentMethod"
          style={{ display: "block", marginBottom: "10px" }}
        >
          Select payment method:
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <option value="">-- Select payment method --</option>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị mã QR nếu chọn "Mã QR" */}
      {paymentMethod === "Code QR" && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>Scan QR code to pay</h3>
          <QRCodeCanvas
            value={`vietqr://payment?amount=${totalAmount}&content=Thanh%20toan%20san%20pham`}
            size={200}
          />
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            Content: Payment for selected products
          </p>
        </div>
      )}
      {/* Hiển thị danh sách ngân hàng nếu chọn "Thẻ tín dụng" */}
      {paymentMethod === "Credit card" && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {banks.map((bank) => (
            <div
              key={bank.id}
              style={{
                textAlign: "center",
                width: "100px",
              }}
            >
              <img
                src={bank.image}
                alt={bank.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <p style={{ fontSize: "14px" }}>{bank.name}</p>
            </div>
          ))}
        </div>
      )}
      {/* Hiển thị danh sách ngân hàng nếu chọn "ví điện tử" */}
      {paymentMethod === "E-wallet" && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {ewallet.map((ewallet) => (
            <div
              key={ewallet.id}
              style={{
                textAlign: "center",
                width: "100px",
              }}
            >
              <img
                src={ewallet.image}
                alt={ewallet.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <p style={{ fontSize: "14px" }}>{ewallet.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Nút thanh toán */}
      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#28a745",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Payment
      </button>

      {/* Thông báo giao dịch thành công */}
      {isPaymentSuccessful && (
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
          Transaction successful! Thank you for shopping!
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
