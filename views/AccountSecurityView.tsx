
import React from 'react';
import { ArrowLeft, ChevronRight, Copy, Users } from 'lucide-react';
import { User } from '../types';

interface AccountSecurityViewProps {
  user: User;
  onBack: () => void;
  onSwitchAccount: () => void;
}

const AccountSecurityView: React.FC<AccountSecurityViewProps> = ({ user, onBack, onSwitchAccount }) => {
  return (
    <div className="min-h-full bg-[#F5F5F4] animate-fade-in font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
         <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-100"><ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} /></button>
         <h1 className="font-serif font-bold text-lg text-stone-900 flex-1 text-center pr-8">账户与安全</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Group */}
        <div className="bg-white rounded-xl overflow-hidden">
           <div className="flex justify-between items-center p-4 border-b border-stone-100 active:bg-stone-50 transition-colors">
              <span className="text-sm font-bold text-stone-800">头像</span>
              <div className="flex items-center gap-2">
                 <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border border-stone-100" />
                 <ChevronRight size={16} className="text-stone-300" />
              </div>
           </div>
           
           <ItemRow label="昵称" value={user.name} />
           <ItemRow label="真实姓名" value={user.name.length > 1 ? "*" + user.name.slice(1) : user.name} />
           <ItemRow label="手机号" value={user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')} />
           
           <div className="flex justify-between items-center p-4 border-b border-stone-100 last:border-0 active:bg-stone-50 transition-colors">
              <span className="text-sm font-bold text-stone-800">绑定微信</span>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-plough-green-700 bg-plough-green-50 px-2 py-0.5 rounded">已绑定</span>
                 <ChevronRight size={16} className="text-stone-300" />
              </div>
           </div>

           <div className="flex justify-between items-center p-4 border-b border-stone-100 last:border-0 active:bg-stone-50 transition-colors">
              <span className="text-sm font-bold text-stone-800">账户ID</span>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-stone-500 font-mono">88390021</span>
                 <button className="text-stone-400 hover:text-stone-600"><Copy size={14} /></button>
              </div>
           </div>
        </div>
      </div>

      {/* Switch Account Action */}
      <div className="px-4 mt-4">
         <button 
           onClick={onSwitchAccount}
           className="w-full bg-white text-stone-800 py-3.5 rounded-xl text-sm font-bold shadow-sm active:bg-stone-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
         >
           <Users size={18} className="text-stone-500" />
           切换账号
         </button>
      </div>

      {/* Logout Actions */}
      <div className="px-4 space-y-3 mt-4">
         <button className="w-full bg-white text-red-600 py-3.5 rounded-xl text-sm font-bold shadow-sm active:bg-stone-50 active:scale-[0.99] transition-all">
            退出登录
         </button>
         
         <div className="text-center pt-2">
             <button className="text-xs text-stone-400 hover:text-stone-600 underline decoration-stone-300">
                注销账号
             </button>
         </div>
      </div>
    </div>
  );
};

const ItemRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center p-4 border-b border-stone-100 last:border-0 active:bg-stone-50 transition-colors cursor-pointer">
     <span className="text-sm font-bold text-stone-800">{label}</span>
     <div className="flex items-center gap-2">
        <span className="text-sm text-stone-500">{value}</span>
        <ChevronRight size={16} className="text-stone-300" />
     </div>
  </div>
);

export default AccountSecurityView;
