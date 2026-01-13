
import React, { useState, useEffect } from 'react';
import { ArrowLeft, QrCode, Key, Crown, Ticket, CheckCircle2, XCircle, Loader2, ScanLine, Gift, Sparkles, History, Clock, Calendar, AlertCircle, Info } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface ExchangeCenterViewProps {
  onBack: () => void;
}

type ExchangeType = 'membership' | 'coupon' | null;
type ExchangeStatus = 'idle' | 'loading' | 'success' | 'error';

interface ExchangeResult {
  type: ExchangeType;
  message: string;
  data?: any;
  errorType?: 'invalid' | 'used' | 'expired' | 'format' | 'network';
}

interface ExchangeHistory {
  id: string;
  code: string;
  type: 'membership' | 'coupon';
  name: string;
  date: string;
  status: 'success' | 'failed';
  details?: string;
}

// 模拟兑换码数据库
const MOCK_REDEEM_CODES: Record<string, {
  type: 'membership' | 'coupon';
  status: 'valid' | 'used' | 'expired';
  data: any;
  expireDate?: string;
  usedDate?: string;
}> = {
  'MEM20240615HOMESTEAD90': {
    type: 'membership',
    status: 'valid',
    data: {
      tier: '归田·家园卡',
      tierId: 'homestead',
      duration: 90,
      durationLabel: '90天',
      benefits: ['每月10斤有机米', '民宿9折', '十二月令', '有机盲盒', '牛耕家书', '社群活动']
    }
  },
  'MEM20240620GRANARY365': {
    type: 'membership',
    status: 'valid',
    data: {
      tier: '守望·丰仓卡',
      tierId: 'granary',
      duration: 365,
      durationLabel: '365天',
      benefits: ['每月20斤有机米', '全场8折', '生日礼', '民宿8折', '十二月令', '有机盲盒', '牛耕家书', '免费体验', '社群活动']
    }
  },
  'MEM20240501HOMESTEAD90': {
    type: 'membership',
    status: 'used',
    data: {
      tier: '归田·家园卡',
      tierId: 'homestead',
      duration: 90
    },
    usedDate: '2024.05.15'
  },
  'COU20240601CASH50': {
    type: 'coupon',
    status: 'valid',
    data: {
      name: '有机米满减券',
      type: 'cash',
      value: 50,
      valueLabel: '50元',
      minAmount: 200,
      description: '满200元可用',
      applicableProducts: ['梯田有机胚芽米', '高山云雾绿茶'],
      validUntil: '2024.12.31'
    }
  },
  'COU20240610DISCOUNT20': {
    type: 'coupon',
    status: 'valid',
    data: {
      name: '新会员专享券',
      type: 'discount',
      value: 20,
      valueLabel: '8折',
      description: '民宿预订专用',
      applicableProducts: ['民宿预订'],
      validUntil: '2024.09.30'
    }
  },
  'TIC20240515GIFT100': {
    type: 'coupon',
    status: 'valid',
    data: {
      name: '开卡礼券',
      type: 'gift',
      value: 100,
      valueLabel: '100元',
      description: '可转赠亲友',
      applicableProducts: ['全场通用'],
      validUntil: '2025.05.15'
    }
  },
  'COU20240401CASH30': {
    type: 'coupon',
    status: 'expired',
    data: {
      name: '春季特惠券',
      type: 'cash',
      value: 30
    },
    expireDate: '2024.05.31'
  }
};

