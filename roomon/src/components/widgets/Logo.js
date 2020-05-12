import React, { Component } from 'react';
import { Image } from "react-native";

class Logo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let logoPath = '../../../assets/icon.png';
    return (
      <Image source={ require(logoPath) }/>
    );
  }
}

export default Logo;