import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { useSelector } from 'react-redux';

import Button from '../../components/Button';
import { BackButton } from '../../components/Button/button';

const PasswordChange = () => {
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);

    const backOnpressed = () => {
        navigation.goBack();
    };

    const changeOnpressed = async () => {
        try {
            const changePassword = async obj => await Axios.put('https://solso.herokuapp.com/api/member/update-password', obj, {
                headers: {
                    Authorization: AuthReducer.token,
                }
            });

            changePassword({
                password: password
            })
                .then(res => {
                    if (res.data.success == true) {
                        navigation.navigate('Profile');
                        ToastAndroid.show('Password updated!', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Failed to updated!', ToastAndroid.SHORT);
                    }
                })
                .catch(e => {
                    ToastAndroid.show('Failed to updated!', ToastAndroid.SHORT);
                })
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
            <Text style={styles.title}>{'New Password'}</Text>
            <View style={styles.contentWrapper}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        maxLength={32}
                        placeholder={'New Password'}
                        style={styles.textInput}
                        value={password}
                        onChangeText={value => setPassword(value)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button variant={'secondary'} text={'Change Password'} onPress={changeOnpressed}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#433C82',
    },
    backWrapper: {
        position: 'absolute',
        left: 20,
        top: 15,
    },
    logoWrapper: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        marginTop: 150,
        width: 250,
        height: 250,
    },
    title: {
        color: '#c1c1c1',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 42,
        paddingTop: 14,
        paddingBottom: 14,
        textAlign: 'center',
        marginTop: 150,
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 30,
    },
    inputWrapper: {
        backgroundColor: '#EEE8F6',
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    textInput: {
        color: '#272323',
        paddingHorizontal: 15,
        width: '100%',
    },
    buttonWrapper: {
        flex: 1,
        flexWrap: 'wrap',
        alignContent: 'center',
    },
});

export default PasswordChange;