const ExchangeCenterView: React.FC<ExchangeCenterViewProps> = ({ onBack }) => {
  const [inputMode, setInputMode] = useState<'code' | 'scan'>('code');
  const [code, setCode] = useState('');
  const [exchangeType, setExchangeType] = useState<ExchangeType>(null);
  const [status, setStatus] = useState<ExchangeStatus>('idle');
  const [result, setResult] = useState<ExchangeResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState<ExchangeHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // 加载兑换历史（从本地存储或API）
  useEffect(() => {
    const savedHistory = localStorage.getItem('exchangeHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load history', e);
      }
    }
  }, []);

  // 保存兑换历史
  const saveToHistory = (exchangeRecord: ExchangeHistory) => {
    const newHistory = [exchangeRecord, ...history].slice(0, 20); // 只保留最近20条
    setHistory(newHistory);
    localStorage.setItem('exchangeHistory', JSON.stringify(newHistory));
  };

  // 验证兑换码格式
  const validateCodeFormat = (code: string): { valid: boolean; type?: ExchangeType; error?: string } => {
    const upperCode = code.toUpperCase().trim();
    
    if (!upperCode) {
      return { valid: false, error: '请输入兑换码' };
    }

    if (upperCode.length < 10 || upperCode.length > 30) {
      return { valid: false, error: '兑换码格式不正确' };
    }

    // 会员码格式：MEM + 日期 + 类型 + 时长
    if (upperCode.startsWith('MEM')) {
      if (upperCode.length < 15) {
        return { valid: false, type: 'membership', error: '会员兑换码格式不正确' };
      }
      return { valid: true, type: 'membership' };
    }

    // 卡券码格式：COU/TIC + 日期 + 类型 + 金额
    if (upperCode.startsWith('COU') || upperCode.startsWith('TIC')) {
      if (upperCode.length < 12) {
        return { valid: false, type: 'coupon', error: '卡券兑换码格式不正确' };
      }
      return { valid: true, type: 'coupon' };
    }

    return { valid: false, error: '兑换码格式不正确，请检查后重试' };
  };

  // 计算会员到期时间
  const calculateMembershipExpiry = (duration: number): string => {
    const now = new Date();
    const expiry = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000);
    const year = expiry.getFullYear();
    const month = String(expiry.getMonth() + 1).padStart(2, '0');
    const day = String(expiry.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 兑换逻辑
  const handleExchange = async () => {
    // 格式验证
    const formatCheck = validateCodeFormat(code);
    if (!formatCheck.valid) {
      setStatus('error');
      setResult({
        type: null,
        message: formatCheck.error || '兑换码格式不正确',
        errorType: 'format'
      });
      setShowResult(true);
      return;
    }

    // 类型验证（如果用户选择了类型）
    if (exchangeType && formatCheck.type && exchangeType !== formatCheck.type) {
      setStatus('error');
      setResult({
        type: null,
        message: `此兑换码是${formatCheck.type === 'membership' ? '会员' : '卡券'}兑换码，请选择正确的兑换类型`,
        errorType: 'format'
      });
      setShowResult(true);
      return;
    }

    setStatus('loading');
    setShowResult(false);

    // 模拟API调用
    setTimeout(() => {
      const upperCode = code.toUpperCase().trim();
      const codeData = MOCK_REDEEM_CODES[upperCode];

      if (!codeData) {
        setStatus('error');
        setResult({
          type: null,
          message: '兑换码不存在，请检查后重试',
          errorType: 'invalid'
        });
        setShowResult(true);
        
        // 记录失败历史
        saveToHistory({
          id: Date.now().toString(),
          code: upperCode,
          type: formatCheck.type || 'coupon',
          name: '兑换失败',
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
          status: 'failed',
          details: '兑换码不存在'
        });
        return;
      }

      // 检查状态
      if (codeData.status === 'used') {
        setStatus('error');
        setResult({
          type: codeData.type,
          message: '该兑换码已被使用',
          errorType: 'used',
          data: {
            usedDate: codeData.usedDate
          }
        });
        setShowResult(true);
        
        saveToHistory({
          id: Date.now().toString(),
          code: upperCode,
          type: codeData.type,
          name: codeData.type === 'membership' ? codeData.data.tier : codeData.data.name,
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
          status: 'failed',
          details: '兑换码已被使用'
        });
        return;
      }

      if (codeData.status === 'expired') {
        setStatus('error');
        setResult({
          type: codeData.type,
          message: '该兑换码已过期',
          errorType: 'expired',
          data: {
            expireDate: codeData.expireDate
          }
        });
        setShowResult(true);
        
        saveToHistory({
          id: Date.now().toString(),
          code: upperCode,
          type: codeData.type,
          name: codeData.type === 'membership' ? codeData.data.tier : codeData.data.name,
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
          status: 'failed',
          details: '兑换码已过期'
        });
        return;
      }

      // 兑换成功
      if (codeData.type === 'membership') {
        const validUntil = calculateMembershipExpiry(codeData.data.duration);
        setExchangeType('membership');
        setStatus('success');
        setResult({
          type: 'membership',
          message: '会员身份兑换成功！',
          data: {
            ...codeData.data,
            validUntil,
            exchangeDate: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
          }
        });
        
        // 标记为已使用（在实际应用中应该调用API）
        MOCK_REDEEM_CODES[upperCode].status = 'used';
        MOCK_REDEEM_CODES[upperCode].usedDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
        
        saveToHistory({
          id: Date.now().toString(),
          code: upperCode,
          type: 'membership',
          name: codeData.data.tier,
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
          status: 'success',
          details: `${codeData.data.durationLabel} · 到期：${validUntil}`
        });
      } else if (codeData.type === 'coupon') {
        setExchangeType('coupon');
        setStatus('success');
        setResult({
          type: 'coupon',
          message: '卡券兑换成功！',
          data: {
            ...codeData.data,
            exchangeDate: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
          }
        });
        
        // 标记为已使用
        MOCK_REDEEM_CODES[upperCode].status = 'used';
        MOCK_REDEEM_CODES[upperCode].usedDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
        
        saveToHistory({
          id: Date.now().toString(),
          code: upperCode,
          type: 'coupon',
          name: codeData.data.name,
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
          status: 'success',
          details: `${codeData.data.valueLabel} · 有效期至：${codeData.data.validUntil}`
        });
      }

      setShowResult(true);
    }, 1500);
  };

  // 处理扫描结果
  const handleScanResult = (scannedCode: string) => {
    const upperCode = scannedCode.toUpperCase().trim();
    setCode(upperCode);
    setInputMode('code');
    
    // 自动识别类型
    const formatCheck = validateCodeFormat(upperCode);
    if (formatCheck.valid && formatCheck.type) {
      setExchangeType(formatCheck.type);
    }
    
    // 自动触发兑换
    setTimeout(() => {
      handleExchange();
    }, 300);
  };

  // 开始扫描
  const startScan = () => {
    setInputMode('scan');
    setCode('');
    setStatus('idle');
    setResult(null);
    setShowResult(false);
    // 在实际应用中，这里会调用设备相机API
    // 模拟扫描结果
    setTimeout(() => {
      // 随机选择一个有效的兑换码进行模拟
      const validCodes = Object.keys(MOCK_REDEEM_CODES).filter(
        key => MOCK_REDEEM_CODES[key].status === 'valid'
      );
      const randomCode = validCodes[Math.floor(Math.random() * validCodes.length)] || 'MEM20240615HOMESTEAD90';
      handleScanResult(randomCode);
    }, 2000);
  };

  const resetForm = (keepType: boolean = false) => {
    setCode('');
    setStatus('idle');
    setResult(null);
    setShowResult(false);
    if (!keepType) {
      setExchangeType(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] animate-fade-in font-sans flex flex-col relative pb-safe">
      
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 flex items-center gap-4 shadow-sm">
         <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-100">
            <ArrowLeft size={24} className="text-stone-800" strokeWidth={1.5} />
         </button>
         <h1 className="font-serif font-bold text-lg text-stone-900 flex-1 text-center pr-8">兑换中心</h1>
         <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-1 rounded-full hover:bg-stone-100 relative"
         >
            <History size={20} className="text-stone-600" strokeWidth={1.5} />
            {history.length > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">
                  {history.length > 9 ? '9+' : history.length}
               </span>
            )}
         </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
         
         {/* 0. Exchange History */}
         {showHistory && history.length > 0 && (
            <div className="px-4 pt-4 pb-2">
               <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <History size={16} />
                        兑换历史
                     </h3>
                     <button
                        onClick={() => setShowHistory(false)}
                        className="text-xs text-stone-400 hover:text-stone-600"
                     >
                        收起
                     </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                     {history.slice(0, 10).map((item) => (
                        <div
                           key={item.id}
                           className={`p-3 rounded-xl border ${
                              item.status === 'success'
                                 ? 'bg-plough-green-50 border-plough-green-200'
                                 : 'bg-red-50 border-red-200'
                           }`}
                        >
                           <div className="flex items-start justify-between mb-1">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-1">
                                    {item.type === 'membership' ? (
                                       <Crown size={14} className={item.status === 'success' ? 'text-plough-green-600' : 'text-red-500'} />
                                    ) : (
                                       <Ticket size={14} className={item.status === 'success' ? 'text-plough-green-600' : 'text-red-500'} />
                                    )}
                                    <span className="font-bold text-sm text-stone-900">{item.name}</span>
                                    {item.status === 'success' ? (
                                       <CheckCircle2 size={14} className="text-plough-green-600" fill="currentColor" />
                                    ) : (
                                       <XCircle size={14} className="text-red-500" fill="currentColor" />
                                    )}
                                 </div>
                                 <p className="text-[10px] text-stone-500 font-mono mb-1">{item.code}</p>
                                 {item.details && (
                                    <p className="text-xs text-stone-600">{item.details}</p>
                                 )}
                              </div>
                              <span className="text-[10px] text-stone-400 whitespace-nowrap ml-2">{item.date}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* 1. Exchange Type Selection */}
         <div className="px-4 pt-6 pb-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
               <h3 className="text-xs font-bold text-stone-500 mb-4 uppercase tracking-wider">选择兑换类型</h3>
               <div className="grid grid-cols-2 gap-3">
                  <button
                     onClick={() => {
                        setExchangeType('membership');
                        resetForm(true);
                     }}
                     className={`relative rounded-xl p-4 border-2 transition-all ${
                        exchangeType === 'membership'
                           ? 'border-plough-green-600 bg-plough-green-50'
                           : 'border-stone-200 bg-white'
                     }`}
                  >
                     <div className="flex flex-col items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                           exchangeType === 'membership'
                              ? 'bg-plough-green-600 text-white'
                              : 'bg-stone-100 text-stone-600'
                        }`}>
                           <Crown size={24} strokeWidth={1.5} />
                        </div>
                        <div className="text-center">
                           <h4 className="font-bold text-stone-900 text-sm mb-1">会员身份</h4>
                           <p className="text-[10px] text-stone-500">兑换会员权益</p>
                        </div>
                     </div>
                     {exchangeType === 'membership' && (
                        <div className="absolute top-2 right-2">
                           <CheckCircle2 size={16} className="text-plough-green-600" fill="currentColor" />
                        </div>
                     )}
                  </button>

                  <button
                     onClick={() => {
                        setExchangeType('coupon');
                        resetForm(true);
                     }}
                     className={`relative rounded-xl p-4 border-2 transition-all ${
                        exchangeType === 'coupon'
                           ? 'border-orange-500 bg-orange-50'
                           : 'border-stone-200 bg-white'
                     }`}
                  >
                     <div className="flex flex-col items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                           exchangeType === 'coupon'
                              ? 'bg-orange-500 text-white'
                              : 'bg-stone-100 text-stone-600'
                        }`}>
                           <Ticket size={24} strokeWidth={1.5} />
                        </div>
                        <div className="text-center">
                           <h4 className="font-bold text-stone-900 text-sm mb-1">卡券</h4>
                           <p className="text-[10px] text-stone-500">兑换优惠券</p>
                        </div>
                     </div>
                     {exchangeType === 'coupon' && (
                        <div className="absolute top-2 right-2">
                           <CheckCircle2 size={16} className="text-orange-500" fill="currentColor" />
                        </div>
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* 2. Input Method Selection */}
         {exchangeType && (
            <div className="px-4 mb-4">
               <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-stone-500 mb-4 uppercase tracking-wider">选择输入方式</h3>
                  <div className="grid grid-cols-2 gap-3">
                     <button
                        onClick={() => {
                           setInputMode('code');
                           resetForm();
                        }}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                           inputMode === 'code'
                              ? 'border-plough-green-600 bg-plough-green-50'
                              : 'border-stone-200 bg-white'
                        }`}
                     >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                           inputMode === 'code'
                              ? 'bg-plough-green-600 text-white'
                              : 'bg-stone-100 text-stone-600'
                        }`}>
                           <Key size={20} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 text-left">
                           <h4 className="font-bold text-stone-900 text-sm">输入兑换码</h4>
                           <p className="text-[10px] text-stone-500">手动输入</p>
                        </div>
                     </button>

                     <button
                        onClick={startScan}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                           inputMode === 'scan'
                              ? 'border-plough-green-600 bg-plough-green-50'
                              : 'border-stone-200 bg-white'
                        }`}
                     >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                           inputMode === 'scan'
                              ? 'bg-plough-green-600 text-white'
                              : 'bg-stone-100 text-stone-600'
                        }`}>
                           <QrCode size={20} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 text-left">
                           <h4 className="font-bold text-stone-900 text-sm">扫描二维码</h4>
                           <p className="text-[10px] text-stone-500">相机扫描</p>
                        </div>
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 3. Code Input Section */}
         {exchangeType && inputMode === 'code' && (
            <div className="px-4 mb-4">
               <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="mb-4">
                     <label className="text-xs font-bold text-stone-500 mb-2 block uppercase tracking-wider">
                        兑换码
                     </label>
                     <div className="relative">
                        <input
                           type="text"
                           value={code}
                           onChange={(e) => setCode(e.target.value.toUpperCase())}
                           placeholder="请输入兑换码"
                           className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-plough-green-600 focus:outline-none text-stone-900 font-mono text-sm transition-colors"
                           maxLength={20}
                        />
                        {code && (
                           <button
                              onClick={() => setCode('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                           >
                              <XCircle size={18} />
                           </button>
                        )}
                     </div>
                     <div className="mt-2 space-y-1">
                        <p className="text-[10px] text-stone-400">
                           会员码以 MEM 开头，卡券码以 COU 或 TIC 开头
                        </p>
                        {code && (
                           <div className="flex items-center gap-1 text-[10px]">
                              {(() => {
                                 const check = validateCodeFormat(code);
                                 if (check.valid) {
                                    return (
                                       <>
                                          <CheckCircle2 size={12} className="text-plough-green-600" />
                                          <span className="text-plough-green-600">
                                             {check.type === 'membership' ? '会员兑换码' : '卡券兑换码'}
                                          </span>
                                       </>
                                    );
                                 } else if (code.length > 0) {
                                    return (
                                       <>
                                          <AlertCircle size={12} className="text-orange-500" />
                                          <span className="text-orange-500">{check.error}</span>
                                       </>
                                    );
                                 }
                                 return null;
                              })()}
                           </div>
                        )}
                     </div>
                  </div>

                  <button
                     onClick={handleExchange}
                     disabled={status === 'loading' || !code.trim()}
                     className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                        status === 'loading' || !code.trim()
                           ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                           : exchangeType === 'membership'
                           ? 'bg-plough-green-600 text-white hover:bg-plough-green-700 active:scale-95'
                           : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
                     }`}
                  >
                     {status === 'loading' ? (
                        <div className="flex items-center justify-center gap-2">
                           <Loader2 size={16} className="animate-spin" />
                           <span>兑换中...</span>
                        </div>
                     ) : (
                        '立即兑换'
                     )}
                  </button>
               </div>
            </div>
         )}

         {/* 4. QR Code Scanner Section */}
         {exchangeType && inputMode === 'scan' && (
            <div className="px-4 mb-4">
               <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="aspect-square bg-stone-900 rounded-xl relative overflow-hidden mb-4">
                     {/* 模拟扫描界面 */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/80">
                           {status === 'loading' ? (
                              <div className="flex flex-col items-center gap-3">
                                 <Loader2 size={32} className="animate-spin" />
                                 <p className="text-sm">正在扫描...</p>
                              </div>
                           ) : (
                              <div className="flex flex-col items-center gap-3">
                                 <div className="w-48 h-48 border-2 border-plough-green-500 rounded-lg relative">
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-plough-green-500"></div>
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-plough-green-500"></div>
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-plough-green-500"></div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-plough-green-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       <ScanLine size={48} className="text-plough-green-500/50 animate-pulse" />
                                    </div>
                                 </div>
                                 <p className="text-sm">请将二维码对准扫描框</p>
                              </div>
                           )}
                        </div>
                     </div>
                     
                     {/* 扫描线动画 */}
                     {status === 'loading' && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-plough-green-500 to-transparent animate-pulse"></div>
                     )}
                  </div>

                  <button
                     onClick={() => {
                        setInputMode('code');
                        resetForm();
                     }}
                     className="w-full py-3 rounded-xl border-2 border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 active:scale-95 transition-all"
                  >
                     切换到输入模式
                  </button>
               </div>
            </div>
         )}

         {/* 5. Result Display */}
         {showResult && result && (
            <div className="px-4 mb-4">
               <div className={`rounded-2xl p-6 shadow-sm ${
                  status === 'success' ? 'bg-plough-green-50 border-2 border-plough-green-200' : 'bg-red-50 border-2 border-red-200'
               }`}>
                  <div className="flex flex-col items-center text-center gap-4">
                     {status === 'success' ? (
                        <>
                           <div className="w-16 h-16 rounded-full bg-plough-green-600 flex items-center justify-center">
                              <CheckCircle2 size={32} className="text-white" fill="currentColor" />
                           </div>
                           <div className="w-full">
                              <h3 className="font-bold text-plough-green-900 text-lg mb-3">{result.message}</h3>
                              {result.data && (
                                 <div className="bg-white/60 rounded-xl p-4 space-y-3 text-sm">
                                    {result.type === 'membership' && (
                                       <>
                                          <div className="flex items-center justify-between pb-2 border-b border-plough-green-200">
                                             <span className="text-stone-600">会员类型</span>
                                             <span className="font-bold text-plough-green-900">{result.data.tier}</span>
                                          </div>
                                          <div className="flex items-center justify-between pb-2 border-b border-plough-green-200">
                                             <span className="text-stone-600">有效期</span>
                                             <span className="font-bold text-plough-green-900">{result.data.durationLabel}</span>
                                          </div>
                                          <div className="flex items-center justify-between pb-2 border-b border-plough-green-200">
                                             <span className="text-stone-600">到期时间</span>
                                             <span className="font-bold text-plough-green-900">{result.data.validUntil}</span>
                                          </div>
                                          {result.data.benefits && result.data.benefits.length > 0 && (
                                             <div className="pt-2">
                                                <p className="text-stone-600 mb-2 text-xs">专享权益：</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                   {result.data.benefits.map((benefit: string, idx: number) => (
                                                      <span
                                                         key={idx}
                                                         className="text-[10px] bg-plough-green-100 text-plough-green-700 px-2 py-1 rounded-full"
                                                      >
                                                         {benefit}
                                                      </span>
                                                   ))}
                                                </div>
                                             </div>
                                          )}
                                          <div className="flex items-center gap-1 text-[10px] text-stone-500 pt-1">
                                             <Calendar size={12} />
                                             <span>兑换时间：{result.data.exchangeDate}</span>
                                          </div>
                                       </>
                                    )}
                                    {result.type === 'coupon' && (
                                       <>
                                          <div className="flex items-center justify-between pb-2 border-b border-plough-green-200">
                                             <span className="text-stone-600">卡券名称</span>
                                             <span className="font-bold text-plough-green-900">{result.data.name}</span>
                                          </div>
                                          <div className="flex items-center justify-between pb-2 border-b border-plough-green-200">
                                             <span className="text-stone-600">面额</span>
                                             <span className="font-bold text-orange-600 text-base">{result.data.valueLabel}</span>
                                          </div>
                                          {result.data.minAmount && (
                                             <div className="flex items-center justify-between pb-2 border-b border-plough-green-200">
                                                <span className="text-stone-600">使用条件</span>
                                                <span className="text-stone-700">满{result.data.minAmount}元可用</span>
                                             </div>
                                          )}
                                          <div className="flex items-center justify-between pb-2 border-b border-plough-green-200">
                                             <span className="text-stone-600">有效期至</span>
                                             <span className="font-bold text-plough-green-900">{result.data.validUntil}</span>
                                          </div>
                                          {result.data.applicableProducts && result.data.applicableProducts.length > 0 && (
                                             <div className="pt-2">
                                                <p className="text-stone-600 mb-1 text-xs">适用范围：</p>
                                                <p className="text-xs text-stone-700">{result.data.applicableProducts.join('、')}</p>
                                             </div>
                                          )}
                                          <div className="flex items-center gap-1 text-[10px] text-stone-500 pt-1">
                                             <Calendar size={12} />
                                             <span>兑换时间：{result.data.exchangeDate}</span>
                                          </div>
                                       </>
                                    )}
                                 </div>
                              )}
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                              <XCircle size={32} className="text-white" fill="currentColor" />
                           </div>
                           <div className="w-full">
                              <h3 className="font-bold text-red-900 text-lg mb-2">{result.message}</h3>
                              {result.errorType === 'used' && result.data?.usedDate && (
                                 <p className="text-sm text-red-700 mb-2">
                                    使用时间：{result.data.usedDate}
                                 </p>
                              )}
                              {result.errorType === 'expired' && result.data?.expireDate && (
                                 <p className="text-sm text-red-700 mb-2">
                                    过期时间：{result.data.expireDate}
                                 </p>
                              )}
                              <div className="bg-white/60 rounded-xl p-3 mt-3">
                                 <div className="flex items-start gap-2 text-xs text-red-700">
                                    <Info size={14} className="mt-0.5 shrink-0" />
                                    <p>请检查兑换码是否正确，如仍有问题请联系客服</p>
                                 </div>
                              </div>
                           </div>
                        </>
                     )}
                     
                     <button
                        onClick={resetForm}
                        className={`mt-2 px-6 py-2 rounded-full font-bold text-sm ${
                           status === 'success'
                              ? 'bg-plough-green-600 text-white hover:bg-plough-green-700'
                              : 'bg-red-500 text-white hover:bg-red-600'
                        } active:scale-95 transition-all`}
                     >
                        {status === 'success' ? '继续兑换' : '重新输入'}
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 6. Help Section */}
         <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
               <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-plough-green-100 flex items-center justify-center shrink-0">
                     <Gift size={16} className="text-plough-green-600" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-stone-900 text-sm mb-2">兑换说明</h4>
                     <ul className="space-y-1.5 text-xs text-stone-600 leading-relaxed">
                        <li>• 会员兑换码以 MEM 开头，兑换后立即生效</li>
                        <li>• 卡券兑换码以 COU 或 TIC 开头，可在购物时使用</li>
                        <li>• 每个兑换码仅可使用一次，请妥善保管</li>
                        <li>• 如遇问题，请联系客服或查看帮助中心</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>

      </div>

      <style>{`
        .pb-safe { padding-bottom: max(env(safe-area-inset-bottom, 20px), 20px); }
      `}</style>
    </div>
  );
};

export default ExchangeCenterView;

