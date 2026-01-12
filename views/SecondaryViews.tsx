
import React from 'react';
import { ArrowLeft, Share2, Heart, ShoppingBag, Calendar, Check, Package, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { MOCK_FIELD_NOTES, MOCK_PRODUCTS, MOCK_ROOMS, MOCK_ORDERS, MOCK_USER } from '../constants';
import { BrandLogo } from '../components/BrandLogo';

interface DetailViewProps {
  id?: number;
  onBack: () => void;
}

// --- 1. Field Note Detail (Article View) ---
export const NoteDetail: React.FC<DetailViewProps> = ({ id, onBack }) => {
  const note = MOCK_FIELD_NOTES.find(n => n.id === id);
  if (!note) return null;

  return (
    <div className="min-h-full bg-[#FDFCF8] animate-fade-in pb-10">
      <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-[#FDFCF8]/90 backdrop-blur-sm">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-stone-100 transition-colors">
          <ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-stone-100 transition-colors">
            <Heart size={20} className="text-stone-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-stone-100 transition-colors">
            <Share2 size={20} className="text-stone-600" />
          </button>
        </div>
      </div>

      <div className="px-6">
        <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-plough-green-700 border border-plough-green-200 px-2 py-1 mb-4 rounded-full">
          {note.category}
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2 leading-tight">{note.title}</h1>
        <p className="text-lg font-serif text-stone-500 italic mb-6">{note.subtitle}</p>
        
        <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-6">
           <div className="w-10 h-10 bg-plough-green-100 rounded-full flex items-center justify-center text-plough-green-800 font-serif font-bold">
              {note.author?.[0]}
           </div>
           <div>
              <p className="text-sm font-bold text-stone-800">{note.author}</p>
              <p className="text-xs text-stone-400">{note.date}</p>
           </div>
        </div>
      </div>

      <div className="w-full h-64 mb-8">
        <img src={note.image} alt={note.title} className="w-full h-full object-cover" />
      </div>

      <div className="px-6 prose prose-stone prose-lg">
        {note.content?.map((paragraph, index) => (
          <p key={index} className="mb-6 font-serif text-stone-700 leading-loose text-justify text-base">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="px-6 mt-12 mb-8">
        <div className="bg-stone-100 p-6 rounded-lg text-center">
           <BrandLogo className="w-8 h-8 text-plough-green-800 mx-auto mb-2" />
           <p className="text-xs text-stone-500 font-serif italic">The Plough Tribe · 归野</p>
        </div>
      </div>
    </div>
  );
};

// --- 2. Product Detail (E-commerce View) ---
export const ProductDetail: React.FC<DetailViewProps> = ({ id, onBack }) => {
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) return null;

  return (
    <div className="min-h-full bg-[#FDFCF8] animate-fade-in relative pb-24">
      {/* Hero Image */}
      <div className="relative h-96 w-full bg-stone-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors">
          <ArrowLeft size={24} className="text-stone-900" strokeWidth={1.5} />
        </button>
      </div>

      <div className="px-6 -mt-8 relative z-10 bg-[#FDFCF8] rounded-t-3xl pt-8">
        <div className="flex justify-between items-start mb-2">
           <h1 className="text-2xl font-serif font-bold text-stone-900">{product.name}</h1>
           <div className="flex flex-col items-end">
             <span className="text-2xl font-serif font-bold text-plough-green-800">¥{product.memberPrice > 0 ? product.memberPrice : '0'}</span>
             {product.memberPrice > 0 && <span className="text-sm text-stone-400 line-through">¥{product.price}</span>}
             {product.memberPrice === 0 && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">权益免费</span>}
           </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {product.tastingNotes?.map(note => (
            <span key={note} className="px-3 py-1 bg-plough-green-50 text-plough-green-800 text-xs rounded-full">
              {note}
            </span>
          ))}
        </div>

        <div className="space-y-8">
          <section>
             <h3 className="font-serif font-bold text-stone-900 mb-3 flex items-center gap-2">
               <MapPin size={16} /> 产地档案
             </h3>
             <p className="text-sm text-stone-600 leading-relaxed font-light text-justify">{product.story}</p>
          </section>

          <section>
             <h3 className="font-serif font-bold text-stone-900 mb-3">规格参数</h3>
             <div className="bg-stone-50 rounded-xl p-4 space-y-3">
               {product.specs?.map((spec, i) => (
                 <div key={i} className="flex justify-between text-sm border-b border-stone-200 last:border-0 pb-2 last:pb-0">
                   <span className="text-stone-400">{spec.label}</span>
                   <span className="text-stone-800 font-medium">{spec.value}</span>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>

      {/* Fixed Bottom Bar - Constrained to max-w-md to match App Shell */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 flex items-center justify-between z-50 pb-safe max-w-md mx-auto">
         <div className="flex gap-4 px-2">
            <button className="flex flex-col items-center text-stone-400 hover:text-stone-800">
               <Share2 size={20} strokeWidth={1.5} />
               <span className="text-[10px]">分享</span>
            </button>
            <button className="flex flex-col items-center text-stone-400 hover:text-stone-800">
               <ShoppingBag size={20} strokeWidth={1.5} />
               <span className="text-[10px]">客服</span>
            </button>
         </div>
         <button className="bg-plough-green-900 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-plough-green-900/20 w-2/3">
           {product.memberPrice === 0 ? '立即兑换' : '加入购物车'}
         </button>
      </div>
      <style>{`.pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }`}</style>
    </div>
  );
};

// --- 3. Room Detail (Homestay View) ---
export const RoomDetail: React.FC<DetailViewProps> = ({ id, onBack }) => {
  const room = MOCK_ROOMS.find(r => r.id === id);
  if (!room) return null;

  return (
    <div className="min-h-full bg-[#FDFCF8] animate-fade-in pb-24">
      <div className="relative h-[45vh] w-full">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors text-white">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <div className="absolute bottom-6 left-6 text-white">
           <h1 className="text-3xl font-serif font-bold mb-2">{room.name}</h1>
           <p className="text-sm opacity-90">{room.size} | {room.tags.join(' · ')}</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        <section>
           <h3 className="font-serif font-bold text-stone-900 mb-3 text-lg">关于此房源</h3>
           <p className="text-sm text-stone-600 leading-relaxed text-justify">{room.description}</p>
        </section>

        <section>
           <h3 className="font-serif font-bold text-stone-900 mb-4 text-lg">房间设施</h3>
           <div className="grid grid-cols-2 gap-4">
              {room.amenities?.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-stone-600 text-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-plough-green-400"></div>
                   {item}
                </div>
              ))}
           </div>
        </section>

        <section className="bg-stone-50 p-6 rounded-xl border border-stone-100">
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-stone-900">入住须知</h3>
              <ShieldCheck size={18} className="text-plough-green-700" />
           </div>
           <ul className="text-xs text-stone-500 space-y-2 list-disc list-inside">
              <li>入住时间：14:00以后，退房时间：12:00以前</li>
              <li>提倡环保，请尽量自带牙具梳子</li>
              <li>山区早晚温差大，请备好外套</li>
              <li>允许携带小型宠物（需提前报备）</li>
           </ul>
        </section>
      </div>

      {/* Fixed Bottom Bar - Constrained */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 flex items-center justify-between z-50 pb-safe max-w-md mx-auto">
         <div className="flex flex-col">
            <span className="text-xs text-stone-400">会员专享</span>
            <span className="text-xl font-bold text-plough-green-900">免费兑换</span>
         </div>
         <button 
           disabled={!room.isAvailable}
           className={`px-8 py-3 rounded-lg font-bold text-sm shadow-lg ${
             room.isAvailable 
               ? 'bg-plough-green-900 text-white shadow-plough-green-900/20' 
               : 'bg-stone-200 text-stone-400 cursor-not-allowed'
           }`}
         >
           {room.isAvailable ? '查看日历预约' : '暂无排期'}
         </button>
      </div>
    </div>
  );
};

// --- 4. Order List (Profile Subpage) ---
export const OrderList: React.FC<DetailViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-[#F5F5F4] animate-fade-in">
       <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
          <button onClick={onBack}><ArrowLeft size={24} className="text-stone-800"/></button>
          <h1 className="font-serif font-bold text-lg text-stone-900">我的订单</h1>
       </div>
       
       <div className="p-4 space-y-4">
          {MOCK_ORDERS.map(order => (
             <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-3 border-b border-stone-100 pb-2">
                   <span className="text-xs text-stone-400">{order.date}</span>
                   <span className={`text-xs px-2 py-0.5 rounded ${
                      order.status === 'completed' ? 'bg-stone-100 text-stone-500' : 'bg-plough-green-50 text-plough-green-700'
                   }`}>
                      {order.status === 'completed' ? '已完成' : '运输中'}
                   </span>
                </div>
                <div className="space-y-2 mb-3">
                   {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm text-stone-800 font-serif">{item}</div>
                   ))}
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-stone-500">订单号: {order.id.split('-')[1]}...</span>
                   <span className="font-bold text-stone-900">实付: ¥{order.total}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

// --- 5. Benefits Center (Profile Subpage) ---
export const BenefitDetail: React.FC<DetailViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-[#FDFCF8] animate-fade-in">
       <div className="bg-plough-green-900 text-white p-6 pb-24 relative overflow-hidden">
          <BrandLogo className="absolute -right-10 -top-10 w-64 h-64 text-white opacity-5" />
          <button onClick={onBack} className="mb-6"><ArrowLeft size={24} /></button>
          <h1 className="text-2xl font-serif font-bold mb-1">会员权益中心</h1>
          <p className="text-plough-green-200 text-sm">黑金年卡 · 2026.05.20 到期</p>
       </div>

       <div className="px-4 -mt-16 relative z-10 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                   <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Package size={20}/></div>
                   <span className="font-bold text-stone-800">月度配送</span>
                </div>
                <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-500">12次/年</span>
             </div>
             <div className="w-full bg-stone-100 h-2 rounded-full mb-2">
                <div className="bg-orange-500 h-full w-1/3 rounded-full"></div>
             </div>
             <p className="text-xs text-stone-400">本月权益已生成，预计15日发货</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                   <div className="p-2 bg-plough-green-100 text-plough-green-700 rounded-lg"><Calendar size={20}/></div>
                   <span className="font-bold text-stone-800">民宿体验</span>
                </div>
                <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-500">剩余 {MOCK_USER.freeStaysRemaining} 次</span>
             </div>
             <p className="text-xs text-stone-500 leading-relaxed">
                包含任意房型免费入住权益。节假日需提前7天预约。支持转赠亲友使用。
             </p>
             <button className="mt-4 w-full py-2 border border-plough-green-800 text-plough-green-800 rounded text-sm font-bold">
                去预约
             </button>
          </div>
       </div>
    </div>
  );
};
