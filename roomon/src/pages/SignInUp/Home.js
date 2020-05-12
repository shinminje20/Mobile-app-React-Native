import React, { useState, useEffect } from 'react';
import {Animated, Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

//Reusable components
import DefaultContainer from '../../components/DefaultContainer';
import Card from '../../components/Card';

const assestsPath = "../../../assets/Home/";



const MenuView = React.memo(function MenuView(props){
    const [slideAnim] = useState(new Animated.Value(-1000));  // Initial value for position

      useEffect( () => {
        if(props.openMenu)
        {
            slideAnim.setValue(-1000)
            console.log('props.openMenu updated', props.openMenu, slideAnim);
            Animated.timing(
                slideAnim,
                {
                  toValue: 0,
                  duration: 250,
                  useNativeDriver: false
                }
              ).start();
        }
        else
        {
            slideAnim.setValue(0)
            console.log('props.openMenu updated', props.openMenu, slideAnim);
            Animated.timing(
                slideAnim,
                {
                  toValue: -1000,
                  duration: 250,
                  useNativeDriver: false
                }
              ).start();
        }
    }, [props.openMenu])


      return (
        <Animated.View
          style={{
            ...props.style,
            right: slideAnim
          }}
        >
          {props.children}
        </Animated.View>
      );
    }
);

export default Home = React.memo(function Home(props){

    const [openMenu, setOpenMenu] = useState(false);

    const renderHamburgerMenu = () =>{
        // if(openMenu)
        // {
            return(
                [
                    <TouchableWithoutFeedback onPress={()=>setOpenMenu(false)}>
                        <View style={{zIndex:2,position:"absolute", opacity:0.5, backgroundColor:"black", top:0, left:0, height:windowHeight, width:windowWidth, display:openMenu?"flex":"none"}}/>
                    </TouchableWithoutFeedback>,

                    <MenuView openMenu={openMenu} style={{...styles.menu, zIndex:2,}}>
                        {props.user.type === "realtor"?
                            <Image source={require(assestsPath + "realtorProfile.png")} style={{...styles.profileImage}}/> 
                            :<Image source={require(assestsPath + "verifiedProfile.png")} style={{...styles.profileImage}}/>}
                        <Text style={{fontSize:24, fontWeight:"bold", marginTop:30}}>
                            {props.user.first_name + " " + props.user.last_name}
                        </Text>

                        <TouchableOpacity onPress={()=>alert("OK")} style={{marginTop:5}}>
                            <Text style={{fontSize:14 , color:"#418cc6"}}>Switch Account</Text>
                        </TouchableOpacity>

                        <View style={{alignSelf:"flex-start", left:29, marginTop:50}}>
                            <TouchableOpacity onPress={()=>props.navigation.navigate("Home")} style={{ marginTop:5, marginBottom:10}}>
                                <Text style={{fontSize: 30 , color:"#000", fontWeight:"bold",}}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>alert("OK")} style={{ marginTop:5, marginBottom:10}}>
                                <Text style={{fontSize: 30 , color:"#000", fontWeight:"bold",}}>Message</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>alert("OK")} style={{ marginTop:5, marginBottom:10}}>
                                <Text style={{fontSize: 30 ,color:"#000", fontWeight:"bold"}}>Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>alert("OK")} style={{marginTop:5, marginBottom:10}}>
                                <Text style={{fontSize: 30 , color:"#000", fontWeight:"bold"}}>Settings</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={()=>alert("OK")} style={{ marginTop:5, marginTop:"auto", marginBottom:35}}>
                            <Text style={{fontSize:14 , color:"#418cc6"}}>Log out</Text>
                        </TouchableOpacity>
                    </MenuView>
                ]
            );
        // }
    }

    const renderSearchBarAndHamburgerIcon = () =>{
        return(
            <View style={{flexDirection:"row", justifyContent:"space-between", alignContent:"center", alignItems:"center", width:"100%", marginTop:"14%", marginBottom:"6%"}}>
            <Image style={{position:"absolute", left:15}} source={require(assestsPath+"searchIcon.png")}/>
            <TextInput placeholder={"Search"} style={{...styles.searchBar, paddingLeft:60, fontSize:16}}/>
            <TouchableOpacity onPress={()=>setOpenMenu(true)} style={{marginLeft:22}}>
                <Image source={require(assestsPath + 'hamburger.png')}/>
            </TouchableOpacity>
            </View>
        );
    }

    const renderHomePage = () =>{
        if(props.user.type === "realtor")
        {
            return(
                <KeyboardAwareScrollView style={{flex:1, height: '100%'}} extraScrollHeight={30} enableOnAndroid>
    
                <DefaultContainer showNavBar={false} NavBarHasMiddleContent={false} paddingBottom={44} paddingLeft={16} paddingRight={16}>
                
                    {renderSearchBarAndHamburgerIcon()}
                    
                    <View style={{...styles.headerWrapper}}>
                        <Text style={{fontWeight:"bold", fontSize:18}}>My Listings</Text>
                    </View>
    
                    {/* <ScrollView horizontal={true} contentContainerStyle={{position: "relative", flex:1, flexDirection:"row"}}> */}
                    <View style={{...styles.cardContainer, height:"45%", width:"100%"}}>
                        <View 
                            style={{height:"100%", width:"50%", backgroundColor:"white", display:"flex", alignContent:"center",         alignItems:"center", justifyContent:"center", borderWidth:2, borderRadius:8, borderColor:"#d8d8d8"}}>
                            <TouchableOpacity onPress={()=>alert("OK")}>
                                <Image source={require(assestsPath+"addListing.png")}/>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    {/* </ScrollView> */}
    
                    <View style={{...styles.headerWrapper, marginTop:"4%"}}>
                        <Text style={{fontWeight:"bold", fontSize:18}}>Popular Lists</Text>
                    </View>
    
                    {/* <ScrollView horizontal={true} contentContainerStyle={{flex:1}}> */}
                    <View style={{...styles.cardContainer, display:"flex", alignContent:"center", alignItems:"center", justifyContent:"center",}}>

                        <Text style={{fontSize:16, color:"#707070"}}>No Lists</Text>
  
                    </View>
    
                    {renderHamburgerMenu()}
                    
                </DefaultContainer>
                </KeyboardAwareScrollView>
            );
        }
        else if(props.user.type === "finder" || props.user.type === "guest")
        {
            return(
                <KeyboardAwareScrollView style={{flex:1, height: '100%'}} extraScrollHeight={30} enableOnAndroid>
    
                <DefaultContainer showNavBar={false} NavBarHasMiddleContent={false} paddingBottom={44} paddingLeft={16} paddingRight={16}>
                
                    {renderSearchBarAndHamburgerIcon()}
                    
                    <View style={{...styles.headerWrapper}}>
                        <Text style={{fontWeight:"bold", fontSize:18}}>Recently Updated</Text>
                        <TouchableOpacity onPress={()=>alert("OK")}><Text style={{color:"#418cc6", fontSize:12}}>See more</Text></TouchableOpacity>
                    </View>

                    <View style={{height:windowHeight*0.35}}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{...styles.cardContainer}}> 
                            <Card image={require(assestsPath+"locationImage1.png")} price={1000} period={"Year"} bed={99} bath={0} location={"Vancouver, BC"} marginRight={13}/>
                            <Card image={require(assestsPath+"locationImage2.png")} price={5} period={"Day"} bed={3} bath={5} location={"New York ,USA"}/>
                            <Card image={require(assestsPath+"locationImage2.png")} price={5} period={"Day"} bed={3} bath={5} location={"New York ,USA"}/>
                            <Card image={require(assestsPath+"locationImage2.png")} price={5} period={"Day"} bed={3} bath={5} location={"New York ,USA"}/>
                        </ScrollView>
                    </View>
    
                    <View style={{...styles.headerWrapper, marginTop:"4%"}}>
                        <Text style={{fontWeight:"bold", fontSize:18}}>Popular Lists</Text>
                        <TouchableOpacity onPress={()=>alert("OK")}><Text style={{color:"#418cc6", fontSize:12}}>See more</Text></TouchableOpacity>
                    </View>

    
                    <View style={{height:windowHeight*0.35}}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{...styles.cardContainer}}> 
                            <Card image={require(assestsPath+"locationImage4.png")} price={1000} period={"Hour"} marginRight={13}/>
                            <Card image={require(assestsPath+"locationImage2.png")} price={5} period={"Day"} bed={3} bath={5} location={"New York ,USA"}/>
                            <Card image={"null"} price={2000} period={""}/>
                            <Card image={"null"} price={2000} period={""}/>
                            <Card image={"null"} price={2000} period={""}/>
                            <Card image={"null"} price={2000} period={""}/>
                            <Card image={"null"} price={2000} period={""}/>
                            <Card image={"null"} price={2000} period={""}/>
                        </ScrollView>
                   </View>

                    {renderHamburgerMenu()}
                    
                </DefaultContainer>
                </KeyboardAwareScrollView>
            );
        }
    };

    return (
        renderHomePage()
    );
});

Home.propTypes = {
    user: PropTypes.object,

  };

Home.defaultProps = {
    user: {
        type: "guest",
        first_name:"User",
        last_name:"",
        age:"",
    },
  };

const styles = StyleSheet.create({
    headerWrapper:{
        width: "100%",
        flexDirection:"row",
        alignSelf:"flex-start",
        justifyContent: 'space-between',
        alignItems:"center",
        paddingLeft: 9,
        paddingRight: 9,
        marginBottom: "3%",
        
    },
    cardContainer:{
        flexDirection:"row",
        justifyContent: 'space-between',
        height:"100%",
    },
    searchBar:{
        width:"85%",
        height: 50,
        paddingLeft: 9,
        paddingRight: 9,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#707070",
    },
    menu:{
        backgroundColor:"#fff", 
        height:windowHeight*0.96, 
        width:"85%", 
        position:"absolute", 
        // right:0, 
        bottom:0,
        borderWidth: 1,
        borderColor:"#fff",
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
        // alignContent:"center"
        alignItems:"center",
    },
    profileImage:{
        height:140,
         width:140,
         marginTop:49,
    }
});