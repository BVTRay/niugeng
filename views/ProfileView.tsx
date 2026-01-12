
import React from 'react';
import { 
  Headphones, 
  MessageSquareText, 
  Settings, 
  CreditCard, 
  Package, 
  Truck, 
  MessageSquare, 
  RefreshCcw, 
  TicketPercent, 
  Wheat, 
  Gift, 
  ClipboardCheck, 
  ShoppingCart, 
  MapPin, 
  Star, 
  FileText, 
  Info, 
  ChevronRight,
  Crown,
  Award,
  Sparkles,
  Gem
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { BrandLogo } from '../components/BrandLogo';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onNavigate: (type: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onNavigate }) => {
  // Mock Recommendation Data (duplicating products to fill grid)
  const recommendations = [...MOCK_PRODUCTS, ...MOCK_PRODUCTS];
  const isGuest = user.level === '未开通权益';

  return (
    <div className="min-h-screen bg-[#F5F5F4] animate-fade-in pb-24 relative font-sans">
      
      {/* --- 1. Header & User Info --- */}
      <div className="bg-plough-green-950 pt-safe-top pb-32 px-6 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-plough-green-800/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        {/* Top Bar Layout */}
        <div className="flex justify-between items-center mb-6 relative z-10 pt-4">
           {/* Left: User Avatar & Info */}
           <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('account-security')}>
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className={`absolute -inset-0.5 rounded-full ${isGuest ? 'bg-stone-500/30' : 'bg-gradient-to-b from-[#EBC089] to-[#8C6239] opacity-80 blur-[0.5px]'}`}></div>
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className={`w-12 h-12 rounded-full object-cover relative z-10 ${isGuest ? 'border-2 border-stone-500' : 'border-2 border-[#EBC089]'}`}
                />
                {!isGuest && (
                  <div className="absolute -bottom-1 -right-1 z-20 bg-[#EBC089] text-[#4A3010] p-0.5 rounded-full shadow-sm border border-white/10">
                     <Crown size={8} fill="currentColor" strokeWidth={2} />
                  </div>
                )}
              </div>
              
              {/* Name & Tag */}
              <div className="flex flex-col justify-center gap-1">
                 <h2 className="text-base font-serif font-bold text-white leading-none tracking-wide">{user.name}</h2>
                 
                 {/* Membership Tag */}
                 <div className={`self-start px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isGuest 
                      ? 'bg-stone-700/50 border border-stone-600/50 text-stone-300' 
                      : 'bg-gradient-to-r from-[#EBC089] to-[#C99C63] text-[#4A3010] shadow-sm'
                 }`}>
                    <BrandLogo className={`w-2.5 h-2.5 ${isGuest ? 'text-stone-400' : 'text-[#4A3010]'}`} />
                    <span className="text-[9px] font-bold tracking-wider uppercase">
                       {isGuest ? '游客' : '黑金会员'}
                    </span>
                    {!isGuest && <ChevronRight size={8} className="opacity-60" />}
                 </div>
              </div>
           </div>

           {/* Right: Actions */}
           <div className="flex items-center gap-3 text-white/90">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => onNavigate('customer-service')}>
                 <Headphones size={20} strokeWidth={1.5} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative" onClick={() => onNavigate('messages')}>
                 <MessageSquareText size={20} strokeWidth={1.5} />
                 <span className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-plough-green-950"></span>
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => onNavigate('settings')}>
                 <Settings size={20} strokeWidth={1.5} />
              </button>
           </div>
        </div>
      </div>

      {/* --- 2. Membership Card Carousel (Negative Margin) --- */}
      <div className="-mt-24 mb-1 relative z-20 overflow-visible">
         <div className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-4 no-scrollbar pb-2">
            
            {/* Card 1: Premium Black Gold (Active) */}
            <div 
               className="min-w-[100%] snap-center h-40 rounded-2xl relative overflow-hidden shadow-xl transform transition-transform cursor-pointer"
               onClick={() => onNavigate('membership-intro')}
            >
               {/* Card Background Gradient */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#EBC089] via-[#C99C63] to-[#8C6239]"></div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

               {/* Card Content */}
               <div className="relative z-10 p-4 h-full flex flex-col justify-between text-[#4A3010]">
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-2">
                        <BrandLogo className="w-5 h-5 text-[#4A3010]" />
                        <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">Plough Tribe</span>
                     </div>
                     <button 
                        className="bg-[#4A3010] text-[#EBC089] text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm active:opacity-90 active:scale-95 transition-all"
                        onClick={(e) => { e.stopPropagation(); onNavigate('certificate'); }}
                     >
                        <Award size={10} /> 守护证书
                     </button>
                  </div>

                  {/* Card Body */}
                  <div>
                     <h3 className="text-xl font-serif font-black tracking-wide mb-0.5 flex items-baseline gap-1">
                        守望·丰仓卡 <span className="text-xs font-normal opacity-80 font-sans">/ 年卡</span>
                     </h3>
                     <p className="text-[10px] font-serif opacity-80">卓越会员 · 深度共生</p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-end border-t border-[#4A3010]/10 pt-2.5">
                     <div>
                        <p className="text-[9px] opacity-70 mb-0.5">有效期至</p>
                        <p className="text-xs font-bold font-serif numbers">{user.validUntil}</p>
                     </div>
                     <button className="bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                        {isGuest ? '立即开通' : '去续费'}
                     </button>
                  </div>
               </div>
            </div>

            {/* Card 2: Standard Green (Inactive/Alternative) */}
            <div 
               className="min-w-[100%] snap-center h-40 rounded-2xl relative overflow-hidden shadow-lg bg-[#E8F5E9] border border-plough-green-100 cursor-pointer"
               onClick={() => onNavigate('membership-intro')}
            >
               {/* Decor */}
               <BrandLogo className="absolute -right-8 -bottom-8 w-40 h-40 text-plough-green-200 opacity-50" />
               
               <div className="relative z-10 p-4 h-full flex flex-col justify-between text-plough-green-900">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-2">
                        <BrandLogo className="w-5 h-5" />
                        <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">Plough Tribe</span>
                     </div>
                     <button 
                        className="bg-plough-green-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm"
                        onClick={(e) => { e.stopPropagation(); onNavigate('membership-intro'); }}
                     >
                        立即升级
                     </button>
                  </div>

                  <div>
                     <h3 className="text-xl font-serif font-black tracking-wide mb-0.5 flex items-baseline gap-1">
                        归田·家园卡 <span className="text-xs font-normal opacity-80 font-sans">/ 季卡</span>
                     </h3>
                     <p className="text-[10px] font-serif opacity-80">基础会员 · 尝鲜体验</p>
                  </div>

                  <div className="flex justify-between items-end border-t border-plough-green-200 pt-2.5">
                     <p className="text-[10px] opacity-70">享受每月好米配送权益</p>
                     <span className="text-base font-bold">¥720<span className="text-[10px] font-normal text-stone-500">/季</span></span>
                  </div>
               </div>
            </div>

         </div>
      </div>

      <div className="px-3 space-y-3">
         
         {/* --- 3. Orders Card --- */}
         <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-stone-50 pb-2">
               <h3 className="font-serif font-bold text-stone-900">我的订单</h3>
               <button onClick={() => onNavigate('orders')} className="flex items-center text-xs text-stone-400 hover:text-stone-600">
                  全部订单 <ChevronRight size={12} />
               </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
               <IconAction icon={CreditCard} label="待付款" />
               <IconAction icon={Package} label="待发货" badge={isGuest ? undefined : "1"} />
               <IconAction icon={Truck} label="待收货" />
               <IconAction icon={MessageSquare} label="待评价" />
               <IconAction icon={RefreshCcw} label="退款/售后" />
            </div>
         </div>

         {/* --- 4. Interactions Card (Colorful & Centered) --- */}
         <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="grid grid-cols-5 gap-1 items-start">
               <ColorIconAction 
                  icon={TicketPercent} 
                  label="优惠券" 
                  value={isGuest ? "0张" : "2张"}
                  color="text-orange-500"
                  bg="bg-orange-50"
               />
               <ColorIconAction 
                  icon={Wheat} 
                  label="稻穗分" 
                  value={user.points.toString()} 
                  color="text-yellow-600"
                  bg="bg-yellow-50"
               />
               
               {/* Center Exchange Button - Aligned */}
               <button className="flex flex-col items-center gap-1.5 py-1 relative active:scale-95 transition-transform group">
                  <div className="w-10 h-10 bg-plough-green-900 text-white rounded-full flex items-center justify-center shadow-md shadow-plough-green-900/20 group-hover:scale-110 transition-transform">
                     <Gem size={20} />
                  </div>
                  <span className="text-xs font-bold text-stone-700">兑换中心</span>
               </button>

               <ColorIconAction 
                  icon={Gift} 
                  label="邀请有礼" 
                  highlight 
                  color="text-rose-500"
                  bg="bg-rose-50"
               />
               <ColorIconAction 
                  icon={ClipboardCheck} 
                  label="用户调研" 
                  color="text-blue-500"
                  bg="bg-blue-50"
               />
            </div>
         </div>

         {/* --- 5. Functions Card --- */}
         <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="grid grid-cols-5 gap-2">
               <IconAction icon={ShoppingCart} label="购物车" />
               <IconAction icon={MapPin} label="我的地址" />
               <IconAction icon={Star} label="收藏" />
               <IconAction icon={FileText} label="发票" />
               <IconAction icon={Info} label="关于" />
            </div>
         </div>

         {/* --- 6. Ad Banner --- */}
         <div className="rounded-xl overflow-hidden shadow-sm relative h-24 bg-stone-200 mt-2">
            <img 
               src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800" 
               alt="Banner" 
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-6">
               <span className="text-white font-serif font-bold text-lg">新季秧苗认养开启</span>
               <span className="text-white/80 text-xs">前100名送可视化监控权限 &gt;</span>
            </div>
         </div>

         {/* --- 7. Recommendations (Waterfall) --- */}
         <div className="pt-4">
            <div className="flex items-center justify-center gap-2 mb-4">
               <div className="w-1 h-1 rounded-full bg-orange-400"></div>
               <div className="w-1 h-1 rounded-full bg-plough-green-500"></div>
               <h3 className="font-serif font-bold text-stone-800">好物推荐</h3>
               <div className="w-1 h-1 rounded-full bg-plough-green-500"></div>
               <div className="w-1 h-1 rounded-full bg-orange-400"></div>
            </div>

            <div className="columns-2 gap-3 space-y-3 pb-safe-bottom">
               {recommendations.map((product, idx) => (
                  <div key={`${product.id}-${idx}`} className="break-inside-avoid bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100" onClick={() => onNavigate('product-detail', product.id)}>
                     <div className="aspect-[4/5] bg-stone-100 relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        {idx % 3 === 0 && (
                           <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm shadow-sm">热销</span>
                        )}
                     </div>
                     <div className="p-3">
                        <h4 className="font-serif font-bold text-stone-900 text-sm mb-1 line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-1 mb-2">
                           <span className="text-[9px] text-plough-green-700 bg-plough-green-50 px-1 py-0.5 rounded">{product.tag || '有机'}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                           <span className="text-sm font-bold text-plough-green-900">¥{product.memberPrice || product.price}</span>
                           {product.memberPrice > 0 && <span className="text-[10px] text-stone-400 line-through">¥{product.price}</span>}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

      </div>

      <style>{`
        .pt-safe-top { padding-top: max(env(safe-area-inset-bottom, 20px), 40px); }
        .pb-safe-bottom { padding-bottom: max(env(safe-area-inset-bottom, 20px), 20px); }
      `}</style>
    </div>
  );
};

// --- Sub Component: Standard Icon Action ---
const IconAction: React.FC<{ icon: any, label: string, badge?: string, value?: string }> = ({ icon: Icon, label, badge, value }) => (
   <button className="flex flex-col items-center gap-1.5 py-1 relative active:scale-95 transition-transform">
      <div className="relative">
         <Icon size={24} className="text-stone-600" strokeWidth={1.5} />
         {badge && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center border-2 border-white">
               {badge}
            </span>
         )}
      </div>
      <span className="text-xs text-stone-600 font-medium">{label}</span>
      {value && <span className="text-[10px] text-stone-400 -mt-0.5 font-serif">{value}</span>}
   </button>
);

// --- Sub Component: Colorful Icon Action ---
const ColorIconAction: React.FC<{ icon: any, label: string, value?: string, highlight?: boolean, color: string, bg: string }> = ({ icon: Icon, label, value, highlight, color, bg }) => (
   <button className="flex flex-col items-center gap-1.5 py-1 relative active:scale-95 transition-transform group">
      <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
         <Icon size={20} className={color} strokeWidth={2} />
         {highlight && (
            <span className="absolute -top-1.5 -right-1 text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full shadow-sm scale-90 border border-white">
               有礼
            </span>
         )}
      </div>
      <span className="text-xs text-stone-700 font-bold">{label}</span>
      {value && <span className="text-[10px] text-stone-400 -mt-0.5 font-serif scale-90">{value}</span>}
   </button>
);

export default ProfileView;
