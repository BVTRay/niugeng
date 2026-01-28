
import React, { useState } from 'react';
import { ArrowLeft, Share2, ShoppingBag, Gift, Package, Tent, Mail, Users, Warehouse, Calendar, Sparkles, Flame, Info, QrCode } from 'lucide-react';

interface MembershipPaymentViewProps {
  initialTierId?: 'granary' | 'homestead';
  onBack: () => void;
  isTabView?: boolean; // 是否作为tab页面显示（不显示返回按钮）
  onNavigateToService?: () => void; // 跳转到客服
}

// 权益总览数据
const BENEFITS_OVERVIEW = [
  {
    icon: Warehouse,
    title: '核心粮仓',
    desc: '有机米（零售价¥25.8/斤），支持每月自由切换米种。',
    detail: '每月配送优质有机米，零售价¥25.8/斤。会员可自由选择不同米种，包括春台米、小满米等时令品种，确保新鲜度和口感。支持每月灵活切换，满足不同口味需求。'
  },
  {
    icon: Calendar,
    title: '四季风物礼',
    desc: '春/夏/秋/冬，每季度一次"牛耕部落严选"真有机大礼包。',
    detail: '每个季度（春/夏/秋/冬）配送一次"牛耕部落严选"真有机大礼包。礼包包含当季精选有机农产品，如野生蜂蜜、手工腊肉、时令野菜等，全部来自贵州黎平梯田，保证原生态品质。'
  },
  {
    icon: Package,
    title: '新品体验官',
    desc: '全年不定时掉落"新品试吃包"，单独免费发货，无需凑单。',
    detail: '全年不定时收到"新品试吃包"，包含牛耕部落最新研发或精选的有机产品。试吃包单独免费发货，无需凑单，让您第一时间体验新品，享受专属尝鲜权益。'
  },
  {
    icon: Tent,
    title: '住宿特权',
    desc: '赠送免房权益（需提前15天预定），全员享会员价续住。',
    detail: '会员享有免费住宿权益，需提前15天联系管家预定。入住期间，所有同行人员均可享受会员价续住优惠。在贵州黎平梯田民宿，体验原生态田园生活，感受梯田美景。'
  },
  {
    icon: Mail,
    title: '情感连接',
    desc: '实体证书、月度家书。',
    detail: '成为守护人后，将获得唯一编号的实体守护证书，见证您对梯田的守护承诺。每月随米箱附赠村长手写家书（复印版），讲述农作物生长故事、节气变化，建立情感连接。回信可参与"免费民宿体验"抽奖。'
  },
  {
    icon: Users,
    title: '溯源接待',
    desc: '守护人到店，老板/管家亲自接待喝茶。',
    detail: '当守护人到访贵州黎平牛耕部落时，老板或管家将亲自接待，为您泡茶聊天，介绍梯田文化、农耕故事。这是专属的溯源体验，让您深入了解有机农业的源头，感受人与土地的连接。'
  }
];

