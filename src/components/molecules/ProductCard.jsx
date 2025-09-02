import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (product.inStock && onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card overflow-hidden h-full flex flex-col"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="error" size="md">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-accent">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant="default" size="sm" className="self-start mt-1">
              {product.category}
            </Badge>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            variant={product.inStock ? "primary" : "outline"}
            size="sm"
            className="shrink-0"
          >
            {product.inStock ? "Add to Cart" : "Unavailable"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;