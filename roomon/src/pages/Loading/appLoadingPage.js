import React from 'react';
import {View, Image, StyleSheet} from 'react-native';


const assestsPath = '../../../assets/';

function appLoadingPage() {

    return (
        <View style={styles.logo}>
            <Image source={require(assestsPath + 'loadingLogo.png')} />
        </View>
    )


}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default appLoadingPage;