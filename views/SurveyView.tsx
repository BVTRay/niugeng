import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SurveyViewProps {
  onBack?: () => void;
}

interface SurveyAnswer {
  questionId: number;
  answer: string | string[];
}

interface Prize {
  id: number;
  name: string;
  type: 'coupon' | 'points' | 'gift';
  value: string;
  probability: number; // 概率权重
}

const SurveyView: React.FC<SurveyViewProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<'survey' | 'lottery' | 'result'>('survey');
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [lotteryAngle, setLotteryAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeResult, setPrizeResult] = useState<Prize | null>(null);

  // 奖品配置
  const prizes: Prize[] = [
    { id: 1, name: '10元优惠券', type: 'coupon', value: '10元', probability: 30 },
    { id: 2, name: '50积分', type: 'points', value: '50', probability: 25 },
    { id: 3, name: '5元优惠券', type: 'coupon', value: '5元', probability: 20 },
    { id: 4, name: '20积分', type: 'points', value: '20', probability: 15 },
    { id: 5, name: '精美礼品', type: 'gift', value: '神秘礼品', probability: 5 },
    { id: 6, name: '谢谢参与', type: 'gift', value: '感谢支持', probability: 5 },
  ];

  // 问卷问题
  const questions = [
    {
      id: 1,
      type: 'single',
      question: '您是通过什么渠道了解到我们的？',
      options: ['朋友推荐', '社交媒体', '广告宣传', '其他'],
    },
    {
      id: 2,
      type: 'single',
      question: '您对我们的服务满意度如何？',
      options: ['非常满意', '满意', '一般', '不满意'],
    },
    {
      id: 3,
      type: 'multiple',
      question: '您希望我们增加哪些功能？（可多选）',
      options: ['在线客服', '会员积分', '优惠活动', '社区互动', '个性化推荐'],
    },
    {
      id: 4,
      type: 'text',
      question: '您还有什么建议或意见？',
      placeholder: '请输入您的建议...',
    },
  ];

  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const handleSubmitSurvey = () => {
    // 检查必填项
    const requiredAnswers = questions.filter(q => q.type !== 'text').length;
    if (answers.length < requiredAnswers) {
      alert('请完成所有必填问题');
      return;
    }
    setCurrentStep('lottery');
  };

  // 根据概率随机选择奖品
  const selectPrize = (): Prize => {
    const totalProbability = prizes.reduce((sum, p) => sum + p.probability, 0);
    let random = Math.random() * totalProbability;
    
    for (const prize of prizes) {
      if (random < prize.probability) {
        return prize;
      }
      random -= prize.probability;
    }
    return prizes[prizes.length - 1];
  };

  const handleStartLottery = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const selectedPrize = selectPrize();
    
    // 计算转盘角度（每个奖品占60度，共6个奖品）
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    const baseAngle = prizeIndex * 60; // 每个奖品60度
    const randomOffset = Math.random() * 60; // 在奖品区域内随机
    const finalAngle = 360 * 5 + baseAngle + randomOffset; // 转5圈 + 目标角度
    
    setLotteryAngle(finalAngle);
    
    setTimeout(() => {
      setIsSpinning(false);
      setPrizeResult(selectedPrize);
      setCurrentStep('result');
    }, 3000);
  };

  const handleBackToSurvey = () => {
    setCurrentStep('survey');
    setPrizeResult(null);
    setLotteryAngle(0);
  };

  const renderSurvey = () => {
    return (
      <div style={styles.page}>
        {onBack && (
          <div style={styles.headerBar}>
            <button onClick={onBack} style={styles.backButton}>
              <ArrowLeft size={24} style={{ color: '#333' }} />
            </button>
            <h1 style={styles.headerTitle}>用户调研</h1>
            <div style={{ width: '40px' }} />
          </div>
        )}
        <div style={styles.container}>
          <div style={styles.header}>
            {!onBack && <h1 style={styles.title}>用户调研</h1>}
            <p style={styles.subtitle}>您的意见对我们很重要，完成调研即可参与抽奖</p>
          </div>

          <div style={styles.surveyContent}>
            {questions.map((q, index) => (
              <div key={q.id} style={styles.questionCard}>
                <div style={styles.questionHeader}>
                  <span style={styles.questionNumber}>Q{index + 1}</span>
                  <h3 style={styles.questionText}>{q.question}</h3>
                </div>

                {q.type === 'single' && (
                  <div style={styles.optionsContainer}>
                    {q.options?.map((option, optIndex) => {
                      const currentAnswer = answers.find(a => a.questionId === q.id)?.answer as string;
                      const isSelected = currentAnswer === option;
                      return (
                        <div
                          key={optIndex}
                          style={{
                            ...styles.optionItem,
                            ...(isSelected ? styles.optionSelected : {}),
                          }}
                          onClick={() => handleAnswerChange(q.id, option)}
                        >
                          <div style={styles.radioButton}>
                            {isSelected && <div style={styles.radioInner} />}
                          </div>
                          <span style={styles.optionText}>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === 'multiple' && (
                  <div style={styles.optionsContainer}>
                    {q.options?.map((option, optIndex) => {
                      const currentAnswer = answers.find(a => a.questionId === q.id)?.answer as string[] || [];
                      const isSelected = currentAnswer.includes(option);
                      return (
                        <div
                          key={optIndex}
                          style={{
                            ...styles.optionItem,
                            ...(isSelected ? styles.optionSelected : {}),
                          }}
                          onClick={() => {
                            const newAnswer = isSelected
                              ? currentAnswer.filter(a => a !== option)
                              : [...currentAnswer, option];
                            handleAnswerChange(q.id, newAnswer);
                          }}
                        >
                          <div style={styles.checkbox}>
                            {isSelected && <span style={styles.checkmark}>✓</span>}
                          </div>
                          <span style={styles.optionText}>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === 'text' && (
                  <textarea
                    style={styles.textArea}
                    placeholder={q.placeholder}
                    value={(answers.find(a => a.questionId === q.id)?.answer as string) || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    rows={4}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={styles.submitContainer}>
            <button
              style={styles.submitButton}
              onClick={handleSubmitSurvey}
            >
              提交问卷，开始抽奖
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderLottery = () => {
    const prizeCount = prizes.length;
    const anglePerPrize = 360 / prizeCount;

    return (
      <div style={styles.page}>
        {onBack && (
          <div style={styles.headerBar}>
            <button onClick={onBack} style={styles.backButton}>
              <ArrowLeft size={24} style={{ color: '#333' }} />
            </button>
            <h1 style={styles.headerTitle}>幸运抽奖</h1>
            <div style={{ width: '40px' }} />
          </div>
        )}
        <div style={styles.container}>
          <div style={styles.lotteryHeader}>
            {!onBack && <h1 style={styles.title}>幸运抽奖</h1>}
            <p style={styles.subtitle}>点击转盘开始抽奖，祝您好运！</p>
          </div>

          <div style={styles.lotteryContainer}>
            <div
              style={{
                ...styles.lotteryWheel,
                transform: `rotate(${lotteryAngle}deg)`,
                transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              }}
            >
              {prizes.map((prize, index) => {
                const angle = index * anglePerPrize;
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={prize.id}
                    style={{
                      ...styles.prizeSegment,
                      transform: `rotate(${angle}deg)`,
                      backgroundColor: isEven ? '#FFE5B4' : '#FFD700',
                    }}
                  >
                    <div style={styles.prizeText}>{prize.name}</div>
                  </div>
                );
              })}
            </div>

            <div style={styles.lotteryPointer} />
            <div style={styles.lotteryCenter} />

            {!isSpinning && (
              <button
                style={styles.lotteryButton}
                onClick={handleStartLottery}
              >
                开始抽奖
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!prizeResult) return null;

    const prizeIcons = {
      coupon: '🎫',
      points: '⭐',
      gift: '🎁',
    };

    return (
      <div style={styles.page}>
        {onBack && (
          <div style={styles.headerBar}>
            <button onClick={onBack} style={styles.backButton}>
              <ArrowLeft size={24} style={{ color: '#333' }} />
            </button>
            <h1 style={styles.headerTitle}>抽奖结果</h1>
            <div style={{ width: '40px' }} />
          </div>
        )}
        <div style={styles.container}>
          <div style={styles.resultContainer}>
            <div style={styles.resultIcon}>{prizeIcons[prizeResult.type]}</div>
            <h1 style={styles.resultTitle}>恭喜您！</h1>
            <p style={styles.resultPrizeName}>{prizeResult.name}</p>
            <p style={styles.resultPrizeValue}>{prizeResult.value}</p>

            <div style={styles.resultActions}>
              <button
                style={styles.resultButton}
                onClick={handleBackToSurvey}
              >
                返回调研
              </button>
              <button
                style={{ ...styles.resultButton, ...styles.resultButtonPrimary }}
                onClick={() => alert('奖品已发放到您的账户，请查收！')}
              >
                领取奖品
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentStep === 'survey') return renderSurvey();
  if (currentStep === 'lottery') return renderLottery();
  if (currentStep === 'result') return renderResult();
  return null;
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
    paddingBottom: '40px',
  },
  headerBar: {
    backgroundColor: '#fff',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  backButton: {
    background: 'none',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    margin: 0,
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingTop: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  surveyContent: {
    marginBottom: '30px',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  questionHeader: {
    marginBottom: '15px',
  },
  questionNumber: {
    display: 'inline-block',
    backgroundColor: '#FF6B6B',
    color: '#fff',
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '12px',
    marginRight: '10px',
  },
  questionText: {
    fontSize: '16px',
    color: '#333',
    margin: '10px 0',
    fontWeight: '500',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  optionItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '2px solid #E0E0E0',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  optionSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  radioButton: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #999',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioInner: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#FF6B6B',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '2px solid #999',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkmark: {
    color: '#FF6B6B',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: '15px',
    color: '#333',
  },
  textArea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #E0E0E0',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  submitContainer: {
    position: 'sticky',
    bottom: '20px',
    zIndex: 10,
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FF6B6B',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
    transition: 'all 0.3s',
  },
  lotteryHeader: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingTop: '20px',
  },
  lotteryContainer: {
    position: 'relative',
    width: '300px',
    height: '300px',
    margin: '0 auto 40px',
  },
  lotteryWheel: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    border: '8px solid #FF6B6B',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  prizeSegment: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    left: '50%',
    top: '0',
    transformOrigin: '0 100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  prizeText: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    transform: 'rotate(30deg)',
    whiteSpace: 'nowrap',
  },
  lotteryPointer: {
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: '30px solid #FF6B6B',
    zIndex: 10,
  },
  lotteryCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#FF6B6B',
    border: '4px solid #fff',
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  lotteryButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#FF6B6B',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 20,
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
    transition: 'all 0.3s',
  },
  resultContainer: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginTop: '40px',
  },
  resultIcon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  resultTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 20px 0',
  },
  resultPrizeName: {
    fontSize: '24px',
    color: '#FF6B6B',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  resultPrizeValue: {
    fontSize: '18px',
    color: '#666',
    margin: '0 0 40px 0',
  },
  resultActions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  resultButton: {
    padding: '12px 30px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #E0E0E0',
    backgroundColor: '#fff',
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  resultButtonPrimary: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    borderColor: '#FF6B6B',
  },
};

export default SurveyView;

