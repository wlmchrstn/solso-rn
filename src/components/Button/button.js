import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const FlatButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.flatButton}>
                <Text style={styles.flatText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};



const Button = ({ variant, text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={variant == 'secondary' ? { alignSelf: 'center' } : '' }>
            <View style={styles[`${variant}Button`]}>
                <Text style={styles[`${variant}Text`]}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const BackButton = ({ color, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.backButton}>
            <Image source={color == 'white' ? require('../../assets/images/back-button-white.png') : require('../../assets/images/back-button.png')} style={styles.backIcon} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    primaryButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#433C82',
        borderRadius: 15,
    },
    primaryText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'
    },
    secondaryButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#EEE8F6',
        borderRadius: 15,
        alignSelf: 'center',
    },
    secondaryText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'
    },
    flatButton: {
        paddingVertical: 10,
    },
    flatText: {
        color: '#433C82',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
    },
    backButton: {
        height: 26,
        width: 25,
    },
    backIcon: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
});

export default Button;
