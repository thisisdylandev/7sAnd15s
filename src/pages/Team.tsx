import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import ExploreContainer from '../components/ExploreContainer';

const Team: React.FC = () => {
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
        <ExploreContainer name="Team page" />
      </IonContent>
    </IonPage>
  );
};

export default Team;
