import React, { Component } from 'react';
import { Text, StyleSheet } from "react-native";

class CustomText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={ this.props.textStyle } onPress={ this.props.onPress }>{ this.props.title }</Text>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26
  }
});


export default CustomText;