import React, { useState, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { BackButton } from '../../components/Button/button';

const MemberList = () => {
    const navigation = useNavigation();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const [member, setMember] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMember = async () => {
            try {
                const allMember = async () => await Axios.get('https://solso.herokuapp.com/api/member/show-member', {
                    headers: {
                        Authorization: AuthReducer.token,
                    }
                });

                allMember()
                    .then(res => {
                        setMember(res.data.result);
                    })
                    .catch(e => {
                        ToastAndroid.show('Failed to retrieve member list', ToastAndroid.SHORT);
                    })
            } catch(err) {
                ToastAndroid.show('Failed to retrieve member list', ToastAndroid.SHORT);
            };
        };
        getMember();
    }, [])

    const mapMember = () => {
        return member.map((item, index) => {
            return (
                <Pressable key={index} style={styles.memberWrapper} onPress={() => memberOnpressed(item._id)}>
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: item.profilePic}} style={styles.image} />
                    </View>
                    <Text style={styles.member}>
                        {item.fullName}
                    </Text>
                </Pressable>
            );
        });
    };

    const backOnpressed = () => {
        navigation.goBack();
    };

    const memberOnpressed = (id) => {
        dispatch({
            type: 'SET_MEMBER',
            member: id,
        });

        navigation.navigate('MemberDetail');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.headerWrapper}>
                <View style={styles.backWrapper}>
                    <BackButton color={'white'} onPress={backOnpressed} />
                </View>
            </View>
            <Text style={styles.header}>
                {'Member List'}
            </Text>
            <View style={styles.contentWrapper}>
                {mapMember()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    headerWrapper: {
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
    contentWrapper: {
        flex: 1,
        marginHorizontal: 30,
    },
    memberWrapper: {
        backgroundColor: 'rgba(196,196,196,0.75)',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    imageWrapper: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    image: {
        height: 60,
        width: 60,
    },
    member: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#000',
        marginHorizontal: 15,
        fontSize: 24,
        lineHeight: 32,
    },
});

export default MemberList;
