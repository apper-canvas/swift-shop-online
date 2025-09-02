import { motion } from "framer-motion";

const Loading = () => {
  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { x: "100%" },
  };

  const ProductCardSkeleton = () => (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="relative h-48 bg-slate-200 overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-3 bg-slate-200 rounded w-3/4 animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-slate-200 rounded w-20 animate-pulse" />
          <div className="h-8 bg-slate-200 rounded w-24 animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-96 mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;