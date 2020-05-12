import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DefaultContainer from '../../components/DefaultContainer'

const assestsPath = "../../../assets/";

export default Congratulations = React.memo(function Congratulations(props){
        return (
            <DefaultContainer showNavBar={false}>
                    <View style={styles.logoPlaceHolder}></View>
                    <Text style={styles.header}>Congratulations!</Text>

                    <TouchableOpacity style={styles.continueButton} onPress={()=>props.navigation.navigate("AfterSignUp")}>
                        <Image source={require(assestsPath + 'continueButton.png')}/>
                    </TouchableOpacity>
            </DefaultContainer>
        );
});

const styles = StyleSheet.create({
    header:{
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "ArchivoBlack-Regular",
        marginTop: 30
    },
    continueButton:{
        marginTop: 172,
    },
    logoPlaceHolder:{
        height: 204,
        width: 204,
        backgroundColor: "#d8d8d8",
        marginTop: "43%",
    }
})