
import React from 'react';
import { ArrowLeft, Plus, MapPin, Edit2, Trash2, Check } from 'lucide-react';
import { User } from '../types';

interface AddressViewProps {
  user: User;
  onBack: () => void;
}

const AddressView: React.FC<AddressViewProps> = ({ user, onBack }) => {
  // Mock addresses data
  const addresses = [
    {
      id: 1,
      name: user.name,
      phone: user.phone,
      address: user.address,
      isDefault: true,
      tag: '家'
    },
    {
      id: 2,
      name: user.name,
      phone: user.phone,
      address: '上海市黄浦区南京东路100号',
      isDefault: false,
      tag: '公司'
    }
  ];

  return (
    <div className="min-h-full bg-[#F5F5F4] animate-fade-in font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
         <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-100">
            <ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} />
         </button>
         <h1 className="font-serif font-bold text-lg text-stone-900 flex-1 text-center pr-8">管理收货地址</h1>
      </div>

      <div className="p-4 space-y-3">
         {addresses.map((addr) => (
            <div key={addr.id} className="bg-white rounded-xl p-4 shadow-sm border border-stone-100">
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-stone-800">{addr.name}</span>
                     <span className="text-xs text-stone-500">{addr.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
                     {addr.isDefault && (
                        <span className="text-[10px] bg-plough-green-50 text-plough-green-700 px-2 py-0.5 rounded">默认</span>
                     )}
                     <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">{addr.tag}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     {!addr.isDefault && (
                        <button className="text-xs text-stone-400 hover:text-plough-green-600 flex items-center gap-1">
                           <Check size={14} />
                           设为默认
                        </button>
                     )}
                     <button className="p-1.5 hover:bg-stone-50 rounded-lg transition-colors">
                        <Edit2 size={16} className="text-stone-500" />
                     </button>
                     <button className="p-1.5 hover:bg-stone-50 rounded-lg transition-colors">
                        <Trash2 size={16} className="text-stone-400" />
                     </button>
                  </div>
               </div>
               <div className="flex items-start gap-2 mt-2">
                  <MapPin size={16} className="text-stone-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-stone-600 leading-relaxed flex-1">{addr.address}</p>
               </div>
            </div>
         ))}
      </div>

      {/* Add Address Button */}
      <div className="px-4 mt-4">
         <button className="w-full bg-white border-2 border-dashed border-stone-300 text-stone-600 py-4 rounded-xl text-sm font-bold active:bg-stone-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
            <Plus size={20} />
            添加新地址
         </button>
      </div>
    </div>
  );
};

export default AddressView;


