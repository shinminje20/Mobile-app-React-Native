import React, { Component, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux'

// const dispatch = useDispatch()
const db = firestore();

//initial state
const INITIAL_POSTING_STATE = {
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

export const postings = {
  state: INITIAL_POSTING_STATE,
  reducers: {
    setAgreement(state, {agreement}) {
      return {
        ...state,
        agreement
      }
    },
  },
  effects: ({dispatch, getState}) => ({
    getAgreement() {
      return getState().postings.agreement
    },
  })
}


export default postings;