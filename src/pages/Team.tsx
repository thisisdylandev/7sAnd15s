import {
  IonContent,
  IonPage,
  IonLoading,
  IonGrid,
  IonText,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonInput,
  IonItem,
} from '@ionic/react';
import { useEffect, useState } from 'react';

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
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [onTeam, setOnTeam] = useState(true);
  const firebase = useFirebase();

  const setTeamValues = (e: any) => {
    const newTeam = { ...team };
    const key = e.target.id as keyof typeof team;
    newTeam[key] = e.detail.value;
    setTeam(newTeam);
  };

  const createTeam = async () => {
    setLoading(true);
    const newTeam = team;
    newTeam.owner = firebase.auth.currentUser.uid;
    const newProfile = profile;
    const newTeamId = await firebase.createTeam(newTeam.name, newTeam.owner);
    newProfile.team = newTeamId;
    await firebase.updateUser(firebase.auth.currentUser.uid, profile);
    setProfile(newProfile);
    setOnTeam(true);
  };

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      await firebase
        .getProfile(firebase.auth.currentUser.uid)
        .then((updatedProfile: any) => {
          setProfile(updatedProfile);
        });
      if (profile?.team) {
        const team = await firebase.getTeam(profile.team);
        const profiles = await firebase.getTeamDisplayNames(profile.team);
        const memberList: string[] = [];
        profiles.map((profile: any) => memberList.push(profile.displayName));
        setMembers(memberList);
        setTeam(team);
        setOnTeam(true);
      } else {
        setOnTeam(false);
      }
    };

    fetchTeam().then(() => setLoading(false));
  }, [onTeam]);

  if (loading) {
    return <IonLoading isOpen translucent />;
  }

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
                  invitation, or use the form below to create a team!
                </p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeSm="6">
              <IonLabel position="stacked">Team Name:</IonLabel>
              <IonItem color="" lines="none">
                <IonInput
                  required
                  id="name"
                  name="name"
                  onIonChange={e => setTeamValues(e)}
                  placeholder="Team Name"
                  value={team.name}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeSm="6">
              <IonButton
                expand="block"
                type="submit"
                color="primary"
                onClick={createTeam}
              >
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      );
    } else {
      return (
        <IonGrid className="ion-padding">
          <IonButton
            expand="block"
            routerLink={`/invite/${team.id}`}
            routerDirection="none"
          >
            Invite Member
          </IonButton>
          <IonCol size="10" sizeSm="6">
            {members.map((member, index) => {
              return (
                <IonRow key={index}>
                  <IonText color="primary">
                    <h2>{member}</h2>
                  </IonText>
                </IonRow>
              );
            })}
          </IonCol>
        </IonGrid>
      );
    }
  };

  return (
    <IonPage>
      <Header pageName={team.name || 'No Team!'} />
      <IonContent fullscreen>{teamContents()}</IonContent>
    </IonPage>
  );
};

export default Team;
