
import React from 'react';
import { Send, Sprout, Utensils, Sun, Users, MapPin, Calendar } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

const LetterView: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#EBEAE5] relative min-h-full">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none fixed" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      <div className="flex-1 pb-20">
        
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
              这个月黎平雨水很多，我们的老牛‘大黄’在耕作时滑了一跤，好在没事。它抖了抖身上的泥，又继续埋头向前。
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

        {/* Organic Guide Card (New Addition) */}
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
                    <h4 className="font-serif font-bold text-stone-800 text-sm">美好寓意：“蒸蒸日上”</h4>
                </div>
                <div className="pl-6 ml-1.5">
                     <p className="text-xs text-stone-500 font-serif leading-relaxed text-justify bg-orange-50/50 p-2 rounded-lg text-stone-600">
                        山药又名“淮山”，寓意怀抱江山，事业稳固；红枣寓意早早丰收。
                     </p>
                </div>
            </div>
        </div>
      </div>

      {/* Footer Input - Fixed within the App Container */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#FDFCF8] border-t border-stone-200 p-3 pb-safe z-50 flex gap-3 items-center shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
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
      
      <style>{`
        .pb-safe { padding-bottom: calc(env(safe-area-inset-bottom, 20px) + 60px); }
      `}</style>
    </div>
  );
};

export default LetterView;
