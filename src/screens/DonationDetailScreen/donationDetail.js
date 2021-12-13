import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';

import { BackButton } from '../../components/Button/button';

const DonationDetail = () => {
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const DetailReducer = useSelector(state => state.DetailReducer);
    const [status, setStatus] = useState(false);
    const [data, setData] = useState({
        name: '',
        date: '',
        cost: '',
    });

    useEffect(() => {
        const getDetail = async () => {
            try {
                const donation = async () => await Axios.get(`https://solso.herokuapp.com/api/donation/show-donation/${DetailReducer.donation}`, {
                    headers: {
                        Authorization: AuthReducer.token,
                    }
                })

                donation()
                    .then(res => {
                        setData(res.data.result);
                    })
                    .catch(err => {
                        ToastAndroid.show('Failed to retrieve donation detail', ToastAndroid.SHORT);
                    });
            } catch(err) {
                ToastAndroid.show('Failed to retrieve donation detail', ToastAndroid.SHORT);
            };
        };
        getDetail();
        getTransaction();
    }, []);

    const getTransaction = async () => {
        try {
            const transaction = async () => await Axios.get(`https://solso.herokuapp.com/api/donation/donation-payment/${DetailReducer.donation}`, {
                headers: {
                    Authorization: AuthReducer.token,
                }
            });

            transaction()
                .then(res => {
                    if (res.data.success === true) {
                        setStatus(true);
                    } else if (res.data.success === false) {
                        setStatus(false);
                    };
                })
                .catch(e => {
                    // ToastAndroid.show('Failed to retrieve payment', ToastAndroid.SHORT);
                })
        } catch(err) {
            ToastAndroid.show('Failed to retrieve payment status', ToastAndroid.SHORT);
        }
    }

    const backOnpressed = () => {
        navigation.goBack();
    };

    const payOnpressed = async () => {
        try {
            const pay = async () => await Axios.post(`https://solso.herokuapp.com/api/donation/pay-donation/${DetailReducer.donation}`, {
                headers: {
                    Authorization: AuthReducer.token,
                }
            });

            pay()
                .then(res => {
                    if (res.data.success === true) {
                        getTransaction();
                    } else {
                        ToastAndroid.show('Failed to make transaction', ToastAndroid.SHORT);
                    };
                })
                .catch(e => {
                    ToastAndroid.show('Failed to make transaction', ToastAndroid.SHORT);
                })
        } catch(err) {
            ToastAndroid.show('Failed to make transaction', ToastAndroid.SHORT);
        };
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.backContainer}>
                <View style={styles.backWrapper}>
                    <BackButton color={'white'} onPress={backOnpressed} />
                </View>
            </View>
            <Text style={styles.helper}>
                {'Donation title'}
            </Text>
            <Text style={styles.detail}>
                {data.name}
            </Text>
            <Text style={styles.helper}>
                {'Date'}
            </Text>
            <Text style={styles.detail}>
                {moment(data.date).format('LL')}
            </Text>
            <Text style={styles.helper}>
                {'Cost'}
            </Text>
            <Text style={styles.detail}>
                {`Rp.${data.cost.toString()}`}
            </Text>
            <Pressable style={styles.payWrapper} onPress={payOnpressed} disabled={status}>
                <Text style={styles.pay}>
                    {status ? 'Paid' : 'Pay'}
                </Text>
            </Pressable>
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
    detail: {
        color: '#000',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 32,
        marginHorizontal: 15,
        marginTop: 4,
    },
    helper: {
        color: '#000',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        marginHorizontal: 15,
        marginTop: 4,
    },
    payWrapper: {
        backgroundColor: '#C4C4C4',
        width: 75,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    pay: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        paddingVertical: 5,
        textAlign: 'center',
    },
});

export default DonationDetail;
