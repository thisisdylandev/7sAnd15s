import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import firebase from 'firebase/app'
import "firebase/firestore";
import { calendarClearSharp, peopleCircleSharp, personCircleOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

import { config } from './firebase-credentials';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Team from './pages/Team';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

firebase.initializeApp({...config});

const db = firebase.firestore();

db.collection("test").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
  });
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/team">
            <Team />
          </Route>
          <Route exact path="/schedule">
            <Schedule />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/team" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="team" href="/team">
            <IonIcon icon={peopleCircleSharp} />
            <IonLabel>Team</IonLabel>
          </IonTabButton>
          <IonTabButton tab="schedule" href="/schedule">
            <IonIcon icon={calendarClearSharp} />
            <IonLabel>Schedule</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
