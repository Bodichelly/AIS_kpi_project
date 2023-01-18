import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import {ProductItem} from "../components/ProductItem";

export const MainScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const isFocused = useIsFocused();

    useEffect(()=> {
        fetch('http://192.168.0.128:8000/api/products/')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
    }, [isFocused])


    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {products ?
                    products.map((product) =>
                        <ProductItem
                            key={product.code}
                            product={product}
                            openCb={()=>{
                                navigation.navigate('productinfo', {
                                    productCode: product.code
                                })
                            }}
                        />)
                    :
                    <Text>Loading ...</Text>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
