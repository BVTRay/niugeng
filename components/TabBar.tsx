
import React from 'react';
import { Home, ShoppingBag, Mail, Tent, User } from 'lucide-react';
import { TabType } from '../types';

interface TabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: '部落', icon: Home },
    { id: 'market', label: '市集', icon: ShoppingBag },
    { id: 'letter', label: '家书', icon: Mail },
    { id: 'homestay', label: '山居', icon: Tent },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] border-t border-stone-100 w-full px-6 py-2 flex justify-between items-center pointer-events-auto pb-safe">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 py-1 ${
                isActive ? 'text-plough-green-800' : 'text-stone-300 hover:text-stone-500'
              }`}
            >
              <div className={`relative p-1 rounded-xl transition-all ${isActive ? 'bg-plough-green-50' : ''}`}>
                 <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              <span className={`text-[10px] font-serif ${isActive ? 'font-bold' : 'font-light'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      <style>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
      `}</style>
    </div>
  );
};

export default TabBar;
