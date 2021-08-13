import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { mailOutline, keyOutline } from 'ionicons/icons';
import { useState } from 'react';

import { useFirebase } from '../components/Firebase/FirebaseContext';

const Login: React.FC = () => {
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const firebase = useFirebase();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log In</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size="10" sizeSm="6">
                <IonItem color="" lines="none">
                  <IonLabel>
                    <IonIcon icon={mailOutline} />
                  </IonLabel>
                  <IonInput
                    required
                    autofocus={true}
                    autocorrect="on"
                    type="email"
                    placeholder="Email"
                    value={logInEmail}
                    onIonChange={(event) => setLogInEmail(event.detail.value || '')}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol size="10" sizeSm="6">
                <IonItem color="" lines="none">
                  <IonLabel>
                    <IonIcon icon={keyOutline} />
                  </IonLabel>
                  <IonInput
                    required
                    type="password"
                    placeholder="Password"
                    value={logInPassword}
                    onIonChange={(event) =>
                      setLogInPassword(event.detail.value || '')
                    }
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol size="10" sizeSm="6">
                <IonButton type="submit" expand="block" onClick={() => firebase.signIn(logInEmail, logInPassword)}>
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol size="6">
                <IonButton type="submit" expand="block" onClick={() => firebase.createUser(logInEmail, logInPassword)}>
                  Sign Up
                </IonButton>
              </IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
