import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, Text, View, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import Button from '../../components/Button';
import { BackButton } from '../../components/Button/button';

const DonationCreate = () => {
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const [data, setData] = useState({
        name: '',
        date: '',
        cost: '',
    });

    const handleInput = (value, input) => {
        setData({
            ...data,
            [input]: value,
        });
    };

    const backOnpressed = () => {
        navigation.goBack();
    };

    const createOnpressed = async () => {
        try {
            const donation = async (objparam) => await Axios.post('https://solso.herokuapp.com/api/donation/create-donation', objparam, {
                headers: {
                    Authorization: AuthReducer.token,
                }
            });

            donation({
                name: data.name,
                date: data.date,
                cost: data.cost,
            })
                .then(res => {
                    if (res.data.success === true) {
                        navigation.goBack();
                    } else {
                        ToastAndroid.show('Failed to create donation', ToastAndroid.SHORT);
                    }
                })
                .catch(e => {
                    ToastAndroid.show('Failed to create donation', ToastAndroid.SHORT);
                })
        } catch(err) {
            ToastAndroid.show('Failed to create donation', ToastAndroid.SHORT);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.backContainer}>
                <View style={styles.backWrapper}>
                    <BackButton color={'white'} onPress={backOnpressed} />
                </View>
            </View>
            <View style={styles.logoWrapper}>
                <Image source={require('../../assets/images/solso-logo.png')} style={styles.logo} />
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.helper}>
                    {'Donation Name'}
                </Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        maxLength={32}
                        placeholder={'Donation Name'}
                        value={data.name}
                        onChangeText={(value) => handleInput(value, 'name')}
                    />
                </View>
                <Text style={styles.helper}>
                    {'Date'}
                </Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        maxLength={32}
                        placeholder={'Date'}
                        value={data.date}
                        onChangeText={(value) => handleInput(value, 'date')}
                    />
                </View>
                <Text style={styles.helper}>
                    {'Donation Cost'}
                </Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        maxLength={32}
                        placeholder={'Donation Cost'}
                        value={data.cost}
                        onChangeText={(value) => handleInput(value, 'cost')}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        variant={'primary'}
                        text={'CREATE'}
                        onPress={createOnpressed}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    backContainer: {
        backgroundColor: '#433C82',
        height: 55,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    backWrapper: {
        position: 'absolute',
        left: 20,
        top: 15,
    },
    logoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 225,
        height: 225,
    },
    contentWrapper: {
        flex: 1,
        marginHorizontal: 25,
    },
    helper: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 32,
    },
    inputWrapper: {
        backgroundColor: '#EEE8F6',
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    input: {
        color: '#272323',
        paddingHorizontal: 15,
        width: '100%',
    },
    buttonWrapper: {
        marginTop: 15,
    },
});

export default DonationCreate;
