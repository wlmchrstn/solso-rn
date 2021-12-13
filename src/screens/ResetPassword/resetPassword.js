import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View
} from 'react-native';
import Axios from 'axios';

import Button from '../../components/Button/button';
import { BackButton } from '../../components/Button/button';

const ResetPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const backOnpressed = () => {
        navigation.goBack();
    };

    const sendResetPasswordOnpressed = async () => {
        try {
            const reset = async (objparam) => await Axios.post('https://solso.herokuapp.com/api/member/reset-password', objparam);

            reset({
                email: email,
            })
                .then(res => {
                    setEmail('');
                    if (res.data.success === true) {
                        navigation.navigate('ResetPasswordFinish');
                        ToastAndroid.show('Password reset sent, please check your email', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Failed to send password reset', ToastAndroid.SHORT);
                    }
                })
                .catch(e => {
                    ToastAndroid.show('Failed to send password reset', ToastAndroid.SHORT);
                });
        } catch(err) {
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <View style={styles.backWrapper}>
                    <BackButton color={'white'} onPress={backOnpressed} />
                </View>
                <Image source={require('../../assets/images/solso-logo.png')} style={styles.logo} />
            </View>
            <ScrollView style={styles.contentWrapper}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>{'Hello,'}</Text>
                    <Text style={styles.title}>{'Please enter the email associated with your account'}</Text>
                </View>
                <View style={styles.formWrapper}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Email'}
                            style={styles.textInput}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button variant={'primary'} text={'Send Reset Password'} onPress={sendResetPasswordOnpressed} />
                </View>
            </ScrollView>
        </View>
    );
}

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
    backWrapper: {
        position: 'absolute',
        left: 20,
        top: 15,
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
        flexDirection: 'column',
        paddingHorizontal: 30,
    },
    headerWrapper: {
        paddingBottom: 10,
        paddingTop: 40,
    },
    header: {
        color: '#272323',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 16,
        opacity: 0.5,
    },
    title: {
        color: '#272323',
        fontSize: 24,
        fontWeight: '300',
        lineHeight: 33,
    },
    formWrapper: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    inputWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textInput: {
        backgroundColor: '#EEE8F6',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
    }
});

export default ResetPassword;
