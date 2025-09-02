import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const FilterBar = ({ 
  sortBy, 
  priceRange, 
  onSortChange, 
  onPriceRangeChange, 
  onClearFilters,
  activeFiltersCount = 0
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ];

  const handleSortSelect = (value) => {
    onSortChange(value);
    setShowSortDropdown(false);
  };

  const handlePriceChange = (type, value) => {
    const newRange = {
      ...tempPriceRange,
      [type]: parseInt(value)
    };
    
    // Ensure min doesn't exceed max
    if (type === 'min' && newRange.min > newRange.max) {
      newRange.max = newRange.min;
    }
    if (type === 'max' && newRange.max < newRange.min) {
      newRange.min = newRange.max;
    }
    
    setTempPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "Popular";

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-slate-200 p-4 mb-6 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left side - Sort and Price */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:border-accent transition-colors duration-200 bg-white min-w-[180px] justify-between"
            >
              <span className="text-slate-700">{currentSortLabel}</span>
              <ApperIcon 
                name={showSortDropdown ? "ChevronUp" : "ChevronDown"} 
                size={16}
                className="text-slate-500"
              />
            </button>

            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors duration-200 ${
                      sortBy === option.value ? 'text-accent font-medium' : 'text-slate-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-4 p-3 border border-slate-300 rounded-lg bg-slate-50">
            <span className="text-slate-700 font-medium text-sm whitespace-nowrap">Price Range:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">$</span>
              <input
                type="number"
                min="0"
                max="500"
                value={tempPriceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-16 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
              <span className="text-slate-500">-</span>
              <span className="text-sm text-slate-600">$</span>
              <input
                type="number"
                min="0"
                max="500"
                value={tempPriceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-16 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>
            
            {/* Price Range Sliders */}
            <div className="hidden sm:flex flex-col gap-1 flex-1 min-w-[120px]">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={tempPriceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="slider-thumb-accent w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={tempPriceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="slider-thumb-accent w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Right side - Active filters and Clear */}
        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="md">
                {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
          
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-slate-600 hover:text-accent"
          >
            <ApperIcon name="X" size={16} />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Mobile Price Sliders */}
      <div className="sm:hidden mt-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Min: ${tempPriceRange.min}</span>
            <span>Max: ${tempPriceRange.max}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Minimum</label>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={tempPriceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Maximum</label>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={tempPriceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;