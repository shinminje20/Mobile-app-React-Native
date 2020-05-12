import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const assestsPath = "../../assets/afterSignUp/";

class LocationItem extends PureComponent {
    render() {
        return (
            <View style={{...styles.searchMenuItem}}>
				<TouchableOpacity onPress={()=>alert("OK: " + item)}>
						<View style={{flexDirection:"row",}}>
							<Image source={require(assestsPath+"searchMenuItem.png")} style={{marginRight:13}}/>
							<Text >{this.props.description}</Text>
						</View>
				</TouchableOpacity>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    searchMenuItem2:{
        width:"100%",
        height:30,
        flexDirection:"row",
        // alignContent:"center",
        alignItems:"center",
        marginBottom: 20
    },
    searchMenuItem:{
        // width:300,
        // flexDirection:"row",
        width:"100%",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:35,
        marginBottom: 20,
        // alignItems:"center",
        // justifyContent: 'center',
        // flexDirection:"row",
        // alignContent:"center",
        // alignItems:"center",
        // marginBottom: 20
    }
})

export default LocationItem;