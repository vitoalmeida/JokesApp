import React from "react";
import { View, Text } from "react-native";
import { auth } from "../../firebase";

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>{auth.currentUser?.email}</Text>
        </View>
    )
}

export default HomeScreen;