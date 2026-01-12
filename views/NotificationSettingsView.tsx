
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotificationSettingsViewProps {
  onBack: () => void;
}

const NotificationSettingsView: React.FC<NotificationSettingsViewProps> = ({ onBack }) => {
  const [toggles, setToggles] = useState({
    system: true,
    logistics: true,
    activity: true,
    service: true,
    detail: true
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-full bg-[#F5F5F4] animate-fade-in font-sans pb-10">
       <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
         <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-100"><ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} /></button>
         <h1 className="font-serif font-bold text-lg text-stone-900 flex-1 text-center pr-8">消息通知设置</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl overflow-hidden">
           <ToggleItem label="接收新消息通知" checked={toggles.system} onChange={() => toggle('system')} />
           <ToggleItem label="通知显示详情" checked={toggles.detail} onChange={() => toggle('detail')} border />
        </div>

        <div className="px-4 py-1">
            <p className="text-xs text-stone-400 leading-relaxed">关闭后，您将无法及时收到订单状态更新及重要服务提醒。</p>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
           <ToggleItem label="交易物流" checked={toggles.logistics} onChange={() => toggle('logistics')} />
           <ToggleItem label="活动优惠" checked={toggles.activity} onChange={() => toggle('activity')} border />
           <ToggleItem label="服务提醒" checked={toggles.service} onChange={() => toggle('service')} border />
        </div>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ label: string; checked: boolean; onChange: () => void; border?: boolean }> = ({ label, checked, onChange, border }) => (
  <div className={`flex justify-between items-center p-4 ${border ? 'border-t border-stone-100' : ''} active:bg-stone-50 transition-colors`}>
     <span className="text-sm font-bold text-stone-800">{label}</span>
     <button 
       onClick={onChange}
       className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-plough-green-600' : 'bg-stone-200'}`}
     >
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`}></div>
     </button>
  </div>
);

export default NotificationSettingsView;
