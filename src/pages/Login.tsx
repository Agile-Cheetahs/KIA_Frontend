
//import {  } from '../data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonInput,
  IonPage,
  IonToolbar,
  IonCol, IonGrid, IonRow,
  useIonViewWillEnter,
  IonButton,
} from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { useState } from 'react';
import './Login.css';

/* Login/Signup Landing Page
*/




function Login() {
  // 0 -> sign in, 1 -> Create account
  const [loginType, setLoginType] = useState(0);


  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  // Event callback methods
  const clearForms = () => {
    setIsTouched(false);
    setIsValid(false);
  }

  const markTouched = () => {
    setIsTouched(true);
  };


  return (
    <IonPage id="login-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Kitchen Inventory Application Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <IonList inset={false}>
          {loginType ?
            <IonCard className='registerCard'>
              <IonCardContent>
                <IonItem >
                  <IonInput
                    type="text"
                    label="Username"
                    maxlength={40}
                    label-placement="stacked"
                    placeholder="First Name Last Name"
                    errorText="Please enter a valid username"
                  ></IonInput>
                </IonItem>
                <IonItem >
                  <IonInput
                    type="email"
                    label="Email"
                    label-placement="stacked"
                    placeholder="email@domain.com"
                    errorText="Please enter a valid Email Id"
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="tel"
                    label="PhoneNumber"
                    label-placement="stacked"
                    placeholder="(000)-000-0000"
                    errorText="Please enter a valid phone number"
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="password"
                    label="Password"
                    maxlength={30}
                    label-placement="stacked" placeholder="Enter a password"
                    helperText=""
                    errorText="Please enter a valid password"
                  ></IonInput>
                  {/* <IonNote>Password should be of </IonNote> */}
                </IonItem>
                <IonButton expand="block" className="registerButtonSpan"> <IonIcon color="white" icon={logInOutline} size="medium"></IonIcon>
                  REGISTER </IonButton>
                <IonItem lines="none">
                  Have an Account?  <IonButton fill="clear" onClick={() => setLoginType(0)}> Sign in. </IonButton>
                </IonItem>

                {/* </IonItem> */}

              </IonCardContent>

            </IonCard>
            :
            <IonCard className='loginCard'>
              {/* <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader> */}

              <IonCardContent>
                <IonItem >
                  <IonInput
                    type="text"
                    label="Username"
                    maxlength={40}
                    label-placement="stacked"
                    placeholder="Enter an username"
                    errorText="Please enter a valid username"
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="password"
                    label="Password"
                    maxlength={30}
                    label-placement="stacked" placeholder="Enter a password"
                    helperText=""
                    errorText="Please enter a valid password"
                  ></IonInput>
                  {/* <IonNote>Password should be of </IonNote> */}
                </IonItem>
                {/* <IonItem className="signInButtonSpan"> */}
                <IonButton expand="block" className="signInButtonSpan"> <IonIcon color="white" icon={logInOutline} size="medium"></IonIcon>
                  Sign in </IonButton>
                <IonItem lines="none">
                  Don't Have an Account?  <IonButton fill="clear" onClick={() => setLoginType(1)}> Create Account. </IonButton>
                </IonItem>

                {/* </IonItem> */}

              </IonCardContent>
            </IonCard>
          }
          {/* /* <IonItem >
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
       */}


        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Login;
