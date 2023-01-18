import React from 'react';
import { View, Text } from 'react-native';
import {Link, NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AddProduct} from "./src/screen/AddProduct";
import {MainScreen} from "./src/screen/MainScreen";
import {Header} from "./src/components/Header";
import { Logs } from 'expo'
import {ProductInfo} from "./src/screen/ProductInfo";
import Routes from "./src/Routes";

Logs.enableExpoCliLogging()

const Stack = createNativeStackNavigator();

function App() {
    return (
        <>
            <Routes>
                <Header/>
            </Routes>
        </>

    );
}

export default App;






// import {StatusBar, StyleSheet, Text, View} from "react-native";
// import * as React from "react";
// import "react-native-gesture-handler";
// import Routes from "./src/Routes";
// import {Header} from "@react-navigation/stack";
//
// export default function App() {
//   return (
//       <>
//           <StatusBar style="auto" />
//           <View style={styles.container}>
//               <Text>dqwdqwdwq</Text>
//               <Routes style={styles.routes} />
//           </View>
//       </>
//
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// <NavigationContainer>
//       <Stack.Navigator>
//           <Stack.Screen name="main" component={MainScreen} />
//           <Stack.Screen name="add-product" component={AddProduct} />
//       </Stack.Navigator>
//     <Text>Text</Text>
// </NavigationContainer>

// <NavigationContainer>
//     <Stack.Navigator>
//         <Stack.Screen name="main" component={MainScreen} />
//         <Stack.Screen name="addproduct" component={AddProduct} />
//     </Stack.Navigator>
// </NavigationContainer>