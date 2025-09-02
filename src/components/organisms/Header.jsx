import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import CartButton from "@/components/molecules/CartButton";

const Header = ({ cartItemCount, onCartClick, onSearch }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-blue-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Swift Shop
              </h1>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-slate-600 hover:text-accent transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="/products"
              className="text-slate-600 hover:text-accent transition-colors duration-200 font-medium"
            >
              Products
            </a>
            <a
              href="/categories"
              className="text-slate-600 hover:text-accent transition-colors duration-200 font-medium"
            >
              Categories
            </a>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <SearchBar onSearch={onSearch} />
            <CartButton
              itemCount={cartItemCount}
              onClick={onCartClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;