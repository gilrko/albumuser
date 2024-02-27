import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import AlbumImages from "../screens/AlbumImages";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="AlbumImages"
                    component={AlbumImages}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;