import React, { Component, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux'
import store from "../store";

// const dispatch = useDispatch()
const db = firestore();

//initial state
const INITIAL_USER_STATE = {
    // User/{userId}
    uid: '',
    agreement: false,
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    rentType: '',
    roomType: '',
    userCity: '',
    userSchool: '',
    userSkytrain: '',
    userType: '',
    userWork: ''
    
    //==== for Recommendation Functionallity
    //average price in favorite 
    // avgPriceInFavorite: '',
    // cityThatUserJustLookedOver: '',
    // userLocation: {
    //     // default location
    //     timestamp: 0,
    //     latitude: 49.2635,
    //     longitude: -122.9331,
    // }

    //
}

export const user = {
  state: INITIAL_USER_STATE,
  reducers: {
    _setUser: (state, User) => ({
        ...state,
        ...User
    }),
    setAgreement: (state, {agreement}) => ({
        ...state,
        agreement
    }),
    setPhoneNum: (state, {phone}) => ({
        ...state,
        phone
    }),
    setCreatedAccount: (state, {uid, email, name}) => ({
      ...state,
      uid,
      email,
      name
    }),
    setUserType: (state,{userType}) => ({
      ...state,
      userType
    }),
    setRentType: (state,{rentType}) => ({
      ...state,
      rentType
    }),
    setRoomType: (state,{roomType}) => ({
      ...state,
      roomType
    }),
    setUserSchool: (state,{userSchool}) => ({
      ...state,
      userSchool
    }),
    setUserSkytrain: (state,{userSkytrain}) => ({
      ...state,
      userSkytrain
    }),
    setUserCity: (state,{userCity}) => ({
      ...state,
      userCity
    }),
    setUserWork: (state,{userWork}) => ({
      ...state,
      userWork
    }),
    setUserFilter: (state, {data}) => ({
      ...state,
      data
    }),
    
  },
  effects: ({dispatch}) => ({
    setUser(User) {
      dispatch.user._setUser(User)
    },
    setName({name}) {
      return dispatch.user.setUser({
        name,
      })
    },
    getAgreement() {
      return store.getState.user.agreement
    },
    getPhoneNum() {
      return store.getState.phone
    },
    getUid() {
      return store.getState.user.uid
    },
    getUserType() {
      return getState.user.userType
    },
    getUserFilter() {
      return [store.getState.user.userType, 
        store.getState.user.rentType,
        store.getState.user.roomType
      ]
    }
  })
}


// const createUserModule = ()  => ({

//   state: INITIAL_USER_STATE,
//   reducers: {
//     _setUser: (state, User) => ({
//       ...state,
//       ...User
//     }),
//     setIsUserLoading: (state, isUserLoading) => ({
//       ...state,
//       isUserLoading
//     }),
//   },
//   effects: ({dispatch, getState}) => ({
//     setUser(User) {
//       // Check if user's cart is not empty and cartLocationId is set
//       dispatch.user._setUser(User)
//     },
//     setReadWriteUser(userData) {
//       const userId = dispatch.user.getUserId()
//       return db.doc(`Canada/Users/${userId}/UserData/readwrite`).set(userData, {merge: true})
//     },
//     getIsUserLoading() {
//       return getState().user.isUserLoading
//     },
//     getIsUserLoggedIn() {
//       return auth.currentUser && !auth.currentUser.isAnonymous
//     },
//     getUserToken() {
//       return auth.currentUser ? auth.currentUser.getIdToken() : null
//     },
//     getUserId() {
//       return auth.currentUser ? auth.currentUser.uid : null
//     },
//     getName() {
//       return getState().user.name || ''
//     },
//     setName({name}) {
//       return dispatch.user.setUser({
//         name,
//       })
//     },
//     async setNameOnline({name}) {
//       const userId = dispatch.user.getUserId()
//       if (userId) {
//         return db
//           .collection('Users')
//           .doc(userId)
//           .update({name})
//       }
//     },
//     getAgreement() {
//       return getState().user.agreement
//     },
//     setAgreement({agreement}) {
//       return dispatch.user.setUser({
//         agreement,
//       })
//     },
//     getEmail() {
//       return getState().user.email || ''
//     },
//     setEmail({email}) {
//       return dispatch.user.setUser({
//         email,
//       })
//     },
//     getPhoneNumber() {
//       return getState().user.phoneNumber || ''
//     },
//     setPhoneNumber({phoneNumber}) {
//       return dispatch.user.setUser({
//         phoneNumber,
//       })
//     },
//     async setPhoneNumberOnline({phoneNumber}) {
//       const userId = dispatch.user.getUserId()
//       if (userId) {
//         return db
//           .collection('Users')
//           .doc(userId)
//           .update({phoneNumber})
//       }
//     },
//     signInWithEmailAndPassword(email, password) {
//       // Cart state before logging in

//       return auth.signInWithEmailAndPassword(email, password).then(res => {
//         dispatch.user.setUser({lastUserOrder: {}})
//         if (!isEmpty(cartItems)) {
//           // override logged-in user's cartItems along with many other cart related items
//           const uid = res.uid || get(res, 'user.uid')

//           return db
//             .collection('Users')
//             .doc(uid)
//             .collection('UserData')
//             .doc('readwrite')
//             .update({
//               cartItems,
//               cartRestaurantId,
//               cartLocationId,
//               tipSelectionIndex,
//               defaultNotes, 
//             })
//         }
//         return Promise.resolve(res)
//       })
//     },
//     sendPasswordResetEmail(email) {
//       return auth.sendPasswordResetEmail(email)
//     },
//     signOut() {
//       return auth.signOut()
//     },
//     async createUserWithEmailAndPassword({email, password, firstName, lastName}) {
//       if (!email || email.length === 0) {
//         throw new Error('Email cannot be empty')
//       }
//       if (!password || password.length === 0) {
//         throw new Error('Password cannot be empty')
//       }

//       await auth.createUserWithEmailAndPassword(email.toLowerCase(), password)
//       const user = auth().currentUser;
//       const uid = user.uid || get(res, 'user.uid')

//       await db
//         .collection('Users')
//         .doc(uid)
//         .set(
//           {
//             email: email.toLowerCase(),
//             firstName: firstName.trim(),
//             lastName: lastName.trim(),
//             name: firstName.trim() + ' ' + lastName.trim()
//           },
//           {merge: true},
//         )

//     }
//   })
// })

// //action type definition
// const SET_EMAIL = "USER/SET_EMAIL"
// const SET_ID = "USER/SET_ID"
// const SET_F_NAME = "USER/SET_F_NAME"
// const SET_L_NAME = "USER/SET_L_NAME"
// const SET_PHONENUM = "USER/SET_PHONENUM"
// const SET_PAYMENT = "USER/SET_PAYMENT"

// //action creator function
// export const setEmail = (email) => {
//   return {
//     type: SET_EMAIL,
//     data: email
//   }
// }
// export const setID = (id) => {
//   return {
//     type: SET_ID,
//     data: id
//   }
// }
// export const setFirstName = (firstName) => {
//   return {
//     type: SET_F_NAME,
//     data: firstName
//   }
// }
// export const setLastName = (lastName) => {
//   return {
//     type: SET_L_NAME,
//     data: lastName
//   }
// }
// export const setPhoneNum = (phoneNumber) => {
//   return {
//     type: SET_PHONENUM,
//     data: phoneNumber
//   }
// }


// const userModel = () => {
//     udpateEmail = (email) => {
//         return {
//             type: 'ADD',
//             payload: email
//         }
//     }
// }

  // switch (action.type) {
  //     case SET_EMAIL:
  //       return {
  //         ...state,
  //         email: action.data
  //       };
  //     case SET_ID:
  //       return {
  //         ...state,
  //         id: action.data
  //       };
  //     case SET_F_NAME:
  //       return {
  //         ...state,
  //         firstName: action.data
  //       };
  //     case SET_L_NAME:
  //       return {
  //         ...state,
  //         lastName: action.data
  //       };
  //     case SET_PHONENUM:
  //       return {
  //         ...state,
  //         phoneNumber: action.data
  //       };
  //     default :
  //       return state
  // }



export default user;