
//import {  } from '../data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonInput,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonButton,
} from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import './Login.css';

/* Login/Signup Landing Page
*/

function Login() {

  return (
    <IonPage id="login-page">
      <IonHeader translucent>
        <IonToolbar>
        <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <IonList inset={true}>
      
          <IonItem >
            <IonInput 
                label="Username"
                maxlength={40}  
                helperText="Enter an username"
                errorText="Please enter a valid username"
            ></IonInput>
          </IonItem>

          <IonItem >
            <IonInput 
                label="password"
                maxlength={30}  
                helperText="Enter a password"
                errorText="Please enter a valid password"
            ></IonInput>
              <IonNote>Password should be of </IonNote>
          </IonItem>
          <IonItem>
            <IonButton expand="block"> <IonIcon color="white" slot="start" icon={logInOutline} size="large"></IonIcon>
                    Sign in </IonButton>
            
          </IonItem>
        </IonList>

        <IonList inset={true}>

        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Login;
