
import React, { useState } from 'react';
import { ArrowLeft, Share2, Check, ShieldCheck, Crown, ShoppingBag, Truck, Gift, Info } from 'lucide-react';
import { BrandLogo, TerracePattern } from '../components/BrandLogo';

interface MembershipPaymentViewProps {
  initialTierId: 'granary' | 'homestead';
  onBack: () => void;
}

// Detailed descriptions for the popup
const BENEFIT_DETAILS: Record<string, { title: string, subtitle: string, desc: string }> = {
  'shipping': { 
     title: '每月包邮', 
     subtitle: '顺丰直达', 
     desc: '会员有效期内，每月的大米配送及商城购物均享受顺丰包邮服务，让新鲜第一时间抵达餐桌。' 
  },
  'price_off': { 
     title: '全场8折', 
     subtitle: '尊享折扣', 
     desc: '尊享牛耕部落商城全场商品8折优惠（含新品），不限次数，自动抵扣。' 
  },
  'member_price': { 
     title: '会员价', 
     subtitle: '专属特惠', 
     desc: '享受商城绝大多数商品的会员专属优惠价格，比普通用户更划算。' 
  },
  'rice_20': { 
     title: '20斤/月', 
     subtitle: '粮仓满满', 
     desc: '每月配送20斤有机胚芽米（价值600元），分袋封装，满足大家庭需求，随吃随拆。' 
  },
  'rice_10': { 
     title: '10斤/月', 
     subtitle: '精选好米', 
     desc: '每月配送10斤有机胚芽米（价值300元），新鲜脱壳，真空锁鲜，适合三口之家。' 
  },
  'birthday': { 
     title: '生日好礼', 
     subtitle: '长寿面+民宿券', 
     desc: '会员生日当月，赠送定制“有机长寿面”礼盒一份，并获赠一张“民宿7折体验券”，可转赠亲友。' 
  },
  'welcome': { 
     title: '入会礼', 
     subtitle: '证书+权益卡', 
     desc: '订阅即送唯一编号的“梯田守护证书”（电子+实体收藏版）及实体会员权益卡。' 
  },
};

const PLANS = {
  granary: {
    name: '守望 · 丰仓卡',
    themeColor: 'text-[#C99C63]',
    bgColor: 'bg-[#1c2e24]', // Dark Green/Black for premium feel
    accentColor: 'bg-[#C99C63]',
    borderColor: 'border-[#C99C63]',
    benefits: [
       { icon: Truck, label: '每月包邮', key: 'shipping' },
       { icon: ShoppingBag, label: '全场8折', key: 'price_off' },
       { icon: Crown, label: '20斤/月', key: 'rice_20' },
       { icon: Gift, label: '生日好礼', key: 'birthday' },
    ],
    options: [
      { id: 'g-quarter', label: '丰仓季卡', duration: '90天时长', price: 1440, original: 1800, save: 360, daily: '16.0' },
      { id: 'g-year', label: '丰仓年卡', duration: '365天时长', price: 5040, original: 7200, save: 2160, daily: '13.8', recommend: true },
    ]
  },
  homestead: {
    name: '归田 · 家园卡',
    themeColor: 'text-plough-green-700',
    bgColor: 'bg-[#E8F5E9]', // Light Green
    accentColor: 'bg-plough-green-600',
    borderColor: 'border-plough-green-600',
    benefits: [
       { icon: Truck, label: '每月包邮', key: 'shipping' },
       { icon: ShoppingBag, label: '会员价', key: 'member_price' },
       { icon: Crown, label: '10斤/月', key: 'rice_10' },
       { icon: Gift, label: '入会礼', key: 'welcome' },
    ],
    options: [
      { id: 'h-quarter', label: '家园季卡', duration: '90天时长', price: 720, original: 900, save: 180, daily: '8.0' },
      { id: 'h-year', label: '家园年卡', duration: '365天时长', price: 2520, original: 3600, save: 1080, daily: '6.9', recommend: true },
    ]
  }
};

