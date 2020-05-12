import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const CustomInput = (props) => {
  try {
    return (
      <View style={[defaultStyle.container, props.style]}>
        <Text style={[defaultStyle.label,]}>
          {props.value === '' ? ' ' : props.label}
        </Text>
        <TextInput
          style={[defaultStyle.input, ]}
          placeholder={props.label}
          placeHolderTextColor="#8b8b8b"
          value={props.value}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          secureTextEntry={
            props.secureTextEntry ? props.secureTextEntry : false
          }
          onChangeText={(text) => props.onChangeText(text)}
          // Please append any other props we need here
        />
        {props.children}
      </View>
    );
  } catch (e) {
    console.log("CusomInputError: ",e)
  }
};

const defaultStyle = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    height: 53,
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 1,
    color: '#8b8b8b',
  },
  input: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 1,
    padding: 0,
    color: '#252533',
  },
});

export default CustomInput;
