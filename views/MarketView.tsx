
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { 
  Search, 
  ShoppingCart, 
  Filter, 
  ChevronDown, 
  Plus, 
  Sprout,
  Coffee,
  Egg,
  ShoppingBag,
  Gift,
  Utensils
} from 'lucide-react';

interface MarketViewProps {
  onNavigate: (type: string, id: number) => void;
}

// Mock Categories
const CATEGORIES = [
  { id: 'all', name: '全部', icon: ShoppingBag },
  { id: 'produce', name: '时令鲜蔬', icon: Sprout },
  { id: 'rice', name: '梯田好米', icon: Utensils },
  { id: 'tea', name: '高山好茶', icon: Coffee },
  { id: 'meat', name: '散养禽蛋', icon: Egg },
  { id: 'gift', name: '节日礼盒', icon: Gift },
];

const SORTS = ['综合', '销量', '价格', '新品'];

const MarketView: React.FC<MarketViewProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('综合');
  const [cartCount, setCartCount] = useState(3);

  // Filter products based on category (Mock logic)
  const displayProducts = activeCategory === 'all' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory || activeCategory === 'gift'); 

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] animate-fade-in flex flex-col relative pb-safe">
      
      {/* --- 1. Search Bar (Sticky Top) --- */}
      <div className="sticky top-0 z-50 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
         <div className="bg-stone-100 rounded-full h-10 flex items-center px-4 gap-2 border border-stone-200/50">
             <Search size={16} className="text-stone-400" />
             <input 
               type="text" 
               placeholder="搜索梯田好物..." 
               className="flex-1 bg-transparent text-sm outline-none text-stone-800 placeholder:text-stone-400 font-sans"
             />
             <div className="w-px h-4 bg-stone-300 mx-1"></div>
             <span className="text-xs text-stone-500 font-serif">搜索</span>
         </div>
      </div>

      {/* --- 2. Categories (Scrollable) --- */}
      <div className="bg-white pb-4 pt-2">
           <div className="flex overflow-x-auto px-4 gap-6 no-scrollbar">
              {CATEGORIES.map(cat => {
                 const isActive = activeCategory === cat.id;
                 const Icon = cat.icon;
                 return (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="flex flex-col items-center gap-2 min-w-[3.5rem] group"
                    >
                       <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border ${
                          isActive 
                            ? 'bg-plough-green-900 text-white border-plough-green-900 shadow-lg shadow-plough-green-900/20' 
                            : 'bg-stone-50 text-stone-500 border-stone-100 group-hover:bg-stone-100'
                       }`}>
                          <Icon size={18} strokeWidth={1.5} />
                       </div>
                       <span className={`text-xs font-serif ${isActive ? 'font-bold text-stone-900' : 'text-stone-500'}`}>
                          {cat.name}
                       </span>
                    </button>
                 );
              })}
           </div>
      </div>

      {/* --- 3. Filter Bar (Sticky below Search) --- */}
      {/* Top offset: 64px (Search Bar Height approx) */}
      <div className="sticky top-[64px] z-40 bg-[#F5F5F4]/95 backdrop-blur-sm px-4 py-2 flex items-center justify-between border-b border-stone-100/50 transition-all">
           <div className="flex gap-6">
              {SORTS.map(sort => (
                 <button 
                   key={sort}
                   onClick={() => setActiveSort(sort)}
                   className={`text-sm font-sans flex items-center gap-0.5 transition-colors ${
                      activeSort === sort ? 'text-plough-green-900 font-bold' : 'text-stone-500'
                   }`}
                 >
                    {sort}
                    {sort === '价格' && <div className="flex flex-col -space-y-0.5 ml-0.5"><ChevronDown size={8} className="rotate-180"/><ChevronDown size={8}/></div>}
                 </button>
              ))}
           </div>
           <button className="flex items-center gap-1 text-xs text-stone-500 bg-white px-2 py-1 rounded-full shadow-sm border border-stone-100">
              筛选 <Filter size={10} />
           </button>
      </div>

      {/* --- 4. Product List (Vertical) --- */}
      <div className="p-3 space-y-3 min-h-[500px]">
         {displayProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => onNavigate('product-detail', product.id)}
              className="bg-white p-3 rounded-2xl flex gap-3 shadow-sm active:scale-[0.99] transition-transform border border-stone-100/50"
            >
               {/* Image Area */}
               <div className="w-24 h-24 bg-stone-100 rounded-xl overflow-hidden shrink-0 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.tag && (
                     <div className="absolute top-0 left-0 bg-plough-green-900 text-white text-[9px] px-1.5 py-0.5 rounded-br-lg font-serif z-10">
                        {product.tag}
                     </div>
                  )}
               </div>

               {/* Info Area */}
               <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                     <h3 className="text-sm font-serif font-bold text-stone-900 leading-tight mb-1 line-clamp-2">
                        {product.name}
                     </h3>
                     
                     {/* Tags */}
                     <div className="flex flex-wrap gap-1 mb-1">
                        <span className="text-[9px] text-plough-green-700 bg-plough-green-50 px-1 rounded-sm">有机认证</span>
                        {product.memberPrice > 0 && <span className="text-[9px] text-[#C99C63] bg-[#FFFBF0] px-1 rounded-sm border border-[#C99C63]/20">会员特惠</span>}
                     </div>
                     
                     <p className="text-[10px] text-stone-400 line-clamp-1">{product.desc}</p>
                  </div>

                  {/* Price Row */}
                  <div className="flex justify-between items-end">
                     <div className="flex flex-col leading-none">
                        <div className="flex items-baseline gap-0.5">
                           <span className="text-xs text-red-600 font-bold">¥</span>
                           <span className="text-lg text-red-600 font-bold font-serif">{product.memberPrice || product.price}</span>
                           {product.memberPrice > 0 && <span className="text-[9px] text-stone-300 line-through ml-1">¥{product.price}</span>}
                        </div>
                     </div>
                     
                     {/* Add Button */}
                     <button 
                       onClick={handleAddToCart}
                       className="w-7 h-7 bg-plough-green-900 text-white rounded-full flex items-center justify-center shadow-lg shadow-plough-green-900/20 active:bg-plough-green-800 transition-colors"
                     >
                        <Plus size={16} />
                     </button>
                  </div>
               </div>
            </div>
         ))}
         
         {/* Footer */}
         <div className="py-8 text-center text-xs text-stone-300 font-serif">
            - 到底了，再去逛逛吧 -
         </div>
      </div>

      {/* --- Floating Cart (Fixed Position) --- */}
      <div className="fixed bottom-28 right-5 z-50">
          <button className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/20 active:scale-90 transition-transform relative border border-white/10">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold border border-white">
                  {cartCount}
               </div>
            )}
          </button>
      </div>

      <style>{`
        .pb-safe { padding-bottom: calc(env(safe-area-inset-bottom, 20px) + 80px); }
      `}</style>
    </div>
  );
};

export default MarketView;