const MembershipPaymentView: React.FC<MembershipPaymentViewProps> = ({ initialTierId, onBack }) => {
  const [activeTierId, setActiveTierId] = useState<'granary' | 'homestead'>(initialTierId);
  const [showDetailKey, setShowDetailKey] = useState<string | null>(null);
  
  // Default to annual plan of the initial tier
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
     initialTierId === 'granary' ? 'g-year' : 'h-year'
  );

  const activeTier = PLANS[activeTierId];
  const selectedOption = activeTier.options.find(o => o.id === selectedOptionId) || activeTier.options[0];

  const handleTierChange = (id: 'granary' | 'homestead') => {
     setActiveTierId(id);
     // Reset selection to annual plan of new tier
     setSelectedOptionId(id === 'granary' ? 'g-year' : 'h-year');
  };

  const isGranary = activeTierId === 'granary';

  return (
    <>
      <div className="min-h-screen bg-[#F5F5F4] animate-fade-in font-sans flex flex-col relative pb-safe">
         
         {/* Top Background Section */}
         <div className={`relative ${isGranary ? 'bg-[#1c2e24]' : 'bg-plough-green-900'} pb-16 transition-colors duration-500`}>
            <div className="absolute inset-0 overflow-hidden">
                <TerracePattern className="text-white" opacity="0.05" />
                {isGranary && <div className="absolute top-0 right-0 w-64 h-64 bg-[#C99C63] rounded-full blur-[80px] opacity-20"></div>}
            </div>

            {/* Header */}
            <div className="relative z-10 px-4 py-3 flex items-center justify-between text-white">
               <button onClick={onBack} className="p-1.5 rounded-full hover:bg-white/10"><ArrowLeft size={20} /></button>
               <h1 className="font-serif font-bold text-lg">购卡续费</h1>
               <button className="p-1.5 rounded-full hover:bg-white/10"><Share2 size={20} /></button>
            </div>

            {/* Location/Store Info (Mocked as per reference) */}
            <div className="relative z-10 px-6 mt-4">
               <div className="flex justify-between items-start">
                  <div>
                     <h2 className="text-xl font-serif font-bold text-white mb-1">牛耕部落 · 线上总店</h2>
                     <p className="text-xs text-white/70">全国配送 · 1200亩核心梯田</p>
                  </div>
                  {isGranary ? (
                     <span className="px-2 py-1 bg-gradient-to-r from-[#EBC089] to-[#C99C63] text-[#4A3010] text-[10px] font-bold rounded">卓越会员</span>
                  ) : (
                     <span className="px-2 py-1 bg-plough-green-100 text-plough-green-900 text-[10px] font-bold rounded">基础会员</span>
                  )}
               </div>
            </div>
         </div>

         {/* Main Content Card - Floating up */}
         <div className="-mt-12 relative z-20 px-4 flex-1">
            
            {/* Benefits Bar */}
            <div className="bg-[#292524] rounded-t-xl px-6 py-3 flex justify-between items-center shadow-lg mx-2">
               <span className="text-[#EBC089] text-xs font-bold shrink-0 mr-2">专享<br/>权益</span>
               <div className="h-6 w-px bg-white/10 mx-2"></div>
               <div className="flex-1 flex justify-between gap-2 overflow-x-auto no-scrollbar">
                  {activeTier.benefits.map((b, i) => (
                     <div 
                       key={i} 
                       className="flex flex-col items-center gap-1 min-w-[40px] cursor-pointer active:opacity-60 transition-opacity"
                       onClick={() => setShowDetailKey(b.key)}
                     >
                        <b.icon size={14} className="text-white/80" />
                        <span className="text-[9px] text-white/60 whitespace-nowrap">{b.label}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Tabs & Payment Area */}
            <div className="bg-white rounded-b-xl rounded-t-xl shadow-sm overflow-hidden min-h-[400px]">
               
               {/* Tabs */}
               <div className="flex border-b border-stone-100">
                  <button 
                     onClick={() => handleTierChange('homestead')}
                     className={`flex-1 py-4 text-sm font-bold relative transition-colors ${!isGranary ? 'text-plough-green-900' : 'text-stone-400'}`}
                  >
                     归田 · 家园卡
                     {!isGranary && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-plough-green-900 rounded-t-full"></div>}
                  </button>
                  <button 
                     onClick={() => handleTierChange('granary')}
                     className={`flex-1 py-4 text-sm font-bold relative transition-colors ${isGranary ? 'text-[#B8860B]' : 'text-stone-400'}`}
                  >
                     守望 · 丰仓卡
                     {isGranary && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#B8860B] rounded-t-full"></div>}
                  </button>
               </div>

               {/* Plan Options */}
               <div className="p-5">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                     {activeTier.options.map((option) => {
                        const isSelected = selectedOptionId === option.id;
                        const borderColor = isSelected 
                           ? (isGranary ? 'border-[#B8860B] bg-[#FFFBF0]' : 'border-plough-green-600 bg-plough-green-50') 
                           : 'border-stone-200';
                        
                        return (
                           <div 
                              key={option.id}
                              onClick={() => setSelectedOptionId(option.id)}
                              className={`relative flex-1 min-w-[140px] rounded-xl border-2 p-4 cursor-pointer transition-all ${borderColor}`}
                           >
                              {option.recommend && (
                                 <div className={`absolute -top-2.5 left-0 right-0 text-center`}>
                                    <span className={`text-[10px] text-white px-2 py-0.5 rounded-full ${isGranary ? 'bg-[#B8860B]' : 'bg-red-500'}`}>
                                       超值推荐
                                    </span>
                                 </div>
                              )}
                              
                              <h3 className="font-bold text-stone-800 text-sm mb-1">{option.label}</h3>
                              <p className="text-[10px] text-stone-400 mb-3">{option.duration}</p>
                              
                              <div className="flex items-baseline gap-0.5">
                                 <span className={`text-sm font-bold ${activeTier.themeColor}`}>¥</span>
                                 <span className={`text-2xl font-serif font-bold ${activeTier.themeColor}`}>{option.price}</span>
                              </div>
                              <p className="text-[10px] text-stone-400 line-through mt-0.5">¥{option.original}</p>
                           </div>
                        );
                     })}
                  </div>

                  {/* Summary Box */}
                  <div className={`mt-6 rounded-xl p-4 ${isGranary ? 'bg-[#FFFBF0]' : 'bg-plough-green-50/50'}`}>
                     <div className="flex justify-between items-center mb-2">
                        <span className={`text-xs font-bold ${isGranary ? 'text-[#B8860B]' : 'text-plough-green-800'}`}>
                           自动续费阶段价格越用越优惠
                        </span>
                        <Info size={12} className={isGranary ? 'text-[#B8860B]' : 'text-plough-green-800'} />
                     </div>
                     
                     <div className="relative h-20 w-full mt-4">
                        {/* Simplified visual representation of savings */}
                        <div className="absolute left-0 bottom-0 top-0 w-1/3 flex flex-col justify-end items-center">
                           <div className={`text-[10px] font-bold mb-1 ${isGranary ? 'text-[#B8860B]' : 'text-plough-green-700'}`}>
                              ¥{selectedOption.price}/{selectedOption.id.includes('year') ? '年' : '季'}
                           </div>
                           <div className={`w-2 h-2 rounded-full mb-1 ${isGranary ? 'bg-[#B8860B]' : 'bg-plough-green-600'}`}></div>
                           <div className="text-[10px] text-stone-400">首期</div>
                           <div className={`w-0.5 h-full absolute bottom-4 ${isGranary ? 'bg-[#B8860B]/20' : 'bg-plough-green-600/20'}`}></div>
                        </div>

                        <div className="absolute right-0 bottom-0 top-0 w-1/3 flex flex-col justify-end items-center">
                           <div className="text-[10px] text-stone-500 mb-1">
                              ¥{Math.floor(selectedOption.price * 0.9)}/期
                           </div>
                           <div className="w-2 h-2 rounded-full bg-stone-300 mb-1"></div>
                           <div className="text-[10px] text-stone-400">第2期及以后</div>
                        </div>
                        
                        {/* Connecting Curve */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                           <path d="M 50 40 Q 150 50 250 60" fill="none" stroke={isGranary ? '#EBC089' : '#a7f3d0'} strokeWidth="2" strokeDasharray="4 4" />
                        </svg>
                     </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2">
                     <div className="mt-0.5 w-3 h-3 rounded-full border border-stone-300 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                     </div>
                     <p className="text-[10px] text-stone-400 leading-tight">
                        同意《牛耕部落会员服务协议》及《自动续费协议》。到期前1天自动扣费，可随时取消。
                     </p>
                  </div>
               </div>

            </div>
         </div>

         {/* Bottom Action Bar */}
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 p-3 pb-safe z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
            <div className="flex gap-3 max-w-md mx-auto">
               <div className="flex-1 bg-stone-900 rounded-full flex items-center justify-between px-6 py-3 text-white">
                  <span className="text-sm">支付 <span className="font-bold text-lg">¥ {selectedOption.price}</span></span>
                  <span className="text-xs text-stone-400 ml-2 line-through">¥{selectedOption.original}</span>
               </div>
               <button className={`px-8 py-3 rounded-full font-bold text-sm ${isGranary ? 'bg-[#C99C63] text-white' : 'bg-[#EBC089] text-[#4A3010]'}`}>
                  立即购买
               </button>
            </div>
         </div>
      </div>

      {/* Detail Modal - Outside Animated Container */}
      {showDetailKey && (
         <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setShowDetailKey(null)}></div>
            
            {/* Modal Content */}
            <div className="bg-[#1c1c1e] w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl border-t border-white/10 z-10 pointer-events-auto animate-slide-up" onClick={e => e.stopPropagation()}>
               <div className="w-12 h-1 bg-stone-700 rounded-full mx-auto mb-6"></div>
               
               {(() => {
                  const detail = BENEFIT_DETAILS[showDetailKey];
                  // Find icon from plans
                  const benefitConfig = [...PLANS.granary.benefits, ...PLANS.homestead.benefits].find(b => b.key === showDetailKey);
                  const Icon = benefitConfig?.icon || Info;

                  return (
                     <>
                        <div className="flex items-start gap-5 mb-6">
                           <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center text-[#EBC089] border border-white/5 shrink-0">
                              <Icon size={32} />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold text-white mb-1">{detail?.title}</h3>
                              <p className="text-sm text-[#EBC089]/80 font-medium bg-[#EBC089]/10 px-2 py-0.5 rounded inline-block">
                                 {detail?.subtitle}
                              </p>
                           </div>
                        </div>

                        <div className="bg-stone-900/50 p-5 rounded-xl border border-white/5 mb-8">
                           <p className="text-sm text-stone-300 leading-relaxed font-serif">
                              {detail?.desc}
                           </p>
                        </div>
                     </>
                  )
               })()}

               <button onClick={() => setShowDetailKey(null)} className="w-full bg-stone-800 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-stone-700 transition-colors">
                  我知道了
               </button>
            </div>
         </div>
      )}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .pb-safe { padding-bottom: max(env(safe-area-inset-bottom, 20px), 20px); }
      `}</style>
    </>
  );
};

export default MembershipPaymentView;
