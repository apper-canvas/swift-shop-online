import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "@/index.css";
import Layout from "@/components/organisms/Layout";
import ProductDetail from "@/components/pages/ProductDetail";
import Homepage from "@/components/pages/Homepage";

function App() {
  return (
<div className="min-h-screen bg-background">
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Homepage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Homepage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;