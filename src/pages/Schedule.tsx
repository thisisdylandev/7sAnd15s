import { IonButton, IonContent, IonLoading, IonPage } from '@ionic/react';
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
  const firebase = useFirebase();

  useEffect(() => {
    const fetchTeam = async () => {
      const profile = await firebase.getProfile(firebase.auth.currentUser.uid);
      const team = await firebase.getTeam(profile.team);
      setTeam(team);
      setLoading(false);
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <IonLoading isOpen translucent />;
  }
  return (
    <IonPage>
      <Header pageName="Schedule" />
      <IonContent fullscreen>
        <IonButton expand="full" className="ion-padding">
          Add Event
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
