import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { BackButton } from '../../components/Button/button';

const ProfileEdit = ({}) => {
    const navigation = useNavigation();
    const ProfileReducer = useSelector(state => state.ProfileReducer);
    const AuthReducer = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        fullName: ProfileReducer.fullName,
        gender: ProfileReducer.gender,
        phone: ProfileReducer.phone.toString(),
        address: ProfileReducer.address,
    });

    const handleInput = (value, input) => {
        setForm({
            ...form,
            [input]: value,
        });
    };

    const backButtonOnpressed = () => {
        navigation.goBack();
    };

    const saveOnpressed = async () => {
        try {
            const save = async (objparam) => await Axios.put('https://solso.herokuapp.com/api/member/update', objparam, {
                headers: {
                    Authorization: AuthReducer.token,
                },
            });

            save({
                fullName: form.fullName,
                gender: form.gender,
                phone: form.phone,
                address: form.address,
            })
                .then(res => {
                    if (res.data.success === true) {
                        dispatch({
                            type: 'SET_PROFILE',
                            data: res.data.result,
                        });
                        navigation.navigate('Profile')
                        ToastAndroid.show('Profile updated', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
                    }
                })
                .catch(e => {
                    ToastAndroid.show('Profile updated', ToastAndroid.SHORT);
                })
        } catch(err) {
        };
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.headerContainer}>
                <View style={styles.backWrapper}>
                    <BackButton onPress={backButtonOnpressed} />
                </View>
                <View style={styles.imageWrapper}>
                    <Image source={require('../../assets/images/profile-picture.png')} style={styles.image} />
                </View>
                <TextInput
                    maxLength={32}
                    placeholder={'Full Name'}
                    value={form.fullName}
                    onChangeText={value => handleInput(value, 'fullName')}
                    style={styles.name}
                />
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Gender'}
                    </Text>
                    <Picker
                        selectedValue={form.gender}
                        onValueChange={(value, index) => handleInput(value, 'gender')}
                        style={styles.picker}
                    >
                        <Picker.Item color={'#a1a1a1'} label={'Male'} value={'Male'} />
                        <Picker.Item color={'#a1a1a1'} label={'Female'} value={'Female'} />
                    </Picker>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Phone'}
                    </Text>
                    <TextInput
                        maxLength={32}
                        keyboardType={'number-pad'}
                        placeholder={'Phone'}
                        style={styles.detail}
                        value={form.phone}
                        onChangeText={value => handleInput(value, 'phone')}
                    />
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Address'}
                    </Text>
                    <TextInput
                        maxLength={32}
                        placeholder={'Address'}
                        style={styles.detail}
                        value={form.address}
                        onChangeText={value => handleInput(value, 'address')}
                    />
                </View>
                <View style={styles.editContainer}>
                    <Pressable style={styles.editWrapper} onPress={saveOnpressed}>
                        <Text style={styles.edit}>
                            {'Save'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    },
    headerContainer: {
        flex: 0.9,
    },
    backWrapper: {
        position: 'absolute',
        left: 20,
        top: 15,
    },
    imageWrapper: {
        marginTop: 28,
        marginBottom: 14,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    name: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#000',
        fontSize: 40,
        lineHeight: 48,
        textAlign: 'center',
    },
    editContainer: {
        height: 44,
    },
    editWrapper: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    edit: {
        color: '#000',
        fontSize: 20,
        lineHeight: 24,
        paddingVertical: 4,
        paddingHorizontal: 32,
    },
    detailContainer: {
        backgroundColor: '#433C82',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    detailWrapper: {
        width: '100%',
        borderBottomWidth: 3,
        borderBottomColor: '#a1a1a1',
        paddingBottom: 8,
        marginBottom: 16,
    },
    detailHelper: {
        color: '#a1a1a1',
    },
    detail: {
        color: '#a1a1a1',
        fontSize: 24,
        lineHeight: 32,
        padding: 0,
    },
    picker: {
        marginHorizontal: -15,
    },
});

export default ProfileEdit;
