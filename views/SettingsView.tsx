
import React from 'react';
import { ArrowLeft, ChevronRight, ShieldCheck, MapPin, Bell, Trash2, Info } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
  onNavigateToAccount: () => void;
  onNavigateToNotifications: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onNavigateToAccount, onNavigateToNotifications }) => {
  return (
    <div className="min-h-full bg-[#F5F5F4] animate-fade-in font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
         <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-100"><ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} /></button>
         <h1 className="font-serif font-bold text-lg text-stone-900 flex-1 text-center pr-8">设置</h1>
      </div>

      <div className="p-4 space-y-4">
         
         {/* Group 1: Account */}
         <div className="bg-white rounded-xl overflow-hidden">
            <SettingItem 
               icon={ShieldCheck} 
               label="账户与安全" 
               onClick={onNavigateToAccount}
            />
            <SettingItem 
               icon={MapPin} 
               label="管理收货地址" 
            />
         </div>

         {/* Group 2: Preferences */}
         <div className="bg-white rounded-xl overflow-hidden">
            <SettingItem 
               icon={Bell} 
               label="消息通知设置" 
               onClick={onNavigateToNotifications}
            />
            <SettingItem 
               icon={ShieldCheck} 
               label="隐私设置" 
            />
            <SettingItem 
               icon={Trash2} 
               label="清理缓存" 
               value="128 MB"
            />
         </div>

         {/* Group 3: Info */}
         <div className="bg-white rounded-xl overflow-hidden">
            <SettingItem 
               icon={Info} 
               label="关于牛耕部落" 
               value="v2.1.0"
            />
         </div>

      </div>
    </div>
  );
};

const SettingItem: React.FC<{ icon: any, label: string, value?: string, onClick?: () => void }> = ({ icon: Icon, label, value, onClick }) => (
   <div onClick={onClick} className="flex justify-between items-center p-4 border-b border-stone-100 last:border-0 active:bg-stone-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
         <Icon size={18} className="text-stone-600" strokeWidth={1.5} />
         <span className="text-sm font-bold text-stone-800">{label}</span>
      </div>
      <div className="flex items-center gap-2">
         {value && <span className="text-xs text-stone-400">{value}</span>}
         <ChevronRight size={16} className="text-stone-300" />
      </div>
   </div>
);

export default SettingsView;
