import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react';
import { useEffect, useState } from 'react';

import { useFirebase } from '../components/Firebase/FirebaseContext';
import Header from '../components/Header';

const Schedule: React.FC = () => {
  const [team, setTeam] = useState({
    name: '',
    owner: '',
    members: [],
  });
  const [loading, setLoading] = useState(true);
  const [onTeam, setOnTeam] = useState(false);
  const firebase = useFirebase();

  useEffect(() => {
    setLoading(true);
    const fetchTeam = async () => {
      const profile = await firebase.getProfile(firebase.auth.currentUser.uid);
      if (profile?.team) {
        const team = await firebase.getTeam(profile.team);
        setTeam(team);
        setOnTeam(true);
      } else {
        setOnTeam(false);
      }
      setLoading(false);
    };
    fetchTeam().then(() => setLoading(false));
  }, [onTeam]);

  const teamContents = () => {
    if (!onTeam) {
      return (
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeSm="6">
              <IonText color="primary">
                <h2>You are not on a team!</h2>
                <p>
                  You can either join a team by having a member send you an
                  invitation, or go to the team tab to create a new team.
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      );
    } else {
      return (
        <IonButton expand="full" className="ion-padding">
          Add Event
        </IonButton>
      );
    }
  };

  if (loading) {
    return <IonLoading isOpen translucent />;
  }
  return (
    <IonPage>
      <Header pageName="Schedule" />
      <IonContent fullscreen>{teamContents()}</IonContent>
    </IonPage>
  );
};

export default Schedule;
