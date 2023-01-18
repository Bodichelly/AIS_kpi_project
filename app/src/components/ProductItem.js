import React from "react";
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const ProductItem = ({product, openCb}) => {

    return (
        <>
            {product ?
                <Pressable style={styles.listItem}>
                    <View style={styles.listItemView}>
                            <Text style={styles.listItemText}>{product.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: product.image_url }}
                                placeholder={product.code}
                                contentFit="cover"
                                transition={1000}
                            />
                            <TouchableOpacity   style={styles.openProductGroup} onPress={openCb}>
                                <Text style={styles.openProductText}>View Product</Text>
                                <FontAwesome
                                    style={styles.openProduct}
                                    name="info"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity >

                        </View>
                </Pressable>
                :
                <Text>Loading ...</Text>
            }
        </>

    );
};

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: "#fafcff",
        borderColor: "#eee",
        marginHorizontal: 14,
        marginVertical: 3,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        height: 370,
        alignSelf: 'stretch',
        borderStyle: "solid",
        borderWidth: 1,
    },
    listItemView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",

    },
    listItemText: {
        fontSize: 16,
        color: "#242629",
    },
    image: {
        marginVertical: 10,
        flex: 1,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#0553',
    },
    openProduct: {
        paddingLeft: 20
    },
    openProductGroup: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#61a0ff",
        borderRadius: 20,
        marginVertical: 20,
        alignSelf: 'flex-end',
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    openProductText: {
        color: "#fff",
        fontSize: 16,
    }
});