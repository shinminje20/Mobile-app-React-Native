import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity,Alert,TouchableHighlight, ScrollView} from 'react-native'
// import {Dimensions} from 'react-native';
// const windowHeight = Dimensions.get('window').height;

import DefaultContainer from '../../components/DefaultContainer';

const assestsPath = "../../../assets/";

export default Tutorials = React.memo(function Tutorials(props){

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);

    const handleCurrentPage = (direction="next") => {
        if(direction === "next")
        {
            if(currentPage + 1 <= totalPages)
                setCurrentPage(currentPage + 1);
        }
        else
        {
            if(currentPage - 1 >= 1)
            {
                setCurrentPage(currentPage - 1);
            }
        }

    }

    
    const renderNavBar = () =>{
        return(
            <View style={styles.navigationBar}>

                <TouchableOpacity onPress={() => handleCurrentPage("prev")} style={{...styles.arrow}}>
                    <Image style={{opacity: currentPage===1? 0 : 1}} source={require(assestsPath + 'path.png')}/>
                </TouchableOpacity>

                <Text style={styles.pages}>{currentPage + ' of ' + totalPages}</Text>

                <TouchableOpacity onPress={() => handleCurrentPage()} style={styles.skip}>
                    <Text>Skip</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderTutorial = () =>{
        if(currentPage === 1)
        {
            return(
                <DefaultContainer setCurrentPage={handleCurrentPage} currentPage={currentPage} totalPages={totalPages}>

                    <View style={styles.logoPlaceHolder}></View>

                    <Text style={styles.header}>Refer a friend to Roomon and get $10 in credit </Text>
                    <Text style={styles.paragraph}>Your friend will also receive credit too Thanks to you!</Text>

                    <TouchableOpacity style={styles.inviteFriendsButton} onPress={()=>alert("clicked!45")}>
                        <Image source={require(assestsPath + 'buttonInviteFriends.png')}/>
                    </TouchableOpacity>
                </DefaultContainer>
            );
        }
        if(currentPage === 2)
        {
            return(
                <DefaultContainer setCurrentPage={handleCurrentPage} currentPage={currentPage} totalPages={totalPages}>

                    <View style={styles.logoPlaceHolder}></View>

                    <Text style={{...styles.header}}>Easy compare from your work or school </Text>
                    <Text style={{...styles.paragraph}}>Enter addresses, cross streets, or place names to compare different properties easily</Text>

                    <View style={{...styles.buttonsContainer}}>

                        <TouchableOpacity onPress={()=>alert("OK")}>
                            <Image style={{width:"100%", height:34}} source={require(assestsPath + 'group.png')}/>
                        </TouchableOpacity>

                        <View style={{borderBottomColor: '#b8b8cc',borderBottomWidth: 1,}}/>

                        <TouchableOpacity  onPress={()=>alert("OK")}>
                            <Image style={{width:"100%", height:34}} source={require(assestsPath + 'group2.png')}/>
                        </TouchableOpacity>

                    </View>

                </DefaultContainer>
            );
        }
        if(currentPage === 3)
        {
            return(
                <DefaultContainer setCurrentPage={handleCurrentPage} currentPage={currentPage} totalPages={totalPages}>

                    <View style={styles.logoPlaceHolder}></View>

                    <Text style={{...styles.header}}>Track your leasing process with push notification </Text>
                    <Text style={{...styles.paragraph, fontSize: 16}}>Get updates on your residential rental application forms through push notifications</Text>

                    <TouchableOpacity style={styles.inviteFriendsButton} onPress={()=>alert("clicked!45")}>
                        <Image source={require(assestsPath + 'button.png')}/>
                    </TouchableOpacity>
                </DefaultContainer>
            );
        }
    }

    return (
        <ScrollView extraScrollHeight={300} enableOnAndroid backgroundColor='white'>
            {renderTutorial()}
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    header:{
        fontSize: 22,
        fontWeight: "800",
        marginTop: 42,
        marginBottom:15,
        width: "100%",
    },
    paragraph:{
        fontSize: 16,
        width:"100%",
        color:"#252533",
        fontWeight:"300",
    },
    inviteFriendsButton:{
        marginTop: 119
    },
    buttonsContainer:{
        height: 103,
        width: "100%",
        marginTop: 69,
        justifyContent: "space-evenly",
    },
    logoPlaceHolder:{
        height: 204,
        width: 204,
        backgroundColor: "#d8d8d8",
        marginTop: 42,
    }

});

