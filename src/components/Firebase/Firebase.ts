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
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
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
    return authInit;
  };

  createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(this.auth, email, password);
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
      await setDoc(doc(this.db, 'profiles', this.auth.currentUser.uid), {
        displayName: this.auth.currentUser.email.split('@')[0],
      });
      console.log('No such document!');
    }
  };

  updateUser = async (userId: string, profile: any) => {
    const profileRef = doc(this.db, 'profiles', userId);
    await updateDoc(profileRef, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      displayName: profile.displayName,
      team: profile.team,
    });
  };

  getTeam = async (teamId: string) => {
    const teamRef = doc(this.db, 'teams', teamId);
    const teamSnap = await getDoc(teamRef);
    if (teamSnap.exists()) {
      const teamData = teamSnap.data();
      teamData.id = teamSnap.id;
      return teamData;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  getTeamDisplayNames = async (teamId: string) => {
    const q = query(
      collection(this.db, 'profiles'),
      where('team', '==', teamId)
    );
    const querySnap = await getDocs(q);
    const profiles: any[] = [];
    querySnap.forEach(doc => {
      profiles.push(doc.data());
    });
    return profiles;
  };

  createTeam = async (teamName: string, owner: string) => {
    const newTeamRef = await addDoc(collection(this.db, 'teams'), {
      name: teamName,
      owner: owner,
      members: [owner],
    });
    return newTeamRef.id;
  };
}

export default Firebase;
