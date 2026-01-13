import React, { useState } from 'react';
import { ArrowLeft, Wheat, TrendingUp, TrendingDown, Calendar, Clock, Gift, ShoppingCart, Award, Sparkles, Info, ChevronRight } from 'lucide-react';

interface PointsViewProps {
  onBack: () => void;
  currentPoints: number;
}

interface PointsHistory {
  id: string;
  type: 'earn' | 'spend' | 'expire' | 'gift';
  title: string;
  description: string;
  amount: number;
  date: string;
  time: string;
  orderId?: string;
  source?: string;
}

const MOCK_HISTORY: PointsHistory[] = [
  {
    id: 'P001',
    type: 'earn',
    title: '商城消费',
    description: '购买梯田有机胚芽米',
    amount: 128,
    date: '2024.05.20',
    time: '14:30',
    orderId: 'ORD-20240520-01',
    source: '消费获得'
  },
  {
    id: 'P002',
    type: 'earn',
    title: '邀请好友',
    description: '成功邀请好友注册',
    amount: 200,
    date: '2024.05.18',
    time: '10:15',
    source: '邀请奖励'
  },
  {
    id: 'P003',
    type: 'spend',
    title: '积分抵扣',
    description: '订单支付时使用',
    amount: -50,
    date: '2024.05.15',
    time: '16:45',
    orderId: 'ORD-20240515-01',
    source: '消费抵扣'
  },
  {
    id: 'P004',
    type: 'earn',
    title: '每日签到',
    description: '连续签到第7天',
    amount: 10,
    date: '2024.05.14',
    time: '09:00',
    source: '签到奖励'
  },
  {
    id: 'P005',
    type: 'earn',
    title: '会员开卡',
    description: '开通守望·丰仓卡',
    amount: 500,
    date: '2024.05.01',
    time: '11:20',
    source: '开卡奖励'
  },
  {
    id: 'P006',
    type: 'spend',
    title: '兑换商品',
    description: '兑换限量周边帆布袋',
    amount: -300,
    date: '2024.04.28',
    time: '15:30',
    orderId: 'EXC-20240428-01',
    source: '积分兑换'
  },
  {
    id: 'P007',
    type: 'earn',
    title: '用户调研',
    description: '完成问卷调研',
    amount: 50,
    date: '2024.04.25',
    time: '13:10',
    source: '活动奖励'
  },
  {
    id: 'P008',
    type: 'earn',
    title: '回信互动',
    description: '收到农场主回信',
    amount: 20,
    date: '2024.04.20',
    time: '10:00',
    source: '互动奖励'
  },
  {
    id: 'P009',
    type: 'expire',
    title: '积分过期',
    description: '部分积分已过期',
    amount: -100,
    date: '2024.04.15',
    time: '00:00',
    source: '系统自动'
  },
  {
    id: 'P010',
    type: 'gift',
    title: '生日礼包',
    description: '生日月专属奖励',
    amount: 200,
    date: '2024.04.10',
    time: '08:00',
    source: '生日福利'
  }
];

