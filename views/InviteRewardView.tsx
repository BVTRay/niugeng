
import React, { useState } from 'react';
import { ArrowLeft, Share2, Copy, CheckCircle2, Gift, Users, TicketPercent, Package, Sparkles, QrCode, UserPlus, Trophy, Award } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface InviteRewardViewProps {
  onBack: () => void;
}

// 奖励等级配置
const REWARD_TIERS = [
  {
    id: 'tier1',
    target: 5,
    rewards: [
      { type: 'points', value: 1000, label: '积分' },
      { type: 'coupon', value: 1, discount: 8, label: '8折民宿体验券' }
    ],
    completed: false
  },
  {
    id: 'tier2',
    target: 10,
    rewards: [
      { type: 'points', value: 3000, label: '积分' },
      { type: 'coupon', value: 2, discount: 7, label: '7折民宿体验券' },
      { type: 'gift', value: 1, label: '5斤装大礼包' }
    ],
    completed: false
  }
];

// 模拟已邀请用户数据
const MOCK_INVITED_USERS = [
  { id: 1, name: '张**', phone: '138****5678', registeredAt: '2024.05.15', status: 'registered' },
  { id: 2, name: '李**', phone: '139****9012', registeredAt: '2024.05.18', status: 'registered' },
  { id: 3, name: '王**', phone: '136****3456', registeredAt: '2024.05.20', status: 'registered' },
];

