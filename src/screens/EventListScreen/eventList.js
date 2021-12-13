import React, { useState, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';

import { BackButton } from '../../components/Button/button';

const EventList = () => {
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('Ongoing');
    const [event, setEvent] = useState([]);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const allEvent = async  () => await Axios.get('https://solso.herokuapp.com/api/event/show-event/', {
                    headers: {
                        Authorization: AuthReducer.token
                    }
                });

                allEvent()
                    .then(res => {
                        setEvent(res.data.result);
                    })
                    .catch(e => {
                        ToastAndroid.show('Failed to retrieve event', ToastAndroid.SHORT);
                    });
            } catch(err) {
                ToastAndroid.show('Failed to retrieve event', ToastAndroid.SHORT);
            };
        };
        getEvent();
    }, []);

    const mapEvent = () => {
        return event.filter((item) => item.status == filter).map((item, index) => {
            return (
                <Pressable key={index} style={styles.eventWrapper} onPress={() => eventOnpressed(item._id)}>
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

    const backOnpressed = () => {
        navigation.goBack();
    };

    const createOnpressed = () => {
        navigation.navigate('EventCreate');
    };

    const filterOnpressed = (data) => {
        setFilter(data);
    };

    const eventOnpressed = (id) => {
        dispatch({
            type: 'SET_EVENT',
            event: id,
        });
        navigation.navigate('EventDetail');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.backContainer}>
                <View style={styles.backWrapper}>
                    <BackButton color={'white'} onPress={backOnpressed} />
                </View>
            </View>
            <Text style={styles.header}>
                {'Event List'}
            </Text>
            <View style={styles.filterContainer}>
                <Pressable style={styles.filterWrapper} onPress={() => filterOnpressed('Ongoing')}>
                    <Text style={styles.filter}>
                        {'Ongoing'}
                    </Text>
                </Pressable>
                <Pressable style={styles.filterWrapper} onPress={() => filterOnpressed('Upcoming')}>
                    <Text style={styles.filter}>
                        {'Upcoming'}
                    </Text>
                </Pressable>
                <Pressable style={styles.filterWrapper} onPress={() => filterOnpressed('Finished')}>
                    <Text style={styles.filter}>
                        {'Finished'}
                    </Text>
                </Pressable>
            </View>
            <Pressable style={styles.createWrapper} onPress={createOnpressed}>
                <Text style={styles.create}>
                    {'Create'}
                </Text>
                <Image source={require('../../assets/images/double-arrow.png')} style={styles.arrow} />
            </Pressable>
            <View style={styles.contentWrapper}>
                {mapEvent()}
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
    filterContainer: {
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    filterWrapper: {
        paddingHorizontal: 12,
        backgroundColor: 'rgba(196,196,196,0.75)',
        borderRadius: 15,
    },
    filter: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        textTransform: 'uppercase',
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

export default EventList;
