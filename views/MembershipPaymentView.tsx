
import React, { useState } from 'react';
import { ArrowLeft, Share2, Check, ShieldCheck, Crown, ShoppingBag, Truck, Gift, Info, Sprout, Mail, Tent, Box, Ticket, Leaf, Calendar, CheckCircle2, Sparkles, CreditCard, Coins, Percent, Award } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface MembershipPaymentViewProps {
  initialTierId?: 'granary' | 'homestead';
  onBack: () => void;
  isTabView?: boolean; // 是否作为tab页面显示（不显示返回按钮）
}

// Icons not in Lucide
const UsersIcon = ({ size, ...props }: any) => (
   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
   </svg>
);

// Benefits data
const ALL_BENEFITS = [
  { icon: ShoppingBag, label: '价格权益', key: 'price_off' },
  { icon: Gift, label: '生日礼', key: 'birthday' },
  { icon: CreditCard, label: '开卡礼', key: 'welcome' },
  { icon: Tent, label: '民宿权益', key: 'homestay' },
  { icon: Sparkles, label: '十二月令', key: 'season' },
  { icon: Box, label: '有机盲盒', key: 'blindbox' },
  { icon: Mail, label: '牛耕家书', key: 'letter' },
  { icon: Ticket, label: '免费体验', key: 'activity' },
  { icon: UsersIcon, label: '社群活动', key: 'community' },
];

