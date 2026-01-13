
import React, { useState } from 'react';
import { ArrowLeft, TicketPercent, Calendar, Clock, CheckCircle, XCircle, ChevronRight, Info } from 'lucide-react';

interface CouponViewProps {
  onBack: () => void;
}

interface Coupon {
  id: string;
  name: string;
  type: 'discount' | 'cash' | 'gift';
  value: string;
  description: string;
  validFrom: string;
  validUntil: string;
  status: 'available' | 'used' | 'expired';
  minAmount?: number;
  applicableProducts?: string[];
  usedAt?: string;
  usedOrder?: string;
}

interface CouponHistory {
  id: string;
  couponName: string;
  action: 'received' | 'used' | 'expired';
  date: string;
  orderId?: string;
  amount?: string;
}

const MOCK_COUPONS: Coupon[] = [
  {
    id: 'COU001',
    name: '有机米优惠券',
    type: 'cash',
    value: '50元',
    description: '满200元可用',
    validFrom: '2024.05.01',
    validUntil: '2024.12.31',
    status: 'available',
    minAmount: 200,
    applicableProducts: ['梯田有机胚芽米', '高山云雾绿茶']
  },
  {
    id: 'COU002',
    name: '新会员专享券',
    type: 'discount',
    value: '8折',
    description: '民宿预订专用',
    validFrom: '2024.06.01',
    validUntil: '2024.09.30',
    status: 'available',
    applicableProducts: ['民宿预订']
  },
  {
    id: 'COU003',
    name: '满减优惠券',
    type: 'cash',
    value: '30元',
    description: '满150元可用',
    validFrom: '2024.04.01',
    validUntil: '2024.05.31',
    status: 'used',
    minAmount: 150,
    usedAt: '2024.05.15',
    usedOrder: 'ORD-20240515-01'
  },
  {
    id: 'COU004',
    name: '春季特惠券',
    type: 'discount',
    value: '9折',
    description: '全场通用',
    validFrom: '2024.03.01',
    validUntil: '2024.04.30',
    status: 'expired'
  }
];

const MOCK_HISTORY: CouponHistory[] = [
  {
    id: 'H001',
    couponName: '满减优惠券',
    action: 'used',
    date: '2024.05.15',
    orderId: 'ORD-20240515-01',
    amount: '30元'
  },
  {
    id: 'H002',
    couponName: '春季特惠券',
    action: 'expired',
    date: '2024.04.30'
  },
  {
    id: 'H003',
    couponName: '有机米优惠券',
    action: 'received',
    date: '2024.05.01'
  },
  {
    id: 'H004',
    couponName: '新会员专享券',
    action: 'received',
    date: '2024.06.01'
  },
  {
    id: 'H005',
    couponName: '开卡礼券',
    action: 'used',
    date: '2024.03.20',
    orderId: 'ORD-20240320-02',
    amount: '50元'
  }
];

