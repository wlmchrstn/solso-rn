import React, { useEffect } from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';

import PrimaryCard from '../../components/Card/card';

const Home = () => {
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const ProfileReducer = useSelector(state => state.ProfileReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const masuk = async () => await Axios.get('https://solso.herokuapp.com/api/member/show-profile', {
                    headers: {
                        Authorization: AuthReducer.token,
                    },
                });

                masuk()
                    .then(res => {
                        dispatch({
                            type: 'SET_PROFILE',
                            data: res.data.result
                        })
                    })
                    .catch(e => {

                    })
            } catch(err) {
            };
        };
        getProfile();
    }, []);

    const memberOnpressed = () => {
        navigation.navigate('MemberList');
    };

    const eventOnpressed = () => {
        navigation.navigate('EventList');
    };

    const donationOnpressed = () => {
        navigation.navigate('DonationList');
    };

    const profileOnpressed = () => {
        navigation.navigate('Profile');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.logoWrapper}>
                <Image source={require('../../assets/images/SOLSO.png')} />
            </View>
            <View style={styles.memberWrapper}>
                <Text style={styles.member}>{`Hi, ${ProfileReducer.fullName}`}</Text>
                <Text style={styles.date}>{moment().format('dddd') + ', ' + moment().format('LL')}</Text>
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.spacer} />
                <View style={styles.cardContainer}>
                    <PrimaryCard text={'Member'} image={require('../../assets/images/member.png')} onPress={memberOnpressed} />
                    <View style={styles.spacer} />
                    <PrimaryCard text={'Donation'} image={require('../../assets/images/donation.png')} onPress={donationOnpressed} />
                </View>
                <View style={styles.spacer} />
                <View style={styles.cardContainer}>
                    <PrimaryCard text={'Event'} image={require('../../assets/images/event.png')} onPress={eventOnpressed} />
                    <View style={styles.spacer} />
                    <PrimaryCard text={'Profile'} image={require('../../assets/images/profile.png')} onPress={profileOnpressed} />
                </View>
                <View style={styles.spacer} />
            </View>
            <View style={styles.spacer} />
            <View style={styles.spacer} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#433C82',
        flex: 1,
    },
    logoWrapper: {
        alignItems: 'center',
        marginVertical: 40,
    },
    memberWrapper: {
        backgroundColor: '#EEE8F6',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 15,
    },
    member: {
        color: '#000',
        fontSize: 32,
        lineHeight: 40,
    },
    date: {
        color: '#000',
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 32,
    },
    contentWrapper: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        flexDirection: "row",
        alignSelf: 'center',
        marginTop: 40,
    },
    cardContainer: {
        flex: 1,
    },
    spacer: {
        width: 15,
        height: 15,
    }
});

export default Home;
