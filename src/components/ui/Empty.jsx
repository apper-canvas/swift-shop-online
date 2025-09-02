import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No products found", 
  description = "We couldn't find any products matching your criteria. Try browsing our categories or adjusting your search.", 
  actionText = "Browse Categories",
  onAction 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="w-20 h-20 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="Package" size={40} className="text-accent" />
        </motion.div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">{description}</p>

        <div className="space-y-3">
          {onAction && (
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <ApperIcon name="Grid3X3" size={16} className="mr-2" />
              {actionText}
            </Button>
          )}
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            size="md"
            className="w-full"
          >
            <ApperIcon name="Home" size={16} className="mr-2" />
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Empty;