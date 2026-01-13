
import React, { useState } from 'react';
import TabBar from './components/TabBar';
import HomeView from './views/HomeView';
import MarketView from './views/MarketView';
import HomestayView from './views/HomestayView';
import ProfileView from './views/ProfileView';
import LetterView from './views/LetterView';
import BenefitsManualView from './views/BenefitsManualView';
import AccountSecurityView from './views/AccountSecurityView'; 
import SettingsView from './views/SettingsView'; 
import NotificationSettingsView from './views/NotificationSettingsView';
import MessageCenterView from './views/MessageCenterView'; 
import CustomerServiceView from './views/CustomerServiceView'; 
import MembershipPaymentView from './views/MembershipPaymentView';
import GuardianCertificateView from './views/GuardianCertificateView'; // Import
import AddressView from './views/AddressView'; // Import
import ExchangeCenterView from './views/ExchangeCenterView'; // Import
import InviteRewardView from './views/InviteRewardView'; // Import
import SurveyView from './views/SurveyView'; // Import
import CouponView from './views/CouponView'; // Import
import PointsView from './views/PointsView'; // Import
import { NoteDetail, ProductDetail, RoomDetail, OrderList, BenefitDetail } from './views/SecondaryViews';
import { MOCK_USER, MOCK_GUEST } from './constants';
import { TabType, ViewState, User } from './types';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'main', tab: 'home' });
  const [user, setUser] = useState<User>(MOCK_USER);

  // Navigation Handlers
  const handleTabChange = (tab: TabType) => {
    setViewState({ type: 'main', tab });
  };

  const handleSwitchAccount = () => {
    const newUser = user.name === MOCK_USER.name ? MOCK_GUEST : MOCK_USER;
    setUser(newUser);
    // After switching, go to profile to see changes
    setViewState({ type: 'main', tab: 'profile' });
  };

  const navigateToDetail = (type: string, id?: number) => {
    switch (type) {
      case 'product-detail':
        if (id) setViewState({ type: 'product-detail', id });
        break;
      case 'room-detail':
        if (id) setViewState({ type: 'room-detail', id });
        break;
      case 'note-detail':
        if (id) setViewState({ type: 'note-detail', id });
        break;
      case 'orders':
        setViewState({ type: 'orders' });
        break;
      case 'benefits':
        setViewState({ type: 'benefits' });
        break;
      case 'membership-manual':
        setViewState({ type: 'membership-manual' });
        break;
      case 'settings':
        setViewState({ type: 'settings' });
        break;
      case 'messages':
        setViewState({ type: 'messages' });
        break;
      case 'customer-service':
        setViewState({ type: 'customer-service' });
        break;
      case 'address':
        setViewState({ type: 'address' });
        break;
      case 'account-security':
        // Determine origin for back navigation
        const fromAccount = viewState.type === 'settings' ? 'settings' : 'profile';
        setViewState({ type: 'account-security', from: fromAccount });
        break;
      case 'notification-settings':
        const fromNotif = viewState.type === 'messages' ? 'messages' : 'settings';
        setViewState({ type: 'notification-settings', from: fromNotif });
        break;
      case 'membership-intro':
      case 'membership-payment-granary':
      case 'membership-payment-homestead':
        // All membership navigation goes to payment page
        const tierId: 'granary' | 'homestead' = type === 'membership-payment-granary' ? 'granary' : 
                      type === 'membership-payment-homestead' ? 'homestead' : 
                      'homestead';
        setViewState({ type: 'membership-payment', tierId });
        break;
      case 'certificate':
        setViewState({ type: 'certificate' });
        break;
      case 'exchange-center':
        setViewState({ type: 'exchange-center' });
        break;
      case 'invite-reward':
        setViewState({ type: 'invite-reward' });
        break;
      case 'survey':
        setViewState({ type: 'survey' });
        break;
      case 'coupon':
        setViewState({ type: 'coupon' });
        break;
      case 'points':
        setViewState({ type: 'points' });
        break;
    }
  };

  const goBackToMain = () => {
      // Logic to determine which tab to go back to based on current view
      let targetTab: TabType = 'home';
      if (viewState.type === 'product-detail') targetTab = 'market';
      if (viewState.type === 'room-detail') targetTab = 'homestay';
      if (viewState.type === 'orders' || viewState.type === 'benefits') targetTab = 'profile';
      
      setViewState({ type: 'main', tab: targetTab });
  };

  const handleBackNavigation = () => {
      if (viewState.type === 'account-security') {
         if (viewState.from === 'settings') {
            setViewState({ type: 'settings' });
         } else {
            setViewState({ type: 'main', tab: 'profile' });
         }
      } else if (viewState.type === 'notification-settings') {
         if (viewState.from === 'messages') {
            setViewState({ type: 'messages' });
         } else {
            setViewState({ type: 'settings' });
         }
      } else if (viewState.type === 'membership-payment') {
         setViewState({ type: 'main', tab: 'profile' });
      } else if (viewState.type === 'certificate') {
         setViewState({ type: 'main', tab: 'profile' });
      } else if (viewState.type === 'exchange-center') {
         setViewState({ type: 'main', tab: 'profile' });
      } else if (viewState.type === 'invite-reward') {
         setViewState({ type: 'main', tab: 'profile' });
      } else if (viewState.type === 'survey') {
        setViewState({ type: 'main', tab: 'home' });
      } else if (viewState.type === 'coupon' || viewState.type === 'points') {
        setViewState({ type: 'main', tab: 'profile' });
      } else {
         goBackToMain();
      }
  };

  return (
    <div className="min-h-screen font-sans text-stone-900 bg-[#EBEAE5] selection:bg-stone-200 flex justify-center bg-stone-100">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Main Container - App Shell */}
      <div className="w-full h-[100dvh] md:h-screen md:max-w-md mx-auto relative bg-[#FDFCF8] shadow-none md:shadow-2xl md:border-x border-stone-200/50 flex flex-col overflow-hidden">
        
        {/* View Routing - Scrollable Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth w-full relative">
            {viewState.type === 'main' && (
              <>
                {viewState.tab === 'home' && <HomeView user={user} setActiveTab={handleTabChange} onNavigate={navigateToDetail} />}
                {viewState.tab === 'market' && <MarketView onNavigate={navigateToDetail} />}
                {viewState.tab === 'letter' && <MembershipPaymentView initialTierId="homestead" onBack={() => {}} isTabView={true} />}
                {viewState.tab === 'homestay' && <HomestayView onNavigate={navigateToDetail} />}
                {viewState.tab === 'profile' && <ProfileView user={user} onNavigate={navigateToDetail} />}
              </>
            )}

            {/* Detail Views */}
            {viewState.type === 'note-detail' && <NoteDetail id={viewState.id} onBack={goBackToMain} />}
            {viewState.type === 'product-detail' && <ProductDetail id={viewState.id} onBack={goBackToMain} />}
            {viewState.type === 'room-detail' && <RoomDetail id={viewState.id} onBack={goBackToMain} />}
            {viewState.type === 'orders' && <OrderList onBack={goBackToMain} />}
            {viewState.type === 'benefits' && <BenefitDetail onBack={goBackToMain} />}
            {viewState.type === 'membership-manual' && <BenefitsManualView onBack={() => handleTabChange('market')} />}
            
            {/* New Views */}
            {viewState.type === 'settings' && (
               <SettingsView 
                  onBack={() => handleTabChange('profile')} 
                  user={user}
                  onSwitchAccount={handleSwitchAccount}
               />
            )}
            {viewState.type === 'account-security' && <AccountSecurityView user={user} onBack={handleBackNavigation} onSwitchAccount={handleSwitchAccount} />}
            {viewState.type === 'notification-settings' && <NotificationSettingsView onBack={handleBackNavigation} />}
            
            {viewState.type === 'messages' && (
               <MessageCenterView 
                  onBack={() => handleTabChange('profile')} 
                  onNavigateToService={() => navigateToDetail('customer-service')} 
                  onNavigateToNotificationSettings={() => navigateToDetail('notification-settings')} 
               />
            )}
            {viewState.type === 'customer-service' && <CustomerServiceView onBack={() => handleTabChange('profile')} />}
            {viewState.type === 'address' && <AddressView user={user} onBack={() => handleTabChange('profile')} />}
            {viewState.type === 'membership-payment' && <MembershipPaymentView initialTierId={viewState.tierId} onBack={() => handleTabChange('profile')} />}
            {viewState.type === 'certificate' && <GuardianCertificateView onBack={handleBackNavigation} />}
            {viewState.type === 'exchange-center' && <ExchangeCenterView onBack={handleBackNavigation} />}
            {viewState.type === 'invite-reward' && <InviteRewardView onBack={handleBackNavigation} />}
            {viewState.type === 'survey' && <SurveyView onBack={handleBackNavigation} />}
            {viewState.type === 'coupon' && <CouponView onBack={handleBackNavigation} />}
            {viewState.type === 'points' && <PointsView onBack={handleBackNavigation} currentPoints={user.points} />}
        </main>
        
        {/* Navigation - Absolute positioning inside relative container */}
        {viewState.type === 'main' && (
           <TabBar activeTab={viewState.tab} setActiveTab={handleTabChange} />
        )}
        
      </div>
    </div>
  );
}
