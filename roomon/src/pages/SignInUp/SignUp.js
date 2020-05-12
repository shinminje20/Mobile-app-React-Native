import React, {Component, useState, useEffect, useRef} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CustomInput from '../../components/widgets/CustomInput';

import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image} from 'react-native';
import {TextPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import CustomText from '../../components/widgets/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DefaultContainer from '../../components/DefaultContainer';
import {validate} from 'email-validator';
import {useSelector, useDispatch} from 'react-redux'

import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const db = firestore();


const assestsPath = '../../../assets/';

function SignUp(props) {

  const dispatch = useDispatch()
  const agreementValue = useSelector((state) => state.user.agreement)
  const lastNameRef = useRef()
  const emailRef = useRef()
  const confirmPasswordRef = useRef()
  const passwordRef = useRef()

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [fullNameValue, setFullNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  
  useEffect(()=>{
    setFullNameValue(firstNameValue.trim() + ' ' + lastNameValue.trim())
  },[lastNameValue,firstNameValue])

  const createAccount = () => {
    console.log("===============start: SignUp.createAccount()===============")
    setIsCreatingAccount(true)
    
    console.log("full name이다 = ",fullNameValue)
    auth().createUserWithEmailAndPassword(emailValue.toLowerCase(), passwordValue)
      .then(()=>{
        const user = auth().currentUser;
        const uid = user.uid || get(res, 'user.uid')
        db
          .collection('Users')
          .doc(uid)
          .set(
            {
              uid: uid,
              agreement: agreementValue,
              email: emailValue.toLowerCase(),
              name: fullNameValue,
              phone: '',
              rentType: '',
              roomType: '',
              userCity: '',
              userSchool: '',
              userSkytrain: '',
              userType: '',
              userWork: '',
              lastLoggedIn: firebase.firestore.FieldValue.serverTimestamp(), 
              createdUTC: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {merge: true},
          )
          dispatch.user.setCreatedAccount({uid, emailValue, fullNameValue})
      })
      .then(() => {
        dispatch.signInModule.getNotificationToken().then(token => {
          if (token) {
            dispatch.signInModule.updateFCMToken(token)
          }
        })
        props.navigation.navigate("EnterNumber")
      })
      .catch(e => {
        Alert.alert('Creating Account Failed', e.message)
      })
      .finally(() => {
        setIsCreatingAccount(false)
        console.log("===============end: SignUp.createAccount()===============")
      })
  }

  const checkValid = () => { setIsValid( validate(emailValue) && passwordValue != '' && confirmPasswordValue != '' && firstNameValue != '' && lastNameValue != '',); };

  useEffect(() => { checkValid(); }, [firstNameValue, lastNameValue, emailValue, passwordValue, confirmPasswordValue] );

  const signUpView = () => {
    return (
      <DefaultContainer showNavBar={false} style={{...styles.container}}>
        <View style={{alignSelf: 'flex-start', marginTop: 45}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={require(assestsPath + 'closeBtn.png')} />
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'flex-start', marginTop: 18}}>
          <View>
            <Image source={require(assestsPath + 'logo.png')} />
          </View>
          <Text style={styles.header}>Hello !</Text>
          <Text
            style={{
              fontFamily: 'Roboto-Light',
              color: '#252533',
              fontSize: 16,
              marginTop: 5,
            }}>
            Please sign up to continue
          </Text>
        </View>

        <View style={styles.nameRow}>
          <CustomInput
            autoFocus
            editable={!isCreatingAccount}
            style={styles.name}
            label={'First name'}
            textContentType="name" // iOS
            autoCompleteType="name" // Android
            value={firstNameValue}
            onChangeText={(text) => setFirstNameValue(text)}
            onSubmitEditing={() => lastNameRef.current.focus()}
          />
          <CustomInput
            ref={lastNameRef}
            editable={!isCreatingAccount}
            style={styles.name}
            label={'Last name'}
            value={lastNameValue}
            onChangeText={(text) => setLastNameValue(text)}
            onSubmitEditing={() => emailRef.current.focus()}
          />
        </View>

        <CustomInput
          style={styles.formInput}
          ref={emailRef}
          editable={!isCreatingAccount}
          textContentType="emailAddress" // iOS
          autoCompleteType="email" // Android
          label={'E-mail'}
          value={emailValue}
          onChangeText={(text) => setEmailValue(text)}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <CustomInput
          ref={passwordRef}
          disabled={isCreatingAccount}
          style={styles.formInput}
          label={'Password'}
          value={passwordValue}
          secureTextEntry
          textContentType="password" // iOS
          autoCompleteType="password" // Android
          // keyboardType="visible-password"
          // secureTextEntry="true"
          onChangeText={(text) => setPasswordValue(text)}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />

        {/* To display text strength on the right side */}
        <View style={styles.passwordStrength}>
          <TextPasswordStrengthDisplay password={passwordValue} />
        </View>

        <CustomInput
          style={styles.formInput}
          ref={confirmPasswordRef}
          disabled={isCreatingAccount}
          label={'Confirm password'}
          value={confirmPasswordValue}
          // keyboardType="visible-password"
          secureTextEntry
          textContentType="password" // iOS
          autoCompleteType="password" // Android
          onChangeText={(text) => setConfirmPasswordValue(text)}
          onSubmitEditing={() => createAccount()}
        />

        <Text style={styles.terms}>
          By signing up, you confirm that you’ve read and accepted our&nbsp;
          <Text
            style={styles.termsLink}
            onPress={() => props.navigation.navigate('SignUp')}>
            Terms of Service
          </Text>
          &nbsp;and&nbsp;
          <Text
            style={styles.termsLink}
            onPress={() => props.navigation.navigate('SignUp')}>
            Privacy Policy
          </Text>
        </Text>

        <TouchableOpacity
          disabled={!isValid || isCreatingAccount}
          style={styles.continueButton}
          onPress={() => 
            createAccount()
           }>
          <Image
            source={
              !isValid
                ? require(assestsPath + 'signUpBtnGrey.png')
                : require(assestsPath + 'signUpBtnColor.png')
            }
          />
        </TouchableOpacity>
      </DefaultContainer>
    );
  };

  return signUpView();
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    // marginRight: 'auto',
    alignItems: 'center',
    paddingBottom: 50,
    // backgroundColor: 'white',
    // marginTop: 32
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  header: {
    // fontSize: RFPercentage(6),
    marginTop: 23.2,
    color: '#5c42dc',
    fontSize: 24,
    alignItems: 'flex-end',
    fontFamily: 'ArchivoBlack-Regular',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  nameRow: {
    width: '100%',
    marginTop: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    width: '44%',
  },
  formInput: {
    width: '100%',
    marginTop: 18,
  },
  terms: {
    width: 284,
    height: 36,
    fontFamily: 'Archivo',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#8b8b8b',
    marginTop: 20,
  },
  termsLink: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    color: '#603ddd',
  },
  continueButton: {marginTop: 13},
});

export default SignUp;
