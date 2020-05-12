// import React, { Component } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import SignUp from '../pages/SignUp';
// import LogIn from '../pages/LogIn';




// const MainNavigator = createStackNavigator({
//   Main: { screen: LogIn }
// })

// Transition = createStackNavigator({
//   LogIn: { screen: LogIn },
//   ModalTo: { screen: SignUp }
// },{ 
//   mode: 'modal',
//   headerMode: 'none',
// })

// const Stack = createStackNavigator();

// class Transition extends Component {
//   // constructor(props){
//   //   super(props);
//   //   this.state={
//   //     name='',
//   //     component=''
//   //   }
//   // }

//   // MainNavigator() {
//     // return(
      
//     //   <Stack.Navigator>
//     //     <Stack.Screen name= this. name component={ LogIn }/>
//     //     <Stack.Screen name="SignUp" component={ SignUp }/>
//     //   </Stack.Navigator>
//     // );
//   // }

  
  
//   // constructor(props){
//   //   super(props);

//   // }
//   // transition({ naviagation }) {
//   //   return (
//   //     <TouchableOpacity style={this.props.style}>
//   //       <Text style={this.props.textStyle} onPress={() => navigation.navigate(this.state.name)}>{ this.props.title }</Text>
//   //     </TouchableOpacity>
//   //   );
//   // }
//   render(){
//     this.transition()
//   }
// }
// const styles = StyleSheet.create({
//   button: {
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 2,},
//     shadowOpacity: 0.5,
//     width: 300,
//     backgroundColor: 'grey',
//     borderRadius: 25,
//     marginVertical: 10,
//     paddingVertical: 12
//   }
// });  
  
// //   SignUpScreen({ navigation }) {
// //     return (
// //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //         <Text>Details Screen</Text>
// //         <Button
// //           title="Go to SignUp... again"
// //           onPress={() => navigation.push('SignUp')}
// //         />
// //         <Button title="Go to Home" onPress={() => navigation.navigate('LogIn')} />
// //         <Button title="Go back" onPress={() => navigation.goBack()} />
// //       </View>
// //     );
// //   }
  
// //   render() {
// //     return (
// //       null
// //     );
// //   }
// // }

// export default Transition;