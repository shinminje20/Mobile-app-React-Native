import React, {useState, useRef, useCallback, useEffect} from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../../components/widgets/CustomInput';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';

const db = firestore();
const colors = {whiteTwo: '#D8D8D8'};

const assestsPath = '../../../assets/';

export default EnterNumber = (props) => {
  const [isConfPage, setIsConfPage] = useState(false);
  const [phoneExt, setPhoneExt] = useState('+1');
  const [phoneNum, setPhoneNum] = useState('');
  const [confCode, setConfCode] = useState('');
  const [timer, setTimer] = useState(10);
  let [timerInterval, setTimerInterval] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ref] = useHookWithRefCallback();
  const [confirm, setConfirm] = useState(null);
  const [verificationId, setVerificationId] = useState('')
  const uid = useSelector((state) => state.user.uid)
  const dispatch = useDispatch();

  useEffect(() => {
    if(confirm){
      console.log("sendNewCode()")
      sendNewCode()
    }
  },[confirm])

  useEffect(() => {
    if(!isConfPage){
      cancelCode();
    }
  },[isConfPage])

  useEffect(() => {
    if (confCode.length === 6) {
      confirm
        .confirm(confCode)
        .then(() => {
          cancelCode();
          
          console.log("Uid ====== ", uid)
          
          db
            .collection('Users')
            .doc(uid)
            .set(
              {
                phone: phoneExt+phoneNum.replace(/ - +/g, "").trim(),
              },
              {merge: true},    //du기부터 시작하면됨"
            )
          props.navigation.navigate('AfterSignUp');
          Alert.alert('Verified!');
        })
        .catch(error => {
          cancelCode()
          setTimeout(() => {
            Alert.alert('Incorrect Code', 'Please try again', [
              {
                text: 'OK',
                onPress: () => {
                  sendNewCode();
                  authPhoneNumber();
                },
              },
              {
                text: 'Clear',
                onPress: () => {
                  setIsConfPage(false);
                },
              },
            ]);
          }, 500);
          // alert(error.message)
          console.log(error)
        })
      console.log(confCode);
      }
  }, [confCode])



  // const [seconds, setSeconds] = useState(60);
  // const [isActive, setIsActive] = useState(false);

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  // function reset() {
  //   setSeconds(60);
  //   setIsActive(false);
  // }

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds - 1);
  //     }, 1000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //     Alert.alert(
  //       'Code Expired',
  //       'Would you like us to resend a confirmation code?',
  //       [
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             sendNewCode();
  //           },
  //         },
  //         {
  //           text: 'Cancel',
  //           onPress: () => {
  //             setConfCode('');
  //             setIsConfPage(false);
  //           },
  //         },
  //       ],
  //     );
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  // const onCodeConfirm = async () => {
  //   try {
  //     await confirm.confirm(confCode);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

  const authPhoneNumber = async () => {
    console.log("===================authPhoneNumber=============================")
    console.log('phone number :2', phoneExt+phoneNum.replace(/ - +/g, "").trim())
    
    // setIsProcessing(true)
    auth()
        .signInWithPhoneNumber(phoneExt+phoneNum.replace(/ - +/g, "").trim())
        .then(confirmResult => {

          setConfirm(confirmResult)
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
        })
      // setIsProcessing(false)
      console.log("===================authPhoneNumber=============================")
  }

  const sendNewCode = (timeExpires = 10) => {
    setTimer(timeExpires);
    let newTimerInterval = setInterval(() => {
      if (timeExpires > 0) {
        timeExpires--;
        setTimer(timeExpires);
      } else {
        window.clearInterval(newTimerInterval);
        setTimerInterval(false);
        Alert.alert(
          'Code Expired',
          'Would you like us to resend a confirmation code?',
          [
            {
              text: 'OK',
              onPress: () => {
                sendNewCode();
                authPhoneNumber();
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                setIsConfPage(false);
              },
            },
          ],
        );
      }
    }, 1000);
    setTimerInterval(newTimerInterval);
  };

  
  // const onCodeConfirm = async (verificationId, code) => {
  //   console.log('verificationCONFIRM',code) // it show me code is null
  //   // UserStore.setCodeInput(codecode);
  //   const credential = await auth(verificationId, code)
  //   const authResult = await auth().signInWithCredential(credential);
  //   console.log("=====================================")
  //   console.log("applyActionCode", auth().applyActionCode(confCode) )
  //   console.log("applyActionCode", auth().checkActionCode(confCode) )
  //   // console.log("authResult", authResult)
  //   // UserStore.setUserCredentials(credential.token)
  //   // this.authenticate(credential)
  //   // return credential
    
  //   console.log("Credential: ", credential)
  //   console.log("Credential.token: ", credential.token)
  //   console.log("Credential.providerId: ", credential.providerId)
  //   console.log("Credential.secret: ", credential.secret)
  //   console.log("=====================================")
  // }

  const cancelCode = () => {
    setConfCode('');
    if (timerInterval) {
      window.clearInterval(timerInterval);
      setTimerInterval(false);
    }
  };

  const renderNavBar = () => {
    return (
      <TouchableOpacity
        style={styles.navBut}
        onPress={() => {
          cancelCode();
          isConfPage
            ? setIsConfPage(false)
            : props.navigation.navigate('LogIn');
        }}>
        {isConfPage && (
          <Image source={require(assestsPath + 'path.png')} />
        )}
      </TouchableOpacity>
    );
  };

  const renderConfBox = (digit) => {
    return (
      <View
        style={[
          styles.box,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderColor: confCode[digit] ? '#5c42dd' : '#bfbfbf',
            borderWidth: confCode[digit] ? 2 : 1,
          },
        ]}>
        <Text 
          style={styles.boxText}
          secureTextEntry
        >
          {confCode[digit] ? confCode[digit] : ' '}
        </Text>
      </View>
    );
  };

  const renderEntNum = () => {
    return (
      <View style={styles.container}>
        {renderNavBar()}
        
        <Text style={styles.header}>Enter your number</Text>

        <Text style={styles.paragraph}>
          Help us keep Rooomon community safe by verifying your phone number.
        </Text>

        <View style={styles.phoneCont}>
          <View style={styles.phoneExtCont}>
            <TextInput
              keyboardType={'numeric'}
              style={styles.phoneExt}
              value={phoneExt}
              onChangeText={(newPhoneExt) => {
                if (newPhoneExt.length === 0) {
                  setPhoneExt('+');
                  return;
                } else if (newPhoneExt.length > 4) {
                  return;
                }
                setPhoneExt(newPhoneExt);
              }}
            />
          </View>

          <CustomInput
            label={'Phone Number'}
            keyboardType={'numeric'}
            style={styles.phoneNum}
            autoFocus={true}
            blurOnSubmit={false}
            value={phoneNum}
            onChangeText={(newPhoneNum) => {
              if (newPhoneNum.length > 16) {
                return;
              }

              let numDash = (newPhoneNum.match(/-/g) || []).length;
              if (
                numDash < 2 &&
                newPhoneNum.length > 3 &&
                /^\d+$/.test(newPhoneNum.slice(0, 4))
              ) {
                newPhoneNum =
                  newPhoneNum.slice(0, 3) + ' - ' + newPhoneNum.slice(3);
              } else if (
                numDash < 2 &&
                newPhoneNum[4] === '-' &&
                newPhoneNum.length > 9 &&
                /^\d+$/.test(newPhoneNum.slice(6, 10))
              ) {
                newPhoneNum =
                  newPhoneNum.slice(0, 9) + ' - ' + newPhoneNum.slice(9);
              }
              setPhoneNum(newPhoneNum);
            }}
          />
        </View>

        <TouchableOpacity
          disabled={phoneExt === '+' || phoneNum === '' ? true : false}
          style={styles.contBut}
          onPress={() => {
            authPhoneNumber();
            setIsConfPage(true);
          }}>
          {/* <Image source={require('../../../assets/continueButton.png')} /> */}
          <Image
            source={
              phoneExt === '+' || phoneNum === ''
                ? require(assestsPath + 'continueButton.png')
                : require(assestsPath + 'continueBtnColor.png')
            }
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderConfNum = () => {
    return (
      <View style={styles.container}>
        {renderNavBar()}

        <Text style={styles.header}>Confirm your number</Text>
        <Text style={styles.paragraph}>
          {/* eslint-disable-next-line prettier/prettier */}
          Enter the 6-digit code Roomon just sent to ({phoneNum.slice(
            0,
            3,
          )}) {phoneNum.slice(6)}:
        </Text>

        <View style={styles.confView}>
          {renderConfBox(0)}
          {renderConfBox(1)}
          {renderConfBox(2)}
          {renderConfBox(3)}
          {renderConfBox(4)}
          {renderConfBox(5)}
        </View>

        <TextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={{top: -500}}
          keyboardType={'numeric'}
          autoFocus={true}
          blurOnSubmit={false}
          ref={ref}
          value={confCode}
          onChangeText={(newConfCode) => {
            if (newConfCode.length > 6) {
              return;
            }
            setConfCode(newConfCode.slice(0, 6));
          }}
        />
        
        
        <View style={styles.timer}>
          <Text>
            Code expires in&nbsp;
            <Text style={styles.timeBold}>
              {timer >= 10 ? timer : '0' + timer} seconds
            </Text>
          </Text>
        </View>
        

        <TouchableOpacity
          style={styles.callBut}
          onPress={() => {
            cancelCode();
            // sendNewCode();
            Alert.alert('Calling', 'You will be called', [{text: 'OK'}]);
          }}>
          <Text style={styles.callBold}>Call me instead</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return isConfPage ? renderConfNum() : renderEntNum();
};

const styles = StyleSheet.create({
  container: {},
  navBut: {
    marginLeft: 16,
    marginTop: 46,
  },
  header: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 22,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 40,
    width: 333,
    color: '#252533',
    marginLeft: 21,
    marginTop: 20,
  },
  paragraph: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 21,
    width: 333,
    color: '#252533',
    marginLeft: 21,
    marginTop: 15,
  },
  phoneCont: {
    marginTop: 30,
    marginLeft: 21,
    height: 53,
    flex: 1,
    flexDirection: 'row',
  },
  phoneExtCont: {
    height: 53,
    width: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteTwo,
  },
  phoneExt: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1,
    width: 50,
    color: '#252533',
    marginLeft: 1,
    marginTop: 16,
    padding: 0,
  },
  phoneNum: {
    marginLeft: 20,
    width: 260,
  },
  contBut: {
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  confView: {
    marginLeft: 11,
    marginTop: 30,
    height: 45,
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    marginLeft: 10,
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  boxText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    top: '50%',
    marginLeft: 1.5,
    marginTop: -10,
    lineHeight: 21,
    letterSpacing: 1,
    color: '#5c42dd',
  },
  timer: {
    width: 333,
    height: 21,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: '#252533',
    marginLeft: 21,
    marginTop: 65,
  },
  timeBold: {
    fontFamily: 'Roboto-Bold',
    color: '#5c42dd',
  },
  callBut: {
    width: 333,
    height: 21,
    marginLeft: 21,
    marginTop: 30,
  },
  callBold: {
    fontFamily: 'Roboto-Bold',
    textDecorationLine: 'underline',
    lineHeight: 21,
    letterSpacing: 0,
    fontStyle: 'normal',
    color: '#252533',
  },
});

const useHookWithRefCallback = () => {
  const ref = useRef(null);
  const setRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
    ref.current = node;
  }, []);

  return [setRef];
};
