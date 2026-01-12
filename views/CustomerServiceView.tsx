
import React from 'react';
import { ArrowLeft, MessageCircle, Phone, FileText, ChevronRight, Package, RefreshCcw, CreditCard, Ticket } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface CustomerServiceViewProps {
  onBack: () => void;
}

const CustomerServiceView: React.FC<CustomerServiceViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-[#F5F5F4] animate-fade-in font-sans pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-plough-green-900 px-4 pt-4 pb-16 sticky top-0 z-30 shadow-sm text-white">
         <div className="flex items-center gap-4 mb-6">
            <button onClick={onBack} className="p-1 rounded-full hover:bg-white/10"><ArrowLeft size={24} strokeWidth={1.5} /></button>
            <h1 className="font-serif font-bold text-lg flex-1 text-center pr-8">客服中心</h1>
         </div>
         
         <div className="flex items-center gap-4 px-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
               <BrandLogo className="w-6 h-6 text-white" />
            </div>
            <div>
               <p className="font-bold text-lg">Hi, 林先生</p>
               <p className="text-xs text-plough-green-200 opacity-80">智能管家“谷雨”为您服务</p>
            </div>
         </div>
      </div>

      {/* Floating Card */}
      <div className="-mt-8 px-4 relative z-10 flex-1">
         
         {/* Quick Actions */}
         <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
            <h3 className="font-bold text-stone-900 mb-4 text-sm">自助服务</h3>
            <div className="grid grid-cols-4 gap-4">
               <QuickAction icon={Package} label="物流查询" />
               <QuickAction icon={RefreshCcw} label="退换售后" />
               <QuickAction icon={CreditCard} label="会员续费" />
               <QuickAction icon={Ticket} label="发票服务" />
            </div>
         </div>

         {/* Common Questions */}
         <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
            <div className="p-4 border-b border-stone-100">
               <h3 className="font-bold text-stone-900 text-sm">常见问题</h3>
            </div>
            <div className="divide-y divide-stone-50">
               <FAQItem question="如何修改配送地址？" />
               <FAQItem question="这个月的权益米什么时候发货？" />
               <FAQItem question="民宿预订需要提前多久？" />
               <FAQItem question="收到商品有破损怎么办？" />
               <FAQItem question="如何查看我的会员到期时间？" />
            </div>
            <div className="p-3 text-center border-t border-stone-50">
               <button className="text-xs text-stone-400 flex items-center justify-center gap-1 mx-auto">
                  查看更多问题 <ChevronRight size={12} />
               </button>
            </div>
         </div>
      </div>

      {/* Bottom Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 p-3 pb-safe z-40 flex gap-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] max-w-md mx-auto">
         <button className="flex-1 flex flex-col items-center justify-center gap-1 bg-stone-50 rounded-lg py-2 active:scale-95 transition-transform">
            <Phone size={20} className="text-stone-700" />
            <span className="text-xs text-stone-600 font-bold">电话客服</span>
         </button>
         <button className="flex-[2] flex items-center justify-center gap-2 bg-plough-green-900 text-white rounded-lg py-2 shadow-lg shadow-plough-green-900/20 active:scale-95 transition-transform">
            <MessageCircle size={20} />
            <span className="text-sm font-bold">联系在线管家</span>
         </button>
      </div>

      <style>{`.pb-safe { padding-bottom: max(env(safe-area-inset-bottom, 20px), 20px); }`}</style>
    </div>
  );
};

const QuickAction: React.FC<{ icon: any, label: string }> = ({ icon: Icon, label }) => (
   <button className="flex flex-col items-center gap-2 active:opacity-60 transition-opacity">
      <Icon size={24} className="text-stone-700" strokeWidth={1.5} />
      <span className="text-xs text-stone-600">{label}</span>
   </button>
);

const FAQItem: React.FC<{ question: string }> = ({ question }) => (
   <div className="flex justify-between items-center p-4 hover:bg-stone-50 active:bg-stone-100 transition-colors cursor-pointer">
      <span className="text-sm text-stone-700">{question}</span>
      <ChevronRight size={16} className="text-stone-300" />
   </div>
);

export default CustomerServiceView;
