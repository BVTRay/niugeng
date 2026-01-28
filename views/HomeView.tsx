
import React, { useState, useEffect } from 'react';
import { User, TabType } from '../types';
import { MOCK_FIELD_NOTES, MONTHLY_RICE_DATA } from '../constants';
import { Wind, Droplets, ArrowUpRight, Leaf, CloudSun, Calendar, Utensils, Sun, Sparkles, Video, ScanLine, Crown, ChevronRight, MapPin, Thermometer, ChevronLeft } from 'lucide-react';
import { BrandLogo, TerracePattern } from '../components/BrandLogo';

interface HomeViewProps {
  user: User;
  setActiveTab: (tab: TabType) => void;
  onNavigate: (type: string, id?: number) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ user, setActiveTab, onNavigate }) => {
  // 轮播图配置 - 图片路径数组
  const bannerImages = [
    '/home-banner-1.jpg',
    '/home-banner-2.jpg',
    '/home-banner-3.jpg'
  ].filter(img => {
    // 检查图片是否存在（通过尝试加载）
    return true; // 默认显示所有，如果图片不存在会显示占位
  });

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [bannerImagesLoaded, setBannerImagesLoaded] = useState<string[]>([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  // 自动轮播 - Banner图
  useEffect(() => {
    if (bannerImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  // 自动轮播 - 文章轮播图
  useEffect(() => {
    if (MOCK_FIELD_NOTES.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentArticleIndex((prev) => (prev + 1) % MOCK_FIELD_NOTES.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, []);

  // 检查图片是否加载成功
  const handleImageLoad = (src: string) => {
    if (!bannerImagesLoaded.includes(src)) {
      setBannerImagesLoaded([...bannerImagesLoaded, src]);
    }
  };

  const handleImageError = (src: string) => {
    // 图片加载失败时，从数组中移除
    setBannerImagesLoaded(bannerImagesLoaded.filter(img => img !== src));
  };

  // 切换到上一张
  const goToPrevious = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  // 切换到下一张
  const goToNext = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
  };

  // 跳转到指定索引
  const goToSlide = (index: number) => {
    setCurrentBannerIndex(index);
  };

  // 实际可用的图片（至少显示一张占位图）
  const activeImages = bannerImages.length > 0 ? bannerImages : ['/home-banner-1.jpg'];

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

      {/* Greeting Section */}
      <div className="px-6 mt-6 mb-6">
         <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
               <p className="text-xs text-stone-400 font-serif italic mb-1.5">Dec 26 · 立夏</p>
               <h1 className="text-xl font-serif font-bold text-stone-900 leading-tight">
                 早安，{user.name}
               </h1>
            </div>
            
            {/* 地理位置、气温、空气湿度 - 放在问候语右侧 */}
            <div className="flex flex-col gap-2 shrink-0">
               {/* 第一行：位置图标 + 贵州黎平 */}
               <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-stone-600" strokeWidth={2} />
                  <span className="text-xs text-stone-700 font-serif">贵州黎平</span>
               </div>
               
               {/* 第二行：气温 + 空气湿度 */}
               <div className="flex items-center gap-3">
                  {/* 气温 */}
                  <div className="flex items-center gap-1.5">
                     <Thermometer size={16} className="text-orange-600" strokeWidth={2} />
                     <span className="text-sm font-serif font-bold text-stone-900">22°C</span>
                  </div>
                  
                  {/* 空气湿度 */}
                  <div className="flex items-center gap-1.5">
                     <Droplets size={16} className="text-cyan-600" strokeWidth={2} />
                     <span className="text-sm font-serif font-bold text-stone-900">65%</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Promotional Poster - 牛耕部落介绍海报（轮播图） */}
      <div className="w-full mb-6">
         {/* 轮播图区域 - 全宽显示，1:1正方形比例 */}
         <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
            {/* 轮播图片容器 */}
            <div 
               className="flex transition-transform duration-500 ease-in-out h-full"
               style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
            >
               {activeImages.map((imgSrc, index) => (
                  <div 
                     key={index}
                     className="w-full h-full flex-shrink-0 relative flex items-center justify-center"
                     style={{ aspectRatio: '1/1' }}
                  >
                     <img 
                        src={imgSrc}
                        alt={`牛耕部落海报 ${index + 1}`}
                        className="w-full h-full object-contain"
                        onLoad={() => handleImageLoad(imgSrc)}
                        onError={() => handleImageError(imgSrc)}
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Section 1: Field Notes (田野手记) - 轮播图 */}
      <div className="mb-10">
         <div className="px-6 relative">
            {/* 轮播图容器 */}
            <div className="relative overflow-hidden rounded-[2rem] shadow-md">
               <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentArticleIndex * 100}%)` }}
               >
                  {MOCK_FIELD_NOTES.map((note, index) => (
                     <div 
                        key={note.id}
                        className="w-full flex-shrink-0 relative cursor-pointer group"
                        onClick={() => onNavigate('note-detail', note.id)}
                        style={{ aspectRatio: '16/9' }}
                     >
                        <img 
                           src={note.image} 
                           alt={note.title} 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        {/* 标签 */}
                        <div className="absolute top-4 left-4">
                           <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[10px] px-3 py-1 rounded-full font-serif font-bold shadow-sm">
                              {note.category}
                           </span>
                        </div>
                        {/* 文字信息覆盖层 */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
                           <div className="flex justify-between items-end">
                              <div className="flex-1">
                                 <h3 className="text-base font-serif font-bold text-white mb-1 line-clamp-1">{note.title}</h3>
                                 <p className="text-xs text-white/90 font-light line-clamp-1">{note.subtitle}</p>
                              </div>
                              <span className="text-[10px] text-white/80 font-bold ml-4">{note.date}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* 左右切换按钮（仅当有多张图片时显示） */}
               {MOCK_FIELD_NOTES.length > 1 && (
                  <>
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           setCurrentArticleIndex((prev) => (prev - 1 + MOCK_FIELD_NOTES.length) % MOCK_FIELD_NOTES.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:bg-white transition-all shadow-md z-10"
                        aria-label="上一张"
                     >
                        <ChevronLeft size={20} strokeWidth={2} />
                     </button>
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           setCurrentArticleIndex((prev) => (prev + 1) % MOCK_FIELD_NOTES.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:bg-white transition-all shadow-md z-10"
                        aria-label="下一张"
                     >
                        <ChevronRight size={20} strokeWidth={2} />
                     </button>
                  </>
               )}

               {/* 指示器（仅当有多张图片时显示） */}
               {MOCK_FIELD_NOTES.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                     {MOCK_FIELD_NOTES.map((_, index) => (
                        <button
                           key={index}
                           onClick={(e) => {
                              e.stopPropagation();
                              setCurrentArticleIndex(index);
                           }}
                           className={`w-2 h-2 rounded-full transition-all ${
                              index === currentArticleIndex 
                                 ? 'bg-white w-6' 
                                 : 'bg-white/50 hover:bg-white/75'
                           }`}
                           aria-label={`切换到第 ${index + 1} 张`}
                        />
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Section 2: Seasonal Delivery (当季配送) */}
      <div className="px-6 mb-10">
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