const PointsView: React.FC<PointsViewProps> = ({ onBack, currentPoints }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [selectedHistory, setSelectedHistory] = useState<PointsHistory | null>(null);

  const totalEarned = MOCK_HISTORY.filter(h => h.type === 'earn' || h.type === 'gift').reduce((sum, h) => sum + h.amount, 0);
  const totalSpent = Math.abs(MOCK_HISTORY.filter(h => h.type === 'spend').reduce((sum, h) => sum + h.amount, 0));
  const totalExpired = Math.abs(MOCK_HISTORY.filter(h => h.type === 'expire').reduce((sum, h) => sum + h.amount, 0));

  const getHistoryIcon = (type: PointsHistory['type']) => {
    switch (type) {
      case 'earn':
        return <TrendingUp size={18} className="text-plough-green-600" />;
      case 'spend':
        return <TrendingDown size={18} className="text-orange-600" />;
      case 'expire':
        return <Clock size={18} className="text-stone-400" />;
      case 'gift':
        return <Gift size={18} className="text-amber-600" />;
    }
  };

  const getHistoryBgColor = (type: PointsHistory['type']) => {
    switch (type) {
      case 'earn':
        return 'bg-plough-green-50';
      case 'spend':
        return 'bg-orange-50';
      case 'expire':
        return 'bg-stone-100';
      case 'gift':
        return 'bg-amber-50';
    }
  };

  const getTypeLabel = (type: PointsHistory['type']) => {
    switch (type) {
      case 'earn':
        return '获得';
      case 'spend':
        return '消费';
      case 'expire':
        return '过期';
      case 'gift':
        return '赠送';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] animate-fade-in pb-10 relative font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-stone-100 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-stone-700" />
        </button>
        <h1 className="text-base font-serif font-bold text-stone-900">稻穗分</h1>
        <div className="w-10"></div>
      </div>

      {/* Points Summary Card */}
      <div className="px-4 mt-4 mb-4">
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Wheat size={24} className="text-white" />
              <span className="text-sm font-bold opacity-90">当前稻穗分</span>
            </div>
            <div className="text-5xl font-serif font-bold mb-1">{currentPoints.toLocaleString()}</div>
            <p className="text-xs text-white/80">消费、互动、回信都能赚</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp size={16} className="text-plough-green-600" />
              <div className="text-xl font-serif font-bold text-plough-green-600">{totalEarned.toLocaleString()}</div>
            </div>
            <div className="text-xs text-stone-500">累计获得</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingDown size={16} className="text-orange-600" />
              <div className="text-xl font-serif font-bold text-orange-600">{totalSpent.toLocaleString()}</div>
            </div>
            <div className="text-xs text-stone-500">累计消费</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={16} className="text-stone-400" />
              <div className="text-xl font-serif font-bold text-stone-400">{totalExpired.toLocaleString()}</div>
            </div>
            <div className="text-xs text-stone-500">已过期</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 bg-stone-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-stone-600'
            }`}
          >
            积分说明
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
      <div className="px-4">
        {activeTab === 'overview' ? (
          <div className="space-y-4">
            {/* How to Earn */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-plough-green-600" />
                <h3 className="text-base font-serif font-bold text-stone-900">如何获得稻穗分</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-plough-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <ShoppingCart size={16} className="text-plough-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900 mb-1">商城消费</p>
                    <p className="text-xs text-stone-600">每消费1元获得1稻穗分</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-plough-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <Gift size={16} className="text-plough-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900 mb-1">邀请好友</p>
                    <p className="text-xs text-stone-600">成功邀请好友注册可获得200稻穗分</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-plough-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <Award size={16} className="text-plough-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900 mb-1">每日签到</p>
                    <p className="text-xs text-stone-600">连续签到可获得额外奖励</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-plough-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-plough-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900 mb-1">互动回信</p>
                    <p className="text-xs text-stone-600">收到农场主回信可获得20稻穗分</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Gift size={20} className="text-orange-600" />
                <h3 className="text-base font-serif font-bold text-stone-900">如何使用稻穗分</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                    <ShoppingCart size={16} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900 mb-1">商城抵扣</p>
                    <p className="text-xs text-stone-600">100稻穗分 = 1元，可在结算时抵扣</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                    <Award size={16} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900 mb-1">兑换商品</p>
                    <p className="text-xs text-stone-600">兑换免费民宿住宿、捉鱼体验、限量周边</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-stone-50 rounded-xl p-5">
              <div className="flex items-start gap-2">
                <Info size={18} className="text-stone-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-stone-900 mb-2">使用规则</p>
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <p>• 稻穗分有效期为获得后12个月</p>
                    <p>• 积分不可转让、不可提现</p>
                    <p>• 部分商品可能不支持积分抵扣</p>
                    <p>• 积分使用规则以实际页面显示为准</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* History Tab */
          <div className="space-y-3">
            {MOCK_HISTORY.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedHistory(item)}
                className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getHistoryBgColor(item.type)} shrink-0`}>
                    {getHistoryIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-stone-900 truncate">{item.title}</p>
                        <p className="text-xs text-stone-500 truncate">{item.description}</p>
                      </div>
                      <div className={`text-base font-serif font-bold ml-2 shrink-0 ${
                        item.amount > 0 ? 'text-plough-green-600' : 'text-orange-600'
                      }`}>
                        {item.amount > 0 ? '+' : ''}{item.amount}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-stone-400 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{item.date}</span>
                        <span className="mx-1">·</span>
                        <Clock size={12} />
                        <span>{item.time}</span>
                      </div>
                      {item.source && (
                        <span className="text-stone-400">{item.source}</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-stone-300 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History Detail Modal */}
      {selectedHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedHistory(null)}>
          <div
            className="w-full bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl ${getHistoryBgColor(selectedHistory.type)}`}>
                {getHistoryIcon(selectedHistory.type)}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-serif font-bold text-stone-900">{selectedHistory.title}</h2>
                <p className="text-sm text-stone-500">{selectedHistory.description}</p>
              </div>
              <div className={`text-2xl font-serif font-bold ${
                selectedHistory.amount > 0 ? 'text-plough-green-600' : 'text-orange-600'
              }`}>
                {selectedHistory.amount > 0 ? '+' : ''}{selectedHistory.amount}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-500">类型</span>
                    <span className="text-sm font-bold text-stone-900">{getTypeLabel(selectedHistory.type)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-500">日期</span>
                    <span className="text-sm font-bold text-stone-900">{selectedHistory.date} {selectedHistory.time}</span>
                  </div>
                  {selectedHistory.orderId && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-stone-500">订单号</span>
                      <span className="text-sm font-bold text-stone-900">{selectedHistory.orderId}</span>
                    </div>
                  )}
                  {selectedHistory.source && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-stone-500">来源</span>
                      <span className="text-sm font-bold text-stone-900">{selectedHistory.source}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedHistory.orderId && (
                <button className="w-full bg-gradient-to-br from-orange-400 to-orange-600 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform">
                  查看订单详情
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsView;

