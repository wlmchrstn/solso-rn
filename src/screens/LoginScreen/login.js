import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native';
import Axios from 'axios';

import Button from '../../components/Button/button';

const Login = () => {
    const AuthReducer = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginOnpressed = async () => {
        try {
            const masuk = async (objparam) => await Axios.post('https://solso.herokuapp.com/api/member/login', objparam);

            masuk({
                username: username,
                password: password,
            })
                .then(res => {
                    setUsername('');
                    setPassword('');
                    if (res.data.message == 'Token created! Access given!') {
                        dispatch({
                            type: 'SET_TOKEN',
                            token: res.data.result.token
                        });
                        navigation.navigate('Home')
                        ToastAndroid.show('Welcome', ToastAndroid.SHORT)
                    }
                    else {
                        ToastAndroid.show('Invalid username or password', ToastAndroid.SHORT)
                    }
                })
                .catch(e => {
                    ToastAndroid.show('Invalid username or password', ToastAndroid.SHORT)
                })
        } catch (err) {
        }
    };

    const registerOnpressed = () => {
        navigation.navigate('Register');
    };

    const forgotPasswordOnpressed = () => {
        navigation.navigate('ResetPassword');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Image source={require('../../assets/images/solso-logo.png')} style={styles.logo} />
            </View>
            <ScrollView style={styles.contentWrapper}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>{'Hello,'}</Text>
                    <Text style={styles.title}>{'Welcome Back!'}</Text>
                </View>
                <View style={styles.formWrapper}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Username'}
                            style={styles.textInput}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <TextInput
                        maxLength={32}
                        placeholder={'Password'}
                        style={styles.textInput}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.linkWrapper}>
                    <Button variant={'flat'} text={'Forget Pasword ?'} onPress={forgotPasswordOnpressed} />
                    <Button variant={'flat'} text={'Register'} onPress={registerOnpressed}/>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button variant={'primary'} text={'Login'} onPress={loginOnpressed} />
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
        fontWeight: '700',
        lineHeight: 48,
    },
    formWrapper: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    inputWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    textInput: {
        backgroundColor: '#EEE8F6',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
    },
    linkWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
    }
});

export default Login;
