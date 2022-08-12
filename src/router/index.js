import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { isEmpty } from 'underscore';
import Login from '../screen/login';
import Register from '../screen/register';
import Home from '../screen/home';
import Landing from '../screen/landing';
import Onboarding from '../screen/onboarding';
import ForgotPassword from '../screen/forgotPassword';
import Hub from '../screen/hub';
import AddHub from '../screen/hub/addHub';
import BottomTab from './bottomTab';
import Offers from '../screen/offers';
import OffersList from '../screen/offersList';
import BusinessList from '../screen/businessList';
import History from '../screen/points';
import RewardDetails from '../screen/points/rewardDetails';
import Business from '../screen/business';
import Account from '../screen/account';
import personalDetails from '../screen/personalDetails';
import AccountSettings from '../screen/accountSettings';
import inviteFriends from '../screen/inviteFriends';
import accountNotifications from '../screen/accountNotifications';
import followingBusiness from '../screen/followingBusiness';
import aboutAccount from "../screen/aboutAccount";
import termsAccount from "../screen/termsAccount";
import privacyPolicyAccount from "../screen/privacyPolicyAccount";
import userNotification from "../screen/userNotification";
import BusinessInfo from "../screen/businessInfo";
import { Support, Faqs } from '../screen/support';
import OfferFilter from '../screen/offerFilter';
import {
  DeleteAccountReason,
  ConfirDeleAccount,
  AccountDeleted,
} from "../screen/DeleteAccount";
import { useNetInfo } from '@react-native-community/netinfo';
import { onGetInternetStatus } from '../redux/reducer/network';
import BusinessFilter from '../screen/businessFilter';


const Stack = createNativeStackNavigator();
const OffersStack = createNativeStackNavigator();
const BusinessStack = createNativeStackNavigator();
const PointsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const _PointsStack = () => {
  return (
    <PointsStack.Navigator
      initialRouteName={"history"}
      screenOptions={{ headerShown: false }}
    >
      <PointsStack.Screen name="history" component={History} />
      <PointsStack.Screen name="rewardDetails" component={RewardDetails} />
    </PointsStack.Navigator>
  );
};

const _OffersStack = () => {
  return (
    <OffersStack.Navigator
      initialRouteName={"offers"}
      screenOptions={{ headerShown: false }}
    >
      <OffersStack.Screen name="offers" component={Offers} />
      <OffersStack.Screen name="offersList" component={OffersList} />
      <OffersStack.Screen name="offerFilter" component={OfferFilter} />

    </OffersStack.Navigator>
  );
};

const _BusinessStack = () => {
  return (
    <BusinessStack.Navigator
      initialRouteName={"businesses"}
      screenOptions={{ headerShown: false }}
    >
      <BusinessStack.Screen name="businesses" component={Business} />
      <BusinessStack.Screen name="businessList" component={BusinessList} />
      <BusinessStack.Screen name="businessInfo" component={BusinessInfo} />
      <BusinessStack.Screen name="businessFilter" component={BusinessFilter} />
    </BusinessStack.Navigator>
  );
};
import { Colors, Images } from '../constants';
import { Image, Text } from 'react-native-ui-lib';

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary600,
        tabBarInactiveTintColor: Colors.gray500,
        lazy: false,
        tabBarStyle: {
          height: Platform.OS == "android" ? getBottomSpace() + 90 : getBottomSpace() + 60,
          paddingTop: 16,
          paddingBottom: Platform.OS == "android" ? 30 : getBottomSpace(),
          borderTopWidth: 0.5, borderTopColor: Colors.gray300
        }
      }}
    // tabBar={(props) => <BottomTab {...props} />}
    >
      <Tab.Screen name="homeTab" component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text fs12 lh18 style={{ color: focused ? Colors.black : Colors.gray500 }} >Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Image source={Images.home} style={{ height: size, width: size, resizeMode: 'contain', tintColor: color }} />
          ),
        }} />
      <Tab.Screen name="offersTab" component={_OffersStack} options={{
        tabBarLabel: ({ focused }) => (
          <Text fs12 lh18 style={{ color: focused ? Colors.black : Colors.gray500 }} >Offers</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Image source={Images.offers} style={{ height: size, width: size, resizeMode: 'contain', tintColor: color }} />
        ),
      }} />
      <Tab.Screen name="businessTab" component={_BusinessStack} options={{
        tabBarLabel: ({ focused }) => (
          <Text fs12 lh18 style={{ color: focused ? Colors.black : Colors.gray500 }} >Businesses</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Image source={Images.tab_business} style={{ height: size, width: size, resizeMode: 'contain', tintColor: color }} />
        ),
      }} />
      <Tab.Screen name="pointsTab" component={_PointsStack} options={{
        tabBarLabel: ({ focused }) => (
          <Text fs12 lh18 style={{ color: focused ? Colors.black : Colors.gray500 }} >Points</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Image source={Images.points} style={{ height: size, width: size, resizeMode: 'contain', tintColor: color }} />
        ),
      }} />
    </Tab.Navigator >
  );
};

const App = () => {
  const { userData, defaultHub } = useSelector((s) => s.user);
  let intialPage = userData ? "dashboard" : "landing";
  if (userData && (!defaultHub || isEmpty(defaultHub))) {
    intialPage = "hub";
  }
  const dispatch = useDispatch()
  const netInfo = useNetInfo();


  useEffect(() => {
    dispatch(onGetInternetStatus(netInfo?.isConnected))
  }, [netInfo]) // in order to re-call the hooks whenever the netInfo status changed 

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={intialPage}
      >
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="onboarding" component={Onboarding} />
        <Stack.Screen name="hub" component={Hub} />
        <Stack.Screen name="addHub" component={AddHub} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="personalDetails" component={personalDetails} />
        <Stack.Screen name="accountSettings" component={AccountSettings} />
        <Stack.Screen name="inviteFriends" component={inviteFriends} />
        <Stack.Screen
          name="accountNotification"
          component={accountNotifications}
        />
        <Stack.Screen name="followingBusiness" component={followingBusiness} />
        <Stack.Screen name="aboutAccount" component={aboutAccount} />
        <Stack.Screen name="termsAccount" component={termsAccount} />
        <Stack.Screen
          name="privacyPolicyAccount"
          component={privacyPolicyAccount}
        />
        <Stack.Screen name="userNotification" component={userNotification} />
        <Stack.Screen name="BusinessInfo" component={BusinessInfo} />
        <Stack.Screen name='Support' component={Support} />
        <Stack.Screen name='Faqs' component={Faqs} />
        <Stack.Screen
          name="DeleteAccountReason"
          component={DeleteAccountReason}
        />
        <Stack.Screen name="ConfirDeleAccount" component={ConfirDeleAccount} />
        <Stack.Screen name="AccountDeleted" component={AccountDeleted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
