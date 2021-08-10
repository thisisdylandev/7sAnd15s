import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

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
        <IonButton onClick={async () => await firebase.logTest()}>Add Team</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Team;
