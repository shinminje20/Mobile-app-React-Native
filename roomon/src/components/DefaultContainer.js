import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

import {Dimensions} from 'react-native';

//Reusable components
import NavBar from '../components/NavBar';

const windowHeight = Dimensions.get('window').height;

export default DefaultContainer = React.memo(function DefaultContainer(props){
    let styles = {
        container:{
            height: windowHeight,
            alignItems: props.alignItems?? 'center',
            backgroundColor: props.backgroundColor?? "inherit",
            color: props.color?? "#252533",
            paddingLeft: props.paddingLeft?? 21,
            paddingRight: props.paddingRight?? 20,
            flex: 1,
            paddingBottom: props.paddingBottom?? 73,
        },
    };

    return (
        <View style={{...styles.container}}>
            <NavBar
                showNavBar={props.showNavBar} 
                showSkip={props.showSkip}
                setCurrentPage={props.setCurrentPage} 
                currentPage={props.currentPage} 
                totalPages={props.totalPages}
                NavBarHasMiddleContent={props.NavBarHasMiddleContent}
                NavBarMiddleContent={props.NavBarMiddleContent}
                NavBarMiddleCustomText={props.NavBarMiddleCustomText}
                paddingLeft={props.paddingLeft}
                paddingRight={props.paddingRight}
                paddingBottom={props.paddingBottom}
                />
            {props.children}
        </View>
    );
});