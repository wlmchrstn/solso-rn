import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const PrimaryCard = ({ text, image, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image source={image} style={styles.image} width={108} height={108} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    imageWrapper: {
        width: 108,
        height: 108,
    },
    image: {
        resizeMode: 'contain',
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        color: '#000',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
    },
});

export default PrimaryCard;
