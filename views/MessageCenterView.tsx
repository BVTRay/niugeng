
import React from 'react';
import { ArrowLeft, Trash2, Headphones, Settings, ChevronRight, Truck, CreditCard, Megaphone, ShieldCheck, MessageSquare } from 'lucide-react';

interface MessageCenterViewProps {
  onBack: () => void;
  onNavigateToService: () => void;
  onNavigateToNotificationSettings: () => void;
}

const MessageCenterView: React.FC<MessageCenterViewProps> = ({ onBack, onNavigateToService, onNavigateToNotificationSettings }) => {
  return (
    <div className="min-h-full bg-[#F5F5F4] animate-fade-in font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-4 flex-1">
            <button onClick={onBack} className="p-1 -ml-2 rounded-full hover:bg-stone-100">
               <ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} />
            </button>
         </div>
         <h1 className="font-serif font-bold text-lg text-stone-900">消息通知</h1>
         <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="text-stone-600 hover:text-stone-900"><Trash2 size={20} strokeWidth={1.5} /></button>
            <button onClick={onNavigateToService} className="text-stone-600 hover:text-stone-900"><Headphones size={20} strokeWidth={1.5} /></button>
            <button onClick={onNavigateToNotificationSettings} className="text-stone-600 hover:text-stone-900"><Settings size={20} strokeWidth={1.5} /></button>
         </div>
      </div>

      <div className="p-4 space-y-3">
         
         {/* Card 1: Logistics */}
         <NotificationCard 
            icon={Truck}
            iconBg="bg-blue-500"
            title="交易物流"
            badge="16"
            subtitle="订单评价提醒"
         />

         {/* Card 2: Account */}
         <NotificationCard 
            icon={CreditCard}
            iconBg="bg-plough-green-600"
            title="会籍账户"
            badge="5"
            subtitle="会员卡过期提醒"
            preview="您的会员卡已过期，您可点击前往续费"
         />

         {/* Card 3: Activity */}
         <NotificationCard 
            icon={Megaphone}
            iconBg="bg-orange-500"
            title="山姆活动"
            badge="20"
            subtitle="闭眼入！超治愈的冬日好物"
            preview="【Hello Kitty保温杯】2个装仅 ¥ 149.8，蓝/粉配色超吸晴，【朱迪/尼克毛绒围巾】保暖舒适..."
         />

         {/* Card 4: Service */}
         <NotificationCard 
            icon={ShieldCheck}
            iconBg="bg-plough-green-500"
            title="服务通知"
            badge="1"
            preview="为了更好地保障您的用户权益，我们更新了山姆 App《SDK获取个人信息条款》，删除了同盾SDK..."
         />

         {/* Card 5: Interaction */}
         <NotificationCard 
            icon={MessageSquare}
            iconBg="bg-blue-500"
            title="互动消息"
            badge="3"
            subtitle="您购买的【protasty 黄油千层吐...】还满意吗"
            preview="快来分享一下吧，真实的评价可以帮助更多会员，点击评价>>"
         />

      </div>
    </div>
  );
};

interface NotificationCardProps {
   icon: any;
   iconBg: string;
   title: string;
   badge?: string;
   subtitle?: string;
   preview?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ icon: Icon, iconBg, title, badge, subtitle, preview }) => {
   return (
      <div className="bg-white rounded-xl p-4 shadow-sm active:bg-stone-50 transition-colors cursor-pointer">
         <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center text-white shadow-sm`}>
                  <Icon size={20} fill="currentColor" className="opacity-90" strokeWidth={0} />
               </div>
               <span className="font-bold text-stone-900 text-base">{title}</span>
            </div>
            <div className="flex items-center gap-2">
               {badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                     {badge}
                  </span>
               )}
               <ChevronRight size={16} className="text-stone-300" />
            </div>
         </div>
         
         <div className="pl-[52px]">
            {subtitle && <h4 className="text-sm font-bold text-stone-800 mb-1 line-clamp-1">{subtitle}</h4>}
            {preview && <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{preview}</p>}
         </div>
      </div>
   );
};

export default MessageCenterView;
