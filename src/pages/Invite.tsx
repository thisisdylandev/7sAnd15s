import {
  IonContent,
  IonPage,
  IonLoading,
  IonGrid,
  IonText,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useFirebase } from '../components/Firebase/FirebaseContext';
import Header from '../components/Header';

const Team: React.FC = () => {
  const [team, setTeam] = useState({
    id: '',
    name: '',
    owner: '',
    members: [],
  });
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    team: '',
  });
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase();
  const teamId: { id: string } = useParams();

  const acceptInvite = async () => {
    setLoading(true);
    const updatedProfile = profile;
    updatedProfile.team = teamId.id;
    setProfile(updatedProfile);
    await firebase.updateUser(firebase.auth.currentUser.uid, updatedProfile);
    setLoading(false);
  };

  useEffect(() => {
    const fetchTeam = async () => {
      const profile = await firebase.getProfile(firebase.auth.currentUser.uid);
      const team = await firebase.getTeam(teamId.id);
      setProfile(profile);
      setTeam(team);
      setLoading(false);
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <IonLoading isOpen translucent />;
  }

  const renderPageContents = () => {
    if (profile.team === team.id) {
      return (
        <IonRow className="ion-justify-content-center">
          <IonCol size="10" sizeSm="6">
            <IonText color="primary">
              <h2>
                To invite someone to join {`${team.name}`}, simply send them the
                link below:{' '}
              </h2>
              <p>{`${window.location}`}</p>
            </IonText>
          </IonCol>
        </IonRow>
      );
    } else {
      return (
        <IonRow className="ion-justify-content-center">
          <IonCol size="10" sizeSm="6">
            <IonText color="primary">
              <h2>Someone has invited you to join {`${team.name}`}!</h2>
              <p>You can join by clicking this button: </p>
              <IonButton
                expand="full"
                className="ion-padding"
                onClick={acceptInvite}
              >
                Accept Invitiation
              </IonButton>{' '}
            </IonText>
          </IonCol>
        </IonRow>
      );
    }
  };

  return (
    <IonPage>
      <Header pageName={'Invite to ' + team.name} />
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonCol size="10" sizeSm="6">
            {renderPageContents()}
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Team;
