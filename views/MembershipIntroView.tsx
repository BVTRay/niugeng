
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Share2, ChevronRight, Crown, Gift, Tent, Mail, ShoppingBag, Sprout, CreditCard, Sparkles, Box, Ticket, Leaf, Calendar, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

// Icons not in Lucide
const CakeIcon = ({ size, ...props }: any) => (
   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4 2 2.5-2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v2" />
      <path d="M12 8v2" />
      <path d="M17 8v2" />
      <path d="M7 4h.01" />
      <path d="M12 4h.01" />
      <path d="M17 4h.01" />
   </svg>
);

const UsersIcon = ({ size, ...props }: any) => (
   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
   </svg>
);

interface MembershipIntroViewProps {
  onBack: () => void;
  onNavigate?: (type: string) => void;
}

// Data Definition for Tiers
const TIERS = [
  {
    id: 'granary',
    name: '守望 · 丰仓年卡',
    sub: '卓越会员 · 深度共生',
    price: '5040',
    unit: '/年',
    theme: 'gold',
    coreBenefit: { title: '每月20斤有机米', sub: '分袋装 · 价值¥600/月' },
    benefits: ['price_off', 'birthday', 'welcome', 'homestay', 'season', 'blindbox', 'letter', 'activity', 'community']
  },
  {
    id: 'homestead',
    name: '归田 · 家园季卡',
    sub: '基础会员 · 尝鲜体验',
    price: '720',
    unit: '/季',
    theme: 'green',
    coreBenefit: { title: '每月10斤有机米', sub: '整袋装 · 价值¥300/月' },
    benefits: ['welcome', 'homestay', 'season', 'blindbox', 'letter', 'community']
  }
];

// Data Definition for Benefits (Restored)
const BENEFITS_DB: Record<string, { icon: any, title: string, subtitle: string, desc: string }> = {
  'price_off': {
    icon: ShoppingBag,
    title: '价格权益',
    subtitle: '全场8折',
    desc: '尊享牛耕部落商城全场商品8折优惠（含新品），不限次数，自动抵扣。'
  },
  'birthday': {
    icon: CakeIcon,
    title: '专属生日礼',
    subtitle: '长寿面+民宿券',
    desc: '会员生日当月，赠送定制“有机长寿面”礼盒一份，并获赠一张“民宿7折体验券”，可转赠亲友。'
  },
  'welcome': {
    icon: CreditCard,
    title: '开卡礼',
    subtitle: '证书+权益卡',
    desc: '订阅即送唯一编号的“梯田守护证书”（电子+实体收藏版）及实体会员权益卡。'
  },
  'homestay': {
    icon: Tent,
    title: '民宿权益',
    subtitle: '折扣+优先权',
    desc: '全年入住牛耕部落梯田民宿享专属折扣（丰仓卡8折/家园卡9折），旺季拥有提前7天优先预订权。'
  },
  'season': {
    icon: Sparkles,
    title: '十二月令',
    subtitle: '饮食指南',
    desc: '根据当月配送米种（如春台米、小满米），随箱附赠节气饮食指南卡片，教您顺时而食。'
  },
  'blindbox': {
    icon: Box,
    title: '有机盲盒',
    subtitle: '大山的惊喜',
    desc: '每月随米箱赠送一份“来自大山的惊喜”，可能是野生蜂蜜、腊肉、手工草编或当季野菜。'
  },
  'letter': {
    icon: Mail,
    title: '牛耕家书',
    subtitle: '情感连接',
    desc: '每月一封来自村长的手写信（复印版），讲述农作物生长故事。回信可参与“免费民宿体验”抽奖。'
  },
  'activity': {
    icon: Ticket,
    title: '免费体验',
    subtitle: '捉鱼/露营',
    desc: '会员本人可免费参与梯田捉鱼、古法耕作体验、星空露营（需自带装备）等农耕活动。'
  },
  'community': {
    icon: UsersIcon,
    title: '社群活动',
    subtitle: '溯源/沙龙',
    desc: '优先免费受邀参加每年两次的大型溯源之旅（春耕节/秋收节）及城市线下沙龙。'
  }
};

const EXCLUSIVE_KEYS = ['price_off', 'birthday'];

