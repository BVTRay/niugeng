
import React, { useState } from 'react';
import { MOCK_ROOMS } from '../constants';
import { ArrowRight, Bell, ChevronRight, Send, Sprout, Utensils, Sun } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface HomestayViewProps {
  onNavigate: (type: string, id?: number) => void;
}

const EVENTS = [
  {
    id: 1,
    month: 'MAY',
    day: '01',
    type: '溯源之旅',
    title: '春耕节 · 秧苗插种',
    desc: '邀请会员家庭亲手插秧，体验"汗滴禾下土"。',
    color: 'bg-plough-green-50 text-plough-green-800',
    iconColor: 'bg-plough-green-100'
  },
  {
    id: 2,
    month: 'OCT',
    day: '01',
    type: '溯源之旅',
    title: '秋收节 · 稻谷归仓',
    desc: '割稻谷、打谷子，吃长桌宴，喝拦门酒。',
    color: 'bg-orange-50 text-orange-800',
    iconColor: 'bg-orange-100'
  },
  {
    id: 3,
    month: 'SALON',
    day: 'City',
    type: '城市沙龙',
    title: '有机生活品鉴会',
    desc: '教大家怎么用有机米煮出一锅好粥，搭配养生食材。',
    color: 'bg-stone-100 text-stone-800',
    iconColor: 'bg-stone-200'
  },
  {
    id: 4,
    month: 'SALON',
    day: 'City',
    type: '城市沙龙',
    title: '中医食疗讲座',
    desc: '结合贵州大山药食同源概念，讲解节气养生。',
    color: 'bg-teal-50 text-teal-800',
    iconColor: 'bg-teal-100'
  }
];

