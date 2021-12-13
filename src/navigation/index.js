import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from '../redux';
import { Provider } from 'react-redux';

import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import Verify from '../screens/VerifyScreen';
import ResetPassword from '../screens/ResetPassword';
import ResetPasswordFinish from '../screens/ResetPasswordFinishScreen';
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import ProfileEdit from '../screens/ProfileEditScreen';
import PasswordChange from '../screens/PasswordChangeScreen';
import MemberList from '../screens/MemberListScreen';
import MemberDetail from '../screens/MemberDetailScreen';
import EventList from '../screens/EventListScreen';
import EventDetail from '../screens/EventDetailScreen';
import EventCreate from '../screens/EventCreateScreen';
import DonationList from '../screens/DonationListScreen';
import DonationDetail from '../screens/DonationDetailScreen';
import DonationCreate from '../screens/DonationCreateScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Verify" component={Verify} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} />
                    <Stack.Screen name="ResetPasswordFinish" component={ResetPasswordFinish} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
                    <Stack.Screen name="PasswordChange" component={PasswordChange} />
                    <Stack.Screen name="MemberList" component={MemberList} />
                    <Stack.Screen name="MemberDetail" component={MemberDetail} />
                    <Stack.Screen name="EventList" component={EventList} />
                    <Stack.Screen name="EventDetail" component={EventDetail} />
                    <Stack.Screen name="EventCreate" component={EventCreate} />
                    <Stack.Screen name="DonationList" component={DonationList} />
                    <Stack.Screen name="DonationDetail" component={DonationDetail} />
                    <Stack.Screen name="DonationCreate" component={DonationCreate} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default Navigation;
