import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

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
        <IonButton className="text-2xl">Add Team</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Team;