const MembershipIntroView: React.FC<MembershipIntroViewProps> = ({ onBack, onNavigate }) => {
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const activeTier = TIERS[activeTierIndex];
  const activeBenefitDetail = showDetail ? BENEFITS_DB[showDetail] : null;

  // Auto-play Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      
      const nextIndex = (activeTierIndex + 1) % TIERS.length;
      const container = scrollRef.current;
      const card = container.children[nextIndex] as HTMLElement;
      
      if (card) {
         // Scroll to the card (subtracting padding-left: 24px/1.5rem to align)
         container.scrollTo({
            left: card.offsetLeft - 24,
            behavior: 'smooth'
         });
      }
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [activeTierIndex, isPaused]);

  // Handle scroll to detect active card
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // Calculate center of the container
    const center = container.scrollLeft + (container.clientWidth / 2);
    
    let closestIndex = activeTierIndex;
    let minDist = Infinity;

    // Find which card is closest to the center
    Array.from(container.children).forEach((child, index) => {
       const el = child as HTMLElement;
       const childCenter = el.offsetLeft + (el.clientWidth / 2);
       const dist = Math.abs(childCenter - center);
       
       if (dist < minDist) {
          minDist = dist;
          closestIndex = index;
       }
    });

    if (closestIndex !== activeTierIndex) {
       setActiveTierIndex(closestIndex);
    }
  };

  const handleManualSelect = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - 24,
          behavior: 'smooth'
        });
      }
    }
  };

  const handlePayment = (tier: 'granary' | 'homestead') => {
    if (onNavigate) {
       onNavigate(tier === 'granary' ? 'membership-payment-granary' : 'membership-payment-homestead');
    }
  };

  const handleCardInteraction = (index: number, tierId: string) => {
     // If the clicked card is already centered, navigate to payment page
     if (index === activeTierIndex) {
        handlePayment(tierId as 'granary' | 'homestead');
     } else {
        // Otherwise, scroll to it
        handleManualSelect(index);
     }
  };

  // Render Grid Helper
  const renderBenefitsGrid = (benefits: string[], isExclusive: boolean = false) => (
    <div className="grid grid-cols-4 gap-y-6 gap-x-3">
      {benefits.map(benefitKey => {
         const benefit = BENEFITS_DB[benefitKey];
         const containerStyle = isExclusive 
            ? "bg-gradient-to-br from-[#4A3010] to-[#2A1A05] border-[#EBC089]/30 text-[#EBC089] shadow-[0_4px_12px_rgba(235,192,137,0.1)]"
            : "bg-stone-800 text-white/80 border-white/5 hover:bg-stone-700 hover:text-white";
         
         const titleStyle = isExclusive ? "text-[#EBC089]" : "text-stone-200";

         return (
            <div key={benefitKey} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setShowDetail(benefitKey)}>
               <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border active:scale-95 group-hover:scale-105 ${containerStyle}`}>
                  <benefit.icon size={20} strokeWidth={1.5} />
               </div>
               <div className="text-center w-full">
                  <p className={`text-[10px] font-medium leading-tight mb-0.5 truncate ${titleStyle}`}>{benefit.title}</p>
                  <p className="text-[8px] text-stone-500 scale-90 truncate">{benefit.subtitle}</p>
               </div>
            </div>
         );
      })}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#111] animate-fade-in relative font-sans text-white pb-10">
      
         {/* Header */}
         <div className="flex justify-between items-center p-4 sticky top-0 z-40 bg-[#111]/90 backdrop-blur-md border-b border-white/5">
            <button onClick={onBack} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
               <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-bold font-serif tracking-wide opacity-90">会员中心</h1>
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
               <Share2 size={20} />
            </button>
         </div>

         <div className="space-y-8 mt-4">
            
            {/* 1. Carousel */}
            <div 
               ref={scrollRef}
               onScroll={handleScroll}
               onTouchStart={() => setIsPaused(true)}
               onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)} // Resume after delay
               onMouseDown={() => setIsPaused(true)}
               onMouseUp={() => setIsPaused(false)}
               className="overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 pb-2 no-scrollbar"
            >
               {TIERS.map((tier, index) => {
                  const isActive = index === activeTierIndex;
                  const isGold = tier.theme === 'gold';
                  
                  return (
                     <div 
                        key={tier.id}
                        onClick={() => handleCardInteraction(index, tier.id)}
                        className={`min-w-[100%] snap-center h-48 rounded-3xl relative overflow-hidden transition-all duration-300 border cursor-pointer ${isActive ? 'border-white/50 scale-100 shadow-2xl' : 'border-transparent scale-95 opacity-60'}`}
                     >
                        {/* Backgrounds */}
                        {isGold ? (
                           <>
                              <div className="absolute inset-0 bg-gradient-to-br from-[#EBC089] via-[#C99C63] to-[#8C6239]"></div>
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>
                           </>
                        ) : (
                           <>
                              <div className="absolute inset-0 bg-[#E8F5E9]"></div>
                              <BrandLogo className="absolute -right-8 -bottom-8 w-40 h-40 text-plough-green-200 opacity-50" />
                           </>
                        )}

                        {/* Content */}
                        <div className={`relative z-10 p-6 h-full flex flex-col justify-between ${isGold ? 'text-[#4A3010]' : 'text-plough-green-900'}`}>
                           <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                 <BrandLogo className={`w-6 h-6 ${isGold ? 'text-[#4A3010]' : 'text-plough-green-800'}`} />
                                 <span className="text-xs font-bold tracking-widest uppercase opacity-80">Plough Tribe</span>
                              </div>
                              {isActive && <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                 立即购买 <ChevronRight size={10} />
                              </div>}
                           </div>
                           <div>
                              <h3 className="text-2xl font-serif font-black tracking-wide mb-1">{tier.name}</h3>
                              <p className="text-xs font-serif opacity-80">{tier.sub}</p>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>

            {/* 2. Core Benefit Banner (Current Tier) */}
            <div className="px-6 transition-all duration-300">
               <div className="bg-stone-900 border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-plough-green-900 rounded-xl flex items-center justify-center text-plough-green-400">
                        <Sprout size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-base text-white">{activeTier.coreBenefit.title}</h3>
                        <p className="text-xs text-stone-400 mt-0.5">{activeTier.coreBenefit.sub}</p>
                     </div>
                  </div>
                  <div className="text-stone-500">
                     <ChevronRight size={20} />
                  </div>
               </div>
            </div>

            {/* 3. Benefits Grid (Current Tier - Dynamic) */}
            <div className="px-6 space-y-6 min-h-[300px]">
               {activeTier.theme === 'gold' ? (
                  <div className="animate-fade-in">
                     <div>
                        <h3 className="text-xs font-bold text-[#EBC089] mb-4 flex items-center gap-2 uppercase tracking-wider">
                           <Crown size={12} fill="currentColor" /> 
                           丰仓卡尊享权益
                        </h3>
                        {renderBenefitsGrid(
                           activeTier.benefits.filter(k => EXCLUSIVE_KEYS.includes(k)),
                           true
                        )}
                     </div>
                     <div className="border-t border-white/5 pt-6 mt-6">
                        <h3 className="text-xs font-bold text-stone-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
                           <Leaf size={12} />
                           会员基础权益
                        </h3>
                        {renderBenefitsGrid(
                           activeTier.benefits.filter(k => !EXCLUSIVE_KEYS.includes(k)),
                           false
                        )}
                     </div>
                  </div>
               ) : (
                  <div className="animate-fade-in">
                     <h3 className="text-xs font-bold text-plough-green-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <Leaf size={12} /> 
                        家园卡权益
                     </h3>
                     {renderBenefitsGrid(activeTier.benefits, false)}
                  </div>
               )}
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 px-6 py-4">
               <div className="h-px bg-white/10 flex-1"></div>
               <span className="text-xs text-stone-500 font-serif italic">会员体系详情 · 方案一览</span>
               <div className="h-px bg-white/10 flex-1"></div>
            </div>

            {/* 4. Long Details Sections */}
            <div className="px-4 space-y-8 pb-10">
               
               {/* --- Section A: Homestead Card (Green) --- */}
               <div className="bg-[#1a2e25] rounded-3xl overflow-hidden border border-plough-green-800/50">
                  <div className="p-5 bg-plough-green-900/50 border-b border-plough-green-800/50">
                     <div className="flex items-center gap-2 mb-1">
                        <Leaf size={18} className="text-plough-green-400" />
                        <h2 className="text-lg font-bold text-plough-green-100">归田 · 家园卡</h2>
                     </div>
                     <p className="text-xs text-plough-green-400/80 pl-6">适配轻量需求的家庭</p>
                  </div>
                  
                  <div className="p-5 space-y-5">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-plough-green-900 rounded-xl flex items-center justify-center shrink-0 border border-plough-green-700">
                           <Sprout size={24} className="text-plough-green-400" />
                        </div>
                        <div>
                           <h3 className="text-sm font-bold text-white mb-1">每月10斤有机米</h3>
                           <p className="text-xs text-stone-400 leading-relaxed">
                              价值300元/月。新鲜脱壳，真空锁鲜，满足三口之家日常所需。
                           </p>
                        </div>
                     </div>

                     {/* Pricing Cards */}
                     <div className="grid grid-cols-2 gap-3">
                        <PricingCard 
                           label="季卡 (3期)" 
                           price="720" 
                           original="900" 
                           save="180" 
                           discount="8折"
                           onClick={() => handlePayment('homestead')}
                        />
                        <PricingCard 
                           label="年卡 (12期)" 
                           price="2520" 
                           original="3600" 
                           save="1080" 
                           discount="7折"
                           isRecommended
                           onClick={() => handlePayment('homestead')}
                        />
                     </div>
                  </div>
               </div>

               {/* --- Section B: Granary Card (Gold) --- */}
               <div className="bg-gradient-to-b from-[#2A1A05] to-[#1a1000] rounded-3xl overflow-hidden border border-[#EBC089]/20">
                  <div className="p-5 bg-[#EBC089]/10 border-b border-[#EBC089]/10">
                     <div className="flex items-center gap-2 mb-1">
                        <Crown size={18} className="text-[#EBC089]" fill="currentColor" />
                        <h2 className="text-lg font-bold text-[#EBC089]">守望 · 丰仓卡</h2>
                     </div>
                     <p className="text-xs text-[#EBC089]/60 pl-6">深度共生 · 大需求量的老客户</p>
                  </div>
                  
                  <div className="p-5 space-y-6">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-[#4A3010] rounded-xl flex items-center justify-center shrink-0 border border-[#EBC089]/30">
                           <ShoppingBag size={24} className="text-[#EBC089]" />
                        </div>
                        <div>
                           <h3 className="text-sm font-bold text-[#EBC089] mb-1">每月20斤有机米</h3>
                           <p className="text-xs text-[#EBC089]/70 leading-relaxed">
                              价值600元/月。分袋封装，随吃随拆。量大管饱，全家安享。
                           </p>
                        </div>
                     </div>

                     {/* Exclusive Privileges List */}
                     <div className="bg-[#EBC089]/5 rounded-xl p-4 border border-[#EBC089]/10 space-y-3">
                        <h4 className="text-xs font-bold text-[#EBC089] mb-2 uppercase tracking-wider opacity-80">丰仓卡尊享特权</h4>
                        <div className="flex items-start gap-2">
                           <div className="mt-0.5"><CheckCircle2 size={12} className="text-[#EBC089]" /></div>
                           <div>
                              <span className="text-xs font-bold text-white">价格权益：</span>
                              <span className="text-xs text-stone-400">商城全场8折优惠</span>
                           </div>
                        </div>
                        <div className="flex items-start gap-2">
                           <div className="mt-0.5"><CheckCircle2 size={12} className="text-[#EBC089]" /></div>
                           <div>
                              <span className="text-xs font-bold text-white">专属生日礼：</span>
                              <span className="text-xs text-stone-400">生日月赠送“长寿面” + 7折民宿券</span>
                           </div>
                        </div>
                     </div>

                     {/* Pricing Cards */}
                     <div className="grid grid-cols-2 gap-3">
                        <PricingCard 
                           label="季卡 (3期)" 
                           price="1440" 
                           original="1800" 
                           save="360" 
                           discount="8折"
                           theme="gold"
                           onClick={() => handlePayment('granary')}
                        />
                        <PricingCard 
                           label="年卡 (12期)" 
                           price="5040" 
                           original="7200" 
                           save="2160" 
                           discount="7折"
                           isRecommended
                           theme="gold"
                           onClick={() => handlePayment('granary')}
                        />
                     </div>
                  </div>
               </div>

               {/* --- Section C: Common Benefits --- */}
               <div className="py-4">
                  <div className="flex items-center justify-center gap-3 mb-6">
                     <div className="h-px w-12 bg-white/10"></div>
                     <h2 className="text-sm font-bold text-stone-300">通用附加权益</h2>
                     <div className="h-px w-12 bg-white/10"></div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                     <CommonBenefitItem 
                        icon={CreditCard} 
                        title="开卡礼" 
                        desc="唯一编号实体会员卡 + 梯田守护证书 (电子+实体版)"
                     />
                     <CommonBenefitItem 
                        icon={Tent} 
                        title="民宿权益卡" 
                        desc="开卡即送专属权益卡，享7折房价 + 优先预订权"
                     />
                     <CommonBenefitItem 
                        icon={Calendar} 
                        title="十二月令主题关怀" 
                        desc="根据当月配送米种，附赠节气饮食指南与月令卡"
                     />
                     <CommonBenefitItem 
                        icon={Box} 
                        title="有机盲盒计划" 
                        desc="每月随米赠送惊喜（新品、定制卡片、收藏品等）"
                     />
                     <CommonBenefitItem 
                        icon={Mail} 
                        title="牛耕家书" 
                        desc="每月一封专属家书，回信可抽免费民宿体验"
                     />
                     <CommonBenefitItem 
                        icon={Ticket} 
                        title="免费体验活动" 
                        desc="梯田捉鱼、古法耕作、星空露营位免费体验"
                     />
                     <CommonBenefitItem 
                        icon={UsersIcon} 
                        title="社群活动" 
                        desc="免费参与每年两次溯源之旅 & 城市沙龙"
                     />
                  </div>
               </div>
               
               <div className="text-center pb-8">
                  <p className="text-[10px] text-stone-600 font-serif">
                     * 权益最终解释权归牛耕部落所有
                  </p>
               </div>
            </div>

         </div>
      </div>

      {/* Detail Modal - Outside Animated Container */}
      {showDetail && activeBenefitDetail && (
         <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setShowDetail(null)}></div>
            
            {/* Modal Content */}
            <div className="bg-[#1c1c1e] w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl border-t border-white/10 z-10 pointer-events-auto animate-slide-up" onClick={e => e.stopPropagation()}>
               <div className="w-12 h-1 bg-stone-700 rounded-full mx-auto mb-6"></div>
               
               <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center text-yellow-500 border border-white/5 shrink-0">
                     <activeBenefitDetail.icon size={32} />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-1">{activeBenefitDetail.title}</h3>
                     <p className="text-sm text-yellow-500/80 font-medium bg-yellow-500/10 px-2 py-0.5 rounded inline-block">
                        {activeBenefitDetail.subtitle}
                     </p>
                  </div>
               </div>

               <div className="bg-stone-900/50 p-5 rounded-xl border border-white/5 mb-8">
                  <p className="text-sm text-stone-300 leading-relaxed font-serif">
                     {activeBenefitDetail.desc}
                  </p>
               </div>

               <button onClick={() => setShowDetail(null)} className="w-full bg-stone-800 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-stone-700 transition-colors">
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
      `}</style>
    </>
  );
};

// --- Sub Components ---

const PricingCard = ({ label, price, original, save, discount, isRecommended, theme = 'green', onClick }: any) => {
   const isGold = theme === 'gold';
   const borderColor = isGold ? 'border-[#EBC089]' : 'border-plough-green-500';
   const btnBg = isGold ? 'bg-[#EBC089] text-[#4A3010]' : 'bg-plough-green-600 text-white';
   const textAccent = isGold ? 'text-[#EBC089]' : 'text-plough-green-400';
   const bg = isGold ? 'bg-[#EBC089]/5' : 'bg-plough-green-900/40';

   return (
      <div 
         onClick={onClick}
         className={`relative p-3 rounded-xl border ${isRecommended ? borderColor : 'border-white/10'} ${bg} flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform`}
      >
         {isRecommended && (
            <div className={`absolute -top-2.5 px-2 py-0.5 rounded text-[9px] font-bold ${isGold ? 'bg-[#EBC089] text-[#4A3010]' : 'bg-plough-green-500 text-white'}`}>
               推荐
            </div>
         )}
         
         <div className="text-xs text-stone-300 font-bold mb-1">{label}</div>
         <div className={`text-xl font-serif font-bold ${textAccent} mb-0.5`}>¥{price}</div>
         <div className="text-[10px] text-stone-500 line-through mb-1">原价 ¥{original}</div>
         
         <div className="flex items-center gap-1 mb-3">
            <span className={`text-[9px] px-1 py-0.5 rounded border ${isGold ? 'border-[#EBC089]/30 text-[#EBC089]' : 'border-plough-green-500/30 text-plough-green-400'}`}>
               立省¥{save}
            </span>
            <span className="text-[9px] text-stone-400">{discount}</span>
         </div>

         <button className={`w-full py-1.5 rounded-lg text-xs font-bold ${btnBg}`}>
            立即开通
         </button>
      </div>
   );
};

const CommonBenefitItem = ({ icon: Icon, title, desc }: any) => (
   <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex gap-4 items-start">
      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-stone-300 shrink-0">
         <Icon size={20} />
      </div>
      <div>
         <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
         <p className="text-xs text-stone-400 leading-relaxed">{desc}</p>
      </div>
   </div>
);

export default MembershipIntroView;