// Benefits detail data
const BENEFITS_DB: Record<string, { icon: any, title: string, subtitle: string, desc: string }> = {
  'price_off': {
    icon: ShoppingBag,
    title: '价格权益',
    subtitle: '全场8折',
    desc: '尊享牛耕部落商城全场商品8折优惠（含新品），不限次数，自动抵扣。'
  },
  'birthday': {
    icon: Gift,
    title: '专属生日礼',
    subtitle: '长寿面+民宿券',
    desc: '会员生日当月，赠送定制"有机长寿面"礼盒一份，并获赠一张"民宿7折体验券"，可转赠亲友。'
  },
  'welcome': {
    icon: CreditCard,
    title: '开卡礼',
    subtitle: '证书+权益卡',
    desc: '订阅即送唯一编号的"梯田守护证书"（电子+实体收藏版）及实体会员权益卡。'
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
    desc: '每月随米箱赠送一份"来自大山的惊喜"，可能是野生蜂蜜、腊肉、手工草编或当季野菜。'
  },
  'letter': {
    icon: Mail,
    title: '牛耕家书',
    subtitle: '情感连接',
    desc: '每月一封来自村长的手写信（复印版），讲述农作物生长故事。回信可参与"免费民宿体验"抽奖。'
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

// 开卡活动数据
const OPENING_ACTIVITIES = {
  granary: [
    { icon: Coins, label: '开卡送积分', value: '500稻穗分', desc: '立即到账，可用于商城抵扣' },
    { icon: Percent, label: '新会员专享券', value: '3张优惠券', desc: '满200减50、满500减150、满1000减300' },
    { icon: Gift, label: '礼品卡', value: '价值200元', desc: '可转赠亲友，有效期1年' },
    { icon: Tent, label: '附加民宿权益', value: '7折体验券', desc: '开卡即送，限首次使用' },
  ],
  homestead: [
    { icon: Coins, label: '开卡送积分', value: '200稻穗分', desc: '立即到账，可用于商城抵扣' },
    { icon: Percent, label: '新会员专享券', value: '2张优惠券', desc: '满200减50、满500减150' },
    { icon: Gift, label: '礼品卡', value: '价值100元', desc: '可转赠亲友，有效期1年' },
  ]
};

const PLANS = {
  granary: {
    name: '守望 · 丰仓卡',
    themeColor: 'text-[#C99C63]',
    bgColor: 'bg-[#1c2e24]',
    accentColor: 'bg-[#C99C63]',
    borderColor: 'border-[#C99C63]',
    coreBenefit: '每月20斤有机米',
    coreBenefitDesc: '价值600元/月。分袋封装，随吃随拆。量大管饱，全家安享。',
    options: [
      { id: 'g-quarter', label: '季卡 (3期)', duration: '90天时长', price: 1440, original: 1800, save: 360, discount: '8折' },
      { id: 'g-year', label: '年卡 (12期)', duration: '365天时长', price: 5040, original: 7200, save: 2160, discount: '7折', recommend: true },
    ]
  },
  homestead: {
    name: '归田 · 家园卡',
    themeColor: 'text-plough-green-700',
    bgColor: 'bg-[#E8F5E9]',
    accentColor: 'bg-plough-green-600',
    borderColor: 'border-plough-green-600',
    coreBenefit: '每月10斤有机米',
    coreBenefitDesc: '价值300元/月。新鲜脱壳，真空锁鲜，满足三口之家日常所需。',
    options: [
      { id: 'h-quarter', label: '季卡 (3期)', duration: '90天时长', price: 720, original: 900, save: 180, discount: '8折' },
      { id: 'h-year', label: '年卡 (12期)', duration: '365天时长', price: 2520, original: 3600, save: 1080, discount: '7折', recommend: true },
    ]
  }
};

const MembershipPaymentView: React.FC<MembershipPaymentViewProps> = ({ initialTierId = 'homestead', onBack, isTabView = false }) => {
  const [activeTierId, setActiveTierId] = useState<'granary' | 'homestead'>(initialTierId);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
     initialTierId === 'granary' ? 'g-year' : 'h-year'
  );
  const [showBenefitDetail, setShowBenefitDetail] = useState<string | null>(null);

  const activeTier = PLANS[activeTierId];
  const selectedOption = activeTier.options.find(o => o.id === selectedOptionId) || activeTier.options[0];
  const isGranary = activeTierId === 'granary';
  const activeBenefitDetail = showBenefitDetail ? BENEFITS_DB[showBenefitDetail] : null;

  return (
    <>
      <div className="min-h-screen bg-[#F5F5F4] animate-fade-in font-sans flex flex-col relative">
        
        {/* Header */}
        {!isTabView && (
          <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
             <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-100">
                <ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} />
             </button>
             <h1 className="font-serif font-bold text-lg text-stone-900 flex-1 text-center pr-8">购卡续费</h1>
             <button className="p-1 rounded-full hover:bg-stone-100">
                <Share2 size={20} className="text-stone-600" />
             </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pb-32" style={{ paddingBottom: isTabView ? '140px' : '100px' }}>
         
         {/* Promotional Banner - 推广海报区域（仅tab页面显示） */}
         {isTabView && (
            <div className="relative w-full mb-0">
               {/* 海报头图 - 纯色区域设计 */}
               <div className="relative w-full h-72 overflow-hidden">
                  {/* 纯色渐变背景 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-plough-green-700 via-plough-green-800 to-plough-green-900">
                     {/* 装饰性圆形元素 */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                     <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                     <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/3 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  
                  {/* 文字内容 - 居中布局 */}
                  <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-white text-center">
                     <div className="flex items-center justify-center gap-3 mb-5">
                        <Crown size={32} className="text-yellow-300" fill="currentColor" />
                        <h2 className="text-3xl font-serif font-bold leading-tight">成为梯田守护人</h2>
                     </div>
                     
                     <div className="w-16 h-px bg-white/30 mb-5"></div>
                     
                     <p className="text-base text-white/95 mb-4 leading-relaxed font-serif max-w-md">
                        尊享专属权益，开启有机生活新篇章
                     </p>
                     
                     <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 font-serif">
                        <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">每月有机米配送</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">顺时而食指南</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">大山惊喜盲盒</span>
                     </div>
                  </div>
                  
                  {/* 底部渐变过渡 */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
               </div>
            </div>
         )}
         
         {/* 1. Benefits Pool - 权益池（覆盖头图一部分） */}
         <div className={`px-4 ${isTabView ? '-mt-16 relative z-20' : 'pt-6'} pb-4`}>
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-stone-100">
               <h3 className="text-xs font-bold text-stone-500 mb-3 uppercase tracking-wider">专享权益</h3>
               <div className="grid grid-cols-5 gap-4">
                  {ALL_BENEFITS.map((benefit) => {
                     const Icon = benefit.icon;
                     return (
                        <div 
                           key={benefit.key} 
                           className="flex flex-col items-center gap-2 cursor-pointer active:opacity-70 transition-opacity"
                           onClick={() => setShowBenefitDetail(benefit.key)}
                        >
                           <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200 hover:bg-stone-200 transition-colors">
                              <Icon size={20} className="text-stone-600" strokeWidth={1.5} />
                           </div>
                           <span className="text-[10px] text-stone-600 text-center leading-tight">{benefit.label}</span>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         {/* 会员卡片 - 包含标签、基础权益、付款方式、开卡活动、协议 */}
         <div className="px-4 mb-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-stone-100">
               {/* 1. 卡名标签 */}
               <div className="flex border-b border-stone-100">
                  <button 
                     onClick={() => setActiveTierId('homestead')}
                     className={`flex-1 py-4 text-sm font-bold relative transition-colors ${!isGranary ? 'text-plough-green-900' : 'text-stone-400'}`}
                  >
                     归田 · 家园卡
                     {!isGranary && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-plough-green-900 rounded-t-full"></div>}
                  </button>
                  <button 
                     onClick={() => setActiveTierId('granary')}
                     className={`flex-1 py-4 text-sm font-bold relative transition-colors ${isGranary ? 'text-[#B8860B]' : 'text-stone-400'}`}
                  >
                     守望 · 丰仓卡
                     {isGranary && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#B8860B] rounded-t-full"></div>}
                  </button>
               </div>

               <div className="p-5">
                  {/* 2. 基础权益 - 无背景色 */}
                  <div className="flex gap-4 mb-6">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isGranary ? 'bg-[#FFFBF0] border border-[#EBC089]/30' : 'bg-plough-green-50 border border-plough-green-200'}`}>
                        <Sprout size={24} className={isGranary ? 'text-[#B8860B]' : 'text-plough-green-700'} />
                     </div>
                     <div className="flex-1">
                        <h3 className={`text-sm font-bold mb-1 ${isGranary ? 'text-[#B8860B]' : 'text-plough-green-900'}`}>
                           {activeTier.coreBenefit}
                        </h3>
                        <p className={`text-xs leading-relaxed ${isGranary ? 'text-stone-600' : 'text-stone-600'}`}>
                           {activeTier.coreBenefitDesc}
                        </p>
                     </div>
                  </div>

                  {/* 3. 付款方式 - 小卡片 */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                     {activeTier.options.map((option) => {
                        const isSelected = selectedOptionId === option.id;
                        const borderColor = isSelected 
                           ? (isGranary ? 'border-[#B8860B] bg-[#FFFBF0]' : 'border-plough-green-600 bg-plough-green-50') 
                           : 'border-stone-200';
                        
                        return (
                           <div 
                              key={option.id}
                              onClick={() => setSelectedOptionId(option.id)}
                              className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${borderColor}`}
                           >
                              {option.recommend && (
                                 <div className="absolute -top-2.5 left-0 right-0 text-center">
                                    <span className={`text-[10px] text-white px-2 py-0.5 rounded-full ${isGranary ? 'bg-[#B8860B]' : 'bg-red-500'}`}>
                                      推荐
                                    </span>
                                 </div>
                              )}
                              
                              <h3 className="font-bold text-stone-800 text-sm mb-1">{option.label}</h3>
                              <p className="text-[10px] text-stone-400 mb-3">{option.duration}</p>
                              
                              <div className="flex items-baseline gap-0.5">
                                 <span className={`text-sm font-bold ${activeTier.themeColor}`}>¥</span>
                                 <span className={`text-2xl font-serif font-bold ${activeTier.themeColor}`}>{option.price}</span>
                              </div>
                              <p className="text-[10px] text-stone-400 line-through mt-0.5">原价 ¥{option.original}</p>
                              
                              <div className="flex items-center gap-1 mt-2">
                                 <span className={`text-[9px] px-1 py-0.5 rounded border ${isGranary ? 'border-[#EBC089]/30 text-[#EBC089]' : 'border-plough-green-500/30 text-plough-green-400'}`}>
                                   立省¥{option.save}
                                 </span>
                                 <span className="text-[9px] text-stone-400">{option.discount}</span>
                              </div>
                           </div>
                        );
                     })}
                  </div>

                  {/* 4. 开卡活动 - 卡片 */}
                  <div className={`mb-6 rounded-xl p-4 ${isGranary ? 'bg-[#FFFBF0] border border-[#EBC089]/20' : 'bg-plough-green-50/50 border border-plough-green-200'}`}>
                     <div className="flex items-center gap-2 mb-4">
                        <Award size={16} className={isGranary ? 'text-[#B8860B]' : 'text-plough-green-700'} />
                        <span className={`text-sm font-bold ${isGranary ? 'text-[#B8860B]' : 'text-plough-green-800'}`}>
                           开卡活动
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">限时</span>
                     </div>
                     
                     <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {OPENING_ACTIVITIES[activeTierId].map((activity, index) => {
                           const Icon = activity.icon;
                           return (
                              <div 
                                 key={index}
                                 className={`flex-shrink-0 w-28 aspect-square rounded-xl p-3 flex flex-col items-center justify-between ${isGranary ? 'bg-white/50 border border-[#EBC089]/20' : 'bg-white border border-plough-green-200'}`}
                              >
                                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isGranary ? 'bg-[#EBC089]/20 text-[#B8860B]' : 'bg-plough-green-100 text-plough-green-700'}`}>
                                    <Icon size={24} strokeWidth={2} />
                                 </div>
                                 <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
                                    <span className="text-[10px] font-bold text-stone-800 mb-1 leading-tight">{activity.label}</span>
                                    <span className={`text-xs font-bold mb-1 ${isGranary ? 'text-[#B8860B]' : 'text-plough-green-700'}`}>
                                       {activity.value}
                                    </span>
                                    <p className="text-[9px] text-stone-500 leading-tight line-clamp-2">{activity.desc}</p>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>

                  {/* 5. 签署协议文字 */}
                  <div className="flex items-start gap-2">
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

        </div>
      </div>

      {/* Bottom Action Bar - 立即购买按钮 - Fixed above TabBar (tab页面) or at bottom (其他页面) */}
      <div className="fixed left-0 right-0 bg-white border-t border-stone-100 p-3 pb-safe z-[100] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]" style={{ maxWidth: '448px', margin: '0 auto', bottom: isTabView ? '66px' : '0' }}>
         <div className="flex gap-3">
            <div className="flex-1 bg-stone-900 rounded-full flex items-center justify-between px-6 py-3 text-white">
               <span className="text-sm">支付 <span className="font-bold text-lg">¥ {selectedOption.price}</span></span>
               <span className="text-xs text-stone-400 ml-2 line-through">¥{selectedOption.original}</span>
            </div>
            <button className={`px-8 py-3 rounded-full font-bold text-sm ${isGranary ? 'bg-[#C99C63] text-white' : 'bg-plough-green-600 text-white'}`}>
               立即购买
            </button>
         </div>
      </div>

      {/* Benefit Detail Modal */}
      {showBenefitDetail && activeBenefitDetail && (
         <div className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none">
            {/* Backdrop */}
            <div 
               className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" 
               onClick={() => setShowBenefitDetail(null)}
            ></div>
            
            {/* Modal Content */}
            <div 
               className="bg-white w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl border-t border-stone-100 z-10 pointer-events-auto animate-slide-up" 
               onClick={e => e.stopPropagation()}
            >
               <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-6"></div>
               
               <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-600 border border-stone-200 shrink-0">
                     <activeBenefitDetail.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-stone-900 mb-1">{activeBenefitDetail.title}</h3>
                     <p className="text-sm text-plough-green-600 font-medium bg-plough-green-50 px-2 py-0.5 rounded inline-block">
                        {activeBenefitDetail.subtitle}
                     </p>
                  </div>
               </div>

               <div className="bg-stone-50 p-5 rounded-xl border border-stone-100 mb-8">
                  <p className="text-sm text-stone-700 leading-relaxed font-serif">
                     {activeBenefitDetail.desc}
                  </p>
               </div>

               <button 
                  onClick={() => setShowBenefitDetail(null)} 
                  className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors"
               >
                  我知道了
               </button>
            </div>
         </div>
      )}

      <style>{`
        .pb-safe { padding-bottom: max(env(safe-area-inset-bottom, 20px), 20px); }
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

export default MembershipPaymentView;
