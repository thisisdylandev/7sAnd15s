import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  calendarClearSharp,
  peopleCircleSharp,
  personCircleOutline,
} from 'ionicons/icons';

import { useFirebase } from './components/Firebase/FirebaseContext';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';
import Login from './pages/Login';
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

const App: React.FC = () => {
  const firebase = useFirebase();
  const { loading, auth } = firebase.checkAuth();

  if (loading) {
    return <IonLoading isOpen translucent />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <ProtectedRoute
              path="/"
              component={Team}
              isAuthenticated={auth.loggedIn}
            />
            <ProtectedRoute
              path="/team"
              component={Team}
              isAuthenticated={auth.loggedIn}
            />
            <ProtectedRoute
              path="/schedule"
              component={Schedule}
              isAuthenticated={auth.loggedIn}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              isAuthenticated={auth.loggedIn}
            />
            <UnprotectedRoute
              path="/login"
              component={Login}
              isAuthenticated={auth.loggedIn}
            />
            <UnprotectedRoute
              path="/signup"
              component={Login}
              isAuthenticated={auth.loggedIn}
            />
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
};

export default App;
