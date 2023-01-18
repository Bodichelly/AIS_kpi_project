import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {MainScreen} from "./screen/MainScreen";
import {AddProduct} from "./screen/AddProduct";
import {ProductInfo} from "./screen/ProductInfo";
import {BarcodeScanner} from "./screen/BarcodeScanner";

const Stack = createStackNavigator();

const Routes = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" options={{ title: 'Products List' }} component={MainScreen} />
                <Stack.Screen name="addproduct" options={{ title: 'Add new product' }} component={AddProduct} />
                <Stack.Screen name={"productinfo"} options={{ title: 'Product detail' }} component={ProductInfo} />
                <Stack.Screen name={"scanner"} options={{ title: 'Scan barcode' }} component={BarcodeScanner} />
            </Stack.Navigator>
            {props.children}
        </NavigationContainer>
    );
};

export default Routes;