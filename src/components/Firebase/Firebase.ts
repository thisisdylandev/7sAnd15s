// TODO: figure out how to fix this error without disabling the rule
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { config } from '../../firebase-credentials';

interface Auth {
  loggedIn: boolean;
  userId?: string;
  userData?: any;
}
interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

class Firebase {
  // TODO: figure out types for this
  db: any;
  analytics: any;
  auth: any;
  constructor() {
    initializeApp({ ...config });
    this.analytics = getAnalytics();
    this.auth = getAuth();
    this.db = getFirestore();
  }

  checkAuth = () => {
    const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
    useEffect(() => {
      return onAuthStateChanged(this.auth, firebaseUser => {
        const auth = firebaseUser
          ? { loggedIn: true, userId: firebaseUser.uid, userData: firebaseUser }
          : { loggedIn: false };
        setAuthInit({ loading: false, auth });
      });
    }, []);
    console.log(authInit);
    return authInit;
  };

  createUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(this.auth, email, password).then(
      userCredential => {
        const user = userCredential.user;
        console.log(user);
      }
    );
  };

  signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
        console.log(this.auth.currentUser);
      })
      .catch(error => {
        console.log(error);
      });
  };

  signOut = () => {
    signOut(this.auth)
      .then(() => {
        console.log('signed out');
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProfile = async (userId: string) => {
    const profileRef = doc(this.db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  updateProfile = async (userId: string, profile: Record<string, unknown>) => {
    const profileRef = doc(this.db, 'profiles', userId);
    await updateDoc(profileRef, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      displayName: profile.displayName,
    });
  };
}

export default Firebase;
