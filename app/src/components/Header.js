import React from "react";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import {Link} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";

export const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <StatusBar style="auto" />
            <Link style={styles.links} to={"/home"}>
                <FontAwesome
                    style={styles.openProduct}
                    name="home"
                    size={35}
                    color="white"
                />
            </Link>
            <Link style={styles.links} to={"/addproduct"}>
                <FontAwesome
                    style={styles.openProduct}
                    name="plus"
                    size={35}
                    color="white"
                />
            </Link>
            <Link style={styles.links} to={"/scanner"}>
                <FontAwesome
                    style={styles.openProduct}
                    name="barcode"
                    size={35}
                    color="white"
                />
            </Link>
        </View>
    );
};

Header.defaultProps = {
    title: "Products manager",
};

const styles = StyleSheet.create({
    header: {
        height: 70,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: "darkslateblue",
        justifyContent: "center",
        alignItems: "center",
    },
    links: {
        color: "#fff",
        backgroundColor: "pink",
        paddingHorizontal: 10,
        marginHorizontal: 10,
        fontSize: 25,
        textAlign: "center",
        borderRadius: 50,
    },
});
