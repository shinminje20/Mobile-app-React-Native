import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

class CustomBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={this.props.style}>
        <Text style={this.props.textStyle} onPress={this.props.onPress}>{ this.props.title }</Text>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2,},
    // shadowOpacity: 0.5,
    // width: 254,
    // backgroundColor: 'grey',
    // borderRadius: 27.5,
    // marginVertical: 10,
    // paddingVertical: 12
  }
});

export default CustomBtn;