import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';

const ResetPasswordFinish = () => {
    const navigation = useNavigation();

    const backLoginOnpressed = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Image source={require('../../assets/images/solso-logo.png')} style={styles.logo} />
            </View>
            <ScrollView style={styles.contentWrapper} contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={styles.title}>{'Please, Check Your Email!'}</Text>
                <Image source={require('../../assets/images/gmail-logo.png')} style={styles.gmail} />
                <View style={styles.subtitleWrapper}>
                    <Text style={styles.subtitle}>{'We have sent a password recover instructions to your email'}</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button variant={'primary'} text={'Back to Login'} onPress={backLoginOnpressed} />
                </View>
                <View style={styles.subtitle2Wrapper}>
                    <Text style={styles.subtitle2}>{'Did not receive the email?'}</Text>
                    <Text style={styles.subtitleRed}>{'Check your Spam Email'}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#433C82',
        flex: 1,
        flexDirection: 'column',
    },
    logoWrapper: {
        alignItems: 'center',
        flex: 0.8,
        justifyContent: 'center',
    },
    logo: {
        height: 215,
        width: 215,
    },
    contentWrapper: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        paddingHorizontal: 30,
    },
    title: {
        color: '#272323',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
        textAlign: 'center',
        marginTop: 20,
    },
    gmail: {
        width: 99,
        height: 75,
        marginTop: 15,
    },
    subtitleWrapper: {
        marginTop: 15,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 25,
        maxWidth: 280,
        textAlign: 'center',
    },
    buttonWrapper: {
        flexDirection: 'column',
        marginTop: 15,
    },
    subtitle2Wrapper: {
        marginTop: 25,
    },
    subtitle2: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 21,
        textAlign: 'center',
    },
    subtitleRed: {
        color: '#F80000',
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 21,
        textAlign: 'center',
    },
});

export default ResetPasswordFinish;
