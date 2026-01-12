
import React from 'react';
import { ArrowLeft, Share2, Download, ShieldCheck } from 'lucide-react';
import { BrandLogo, TerracePattern } from '../components/BrandLogo';
import { MOCK_USER } from '../constants';

interface GuardianCertificateViewProps {
  onBack: () => void;
}

const GuardianCertificateView: React.FC<GuardianCertificateViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-[#1c2e24] animate-fade-in relative flex flex-col items-center justify-center pb-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <img 
           src="https://images.unsplash.com/photo-1536617621972-0604472d4c3f?auto=format&fit=crop&q=80&w=800" 
           alt="Background" 
           className="w-full h-full object-cover opacity-20 blur-sm scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#1c2e24]/80 via-[#1c2e24]/60 to-[#1c2e24]"></div>
         <TerracePattern className="text-[#C99C63]" opacity="0.05" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-50 flex justify-between items-center">
         <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ArrowLeft size={20} />
         </button>
         <h1 className="text-white font-serif font-bold text-lg opacity-90">我的守护证书</h1>
         <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Share2 size={20} />
         </button>
      </div>

      {/* Certificate Container */}
      <div className="relative z-10 w-full px-6 max-w-sm">
         
         {/* The Certificate Paper */}
         <div className="bg-[#FDFCF8] rounded-sm shadow-2xl overflow-hidden relative p-8 text-center border-[8px] border-double border-[#C99C63]/30">
            {/* Paper Texture */}
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
            
            {/* Corner Decors */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C99C63] rounded-tl-3xl m-3 opacity-50"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C99C63] rounded-tr-3xl m-3 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C99C63] rounded-bl-3xl m-3 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C99C63] rounded-br-3xl m-3 opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
               <div className="mb-6 opacity-80">
                  <BrandLogo className="w-12 h-12 text-[#1c2e24] mx-auto" />
               </div>

               <h2 className="text-2xl font-serif font-bold text-[#1c2e24] tracking-widest mb-2">梯田守护证书</h2>
               <p className="text-[10px] uppercase tracking-[0.3em] text-[#C99C63] mb-8 font-serif">Guardian Certificate</p>

               <div className="mb-8">
                  <p className="text-sm text-stone-500 font-serif mb-2">兹证明</p>
                  <p className="text-2xl font-serif font-bold text-[#1c2e24] mb-2 border-b border-stone-200 inline-block px-8 pb-1">
                     {MOCK_USER.name}
                  </p>
                  <p className="text-sm text-stone-500 font-serif mt-2">正式成为牛耕部落 {MOCK_USER.level} 守护人</p>
               </div>

               <p className="text-xs text-stone-600 font-serif leading-loose text-justify mb-8 px-2">
                  感谢您对云和梯田每一寸土地的守护。因为您的支持，古法耕作得以延续，山间的白鹭得以栖息，老种子的生命得以传承。特颁此证，以资纪念。
               </p>

               <div className="flex justify-between items-end border-t border-stone-100 pt-6">
                  <div className="text-left">
                     <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">Certificate No.</p>
                     <p className="text-sm font-mono font-bold text-[#1c2e24]">NO. 20240520888</p>
                  </div>
                  <div className="text-right relative">
                     {/* Red Seal */}
                     <div className="absolute -top-6 -left-8 w-20 h-20 border-2 border-red-700/80 rounded-full flex items-center justify-center rotate-[-15deg] opacity-80 pointer-events-none">
                        <div className="w-16 h-16 border border-red-700/50 rounded-full flex items-center justify-center">
                            <span className="text-[10px] text-red-800 font-serif font-bold writing-vertical-rl">牛耕部落</span>
                        </div>
                     </div>
                     <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">Date</p>
                     <p className="text-sm font-serif font-bold text-[#1c2e24]">2024.05.20</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Action */}
         <div className="mt-10 flex flex-col items-center gap-3">
            <button className="flex items-center gap-2 bg-[#C99C63] text-[#4A3010] px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-[#C99C63]/20 hover:bg-[#d4a870] transition-colors">
               <Download size={18} /> 保存证书图片
            </button>
            <p className="text-white/40 text-[10px] font-serif">保存图片分享您的守护荣耀</p>
         </div>
      </div>
    </div>
  );
};

export default GuardianCertificateView;
