
import React from 'react';
import { User, TabType } from '../types';
import { MOCK_FIELD_NOTES, MONTHLY_RICE_DATA } from '../constants';
import { Wind, Droplets, ArrowUpRight, Leaf, CloudSun, Calendar, Utensils, Sun, Sparkles, Video, ScanLine, Crown, ChevronRight } from 'lucide-react';
import { BrandLogo, TerracePattern } from '../components/BrandLogo';

interface HomeViewProps {
  user: User;
  setActiveTab: (tab: TabType) => void;
  onNavigate: (type: string, id?: number) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ user, setActiveTab, onNavigate }) => {
  return (
    <div className="pb-32 animate-fade-in bg-[#FDFCF8] min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-plough-green-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none"></div>

      {/* Header: Brand Only (Avatar Removed) */}
      <div className="px-6 pt-6 flex justify-between items-start">
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-3 text-plough-green-900">
              <BrandLogo className="w-10 h-10" />
              <div className="flex flex-col -space-y-0.5 pt-1">
                <span className="text-xl font-serif font-black leading-none tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>牛耕部落</span>
                <span className="text-[9px] font-sans font-medium tracking-[0.2em] text-plough-green-800 uppercase scale-90 origin-left">The Plough Tribe</span>
              </div>
           </div>
        </div>
      </div>

      {/* Greeting & Membership Section */}
      <div className="px-6 mt-8 mb-8">
         <div className="flex justify-between items-end">
            <div>
               <p className="text-xs text-stone-400 font-serif italic mb-2">Dec 26 · 立夏</p>
               <h1 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
                 早安，{user.name}
               </h1>
            </div>
            
            {/* Membership Center Entry */}
            {user.level === '未开通权益' ? (
               <button 
                  onClick={() => onNavigate('membership-intro')}
                  className="bg-gradient-to-br from-plough-green-600 to-plough-green-700 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
               >
                  <Crown size={16} className="text-[#EBC089]" fill="currentColor" />
                  <span className="text-sm font-bold">开通会员</span>
                  <ChevronRight size={14} />
               </button>
            ) : (
               <button 
                  onClick={() => onNavigate('membership-intro')}
                  className="relative group"
               >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EBC089] via-[#C99C63] to-[#8C6239] p-0.5 shadow-md group-hover:scale-105 transition-transform">
                     <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Crown size={16} className="text-[#8C6239]" fill="currentColor" />
                     </div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-plough-green-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                     <ChevronRight size={8} className="text-white" />
                  </div>
               </button>
            )}
         </div>
         {/* Decorative Line */}
         <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mt-6 mb-2"></div>
      </div>

      {/* Section 1: Field Notes (田野手记) */}
      <div className="mb-10">
         <div className="px-6 flex justify-between items-end mb-5">
            <h2 className="text-xl font-serif font-bold text-stone-900">田野手记</h2>
            <span className="text-xs font-serif text-stone-400 italic">Field Notes</span>
         </div>
         
         <div className="flex overflow-x-auto px-6 gap-4 pb-4 no-scrollbar snap-x snap-mandatory">
            {MOCK_FIELD_NOTES.slice(0, 2).map((note, index) => (
               <div 
                 key={note.id} 
                 onClick={() => onNavigate('note-detail', note.id)} 
                 className="min-w-[70%] snap-center cursor-pointer group"
               >
                  <div className="aspect-square rounded-[2rem] overflow-hidden relative shadow-md mb-3">
                     <img src={note.image} alt={note.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[10px] px-3 py-1 rounded-full font-serif font-bold shadow-sm">
                           {index === 0 ? '谷雨 · 新茶' : '秧苗认养计划'}
                        </span>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-serif font-bold text-stone-900 line-clamp-1">{note.title}</h3>
                        <span className="text-[10px] text-plough-green-700 font-bold">{note.date}</span>
                     </div>
                     <p className="text-xs text-stone-400 font-light mt-0.5 line-clamp-1">{note.subtitle}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Section 2: Seasonal Delivery (当季配送) */}
      <div className="px-6 mb-10">
         <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-serif font-bold text-stone-900">当季配送</h2>
         </div>

         <div className="bg-plough-green-900 rounded-[2rem] p-6 relative overflow-hidden shadow-xl shadow-plough-green-900/20 text-white group cursor-pointer" onClick={() => setActiveTab('profile')}>
            <TerracePattern className="text-white" opacity="0.05" />
            
            {/* Status Line */}
            <div className="relative z-10 flex justify-between items-start mb-8">
               <div>
                  <p className="text-[10px] tracking-widest uppercase text-plough-green-300 mb-1">Status</p>
                  <p className="text-xl font-serif font-bold border-b border-plough-green-700 pb-1 inline-block">{user.deliveryStatus}</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] tracking-widest uppercase text-plough-green-300 mb-1">Estimated</p>
                  <p className="text-xl font-serif font-bold">{user.nextDelivery}</p>
               </div>
            </div>

            {/* Dashed Line */}
            <div className="w-full border-t border-dashed border-plough-green-700/50 mb-8 relative">
               <div className="absolute -top-1.5 -left-1 w-3 h-3 bg-[#FDFCF8] rounded-full"></div>
               <div className="absolute -top-1.5 -right-1 w-3 h-3 bg-[#FDFCF8] rounded-full"></div>
            </div>

            {/* Product Info */}
            <div className="relative z-10 flex justify-between items-center">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                     <BrandLogo className="w-6 h-6 text-plough-green-200" />
                  </div>
                  <div>
                     <h3 className="font-serif font-bold text-base">梯田有机新米</h3>
                     <p className="text-xs text-plough-green-300 mt-0.5">含：时令蔬菜包</p>
                  </div>
               </div>
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-plough-green-900 group-hover:scale-110 transition-transform">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
               </div>
            </div>
         </div>
      </div>

      {/* Section 3: Farm Live (农场实况) - UPDATED */}
      <div className="px-6 mb-6">
         <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-serif font-bold text-stone-900">农场实况</h2>
            <div className="flex items-center gap-1.5 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
               <span className="text-[9px] font-bold tracking-widest uppercase text-red-600">LIVE MONITOR</span>
            </div>
         </div>

         <div className="space-y-3">
            {/* Live Camera Feed Card */}
            <div className="w-full h-48 bg-stone-900 rounded-2xl relative overflow-hidden group shadow-md cursor-pointer border border-stone-200">
               {/* Video Image Placeholder */}
               <img 
                 src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200" 
                 alt="Farm CCTV" 
                 className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
               
               {/* Camera UI Overlay */}
               <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                   <div className="flex flex-col text-shadow">
                       <span className="text-[10px] text-white/70 font-mono flex items-center gap-1"><Video size={10}/> CAM_01</span>
                       <span className="text-xs font-bold text-white font-sans tracking-wide">A区 · 核心保护梯田</span>
                   </div>
                   <div className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] text-white/90 font-mono tracking-widest">REC 00:04:23</span>
                   </div>
               </div>
               
               {/* Center Play Button Cue */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
               </div>

               {/* AI Detection Overlay */}
               <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-plough-green-200 bg-plough-green-900/80 px-1.5 py-0.5 rounded backdrop-blur-md flex items-center gap-1 border border-plough-green-800/50">
                        <ScanLine size={10} /> AI 识别中
                     </span>
                     <span className="text-[10px] text-white/80 font-mono tracking-wider">
                        Target: Buffalo (98%)
                     </span>
                  </div>
               </div>
            </div>

            {/* Environmental Data Grid */}
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-white border border-stone-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Wind size={40} />
                  </div>
                  <Wind size={20} className="text-plough-green-600 mb-1" strokeWidth={1.5} />
                  <span className="text-2xl font-serif font-bold text-stone-800">优</span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">空气质量 (AQI)</span>
               </div>
               <div className="bg-white border border-stone-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Droplets size={40} />
                  </div>
                  <Droplets size={20} className="text-plough-green-600 mb-1" strokeWidth={1.5} />
                  <span className="text-2xl font-serif font-bold text-stone-800">65%</span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">相对湿度</span>
               </div>
            </div>
         </div>
      </div>

      {/* Section 4: Twelve Months Rice (十二月令米) */}
      <div className="mb-10">
         <div className="px-6 flex justify-between items-end mb-5">
            <h2 className="text-xl font-serif font-bold text-stone-900">十二月令米</h2>
            <span className="text-xs font-serif text-stone-400 italic">一月一味 · 顺时而食</span>
         </div>
         
         <div className="flex overflow-x-auto px-6 gap-4 pb-4 no-scrollbar snap-x snap-mandatory">
            {MONTHLY_RICE_DATA.map((item, idx) => {
               // Determine visual style based on season
               let borderColor = 'border-stone-100';
               let bgColor = 'bg-stone-50';
               let iconColor = 'text-stone-400';
               let accentColor = 'text-stone-800';
               let tagBg = 'bg-stone-100';
               
               if (item.season === 'spring') {
                   borderColor = 'border-green-100';
                   bgColor = 'bg-green-50/50';
                   iconColor = 'text-green-600';
                   accentColor = 'text-green-800';
                   tagBg = 'bg-green-100';
               } else if (item.season === 'summer') {
                   borderColor = 'border-red-100';
                   bgColor = 'bg-red-50/50';
                   iconColor = 'text-red-500';
                   accentColor = 'text-red-800';
                   tagBg = 'bg-red-100';
               } else if (item.season === 'autumn') {
                   borderColor = 'border-orange-100';
                   bgColor = 'bg-orange-50/50';
                   iconColor = 'text-orange-500';
                   accentColor = 'text-orange-800';
                   tagBg = 'bg-orange-100';
               } else if (item.season === 'winter') {
                   borderColor = 'border-sky-100';
                   bgColor = 'bg-sky-50/50';
                   iconColor = 'text-sky-500';
                   accentColor = 'text-sky-800';
                   tagBg = 'bg-sky-100';
               }

               return (
                 <div key={idx} className={`min-w-[88%] snap-center bg-white border ${borderColor} rounded-[2rem] p-6 shadow-sm relative overflow-hidden flex flex-col h-full`}>
                    {/* Background Icon */}
                    <div className="absolute -top-4 -right-4 opacity-5 pointer-events-none">
                       <BrandLogo className="w-32 h-32" />
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex flex-col">
                           <span className={`text-[10px] font-bold tracking-widest uppercase ${iconColor} mb-1`}>{item.seasonLabel}</span>
                           <h3 className={`text-2xl font-serif font-bold ${accentColor}`}>{item.name}</h3>
                        </div>
                        <div className={`${tagBg} ${accentColor} px-3 py-1 rounded-full text-[10px] font-serif font-bold`}>
                           {item.month}
                        </div>
                    </div>

                    <div className="w-12 h-0.5 bg-stone-100 mb-5"></div>

                    {/* Recipe Section */}
                    <div className="mb-5 relative z-10 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                           <Utensils size={14} className={iconColor} />
                           <span className="text-sm font-bold text-stone-800 font-serif">{item.recipeTitle}</span>
                        </div>
                        <div className={`${bgColor} p-3 rounded-xl space-y-2`}>
                           <p className="text-[11px] text-stone-600 leading-relaxed font-serif">
                              <span className="font-bold">做法：</span>{item.method}
                           </p>
                           <p className="text-[10px] text-stone-500 leading-relaxed font-serif italic border-t border-stone-200/50 pt-2 mt-1">
                              {item.principle}
                           </p>
                        </div>
                    </div>

                    {/* Meaning Section */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                           {item.season === 'winter' ? <Sparkles size={14} className={iconColor} /> : <Sun size={14} className={iconColor} />}
                           <span className="text-sm font-bold text-stone-800 font-serif">寓意：{item.meaningTitle}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-relaxed font-serif pl-6">
                           {item.meaning}
                        </p>
                    </div>
                 </div>
               );
            })}
         </div>
      </div>

    </div>
  );
};

export default HomeView;
