import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import PropTypes from 'prop-types'

const assestsPath = "../../assets/Home/";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default Card = React.memo(function Card(props){

    const [isFavorite, setFavorite] = useState(false);
    
    let styles = {
        cardWrapper:{
            // width: "48%",
            width:windowWidth*0.41,
            height: "98%",
            backgroundColor: "#d8d8d8",
            color: "#000",

            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 7,
            paddingBottom: 7,

            marginLeft: props.marginLeft?? 0,
            marginRight: props.marginRight?? 13,
            borderRadius: 8,
            
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2.22,
            // shadowRadius:0,
            
            elevation: 1,
        },
        placeImage:{
            width: "100%",
            height: "60%",
            backgroundColor: "#fff",
            borderRadius: 8,
            marginBottom: "5%"
        },
        placePrice:{
            fontSize: 13,
            fontWeight: "bold",
            marginBottom: "3%"
        },
        placeInfo:{
            fontSize: 11,
        },
        placeLocation:{
            fontSize: 11,
        },
        placeTag:{
            backgroundColor: "#c2c2c2",
            height: 14,
            width: 36,
            borderRadius: 3,
            marginTop: "auto",
            paddingTop: 1
        }
    };


    return (
            <TouchableOpacity style={{...styles.cardWrapper}} onPress={()=>alert("OK")}>
                {!isNaN(props.image)?
                    <View style={{...styles.placeImage}}>
                    <TouchableOpacity 
                        style={{position:"absolute", zIndex:1, alignSelf:"flex-end", right:6, top:8, tintColor:"red"}}  
                        onPress={()=>isFavorite? setFavorite(false) : setFavorite(true)}>
                        <Image 
                            style={isFavorite? {tintColor:"red"} : {}}
                            source={require(assestsPath+"favoriteMark.png")}/>
                    </TouchableOpacity>
                        <Image 
                            style={{width: "100%",height: "100%",borderRadius: 8, backgroundColor:"#d8d8d8"}} 
                            source={props.image}/>
                    </View> 
                 : <View style={{...styles.placeImage}}></View>}
                <Text style={{...styles.placePrice}}>{"$" + props.price + "/"  + props.period}</Text>
                <Text style={{...styles.placeInfo}}>{ props.bed +  " Bed " + props.bath + " Bath"}</Text>
                <Text style={{...styles.placeLocation}}>{props.location}</Text>
                <View style={{...styles.placeTag}}><Text style={{fontSize:8, textAlign:"center"}}>{ props.tag }</Text></View>
            </TouchableOpacity>
    );
});

Card.propTypes = {
    price: PropTypes.number,
    period: PropTypes.string,
    bed: PropTypes.number,
    bath: PropTypes.number,
    location: PropTypes.string,
    tag: PropTypes.string,
    image: PropTypes.number,
  };

Card.defaultProps = {
    price: 0,
    period: "Month",
    bed: 0,
    bath: 0,
    location: "",
    tag: "Rent",
    image: null,
  };

