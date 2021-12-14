import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';

import { BackButton } from '../../components/Button/button';

const EventDetail = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({
        name: '',
        address: '',
        date: null,
        status: '',
        description: '',
        banner: 'https://res.cloudinary.com/ayumhrn/image/upload/v1569487841/fo1jogrqffevwvulwkyo.png',
        donation: '',
        creator: '',
    });
    const AuthReducer = useSelector(state => state.AuthReducer);
    const DetailReducer = useSelector(state => state.DetailReducer);

    const backOnpressed = () => {
        navigation.goBack()
    };

    useEffect(() => {
        const getDetail = async () => {
            try {
                const event = async  () => await Axios.get(`https://solso.herokuapp.com/api/event/show-event/${DetailReducer.event}`, {
                    headers: {
                        Authorization: AuthReducer.token
                    }
                });

                event()
                    .then(res => {
                        setData(res.data.result);
                    })
                    .catch(e => {
                        ToastAndroid.show(e, ToastAndroid.SHORT);
                        // navigation.navigate('EventList');
                    });
            } catch(err) {
                ToastAndroid.show(err, ToastAndroid.SHORT);
                // navigation.navigate('EventList');
            };
        };
        getDetail();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: data.banner }} style={styles.image} />
            </View>
            <View style={styles.backWrapper}>
                <BackButton color={'white'} onPress={backOnpressed} />
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.date}>
                    {moment(data.date).format('LL')}
                </Text>
                <Text style={styles.event}>
                    {data.name}
                </Text>
                <Text style={styles.event}>
                    {'Address'}
                </Text>
                <Text style={styles.eventDetail}>
                    {data.address}
                </Text>
                <Text style={styles.event}>
                    {data.status}
                </Text>
                <Text style={styles.event}>
                    {'Event Description'}
                </Text>
                <Text style={styles.eventDetail}>
                    {data.description}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1 ,
    },
    backWrapper: {
        position: 'absolute',
        left: 20,
        top: 15,
        zIndex: 1,
    },
    imageWrapper: {
        top: 0,
        left: 0,
        width: '100%',
        height: 300,
        marginBottom: -30,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    contentContainer: {
        flex: 1,
    },
    contentWrapper: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#fff',
        padding: 20,
    },
    date: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        textAlign: 'right',
    },
    event: {
        color: '#000',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '700',
        marginTop: 10,
    },
    eventDetail : {
        color: '#000',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
    },
})

export default EventDetail;