// 产品矩阵数据
const PRODUCTS = [
  {
    id: 'trial',
    tag: '尝鲜',
    tagColor: 'text-green-700',
    tagBgColor: 'bg-green-100',
    name: '耕友·季度体验卡',
    price: 698,
    discount: '9折',
    gift: '送四季礼1次',
    config: '30斤米（分3月发）+ 1次四季礼',
    accommodation: '享会员价。',
    originalValue: 974,
    originalBreakdown: '米774 + 礼200',
    save: 276,
    recommend: false
  },
  {
    id: 'light',
    tag: '轻量',
    tagColor: 'text-blue-700',
    tagBgColor: 'bg-blue-100',
    name: '守护·小户年卡',
    price: 1368,
    discount: '8.8折',
    gift: '送舒适房1间',
    config: '60斤米（分12月发）+ 4次四季礼 + 全年新品体验。',
    accommodation: '享会员价 + 赠送 1房晚·舒适房（价值¥668）',
    originalValue: 3016,
    originalBreakdown: '米1548 + 礼800 + 房668',
    save: 1618,
    recommend: false
  },
  {
    id: 'standard',
    tag: '标准',
    tagColor: 'text-orange-700',
    tagBgColor: 'bg-orange-100',
    name: '守护·家园年卡',
    price: 2480,
    discount: '8折',
    gift: '送豪华房1间',
    config: '120斤米（分12月发）+ 4次四季礼 + 全年新品体验。',
    accommodation: '享会员价 + 赠送 1房晚·豪华景观房（价值¥1288）。',
    originalValue: 5184,
    originalBreakdown: '米3096 + 礼800 + 房1288',
    save: 2604,
    recommend: true
  },
  {
    id: 'premium',
    tag: '尊享',
    tagColor: 'text-purple-700',
    tagBgColor: 'bg-purple-100',
    name: '守护·丰仓年卡',
    price: 4680,
    discount: '7.5折',
    gift: '送豪华房2间',
    config: '240斤米（分12月发）+ 4次四季礼 + 全年新品体验。',
    accommodation: '享会员价 + 赠送 1房晚·豪华景观房（价值¥1288）。',
    originalValue: 8280,
    originalBreakdown: '米6192 + 礼800 + 房1288',
    save: 3600,
    recommend: false
  }
];

