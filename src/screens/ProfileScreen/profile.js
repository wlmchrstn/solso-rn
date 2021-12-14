import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { BackButton } from '../../components/Button/button';

const Profile = ({}) => {
    const navigation = useNavigation();
    const ProfileReducer = useSelector(state => state.ProfileReducer);
    const AuthReducer = useSelector(state => state.AuthReducer);
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

    const backButtonOnpressed = () => {
        navigation.goBack();
    };

    const editOnpressed = () => {
        navigation.navigate('ProfileEdit');
    };

    const passwordOnpressed = () => {
        navigation.navigate('PasswordChange')
    }

    const uploadOnpressed = () => {
        ToastAndroid.show('This is future feature!', ToastAndroid.SHORT);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.backWrapper}>
                <BackButton onPress={backButtonOnpressed} />
            </View>
            <Pressable style={styles.imageWrapper} onPress={uploadOnpressed}>
                <Image source={{ uri: ProfileReducer.profilePic }} style={styles.image} />
            </Pressable>
            <Text style={styles.name}>
                {ProfileReducer.fullName}
            </Text>
            <View style={styles.editContainer}>
                <Pressable style={styles.editWrapper} onPress={editOnpressed}>
                    <Text style={styles.edit}>
                        {'Edit'}
                    </Text>
                </Pressable>
                <Pressable style={styles.passwordWrapper} onPress={passwordOnpressed}>
                    <Text style={styles.edit}>
                        {'Change Password'}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Email'}
                    </Text>
                    <Text style={styles.detail}>
                        {ProfileReducer.email}
                    </Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Gender'}
                    </Text>
                    <Text style={styles.detail}>
                        {ProfileReducer.gender}
                    </Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Phone'}
                    </Text>
                    <Text style={styles.detail}>
                        {`+62${ProfileReducer.phone}`}
                    </Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHelper}>
                        {'Address'}
                    </Text>
                    <Text style={styles.detail}>
                        {ProfileReducer.address}
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
        overflow: 'hidden',
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
    },
    editContainer: {
        marginTop: 8,
        height: 24,
        marginBottom: 32,
    },
    editWrapper: {
        position: 'absolute',
        top: 8,
        right: 15,
        backgroundColor: '#C4C4C4',
        paddingVertical: 4,
        paddingHorizontal: 32,
        borderRadius: 10,
    },
    passwordWrapper: {
        position: 'absolute',
        top: 8,
        left: 15,
        backgroundColor: '#C4C4C4',
        paddingVertical: 4,
        paddingHorizontal: 32,
        borderRadius: 10,
    },
    edit: {
        color: '#000',
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '500',
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

export default Profile;
