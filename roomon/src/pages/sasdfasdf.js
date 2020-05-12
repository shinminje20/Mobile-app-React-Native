import React, { useRef, useState } from 'react'
import { Alert, StyleSheet, ScrollView } from 'react-native'
import { FView, FText, FButton, ButtonFillView, FTextInput, NavBarView } from 'src/components'
import { colors } from 'src/constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'

export default function SignIn({ navigation }) {
  const passwordRef = useRef()

  const dispatch = useDispatch()
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  const signIn = () => {
    setIsSigningIn(true)
    dispatch.user
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        dispatch.mobileUser.getNotificationToken().then(token => {
          if (token) {
            dispatch.mobileUser.updateFCMToken(token)
          }
        })
        navigation.goBack()
      })
      .catch(e => {
        Alert.alert('Sign In Error', e.message)
      })
      .finally(() => {
        setIsSigningIn(false)
      })
  }
  return (
    <FView fill>
      <NavBarView
        LeftButtonElement={
          <FButton onPress={() => navigation.goBack()}>
            <FView h={50} w={60} center>
              <MaterialCommunityIcons name={'arrow-left'} size={30} color={colors.black} />
            </FView>
          </FButton>
        }
        title={'Sign In'}
      />
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContentContainerStyle}>
        <FView size={25} />

        <FView h={1} bg={colors.grey25} />
        <SignInItemView label="Email">
          <FTextInput
            autoFocus
            editable={!isSigningIn}
            keyboardType={'email-address'}
            textContentType="emailAddress" // iOS
            autoCompleteType="email" // Android
            value={emailValue}
            placeholder="name@example.com"
            onChangeText={text => setEmailValue(text)}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
        </SignInItemView>
        <FView h={1} bg={colors.grey25} />
        <SignInItemView label="Password">
          <FTextInput
            ref={passwordRef}
            editable={!isSigningIn}
            secureTextEntry
            textContentType="password" // iOS
            autoCompleteType="password" // Android
            value={passwordValue}
            placeholder="******"
            onChangeText={text => setPasswordValue(text)}
            onSubmitEditing={() => signIn()}
          />
        </SignInItemView>
        <FView h={1} bg={colors.grey25} />

        <FView size={25} />

        <FView alignCenter>
          <FButton disabled={isSigningIn} onPress={() => navigation.navigate('ForgotPassword')}>
            <FText heading h5 grey>
              Forgot your password?
            </FText>
          </FButton>
        </FView>

        <FView size={25} />
      </ScrollView>
      <FView absolute left={15} right={15} bottom={25}>
        <FButton
          disabled={isSigningIn}
          onPress={() => {
            signIn()
          }}
        >
          <ButtonFillView rounded disabled={isSigningIn || passwordValue.length < 6 || emailValue.length < 5}>
            <FText heading h5 bold white>
              {isSigningIn ? 'Signing In…' : 'Sign In'}
            </FText>
          </ButtonFillView>
        </FButton>
      </FView>
    </FView>
  )
}

function SignInItemView({ label, children }) {
  return (
    <FView row h={60} alignCenter bg={colors.white}>
      <FView w={97} alignEnd>
        <FText heading h5 bold>
          {label}
        </FText>
      </FView>
      <FView fill>{children}</FView>
    </FView>
  )
}

const styles = StyleSheet.create({
  scrollViewStyle: { flex: 1, backgroundColor: colors.background },
  scrollViewContentContainerStyle: { flexGrow: 1 },
})