const InviteRewardView: React.FC<InviteRewardViewProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const inviteCode = 'NBGB2024';
  const inviteLink = `https://ploughtribe.com/invite/${inviteCode}`;
  const currentInvites = MOCK_INVITED_USERS.length; // 当前邀请数量

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierProgress = (tier: typeof REWARD_TIERS[0]) => {
    const progress = Math.min((currentInvites / tier.target) * 100, 100);
    const isCompleted = currentInvites >= tier.target;
    return { progress, isCompleted };
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] animate-fade-in pb-10 relative font-sans">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-stone-100 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-stone-700" />
        </button>
        <h1 className="text-base font-serif font-bold text-stone-900">邀请有礼</h1>
        <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
          <Share2 size={20} className="text-stone-700" />
        </button>
      </div>

      <div className="px-4 space-y-6 mt-4">
        
        {/* Hero Section - 邀请码卡片 */}
        <div className="bg-gradient-to-br from-plough-green-900 via-plough-green-800 to-plough-green-950 rounded-3xl p-6 relative overflow-hidden shadow-xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <BrandLogo className="absolute -right-8 -bottom-8 w-40 h-40 text-white" />
          </div>
          
          <div className="relative z-10">
            {/* Title */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <Gift size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white">邀请好友注册</h2>
                <p className="text-xs text-white/70 mt-0.5">分享邀请码，好友注册即得奖励</p>
              </div>
            </div>

            {/* Invite Code Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/70 font-medium">我的邀请码</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors border border-white/20"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={14} className="text-white" />
                      <span className="text-xs text-white font-medium">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-white" />
                      <span className="text-xs text-white font-medium">复制</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-serif font-black text-plough-green-900 tracking-wider">{inviteCode}</p>
                </div>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/30 transition-colors"
                >
                  <QrCode size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
                <Share2 size={18} className="text-white" />
                <span className="text-sm font-medium text-white">分享链接</span>
              </button>
              <button className="bg-white text-plough-green-900 rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors font-bold">
                <UserPlus size={18} />
                <span className="text-sm">邀请好友</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Section - 当前进度 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-plough-green-600" />
              <h3 className="text-base font-serif font-bold text-stone-900">邀请进度</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-serif font-black text-plough-green-900">{currentInvites}</p>
              <p className="text-xs text-stone-400">已邀请人数</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4">
            {REWARD_TIERS.map((tier) => {
              const { progress, isCompleted } = getTierProgress(tier);
              return (
                <div key={tier.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-700">
                      邀请 {tier.target} 人
                    </span>
                    <span className="text-xs text-stone-400">
                      {currentInvites}/{tier.target}
                    </span>
                  </div>
                  <div className="relative h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-plough-green-500 to-plough-green-600'
                          : 'bg-gradient-to-r from-orange-400 to-orange-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {isCompleted && (
                    <div className="flex items-center gap-1 text-xs text-plough-green-600">
                      <CheckCircle2 size={12} />
                      <span className="font-medium">已完成，可领取奖励</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rewards Section - 奖励规则 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={20} className="text-orange-500" />
            <h3 className="text-base font-serif font-bold text-stone-900">奖励规则</h3>
          </div>

          <div className="space-y-4">
            {REWARD_TIERS.map((tier, index) => {
              const { isCompleted } = getTierProgress(tier);
              return (
                <div
                  key={tier.id}
                  className={`rounded-xl p-4 border-2 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-plough-green-50 to-plough-green-100/50 border-plough-green-300'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isCompleted
                            ? 'bg-plough-green-500 text-white'
                            : 'bg-stone-300 text-stone-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900">邀请 {tier.target} 人注册</h4>
                        <p className="text-xs text-stone-500 mt-0.5">完成即可领取</p>
                      </div>
                    </div>
                    {isCompleted && (
                      <Award size={20} className="text-plough-green-600" />
                    )}
                  </div>

                  {/* Rewards List */}
                  <div className="space-y-2 pl-10">
                    {tier.rewards.map((reward, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        {reward.type === 'points' && (
                          <>
                            <Sparkles size={16} className="text-orange-500" />
                            <span className="text-stone-700">
                              <span className="font-bold text-orange-600">{reward.value}</span> {reward.label}
                            </span>
                          </>
                        )}
                        {reward.type === 'coupon' && (
                          <>
                            <TicketPercent size={16} className="text-plough-green-600" />
                            <span className="text-stone-700">
                              <span className="font-bold text-plough-green-600">{reward.value}张</span> {reward.label}
                            </span>
                          </>
                        )}
                        {reward.type === 'gift' && (
                          <>
                            <Package size={16} className="text-amber-600" />
                            <span className="text-stone-700">
                              <span className="font-bold text-amber-600">{reward.value}份</span> {reward.label}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Claim Button */}
                  {isCompleted && (
                    <button className="mt-3 ml-10 w-full max-w-[200px] bg-plough-green-600 text-white py-2 px-4 rounded-lg text-sm font-bold hover:bg-plough-green-700 transition-colors active:scale-95">
                      立即领取
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Invited Users List - 已邀请用户 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserPlus size={20} className="text-plough-green-600" />
              <h3 className="text-base font-serif font-bold text-stone-900">已邀请好友</h3>
            </div>
            <span className="text-xs text-stone-400">{MOCK_INVITED_USERS.length} 人</span>
          </div>

          {MOCK_INVITED_USERS.length > 0 ? (
            <div className="space-y-3">
              {MOCK_INVITED_USERS.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-plough-green-100 rounded-full flex items-center justify-center">
                      <span className="text-plough-green-700 font-bold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900">{user.name}</p>
                      <p className="text-xs text-stone-400">{user.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-plough-green-600 mb-0.5">
                      <CheckCircle2 size={12} />
                      <span className="font-medium">已注册</span>
                    </div>
                    <p className="text-[10px] text-stone-400">{user.registeredAt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-stone-400">
              <UserPlus size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">还没有邀请好友</p>
              <p className="text-xs mt-1">分享邀请码，邀请好友注册吧</p>
            </div>
          )}
        </div>

        {/* Rules Section - 活动规则 */}
        <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
          <h3 className="text-sm font-bold text-stone-900 mb-3">活动规则</h3>
          <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
            <p>1. 好友通过您的邀请码注册成功后，即计入您的邀请人数</p>
            <p>2. 邀请人数达到对应等级后，即可领取相应奖励</p>
            <p>3. 奖励将在24小时内发放到您的账户</p>
            <p>4. 积分可用于商城消费，优惠券可在预订民宿时使用</p>
            <p>5. 活动最终解释权归牛耕部落所有</p>
          </div>
        </div>

      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-xs mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-stone-900 mb-2">扫描二维码邀请</h3>
              <p className="text-xs text-stone-500">好友扫码即可注册</p>
            </div>
            <div className="w-64 h-64 bg-stone-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <QrCode size={120} className="text-stone-400" />
            </div>
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-stone-200 text-stone-700 py-3 rounded-xl font-medium hover:bg-stone-300 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default InviteRewardView;

