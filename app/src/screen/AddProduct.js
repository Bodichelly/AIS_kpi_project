import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

export const AddProduct = ({ route, navigation }) => {
    const { productCode } = route.params;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");

    useEffect(()=>{
        if(productCode) {
            setCode(productCode)
        }
    }, [productCode])

    const onSubmit = () => {
        if(!code.length || !title.length) {
            alert(`Code number and title required!\nPlease check input data`);
            return
        }
        fetch('http://192.168.0.128:8000/api/products/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                code: code,
                image_url:  "/",
                name: title,
                quantity: 1,
                description: description
            }) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status == 400) {
                    throw 'incorrect data or product already exist'
                }else {
                    return response
                }
            })
            .then(response => response.json())
            // .then(data => navigation.navigate('home'))
            .then(data => navigation.navigate('productinfo', {
                productCode: code
            }))
            .catch(err => alert(`Error: ${err}`))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Product code</Text>
            <TextInput
                style={styles.input}
                label="Code"
                placeholder="Product code"
                value={code}
                onChangeText={text => setCode(text)}
            />
            <Text style={styles.label}>Product name</Text>
            <TextInput
                style={styles.input}
                label="Title"
                placeholder="Product name"
                value={title}
                onChangeText={text => setTitle(text)}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                label="Description"
                placeholder="Type something about the product"
                value={description}
                multiline={true}
                onChangeText={text => setDescription(text)}
            />
            <Button title={'Submit'} onPress={onSubmit}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    label: {
        fontSize: 16,
        color: "#242629",
        alignSelf: "flex-start",
        marginLeft: 30,
    },
});
