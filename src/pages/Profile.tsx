import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState, useEffect } from 'react';

import { useFirebase } from '../components/Firebase/FirebaseContext';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
  });
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase();
  const user = firebase.auth.currentUser;

  const updateProfile = async () =>
    await firebase.updateProfile(user.uid, profile);
  const setProfileValues = (e: any) => {
    const newProfile = { ...profile };
    const key = e.target.id as keyof typeof profile;
    newProfile[key] = e.detail.value;
    setProfile(newProfile);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await firebase.getProfile(user.uid);
      setProfile(userProfile);
      setLoading(false);
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return <IonLoading isOpen translucent />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeSm="6">
              <IonLabel position="stacked">First Name:</IonLabel>
              <IonItem color="" lines="none">
                <IonInput
                  required
                  autofocus={true}
                  id="firstName"
                  placeholder="First Name"
                  onIonChange={e => setProfileValues(e)}
                  value={profile.firstName}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeSm="6">
              <IonLabel position="stacked">Last Name:</IonLabel>
              <IonItem color="" lines="none">
                <IonInput
                  required
                  id="lastName"
                  onIonChange={e => setProfileValues(e)}
                  placeholder="Last Name"
                  value={profile.lastName}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeSm="6">
              <IonLabel position="stacked">Display Name:</IonLabel>
              <IonItem color="" lines="none">
                <IonInput
                  required
                  id="displayName"
                  onIonChange={e => setProfileValues(e)}
                  placeholder="Display Name"
                  value={profile.displayName}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeSm="6">
              <IonButton color="primary" onClick={updateProfile}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
