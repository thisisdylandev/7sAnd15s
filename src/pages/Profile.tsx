import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useFirebase } from '../components/Firebase/FirebaseContext';

const Profile: React.FC = () => {
  const firebase = useFirebase();
  const user = firebase.auth.currentUser;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>{JSON.stringify(user)}</p>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
