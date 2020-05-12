import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, TouchableHighlight, ScrollView} from 'react-native'
import DefaultContainer from '../../components/DefaultContainer'
import EnterNumber from './EnterNumber';
import {useSelector, useDispatch} from 'react-redux'

import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const assestsPath = "../../../assets/";

const db = firestore();

export default AfterSignUp = React.memo(function AfterSignUp(props){
    
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.user.uid)

    const [selectedData, setSelectedData] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(4);
    
    useEffect(()=>{
        dispatch.user.setUserFilter({selectedData})
        const numOfData = Object.values(selectedData).length
        if(numOfData === 3) {
            console.log("================[Upload] AfterSignUp: selectedData==============")
            console.log(selectedData.userType)
            console.log(selectedData.rentType)
            console.log(selectedData.roomType)
            
            db
                .collection('Users')
                .doc(uid)
                .set({
                    userType: selectedData.userType,
                    rentType: selectedData.rentType,
                    roomType: selectedData.roomType,
                },{merge: true},)
            console.log("================[End] AfterSignUp: selectedData==============")
        }
        // console.log(selectedData)
        // console.log(numOfData)

    },[selectedData])

    const onPressBtn = (data) => {
        setSelectedData((prevState) => ({
            ...prevState,
            ...data
        }))

        setCurrentPage(currentPage + 1);
    }

    const handleCurrentPage = (direction="next") =>{
        if(direction === "next")
        {
            if(currentPage + 1 <= totalPages + 1)
            {
                setCurrentPage(currentPage + 1);
            }
        }
        else
        {
            if(currentPage - 1 >= 1)
            {
                setCurrentPage(currentPage - 1);
            }
        }
    }

    const renderCurrentPage=()=>{
        let content = [];
        if(currentPage === 1)
        {
            content.push(
            <Text style={styles.header}>Let’s get started with Roomon! </Text>,
            <Text style={styles.paragraph}>Please select from below. It will help us to personalize your experience.</Text>,
            
            <View style={{...styles.continueButtonContainer}}>
                <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({userType: "finder"})}>
                    <Image source={require(assestsPath + 'afterSignUp/FindingPlaceBtn.png')}/>
                </TouchableOpacity>

                <View style={{borderWidth:1, borderColor:"#d8d8d8", marginBottom:23.5}}></View>

                <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({userType: "houser"})}>
                    <Image source={require(assestsPath + 'afterSignUp/postMyPropertyBtn.png')}/>
                </TouchableOpacity>

                <View style={{borderWidth:1, borderColor:"#d8d8d8", marginBottom:23.5}}></View>

                <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({userType: "realtor"})}>
                    <Image source={require(assestsPath + 'afterSignUp/ImRealtorBtn.png')}/>
                </TouchableOpacity>
             </View>
             );
        }
        else if(currentPage === 2)
        {
            content.push(
                <Text style={{...styles.header}}> I am looking for .. </Text>,
                <View style={{...styles.continueButtonContainer}}>

                <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({rentType: "entireRent"})}>
                    <Image source={require(assestsPath + 'afterSignUp/entirePropertyBtn.png')}/>
                </TouchableOpacity>

                <View style={{borderWidth:1, borderColor:"#d8d8d8", marginBottom:23.5}}></View>

                <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({rentType: "roomRent"})}>
                    <Image source={require(assestsPath + 'afterSignUp/roomRentalBtn.png')}/>
                </TouchableOpacity>

                <View style={{borderWidth:1, borderColor:"#d8d8d8", marginBottom:23.5}}></View>

                <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({rentType: "others"})}>
                    <Image source={require(assestsPath + 'afterSignUp/othersBtn.png')}/>
                </TouchableOpacity>
                 </View>);
        }
        else if(currentPage === 3)
        {
            content.push(
                <Text style={{...styles.header}}> I prefer to live in .. </Text>,
                <View style={{...styles.continueButtonContainer}}>
                    <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({roomType: "one"})}>
                        <Image source={require(assestsPath + 'afterSignUp/studioOrOneBed.png')}/>
                    </TouchableOpacity>

                    <View style={{borderWidth:1, borderColor:"#d8d8d8", marginBottom:23.5}}></View>

                    <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({roomType: "two"})}>
                        <Image source={require(assestsPath + 'afterSignUp/twoBedrooms.png')}/>
                    </TouchableOpacity>

                    <View style={{borderWidth:1, borderColor:"#d8d8d8", marginBottom:23.5}}></View>
                    
                    <TouchableOpacity style={styles.continueButton} onPress={()=>onPressBtn({roomType: "three"})}>
                        <Image source={require(assestsPath + 'afterSignUp/threeMoreBedrooms.png')}/>
                    </TouchableOpacity>
                </View>
                 );
        }
        else if(currentPage === 4)
        {
            content.push(
                <Text style={{...styles.header}}> Where do you want to live? </Text>,
                <View style={styles.locationButtonContainer}>
                <TouchableOpacity style={styles.locationButton} onPress={()=>props.navigation.navigate("City")}>
                    <Image source={require(assestsPath + 'afterSignUp/AfterSignUp4.png')}/>
                </TouchableOpacity>

                <View style={{borderBottomColor: '#b8b8cc',borderBottomWidth: 1,}}/>

                <TouchableOpacity style={styles.locationButton} onPress={()=>props.navigation.navigate("Skytrain")}>
                    <Image source={require(assestsPath + 'afterSignUp/AfterSignUp5.png')}/>
                </TouchableOpacity>

                <View style={{borderBottomColor: '#b8b8cc',borderBottomWidth: 1,}}/>

                <TouchableOpacity style={styles.locationButton} onPress={()=>props.navigation.navigate("Add School")}>
                    <Image source={require(assestsPath + 'afterSignUp/AfterSignUp6.png')}/>
                </TouchableOpacity>

                <View style={{borderBottomColor: '#b8b8cc',borderBottomWidth: 1,}}/>

                <TouchableOpacity style={styles.locationButton} onPress={()=>props.navigation.navigate("Add Work")}>
                    <Image source={require(assestsPath + 'afterSignUp/AfterSignUp7.png')}/>
                </TouchableOpacity>
                 </View>);
        }
        return content;
    }

        return (
            <>
                {currentPage != 5 ?        
                    <DefaultContainer setCurrentPage={handleCurrentPage} currentPage={currentPage} totalPages={totalPages} paddingBottom={10}>
                        {renderCurrentPage()}
                    </DefaultContainer>
                    : <EnterNumber {...props}/>
                }
            </>
        );
});

const styles = StyleSheet.create({
    header:{
        fontSize: 22,
        fontWeight: "800",
        marginTop: 42,
        textAlign: "left",
        width: "100%",
        marginBottom:15
    },
    paragraph:{
        fontSize: 16,
        width:"100%",
        color:"#252533",
        fontWeight:"300",
    },
    continueButtonContainer:{
        marginTop:"auto",
    },
    continueButton:{
        marginBottom: 24.5,
    },
    locationButtonContainer:{
        marginTop: "auto"
    },
    locationButton:{
        marginTop:19.5,
        marginBottom: 19.5
    }
})