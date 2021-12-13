import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import Button from '../../components/Button';
import { BackButton } from '../../components/Button/button';

const EventCreate = () => {
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const [data, setData] = useState({
        name: '',
        address: '',
        date: '',
        description: '',
        banner: 'https://res.cloudinary.com/ayumhrn/image/upload/v1569487841/fo1jogrqffevwvulwkyo.png',
    });

    const backOnpressed = () => {
        navigation.goBack();
    };

    const handleInput = (value, input) => {
        setData({
            ...data,
            [input]: value,
        });
    };

    const createOnpressed = async () => {
        try {
            const event = async (objparam) => await Axios.post('https://solso.herokuapp.com/api/event/create-event', objparam, {
                headers: {
                    Authorization: AuthReducer.token,
                }
            });

            event({
                name: data.name,
                address: data.address,
                date: data.date,
                status: 'Finished',
                description: data.description,
                banner: data.banner,
            })
                .then(res => {
                    if (res.data.success === true) {
                        navigation.navigate('EventList');
                    } else {
                        ToastAndroid.show('Failed to create event', ToastAndroid.SHORT);
                    };
                })
                .catch(e => {
                    ToastAndroid.show(e, ToastAndroid.SHORT);
                });
        } catch(err) {
            ToastAndroid.show(err, ToastAndroid.SHORT);
        };
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.backContainer}>
                <View style={styles.backWrapper}>
                    <BackButton color={'white'} onPress={backOnpressed} />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputHelper}>
                        {'Name'}
                    </Text>
                    <TextInput
                        maxLength={32}
                        placeholder={'Name'}
                        style={styles.input}
                        value={data.name}
                        onChangeText={(value) => handleInput(value, 'name')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputHelper}>
                        {'Address'}
                    </Text>
                    <TextInput
                        maxLength={32}
                        placeholder={'Address'}
                        style={styles.input}
                        value={data.address}
                        onChangeText={(value) => handleInput(value, 'address')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputHelper}>
                        {'Date'}
                    </Text>
                    <TextInput
                        maxLength={32}
                        placeholder={'Date'}
                        style={styles.input}
                        value={data.date}
                        onChangeText={(value) => handleInput(value, 'date')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputHelper}>
                        {'Description'}
                    </Text>
                    <TextInput
                        placeholder={'Description'}
                        // multiline={true}
                        // numberOfLines={5}
                        style={styles.input}
                        value={data.description}
                        onChangeText={(value) => handleInput(value, 'description')}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button variant={'primary'} text={'Create'} onPress={createOnpressed} />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
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
    uploadWrapper: {
        width: 250,
        backgroundColor: '#C4C4C4',
        borderRadius: 15,
        marginVertical: 20,
        alignSelf: 'center',
    },
    upload: {
        color: '#000',
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        paddingVertical: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    inputWrapper: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingBottom: 8,
        marginBottom: 16,
    },
    inputHelper: {
        color: '#000',
    },
    input: {
        color: '#000',
        fontSize: 24,
        lineHeight: 32,
        padding: 0,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginVertical: 15,
        marginHorizontal: 15,
    }
});

export default EventCreate;
