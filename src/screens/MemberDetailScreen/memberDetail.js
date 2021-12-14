import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import { BackButton } from '../../components/Button/button';

const MemberDetail = () => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        gender: '',
        phone: '',
        address: '',
    });
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const DetailReducer = useSelector(state => state.DetailReducer);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const member = async  () => await Axios.get(`https://solso.herokuapp.com/api/member/show-member/${DetailReducer.member}`, {
                    headers: {
                        Authorization: AuthReducer.token
                    }
                });

                member()
                    .then(res => {
                        setData(res.data.result);
                    })
                    .catch(e => {
                        ToastAndroid.show('Failed to retrieve member details', ToastAndroid.SHORT);
                        navigation.navigate('MemberList');
                    });
            } catch(err) {
                ToastAndroid.show('Failed to retrieve member details', ToastAndroid.SHORT);
                navigation.navigate('MemberList');
            };
        };
        getDetail();
    }, []);

    const backButtonOnpressed = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.backWrapper}>
                <BackButton onPress={backButtonOnpressed} />
            </View>
            <View style={styles.imageWrapper}>
                <Image source={require('../../assets/images/profile-picture.png')} style={styles.image} />
            </View>
            <Text style={styles.name}>
                {data.fullName}
            </Text>
            <View style={styles.detailContainer}>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Email'}
                    </Text>
                    <Text style={styles.detail}>
                        {data.email}
                    </Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Gender'}
                    </Text>
                    <Text style={styles.detail}>
                        {data.gender}
                    </Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Phone'}
                    </Text>
                    <Text style={styles.detail}>
                        {`+62${data.phone}`}
                    </Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Address'}
                    </Text>
                    <Text style={styles.detail}>
                        {data.address}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
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
        flexWrap: 'wrap',
        color: '#000',
        fontSize: 40,
        lineHeight: 48,
        textAlign: 'center',
        marginBottom: 15,
    },
    detailContainer: {
        flex: 1,
        marginHorizontal: 15,
    },
    detailWrapper: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#C4C4C4',
        paddingBottom: 8,
        marginBottom: 16,
    },
    detail: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#000',
        fontSize: 24,
        lineHeight: 32,
    }
});

export default MemberDetail;