const MembershipPaymentView: React.FC<MembershipPaymentViewProps> = ({ 
  initialTierId = 'homestead', 
  onBack, 
  isTabView = false,
  onNavigateToService 
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showProductDetail, setShowProductDetail] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showBenefitDetail, setShowBenefitDetail] = useState<number | null>(null);

  const selectedProduct = selectedProductId ? PRODUCTS.find(p => p.id === selectedProductId) : null;
  const detailProduct = showProductDetail ? PRODUCTS.find(p => p.id === showProductDetail) : null;

  const handleBuyNow = () => {
    if (!selectedProductId) {
      setShowPaymentModal(true);
    } else {
      // 执行支付逻辑
      console.log('支付产品:', selectedProductId);
    }
  };

  const handleLearnMore = () => {
    setShowServiceModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F5F4] animate-fade-in font-sans flex flex-col relative">
        
        {/* Header */}
        {!isTabView && (
          <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
            <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-100">
              <ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} />
            </button>
            <h1 className="font-serif font-bold text-lg text-stone-900 flex-1 text-center pr-8">云端</h1>
            <button className="p-1 rounded-full hover:bg-stone-100">
              <Share2 size={20} className="text-stone-600" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pb-32" style={{ paddingBottom: isTabView ? '140px' : '100px' }}>
          
          {/* 一、头部头图 */}
          <div className="relative w-full mb-0">
            <div className="relative w-full" style={{ aspectRatio: '3/1' }}>
              {/* 头图背景图片 */}
              <img 
                src="/header-banner.jpg" 
                alt="2026守护人计划" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 如果图片加载失败，显示渐变背景作为后备
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              {/* 后备渐变背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-plough-green-700 via-plough-green-800 to-plough-green-900" style={{ display: 'none' }}>
                {/* 装饰性元素 */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>

          {/* 二、权益总览卡片（2行3列，共6个）- 覆盖头图下部分 */}
          <div className="px-4 mb-6 -mt-8 relative z-10">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-stone-100">
              <h3 className="text-sm font-bold text-stone-900 mb-3">权益总览</h3>
              <div className="grid grid-cols-3 gap-2">
                {BENEFITS_OVERVIEW.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={index}
                      onClick={() => setShowBenefitDetail(index)}
                      className="flex flex-col items-center p-2 rounded-lg border border-plough-green-200 bg-plough-green-50 cursor-pointer transition-all active:scale-95 hover:bg-plough-green-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-plough-green-100 flex items-center justify-center mb-1.5">
                        <Icon size={16} className="text-plough-green-700" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-bold text-stone-900 text-center leading-tight mb-0.5">{benefit.title}</span>
                      <span className="text-[9px] text-stone-600 text-center leading-tight line-clamp-2">{benefit.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 三、产品矩阵（4个卡片） */}
          <div className="px-4 mb-6">
            <div className="space-y-3">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setShowProductDetail(product.id)}
                  className={`bg-white rounded-xl p-4 shadow-sm border-2 cursor-pointer transition-all active:scale-[0.98] ${
                    selectedProductId === product.id 
                      ? 'border-plough-green-600 bg-plough-green-50' 
                      : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${product.tagBgColor} ${product.tagColor}`}>
                        {product.tag}
                      </span>
                      {product.recommend && (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                          <Flame size={12} className="fill-current" />
                          推荐
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-serif font-bold text-stone-900">¥{product.price}</div>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>{product.discount}</span>
                        <span>|</span>
                        <span>{product.gift}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-stone-900">{product.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 四、底部Banner图 */}
          <div className="w-full mb-6">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/5', minHeight: '120px' }}>
              {/* Banner图片占位区域 - 可替换为实际图片 */}
              <div className="absolute inset-0 bg-gradient-to-br from-plough-green-700 via-plough-green-800 to-plough-green-900">
                {/* 装饰性元素 */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>
              
              {/* Banner上的文案 */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-white text-center">
                <p className="text-base font-serif font-bold mb-2 leading-relaxed">
                  无论您在哪里，我们在贵州牛耕部落为您留了一间房。
                </p>
                <p className="text-xs text-white/80">
                  提示：住宿需提前15天联系管家预定。
                </p>
              </div>
              
              {/* 这里可以替换为实际banner图片 */}
              {/* <img src="/path/to/banner-image.jpg" alt="溯源banner" className="w-full h-full object-cover" /> */}
            </div>
          </div>

        </div>
      </div>

      {/* 五、底部悬浮按钮 */}
      <div 
        className="fixed left-0 right-0 bg-white border-t border-stone-100 p-3 pb-safe z-[100] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]" 
        style={{ maxWidth: '448px', margin: '0 auto', bottom: isTabView ? '66px' : '0' }}
      >
        <div className="flex gap-3">
          <button 
            onClick={handleLearnMore}
            className="px-6 py-3 rounded-full font-bold text-sm bg-stone-100 text-stone-700 active:scale-95 transition-transform"
          >
            了解更多
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 px-6 py-3 rounded-full font-bold text-sm bg-plough-green-600 text-white active:scale-95 transition-transform"
          >
            立即购买
          </button>
        </div>
      </div>

      {/* 产品详情弹窗 */}
      {showProductDetail && detailProduct && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" 
            onClick={() => setShowProductDetail(null)}
          ></div>
          
          <div 
            className="bg-white w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl border-t border-stone-100 z-10 pointer-events-auto animate-slide-up max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-6"></div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${detailProduct.tagBgColor} ${detailProduct.tagColor}`}>
                  {detailProduct.tag}
                </span>
                {detailProduct.recommend && (
                  <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                    <Flame size={12} className="fill-current" />
                    推荐
                  </span>
                )}
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-4">{detailProduct.name}</h3>
              
              <div className="bg-stone-50 rounded-xl p-4 mb-4 border border-stone-100">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-stone-500 mb-1">配置：</p>
                    <p className="text-sm text-stone-900">{detailProduct.config}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">住宿权益：</p>
                    <p className="text-sm text-stone-900">{detailProduct.accommodation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">原价总值：</p>
                    <p className="text-sm text-stone-900">¥{detailProduct.originalValue} （{detailProduct.originalBreakdown}）</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-plough-green-50 rounded-xl border border-plough-green-200">
                <div>
                  <p className="text-xs text-stone-500 mb-1">守护价：</p>
                  <p className="text-2xl font-serif font-bold text-plough-green-900">¥{detailProduct.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-500 mb-1">立省：</p>
                  <p className="text-xl font-bold text-red-600">¥{detailProduct.save}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowProductDetail(null);
                  setShowServiceModal(true);
                }}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-stone-100 text-stone-700 active:scale-95 transition-transform"
              >
                了解详情
              </button>
              <button 
                onClick={() => {
                  setSelectedProductId(detailProduct.id);
                  setShowProductDetail(null);
                }}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-plough-green-600 text-white active:scale-95 transition-transform"
              >
                选择此方案
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 支付选择弹窗 */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" 
            onClick={() => setShowPaymentModal(false)}
          ></div>
          
          <div 
            className="bg-white w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl border-t border-stone-100 z-10 pointer-events-auto animate-slide-up max-h-[70vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-6"></div>
            
            <h3 className="text-lg font-bold text-stone-900 mb-4 text-center">选择购买方案</h3>
            
            <div className="space-y-3 mb-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setShowPaymentModal(false);
                    // 选择后直接执行支付逻辑
                    console.log('支付产品:', product.id);
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                    selectedProductId === product.id
                      ? 'border-plough-green-600 bg-plough-green-50'
                      : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${product.tagBgColor} ${product.tagColor}`}>
                          {product.tag}
                        </span>
                        <span className="text-sm font-bold text-stone-900">{product.name}</span>
                        {product.recommend && (
                          <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                            <Flame size={10} className="fill-current" />
                            推荐
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500">{product.gift}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-serif font-bold text-stone-900">¥{product.price}</div>
                      <div className="text-xs text-stone-400">{product.discount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowPaymentModal(false)}
              className="w-full px-4 py-3 rounded-xl font-bold text-sm bg-stone-100 text-stone-700 active:scale-95 transition-transform"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 客服弹窗（企业微信名片） */}
      {showServiceModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" 
            onClick={() => setShowServiceModal(false)}
          ></div>
          
          <div 
            className="bg-white w-full max-w-sm rounded-3xl p-6 relative shadow-2xl z-10 pointer-events-auto animate-fade-in mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-stone-900 mb-2">联系客服</h3>
              <p className="text-sm text-stone-500">扫描二维码添加企业微信</p>
            </div>
            
            {/* 二维码占位区域 */}
            <div className="bg-stone-100 rounded-xl p-8 mb-4 flex items-center justify-center border-2 border-dashed border-stone-300">
              <div className="text-center">
                <QrCode size={120} className="text-stone-400 mx-auto mb-2" />
                <p className="text-xs text-stone-400">企业微信二维码</p>
                <p className="text-xs text-stone-400 mt-1">（此处可替换为实际二维码图片）</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowServiceModal(false)}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-stone-100 text-stone-700 active:scale-95 transition-transform"
              >
                关闭
              </button>
              {onNavigateToService && (
                <button 
                  onClick={() => {
                    setShowServiceModal(false);
                    onNavigateToService();
                  }}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-plough-green-600 text-white active:scale-95 transition-transform"
                >
                  前往客服中心
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 权益详情弹窗 */}
      {showBenefitDetail !== null && BENEFITS_OVERVIEW[showBenefitDetail] && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" 
            onClick={() => setShowBenefitDetail(null)}
          ></div>
          
          <div 
            className="bg-white w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl border-t border-stone-100 z-10 pointer-events-auto animate-slide-up max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-6"></div>
            
            {(() => {
              const benefit = BENEFITS_OVERVIEW[showBenefitDetail];
              const Icon = benefit.icon;
              return (
                <div className="mb-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-plough-green-100 flex items-center justify-center shrink-0">
                      <Icon size={32} className="text-plough-green-700" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                  
                  <div className="bg-plough-green-50 rounded-xl p-4 border border-plough-green-200">
                    <p className="text-sm text-stone-700 leading-relaxed font-serif">{benefit.detail}</p>
                  </div>
                </div>
              );
            })()}

            <button 
              onClick={() => setShowBenefitDetail(null)}
              className="w-full px-4 py-3 rounded-xl font-bold text-sm bg-plough-green-600 text-white active:scale-95 transition-transform"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      <style>{`
        .pb-safe { padding-bottom: max(env(safe-area-inset-bottom, 20px), 20px); }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default MembershipPaymentView;
