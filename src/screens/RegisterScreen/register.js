import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Axios from 'axios';

import Button from '../../components/Button';
import { BackButton } from '../../components/Button/button';

const Register = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        address: '',
        phone: '',
        gender: 'Male',
    });

    const backOnpressed = () => {
        navigation.goBack();
    };

    const handleInput = (value, input) => {
        setForm({
            ...form,
            [input]: value,
        });
    };

    const registerOnpressed = async () => {
        try {
            const register = async (objparam) => await Axios.post('https://solso.herokuapp.com/api/member/create-member', objparam);

            register({
                username: form.username,
                email: form.email,
                password: form.password,
                fullName: form.fullName,
                address: form.address,
                phone: form.phone,
                gender: form.gender,
            })
                .then(res => {
                    setForm({
                        username: '',
                        email: '',
                        password: '',
                        fullName: '',
                        address: '',
                        phone: '',
                        gender: '',
                    });
                    if (res.data.message === 'Member created!') {
                        navigation.navigate('Verify');
                        ToastAndroid.show('Please check you email', ToastAndroid.SHORT)
                    }
                })
                .catch(e => {
                    console.warn(e);
                    ToastAndroid.show('Failed to register', ToastAndroid.SHORT);
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
                <Image source={require('../../assets/images/SOLSO.png')} />
            </View>
            <ScrollView style={styles.contentWrapper}>
                <Text style={styles.title}>{'Sign Up'}</Text>
                <View style={styles.formWrapper}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Username'}
                            style={styles.textInput}
                            value={form.username}
                            onChangeText={value => handleInput(value, 'username')}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Email'}
                            style={styles.textInput}
                            value={form.email}
                            onChangeText={value => handleInput(value, 'email')}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Password'}
                            style={styles.textInput}
                            value={form.password}
                            onChangeText={value => handleInput(value, 'password')}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Full Name'}
                            style={styles.textInput}
                            value={form.fullName}
                            onChangeText={value => handleInput(value, 'fullName')}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Address'}
                            style={styles.textInput}
                            value={form.address}
                            onChangeText={value => handleInput(value, 'address')}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            maxLength={32}
                            placeholder={'Phone'}
                            style={styles.textInput}
                            value={form.phone}
                            onChangeText={value => handleInput(value, 'phone')}
                        />
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={form.gender}
                            onValueChange={(value, index) => handleInput(value, 'gender')}
                        >
                            <Picker.Item color={'#272323'} label={'Male'} value={'Male'} />
                            <Picker.Item color={'#272323'} label={'Female'} value={'Female'} />
                        </Picker>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button variant={'primary'} text={'Sign Up'} onPress={registerOnpressed} />
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
    backWrapper: {
        position: 'absolute',
        left: 20,
        top: 15,
    },
    logoWrapper: {
        alignItems: 'center',
        flex: 0.1,
        justifyContent: 'center',
    },
    contentWrapper: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 30,
    },
    title: {
        color: '#272323',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 42,
        paddingTop: 14,
        paddingBottom: 14,
        textAlign: 'center',
    },
    formWrapper: {
        flexDirection: 'column',
        flexWrap: 'wrap',
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
    pickerWrapper: {
        backgroundColor: '#EEE8F6',
        borderRadius: 15,
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
    }
});

export default Register;
