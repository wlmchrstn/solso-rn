import React, { useState, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';

import { BackButton } from '../../components/Button/button';

const DonationList = () => {
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const [donation, setDonation] = useState([]);
    const dispatch = useDispatch();

    const backOnpressed = () => {
        navigation.goBack();
    };

    const createOnpressed = () => {
        navigation.navigate('DonationCreate');
    };

    const donationOnpressed = (id) => {
        dispatch({
            type: 'SET_DONATION',
            donation: id,
        })
        navigation.navigate('DonationDetail');
    };

    useEffect(() => {
        const getDonation = async () => {
            try {
                const allEvent = async  () => await Axios.get('https://solso.herokuapp.com/api/donation/show-donation', {
                    headers: {
                        Authorization: AuthReducer.token
                    }
                });

                allEvent()
                    .then(res => {
                        setDonation(res.data.result);
                    })
                    .catch(e => {
                        ToastAndroid.show('Failed to retrieve donation', ToastAndroid.SHORT);
                        navigation.navigate('Home');
                    });
            } catch(err) {
                ToastAndroid.show('Failed to retrieve donation', ToastAndroid.SHORT);
                navigation.navigate('Home');
            };
        };
        getDonation();
    }, []);

    const mapDonation = () => {
        return donation.map((item, index) => {
            return (
                <Pressable key={index} style={styles.eventWrapper} onPress={() => donationOnpressed(item._id)}>
                    <Text style={styles.event}>
                        {item.name}
                    </Text>
                    <Text style={styles.date}>
                        {moment(item.date).format('LL')}
                    </Text>
                </Pressable>
            );
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.backContainer}>
                <View style={styles.backWrapper}>
                    <BackButton color={'white'} onPress={backOnpressed} />
                </View>
            </View>
            <Text style={styles.header}>
                {'Donation List'}
            </Text>
            <Pressable style={styles.createWrapper} onPress={createOnpressed}>
                <Text style={styles.create}>
                    {'Create'}
                </Text>
                <Image source={require('../../assets/images/double-arrow.png')} style={styles.arrow} />
            </Pressable>
            <View style={styles.contentWrapper}>
                {mapDonation()}
                {/* <Pressable style={styles.eventWrapper} onPress={donationOnpressed}>
                    <Text style={styles.event}>
                        {'Montreux Jazz Festival'}
                    </Text>
                    <Text style={styles.date}>
                        {'01 Juli 2022'}
                    </Text>
                </Pressable>
                <Pressable style={styles.eventWrapper} onPress={donationOnpressed}>
                    <Text style={styles.event}>
                        {'Montreux Jazz Festival'}
                    </Text>
                    <Text style={styles.date}>
                        {'01 Juli 2022'}
                    </Text>
                </Pressable>
                <Pressable style={styles.eventWrapper} onPress={donationOnpressed}>
                    <Text style={styles.event}>
                        {'Montreux Jazz Festival'}
                    </Text>
                    <Text style={styles.date}>
                        {'01 Juli 2022'}
                    </Text>
                </Pressable>
                <Pressable style={styles.eventWrapper} onPress={donationOnpressed}>
                    <Text style={styles.event}>
                        {'Montreux Jazz Festival'}
                    </Text>
                    <Text style={styles.date}>
                        {'01 Juli 2022'}
                    </Text>
                </Pressable>
                <Pressable style={styles.eventWrapper} onPress={donationOnpressed}>
                    <Text style={styles.event}>
                        {'Montreux Jazz Festival'}
                    </Text>
                    <Text style={styles.date}>
                        {'01 Juli 2022'}
                    </Text>
                </Pressable>
                <Pressable style={styles.eventWrapper} onPress={donationOnpressed}>
                    <Text style={styles.event}>
                        {'Montreux Jazz Festival'}
                    </Text>
                    <Text style={styles.date}>
                        {'01 Juli 2022'}
                    </Text>
                </Pressable>
                <Pressable style={styles.eventWrapper} onPress={donationOnpressed}>
                    <Text style={styles.event}>
                        {'Montreux Jazz Festival'}
                    </Text>
                    <Text style={styles.date}>
                        {'01 Juli 2022'}
                    </Text>
                </Pressable> */}
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
    header: {
        color: '#000',
        fontSize: 24,
        lineHeight: 32,
        marginVertical: 20,
        textAlign: 'center',
    },
    createWrapper: {
        backgroundColor: 'rgba(196,196,196,0.75)',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginBottom: 24,
        padding: 20,
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    create: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 32,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    arrow: {
        width: 50,
        height: 25,
    },
    contentWrapper: {
        flex: 1,
        marginHorizontal: 30,
    },
    eventWrapper: {
        backgroundColor: 'rgba(196,196,196,0.75)',
        borderRadius: 15,
        flexDirection: 'column',
        marginBottom: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    event: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#000',
        fontSize: 24,
        lineHeight: 32,
    },
    date: {
        color: '#000',
        fontSize: 16,
        lineHeight: 24,
    }
});

export default DonationList;