const CouponView: React.FC<CouponViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'available' | 'history'>('available');
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const availableCoupons = MOCK_COUPONS.filter(c => c.status === 'available');
  const usedCoupons = MOCK_COUPONS.filter(c => c.status === 'used');
  const expiredCoupons = MOCK_COUPONS.filter(c => c.status === 'expired');

  const getCouponBgColor = (coupon: Coupon) => {
    if (coupon.status === 'expired') return 'bg-stone-100';
    if (coupon.status === 'used') return 'bg-stone-50';
    if (coupon.type === 'cash') return 'bg-gradient-to-br from-orange-400 to-orange-600';
    if (coupon.type === 'discount') return 'bg-gradient-to-br from-plough-green-500 to-plough-green-700';
    return 'bg-gradient-to-br from-amber-400 to-amber-600';
  };

  const getStatusIcon = (status: Coupon['status']) => {
    if (status === 'used') return <CheckCircle size={16} className="text-stone-400" />;
    if (status === 'expired') return <XCircle size={16} className="text-stone-400" />;
    return null;
  };

  const getStatusText = (status: Coupon['status']) => {
    if (status === 'used') return '已使用';
    if (status === 'expired') return '已过期';
    return '可使用';
  };

  const getHistoryIcon = (action: CouponHistory['action']) => {
    if (action === 'received') return <TicketPercent size={16} className="text-plough-green-600" />;
    if (action === 'used') return <CheckCircle size={16} className="text-orange-600" />;
    return <XCircle size={16} className="text-stone-400" />;
  };

  const getHistoryText = (action: CouponHistory['action']) => {
    if (action === 'received') return '获得';
    if (action === 'used') return '已使用';
    return '已过期';
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] animate-fade-in pb-10 relative font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-stone-100 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-stone-700" />
        </button>
        <h1 className="text-base font-serif font-bold text-stone-900">我的卡券</h1>
        <div className="w-10"></div>
      </div>

      {/* Stats Summary */}
      <div className="px-4 mt-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-serif font-bold text-orange-600">{availableCoupons.length}</div>
            <div className="text-xs text-stone-500 mt-1">可使用</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-serif font-bold text-stone-600">{usedCoupons.length}</div>
            <div className="text-xs text-stone-500 mt-1">已使用</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-serif font-bold text-stone-400">{expiredCoupons.length}</div>
            <div className="text-xs text-stone-500 mt-1">已过期</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 bg-stone-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'available'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-stone-600'
            }`}
          >
            我的卡券
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-stone-600'
            }`}
          >
            历史记录
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {activeTab === 'available' ? (
          <>
            {/* Available Coupons */}
            {availableCoupons.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-stone-700 mb-3">可使用 ({availableCoupons.length})</h3>
                <div className="space-y-3">
                  {availableCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      onClick={() => setSelectedCoupon(coupon)}
                      className={`${getCouponBgColor(coupon)} rounded-2xl p-4 text-white shadow-md cursor-pointer active:scale-[0.98] transition-transform relative overflow-hidden`}
                    >
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <TicketPercent size={20} className="text-white" />
                              <span className="text-sm font-bold">{coupon.name}</span>
                            </div>
                            <p className="text-xs text-white/90">{coupon.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-serif font-bold">{coupon.value}</div>
                            {coupon.minAmount && (
                              <div className="text-[10px] text-white/80 mt-1">满{coupon.minAmount}元</div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-white/80 border-t border-white/20 pt-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>有效期至 {coupon.validUntil}</span>
                          </div>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Used Coupons */}
            {usedCoupons.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-stone-700 mb-3">已使用 ({usedCoupons.length})</h3>
                <div className="space-y-3">
                  {usedCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      onClick={() => setSelectedCoupon(coupon)}
                      className="bg-stone-50 border border-stone-200 rounded-2xl p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <TicketPercent size={18} className="text-stone-400" />
                          <span className="text-sm font-bold text-stone-700">{coupon.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-400">
                          {getStatusIcon(coupon.status)}
                          <span className="text-xs">{getStatusText(coupon.status)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-stone-500">
                        <span>{coupon.value} · {coupon.description}</span>
                        {coupon.usedAt && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {coupon.usedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expired Coupons */}
            {expiredCoupons.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-stone-700 mb-3">已过期 ({expiredCoupons.length})</h3>
                <div className="space-y-3">
                  {expiredCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      onClick={() => setSelectedCoupon(coupon)}
                      className="bg-stone-100 border border-stone-200 rounded-2xl p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform opacity-60"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <TicketPercent size={18} className="text-stone-400" />
                          <span className="text-sm font-bold text-stone-500">{coupon.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-400">
                          {getStatusIcon(coupon.status)}
                          <span className="text-xs">{getStatusText(coupon.status)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-stone-400">
                        {coupon.value} · {coupon.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {MOCK_COUPONS.length === 0 && (
              <div className="text-center py-12">
                <TicketPercent size={48} className="text-stone-300 mx-auto mb-3" />
                <p className="text-stone-400 text-sm">暂无优惠券</p>
              </div>
            )}
          </>
        ) : (
          /* History Tab */
          <div className="space-y-3">
            {MOCK_HISTORY.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-stone-100"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.action === 'received' ? 'bg-plough-green-50' :
                    item.action === 'used' ? 'bg-orange-50' : 'bg-stone-100'
                  }`}>
                    {getHistoryIcon(item.action)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-bold text-stone-900">{item.couponName}</span>
                      <span className={`text-xs font-bold ${
                        item.action === 'received' ? 'text-plough-green-600' :
                        item.action === 'used' ? 'text-orange-600' : 'text-stone-400'
                      }`}>
                        {getHistoryText(item.action)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-stone-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{item.date}</span>
                      </div>
                      {item.orderId && (
                        <span>订单：{item.orderId}</span>
                      )}
                      {item.amount && (
                        <span className="text-orange-600 font-bold">{item.amount}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coupon Detail Modal */}
      {selectedCoupon && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedCoupon(null)}>
          <div
            className="w-full bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4"></div>
            
            <div className={`${getCouponBgColor(selectedCoupon)} rounded-2xl p-6 text-white mb-6 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <TicketPercent size={24} />
                  <h2 className="text-xl font-serif font-bold">{selectedCoupon.name}</h2>
                </div>
                <div className="text-4xl font-serif font-bold mb-2">{selectedCoupon.value}</div>
                <p className="text-sm text-white/90 mb-4">{selectedCoupon.description}</p>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <Calendar size={12} />
                  <span>有效期：{selectedCoupon.validFrom} 至 {selectedCoupon.validUntil}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedCoupon.minAmount && (
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Info size={16} className="text-stone-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-stone-900 mb-1">使用条件</p>
                      <p className="text-xs text-stone-600">满{selectedCoupon.minAmount}元可用</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedCoupon.applicableProducts && selectedCoupon.applicableProducts.length > 0 && (
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Info size={16} className="text-stone-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-stone-900 mb-1">适用范围</p>
                      <div className="space-y-1">
                        {selectedCoupon.applicableProducts.map((product, idx) => (
                          <p key={idx} className="text-xs text-stone-600">• {product}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedCoupon.status === 'used' && selectedCoupon.usedAt && (
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-stone-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-stone-900 mb-1">使用信息</p>
                      <p className="text-xs text-stone-600">使用时间：{selectedCoupon.usedAt}</p>
                      {selectedCoupon.usedOrder && (
                        <p className="text-xs text-stone-600">订单号：{selectedCoupon.usedOrder}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedCoupon.status === 'expired' && (
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <XCircle size={16} className="text-stone-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-stone-900 mb-1">状态</p>
                      <p className="text-xs text-stone-600">此优惠券已过期</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedCoupon.status === 'available' && (
                <button className="w-full bg-gradient-to-br from-orange-400 to-orange-600 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform">
                  立即使用
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponView;

