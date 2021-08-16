import {
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useFirebase } from './Firebase/FirebaseContext';

const Header: React.FC<{ pageName: string }> = ({ pageName }) => {
  const firebase = useFirebase();
  return (
    <IonHeader>
      <IonToolbar className="ion-padding-end">
        <IonTitle>{pageName}</IonTitle>
        <IonButtons slot="primary">
          <IonButton
            color="primary"
            fill="solid"
            onClick={async () => await firebase.signOut()}
          >
            Sign Out
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
