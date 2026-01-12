
import React from 'react';
import { ArrowLeft, Sprout, Sun, Leaf, Snowflake, Gift, Mail, Tent, Users, Coins, Wheat } from 'lucide-react';
import { BrandLogo, TerracePattern } from '../components/BrandLogo';

interface BenefitsManualViewProps {
  onBack: () => void;
}

const BenefitsManualView: React.FC<BenefitsManualViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-[#FDFCF8] animate-fade-in relative pb-safe-action">
      {/* Navigation Header (Absolute to container) */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center w-full">
        <button onClick={onBack} className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors">
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* --- Page 1: Cover --- */}
      <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center text-center px-8 overflow-hidden bg-plough-green-950">
        <img 
          src="https://images.unsplash.com/photo-1536617621972-0604472d4c3f?auto=format&fit=crop&q=80&w=1200" 
          alt="Terrace" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-plough-green-950/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-plough-green-950/90 via-transparent to-black/30"></div>
        
        <div className="relative z-10 flex flex-col items-center">
           <BrandLogo className="w-24 h-24 text-white/90 mb-8" />
           <h1 className="text-3xl font-serif font-bold text-white mb-4 tracking-wide">牛耕部落<br/>守护人计划</h1>
           <div className="w-12 h-0.5 bg-white/50 mb-6"></div>
           <p className="text-lg font-serif text-white/90 italic mb-12 font-light leading-relaxed">
             云贵高山两千亩<br/>有一分田为你守候
           </p>
           
           <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-sm text-white/80 font-serif leading-7 text-justify">
             我们不只是卖米，我们是在为您守护一种生活。<br/>
             在这里，您不仅仅是消费者，更是这片古老梯田的守护人。<br/>
             把大山的味道带回家，让每一次吃饭，都成为一次回归自然的旅行。
           </div>
           
           <div className="animate-bounce absolute bottom-10 text-white/50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
           </div>
        </div>
      </section>

      {/* --- Page 2: Tier Selection --- */}
      <section className="py-20 px-6 bg-[#FDFCF8] relative">
        <h2 className="text-2xl font-serif font-bold text-plough-green-900 text-center mb-12">
          一、选择您的守护方式
        </h2>

        {/* Card 1: Homestead */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 mb-8 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                    归田 · 家园卡
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-sans font-normal">轻量家庭首选</span>
                 </h3>
                 <p className="text-xs text-plough-green-800 italic mt-1 font-serif">“把大山的味道，带回小小的家。”</p>
              </div>
           </div>
           
           <div className="space-y-4 mb-6">
              <BenefitRow title="🍚 好米到家" desc="每月 10斤 有机米（价值300元），刚好够三口之家温馨的晚餐。" />
              <BenefitRow title="🎁 守护好礼" desc="送“梯田守护证书”（含唯一编号）+ “民宿专属权益卡”（8折）。" />
              <BenefitRow title="🌈 月月惊喜" desc="每月随米配送“有机盲盒” + “牛耕家书”。" />
           </div>

           <div className="bg-stone-50 rounded-xl p-4 flex gap-3">
              <PriceBox label="耕友·季卡" price="720" save="180" />
              <PriceBox label="耕友·年卡" price="2520" save="1080" isMain />
           </div>
        </div>

        {/* Card 2: Granary */}
        <div className="bg-[#1c2e24] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
           <TerracePattern className="text-white" opacity="0.05" />
           <div className="relative z-10">
              <div className="mb-4">
                 <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                    守望 · 丰仓卡
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-sans font-normal border border-white/10">尊享深度共生</span>
                 </h3>
                 <p className="text-xs text-plough-green-200 italic mt-1 font-serif">“唯有爱与美食不可辜负，致敬懂生活的你。”</p>
              </div>

              <div className="space-y-4 mb-6">
                  <BenefitRow dark title="🍚 粮仓满满" desc="每月 20斤 有机米（价值600元），分两袋装，量大管饱。" />
                  <BenefitRow dark title="👑 尊享特权" desc="商城8折 + 生日月好礼 + 年卡专属“贴心存米”服务。" />
                  <BenefitRow dark title="🎁 守护好礼" desc="包含家园卡所有权益 + 更多尊享礼遇。" />
              </div>

              <div className="bg-white/5 rounded-xl p-4 flex gap-3">
                  <PriceBox dark label="守护·季卡" price="1440" save="360" />
                  <PriceBox dark label="守护·年卡" price="5040" save="2160" isMain />
              </div>
           </div>
        </div>
      </section>

      {/* --- Page 3: Seasonal Food --- */}
      <section className="py-20 px-6 bg-stone-100">
        <div className="text-center mb-10">
           <h2 className="text-2xl font-serif font-bold text-plough-green-900 mb-2">二、十二月令·顺时而食</h2>
           <p className="text-xs text-stone-500 font-serif">每一粒米，都听过节气的风声</p>
        </div>

        <div className="space-y-4">
           <SeasonCard 
             icon={Sprout} title="春生 · 养肝" color="text-green-600" bg="bg-green-50"
             months={[
                { m: '正月', rice: '春台米', food: '咬春吃春饼，发散陈寒' },
                { m: '二月', rice: '醒土米', food: '菠菜猪肝粥，清肝明目' },
                { m: '三月', rice: '秧苗米', food: '香椿拌饭，健脾化湿' }
             ]}
           />
           <SeasonCard 
             icon={Sun} title="夏长 · 养心" color="text-red-500" bg="bg-red-50"
             months={[
                { m: '四月', rice: '小满米', food: '红豆薏米饭，相思养心' },
                { m: '五月', rice: '力耕米', food: '苦瓜排骨煲，清心降火' },
                { m: '六月', rice: '清凉米', food: '荷叶绿豆粥，清暑利湿' }
             ]}
           />
           <SeasonCard 
             icon={Leaf} title="秋收 · 润肺" color="text-orange-500" bg="bg-orange-50"
             months={[
                { m: '七月', rice: '报秋米', food: '百合莲子饭，百年好合' },
                { m: '八月', rice: '尝新米', food: '猪油拌饭，品味本真' },
                { m: '九月', rice: '凝香米', food: '山药红枣糕，蒸蒸日上' }
             ]}
           />
           <SeasonCard 
             icon={Snowflake} title="冬藏 · 补肾" color="text-blue-500" bg="bg-blue-50"
             months={[
                { m: '十月', rice: '满仓米', food: '黑芝麻核桃饭，积淀能量' },
                { m: '冬月', rice: '团圆米', food: '羊肉萝卜饭，暖意洋洋' },
                { m: '腊月', rice: '福满米', food: '腊八五谷粥，万事圆满' }
             ]}
           />
        </div>
      </section>

      {/* --- Page 4: Four Privileges --- */}
      <section className="py-20 px-6 bg-[#FDFCF8]">
         <h2 className="text-2xl font-serif font-bold text-plough-green-900 text-center mb-12">
            三、四大部落特权
         </h2>
         <div className="grid grid-cols-1 gap-8">
            <PrivilegeBlock 
               icon={Gift} 
               title="有机盲盒·大山的惊喜" 
               desc="可能是春天的野蜂蜜，夏天的酸汤底料，秋天的非遗草编。您不仅是吃米的人，更是我们的“新品体验官”。" 
            />
            <PrivilegeBlock 
               icon={Mail} 
               title="一封家书·见信如晤" 
               desc="告诉您老牛“大黄”的近况，聊聊秧苗长多高了。通过小程序回信，建立与土地的情感连接。" 
            />
            <PrivilegeBlock 
               icon={Tent} 
               title="田园民宿·诗意栖居" 
               desc="开卡即送专属权益卡。看云卷云舒，捉鱼摸虾，享受会员专属折扣与优先预订权。" 
            />
            <PrivilegeBlock 
               icon={Users} 
               title="社群共庆·双向奔赴" 
               desc="春耕节插秧，秋收节吃长桌宴。在城市举办有机生活沙龙，把日子过得健康又精致。" 
            />
         </div>
      </section>

      {/* --- Page 5: Currency --- */}
      <section className="py-20 px-6 pb-32 bg-plough-green-50">
         <h2 className="text-2xl font-serif font-bold text-plough-green-900 text-center mb-10">
            四、牛耕通宝·越吃越省
         </h2>
         <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
               <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 shrink-0">
                  <Wheat size={24} />
               </div>
               <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">稻穗分 (积分)</h3>
                  <p className="text-xs text-stone-500 mb-2">消费、互动、回信都能赚</p>
                  <p className="text-sm text-stone-700 font-serif">👉 兑换免费民宿住宿、捉鱼体验、限量周边帆布袋。</p>
               </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
               <div className="bg-plough-green-100 p-3 rounded-full text-plough-green-700 shrink-0">
                  <Coins size={24} />
               </div>
               <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">金谷粒 (代币)</h3>
                  <p className="text-xs text-stone-500 mb-2">充值即送，直接当钱花</p>
                  <p className="text-sm text-stone-700 font-serif">👉 购买“牛耕·金谷卡”或充值，享全场折上折，预定民宿更是低至9折。</p>
               </div>
            </div>
         </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 z-40 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] max-w-md mx-auto">
         <button onClick={onBack} className="w-full bg-plough-green-900 text-white py-4 rounded-full font-serif font-bold shadow-lg shadow-plough-green-900/20 active:scale-95 transition-transform">
            立即加入守护人
         </button>
      </div>
      
      <style>{`.pb-safe { padding-bottom: max(env(safe-area-inset-bottom, 20px), 20px); }`}</style>
    </div>
  );
};