const HomestayView: React.FC<HomestayViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'letter' | 'homestay'>('letter');

  return (
    <div className="pb-32 min-h-screen bg-[#FDFCF8] animate-fade-in relative">
       {/* Activity Notification Bar - Sticky Top */}
       <div className="bg-white/60 backdrop-blur-md border-b border-white/40 pt-4 pb-4 shadow-sm relative z-20 sticky top-0">
          {/* Section Header */}
          <div className="px-4 mb-3 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="bg-red-50 p-1 rounded-full animate-pulse">
                   <Bell size={12} className="text-red-500" fill="currentColor" />
                </div>
                <h3 className="text-xs font-serif font-bold text-stone-800">活动通知</h3>
             </div>
             <span className="text-[10px] text-stone-400 font-serif italic pr-1">向左滑动查看更多</span>
          </div>

          {/* Horizontal Scroll Area */}
          <div className="flex overflow-x-auto px-4 gap-3 no-scrollbar snap-x snap-mandatory">
             {EVENTS.map((evt) => (
                <div key={evt.id} className="min-w-[85%] snap-center bg-white rounded-xl p-3 shadow-sm border border-stone-100 flex gap-3 relative overflow-hidden group">
                   {/* Left Date/Icon Box */}
                   <div className={`w-12 h-12 rounded-lg ${evt.color} flex flex-col items-center justify-center shrink-0 border border-black/5`}>
                      <span className="text-[9px] font-bold uppercase tracking-tighter opacity-70">{evt.month}</span>
                      <span className="text-sm font-serif font-bold leading-none">{evt.day}</span>
                   </div>

                   {/* Right Content */}
                   <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-0.5">
                         <span className={`text-[9px] px-1.5 py-0.5 rounded-sm ${evt.iconColor} ${evt.color.split(' ')[1]} font-bold`}>
                            {evt.type}
                         </span>
                         <h4 className="text-sm font-serif font-bold text-stone-900 truncate">{evt.title}</h4>
                      </div>
                      <p className="text-[10px] text-stone-500 line-clamp-1 leading-relaxed">
                         {evt.desc}
                      </p>
                   </div>
                   
                   {/* Arrow Indicator */}
                   <div className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-300">
                       <ChevronRight size={14} />
                   </div>
                </div>
             ))}
             {/* Spacer for right padding */}
             <div className="w-2 shrink-0"></div>
          </div>
       </div>

       {/* Tabs */}
       <div className="bg-white border-b border-stone-100 sticky top-[120px] z-10">
          <div className="flex">
             <button 
                onClick={() => setActiveTab('letter')}
                className={`flex-1 py-4 text-sm font-bold relative transition-colors ${activeTab === 'letter' ? 'text-plough-green-900' : 'text-stone-400'}`}
             >
                家书
                {activeTab === 'letter' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-plough-green-900 rounded-t-full"></div>}
             </button>
             <button 
                onClick={() => setActiveTab('homestay')}
                className={`flex-1 py-4 text-sm font-bold relative transition-colors ${activeTab === 'homestay' ? 'text-plough-green-900' : 'text-stone-400'}`}
             >
                归野
                {activeTab === 'homestay' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-plough-green-900 rounded-t-full"></div>}
             </button>
          </div>
       </div>

       {/* Tab Content */}
       <div className="pt-6">
          {activeTab === 'letter' ? (
             /* Letter Tab Content */
             <div className="flex flex-col bg-[#EBEAE5] relative min-h-full">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

                <div className="flex-1 pb-20 relative z-10">
                   {/* Paper Card (Original Letter) */}
                   <div className="bg-[#FDFCF8] shadow-lg rounded-sm p-8 max-w-sm mx-auto min-h-[500px] relative mt-6 mb-6 animate-fade-in border border-[#e5e4df]">
                      {/* Stamp/Logo */}
                      <div className="absolute top-8 right-8 opacity-20 rotate-12">
                         <BrandLogo className="w-16 h-16 text-plough-green-900" />
                      </div>

                      <div className="text-center mb-10">
                        <p className="text-xs text-stone-400 font-serif tracking-widest uppercase mb-2">The Plough Tribe</p>
                        <p className="text-sm text-plough-green-800 font-serif font-bold">2025年 · 谷雨</p>
                        <div className="w-8 h-px bg-stone-200 mx-auto mt-4"></div>
                      </div>
                      
                      <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center tracking-wide">见信如晤</h2>
                      
                      <div className="text-stone-700 leading-8 text-justify font-serif space-y-6 text-sm">
                        <p>亲爱的守护人：</p>
                        <p>
                          这个月黎平雨水很多，我们的老牛'大黄'在耕作时滑了一跤，好在没事。它抖了抖身上的泥，又继续埋头向前。
                        </p>
                        <p>
                          秧苗已经长到膝盖高了，这是大自然最旺盛的生命力，希望能传递给你。看着它们在风中起舞，就觉得所有的辛苦都是值得的。
                        </p>
                        <p>
                          期待秋收时，你能回家看看。尝尝今年的新米，听听田间的蛙鸣。
                        </p>
                      </div>

                      <div className="mt-16 text-right font-serif">
                        <div className="inline-block text-center">
                            <p className="text-plough-green-900 font-bold mb-1">牛耕部落村长</p>
                            <p className="text-[10px] text-stone-400 font-sans tracking-wider uppercase">Village Chief</p>
                        </div>
                      </div>
                   </div>

                   {/* Organic Guide Card */}
                   <div className="bg-white shadow-sm rounded-2xl p-6 max-w-sm mx-auto mb-20 border border-stone-100 relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      {/* Background Decor */}
                      <div className="absolute -top-6 -right-6 text-plough-green-50 opacity-80">
                          <Sprout size={100} strokeWidth={0.5} />
                      </div>

                      {/* Header */}
                      <div className="flex items-center gap-2 mb-6 relative z-10">
                           <div className="bg-plough-green-100 text-plough-green-800 p-1.5 rounded-lg shadow-sm">
                               <Sprout size={16} />
                           </div>
                           <span className="text-xs font-bold tracking-widest text-plough-green-900 uppercase">本月有机指南</span>
                           <div className="h-px bg-stone-100 flex-1 ml-2"></div>
                      </div>

                      {/* Title */}
                      <div className="mb-6 relative z-10">
                          <span className="text-xs text-stone-400 font-serif block mb-1">戌月 · 深秋</span>
                          <h3 className="text-xl font-serif font-bold text-stone-900 leading-tight">
                              九月 —— <span className="text-plough-green-800">霜染·凝香米</span>
                          </h3>
                      </div>

                      {/* Recipe Section */}
                      <div className="mb-6 relative z-10">
                          <div className="flex items-center gap-2 mb-3">
                              <Utensils size={14} className="text-stone-400" />
                              <h4 className="font-serif font-bold text-stone-800 text-sm">养生吃法：山药红枣糕/饭</h4>
                          </div>
                          <div className="pl-6 border-l border-stone-100 ml-1.5 space-y-3">
                              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                                  <span className="text-plough-green-700 font-bold bg-plough-green-50 px-1 rounded mr-1">做法</span>
                                  铁棍山药切丁，红枣去核，和米饭一起焖熟。
                              </p>
                              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100/50">
                                  <p className="text-[10px] text-stone-500 font-serif leading-relaxed">
                                      <span className="font-bold text-stone-600">原理：</span>
                                      深秋（寒露、霜降）要注意脾胃保暖。山药色白入肺，健脾益胃；红枣补气，为过冬做准备。
                                  </p>
                              </div>
                          </div>
                      </div>

                      {/* Meaning Section */}
                      <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                              <Sun size={14} className="text-orange-400" />
                              <h4 className="font-serif font-bold text-stone-800 text-sm">美好寓意："蒸蒸日上"</h4>
                          </div>
                          <div className="pl-6 ml-1.5">
                               <p className="text-xs text-stone-500 font-serif leading-relaxed text-justify bg-orange-50/50 p-2 rounded-lg text-stone-600">
                                  山药又名"淮山"，寓意怀抱江山，事业稳固；红枣寓意早早丰收。
                               </p>
                          </div>
                      </div>
                   </div>
                </div>

                {/* Footer Input - Fixed Reply Button */}
                <div className="fixed bottom-0 left-0 right-0 bg-[#FDFCF8] border-t border-stone-200 p-3 pb-safe z-50 flex gap-3 items-center shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
                  <div className="flex-1 bg-stone-100 rounded-full px-4 py-2.5 flex items-center">
                      <input 
                        type="text" 
                        placeholder="给部落回信..." 
                        className="flex-1 bg-transparent text-sm outline-none text-stone-800 placeholder-stone-400 font-serif"
                      />
                  </div>
                  <button className="p-2.5 bg-plough-green-900 text-white rounded-full shadow-lg shadow-plough-green-900/20 active:scale-95 transition-transform">
                     <Send size={18} />
                  </button>
                </div>
             </div>
          ) : (
             /* Homestay Tab Content */
             <div>
                <div className="px-6 mb-6">
                   <h1 className="text-2xl font-serif font-bold text-plough-green-900">山居 · 栖息</h1>
                   <p className="text-xs text-stone-400 font-serif mt-1">在云雾梯田间，寻回内心的宁静</p>
                </div>

                <div className="px-6 space-y-6 pb-20">
                  {MOCK_ROOMS.map(room => (
                     <div key={room.id} onClick={() => onNavigate('room-detail', room.id)} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                         {/* Image */}
                         <div className="h-48 bg-stone-200 relative overflow-hidden">
                             <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[10%]" />
                             <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-plough-green-900 text-[10px] px-2 py-1 rounded font-serif font-bold shadow-sm">
                                 {room.isAvailable ? '可预订' : '满房'}
                             </div>
                         </div>
                         
                         {/* Content */}
                         <div className="p-5">
                             <div className="flex justify-between items-start mb-2">
                                 <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-plough-green-800 transition-colors">{room.name}</h3>
                             </div>
                             
                             <div className="flex gap-2 mb-4">
                                 {room.tags.map(tag => (
                                     <span key={tag} className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">{tag}</span>
                                 ))}
                             </div>

                             <div className="flex items-center justify-between pt-3 border-t border-stone-50">
                                 <div className="flex flex-col">
                                     <span className="text-lg font-serif font-bold text-plough-green-900">¥{room.memberPrice} <span className="text-xs font-sans font-normal text-stone-400">守护人</span></span>
                                     <span className="text-xs text-stone-300 line-through">游客 ¥{room.price}</span>
                                 </div>
                                 <button className="bg-plough-green-900 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-plough-green-900/10 group-hover:bg-plough-green-800 transition-colors">
                                     预订
                                 </button>
                             </div>
                         </div>
                     </div>
                  ))}
                </div>
             </div>
          )}
       </div>

       <style>{`
         .pb-safe { padding-bottom: calc(env(safe-area-inset-bottom, 20px) + 60px); }
       `}</style>
    </div>
  );
};

export default HomestayView;
