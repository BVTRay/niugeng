
import React from 'react';
import { MOCK_ROOMS } from '../constants';
import { ArrowRight } from 'lucide-react';

interface HomestayViewProps {
  onNavigate: (type: string, id?: number) => void;
}

const HomestayView: React.FC<HomestayViewProps> = ({ onNavigate }) => {
  return (
    <div className="pb-32 min-h-screen bg-[#FDFCF8] animate-fade-in pt-6">
       <div className="px-6 mb-6">
          <h1 className="text-2xl font-serif font-bold text-plough-green-900">山居 · 栖息</h1>
          <p className="text-xs text-stone-400 font-serif mt-1">在云雾梯田间，寻回内心的宁静</p>
       </div>

       <div className="px-6 space-y-6">
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
  );
};

export default HomestayView;
