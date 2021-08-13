import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';

import { useFirebase } from '../components/Firebase/FirebaseContext';

const Team: React.FC = () => {
  const firebase = useFirebase();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Team</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Team</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          onClick={async () => await firebase.getUsers('test')}
          className="ion-padding"
        >
          Add Team
        </IonButton>
        <IonButton
          onClick={async () => await firebase.signOut()}
          className="ion-padding"
        >
          Sign Out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Team;
