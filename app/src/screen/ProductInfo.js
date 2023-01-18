import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Dialog from "react-native-dialog";
import { useIsFocused } from "@react-navigation/native";

export const ProductInfo = ({ route, navigation }) => {
    const { productCode } = route.params;
    const isFocused = useIsFocused();
    const [product, setProduct] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(()=>{
        if(!productCode) {
            return
        }
        fetch(`http://192.168.0.128:8000/api/products/${productCode}`)
            .then(response => response.json())
            .then(data => {
                if(data.detail) {
                    console.log(data.detail)
                    setNotFound(true);
                    return null;
                }
                return data
            })
            .then(data => setProduct(data))
            .catch(err => console.log(err))
    }, [productCode, isFocused])

    const barcodeUrl = `http://192.168.0.128:8000/api/barcode/${productCode}`;

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {product ?
                    <>
                        <Text style={styles.productName}>{product?.name}</Text>
                        <Image
                            style={styles.productImg}
                            source={{ uri: product?.image_url }}
                            placeholder={product?.code}
                            resizeMode="contain"
                            transition={1000}
                        />
                        <Text style={styles.productQuantity}>Quantity: {product?.quantity}</Text>
                        <Text style={styles.productDescription}>{product?.description}</Text>
                        <Image
                            style={styles.productBarcode}
                            source={{ uri: barcodeUrl }}
                            placeholder={product?.code}
                            resizeMode="contain"
                            transition={1000}
                        />
                        <Text style={styles.productCode}>{product?.code}</Text>
                    </>
                    :
                    <Text style={styles.productName}>Loading ...</Text>
                }
                <Dialog.Container visible={notFound}>
                    <Dialog.Title>It seems that product with code {productCode} is missing</Dialog.Title>
                    <Dialog.Description>
                        Would you like to add product with code {productCode}?
                    </Dialog.Description>
                    <Dialog.Button label="Yes" onPress={() => navigation.navigate('addproduct', {
                        productCode: productCode
                    })} />
                    <Dialog.Button label="No" onPress={() => navigation.navigate('home')} />
                </Dialog.Container>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        height: "100%",
    },
    productName: {
        fontSize: 18,
        color: "#242629",
    },
    productImg: {
        marginVertical: 10,
        flex: 1,
        minWidth: 300,
        minHeight: 300,
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    productQuantity: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#242629",
    },
    productDescription: {

        fontSize: 15,
        color: "#3b3b3b",
    },
    productBarcode: {
        marginTop: 10,
        flex: 1,
        minWidth: 250,
        minHeight: 150,
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    productCode: {
        fontWeight: "bold",
        fontSize: 16,
        alignSelf: 'center',
        color: "#000",
    }
});
