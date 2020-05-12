import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const assestsPath = "../../assets/";

export default NavBar = React.memo(function NavBar(props){


    const handleMiddleContent = () =>{
        if(props.NavBarHasMiddleContent)
        {
            if(props.NavBarMiddleContent === "pages")
                return (<Text style={{...styles.pages, fontSize:16, fontWeight:"800"}}>{props.currentPage + '  of  ' + props.totalPages}</Text>);
            if(props.NavBarMiddleContent === "custom")
                return (<Text style={{...styles.pages, fontSize:20, fontWeight:"bold"}}>{props.NavBarMiddleCustomText}</Text>);
        }
        else
        {
            return (<Text style={styles.pages}></Text>)
        }
    }

    const renderNavBar = () =>{
        if(props.showNavBar)
        {
            return(
                <View style={styles.navigationBar}>
    
                    <TouchableOpacity onPress={() => props.setCurrentPage("prev")} style={{...styles.arrow}}>
                        <Image style={{opacity: props.currentPage===1? 0 : 1}} source={require(assestsPath + 'path.png')}/>
                    </TouchableOpacity>
    
                    {handleMiddleContent()}
    
                    <TouchableOpacity onPress={() => props.setCurrentPage()} style={styles.skip}>
                        <Text style={props.showSkip? {opacity: 1} : {opacity:0}}>Skip</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }
    return (
        renderNavBar()
    );
});

NavBar.propTypes = {
    animateBackground: PropTypes.bool,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    NavBarHasMiddleContent: PropTypes.bool,
    showSkip: PropTypes.bool,
  };

NavBar.defaultProps = {
    showNavBar: true,
    showSkip: true,
    NavBarMiddleContent: "pages",
    NavBarHasMiddleContent: true,
  };

const styles = StyleSheet.create({
    navigationBar:{
        marginTop: 45,
        flex: 0,
        fontSize: 16,
        width: "100%",
        height: 23,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: "space-between",
        alignItems: "center",
    },
    arrow:{

    },
    pages:{
        fontWeight: "bold",
        paddingLeft: 10
    },
})