// --- Sub Components ---

const BenefitRow: React.FC<{ title: string; desc: string; dark?: boolean }> = ({ title, desc, dark }) => (
  <div className="flex flex-col gap-1">
     <h4 className={`text-sm font-bold ${dark ? 'text-white' : 'text-stone-900'}`}>{title}</h4>
     <p className={`text-xs ${dark ? 'text-white/60' : 'text-stone-500'} leading-relaxed`}>{desc}</p>
  </div>
);

const PriceBox: React.FC<{ label: string; price: string; save: string; isMain?: boolean; dark?: boolean }> = ({ label, price, save, isMain, dark }) => {
   const borderColor = isMain 
      ? (dark ? 'border-plough-green-400' : 'border-plough-green-600') 
      : 'border-transparent';
   const bgClass = isMain
      ? (dark ? 'bg-plough-green-900/50' : 'bg-white')
      : 'bg-transparent';
      
   return (
      <div className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg border-2 ${borderColor} ${bgClass} relative`}>
         {isMain && <div className="absolute -top-2.5 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm">推荐</div>}
         <span className={`text-[10px] ${dark ? 'text-white/70' : 'text-stone-500'}`}>{label}</span>
         <span className={`text-lg font-bold font-serif ${dark ? 'text-white' : 'text-stone-900'}`}>¥{price}</span>
         <span className={`text-[9px] ${dark ? 'text-plough-green-300' : 'text-plough-green-700'}`}>省 ¥{save}</span>
      </div>
   )
};

const SeasonCard: React.FC<{ icon: any, title: string, color: string, bg: string, months: {m:string, rice:string, food:string}[] }> = ({ icon: Icon, title, color, bg, months }) => (
   <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className={`${bg} p-3 flex items-center justify-center gap-2`}>
         <Icon size={18} className={color} />
         <span className={`font-serif font-bold ${color}`}>{title}</span>
      </div>
      <div className="p-4 space-y-3">
         {months.map((item, idx) => (
            <div key={idx} className="flex text-sm">
               <span className="w-12 text-stone-400 font-serif shrink-0">{item.m}</span>
               <div className="flex-1">
                  <span className="font-bold text-stone-800 mr-2">{item.rice}</span>
                  <span className="text-stone-500 text-xs">{item.food}</span>
               </div>
            </div>
         ))}
      </div>
   </div>
);

const PrivilegeBlock: React.FC<{ icon: any, title: string, desc: string }> = ({ icon: Icon, title, desc }) => (
   <div className="flex gap-4">
      <div className="w-12 h-12 bg-plough-green-50 rounded-2xl flex items-center justify-center text-plough-green-800 shrink-0">
         <Icon size={24} strokeWidth={1.5} />
      </div>
      <div>
         <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">{title}</h3>
         <p className="text-sm text-stone-600 leading-relaxed font-serif text-justify">{desc}</p>
      </div>
   </div>
);

export default BenefitsManualView;
