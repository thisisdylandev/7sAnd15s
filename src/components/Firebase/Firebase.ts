import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { config } from '../../firebase-credentials';

class Firebase {
  // TODO: figure out type for this
  db: any;
  constructor() {
    initializeApp({ ...config });
    this.db = getFirestore();
  }

  // TODO: figure out how to fix this error without disabling the rule
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  logTest = async () => {
    const querySnapshot = await getDocs(collection(this.db, 'test'));
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };
}

export default Firebase;
