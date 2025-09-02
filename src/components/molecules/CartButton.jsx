import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CartButton = ({ itemCount = 0, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-slate-600 hover:text-accent transition-colors duration-200 rounded-lg hover:bg-slate-100"
    >
      <ApperIcon name="ShoppingCart" size={20} />
      {itemCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={itemCount}
          className="absolute -top-1 -right-1"
        >
          <Badge
            variant="primary"
            size="sm"
            className="min-w-[20px] h-5 flex items-center justify-center text-xs font-bold animate-bounce-subtle"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </Badge>
        </motion.div>
      )}
    </button>
  );
};

export default CartButton;