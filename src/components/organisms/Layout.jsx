import { useCart } from "@/hooks/useCart";
import React from "react";
import Header from "@/components/organisms/Header";
import CartDrawer from "@/components/organisms/CartDrawer";

const Layout = ({ children }) => {
  const {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getItemCount,
    openCart,
    closeCart
  } = useCart();

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Placeholder for search functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={getItemCount()}
        onCartClick={openCart}
        onSearch={handleSearch}
      />
<main className="flex-1">
        {children}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={getCartTotal()}
      />
    </div>
  );
};

export default Layout;