
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
import { useState, useRef } from 'react';
import './Login.css';
import { validateEmail, validatePassword, validateUsername, validateEmpty } from '../helper/Validation';

/* Login/Signup Landing Page
*/



let validationMethodMap = {
  "Username": validateUsername,
  "Email": validateEmail,
  "Password": validatePassword,
  "PhoneNumber": validateEmpty
}



function Login() {
  // 0 -> sign in, 1 -> Create account
  const [loginType, setLoginType] = useState(0);


  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);

  // state of each field value (used for clearing fields)
  const [loginFormState, setLoginFormState] = useState({
    userName: "",
    email: "",
    userPhone: "",
    password: ""
  });



  let validateSetterMap = {
    "Username": setIsUserNameValid,
    "Email": setIsEmailValid,
    "Password": setIsPasswordValid,
    "PhoneNumber": setIsPhoneNumberValid
  }

  let formStateFieldMap = {
    "Username": "userName",
    "Email": "email",
    "Password": "password",
    "PhoneNumber": "userPhone"
  }

  // const isFormValid = () => {
  //   if (isUserNameValid && isEmailValid && isPasswordValid) {
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  // }

  // generic method for all input event callbacks.
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    const fieldName = (ev.target as HTMLInputElement).label;
    
    // select the correct field
    const validateMethod = validationMethodMap[fieldName];
    const validateSetter = validateSetterMap[fieldName];
    const fieldSetter = formStateFieldMap[fieldName];



    // log statements
    console.log(fieldName);
    console.log(validateMethod);
    console.log(validateSetter);


    // if (value === '') return;
    // validate also includes checking for blank values
    if (validateMethod(value) !== null) { 
        validateSetter(true); 
      
    }
    else { validateSetter(false); }
    setLoginFormState((loginFormState) =>  { return {...loginFormState, [fieldSetter]: value};});
    
  };


  const [isUserNameMissing, setIsUserNameMissing] = useState<boolean>();
  const [isEmailMissing, setIsEmailMissing] = useState<boolean>();
  const [isPasswordMissing, setIsPasswordMissing] = useState<boolean>();

  // Event callback methods
  const clearForms = () => {
    setIsTouched(false);
    setIsValid(false);
    //clear form input
    Object.values(validateSetterMap).forEach(validator => {
      validator('');
    });
    setLoginFormState({
      userName: "",
      email: "",
      userPhone: "",
      password: ""
    });
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
                    value={loginFormState.userName}
                    errorText="Please enter a valid username"
                    onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                </IonItem>
                <IonItem >
                  <IonInput
                    type="email"
                    label="Email"
                    label-placement="stacked"
                    placeholder="email@domain.com"
                    value={loginFormState.email}
                    errorText="Email ID should not have invalid characters"
                    onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="tel"
                    label="PhoneNumber"
                    label-placement="stacked"
                    placeholder="(000)-000-0000"
                    value={loginFormState.userPhone}
                    errorText="Only Numbers allowed in US format"
                    onIonChange={(event) => validate(event)}
                   //onIonChange={(event) => validate(event)}
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="password"
                    label="Password"
                    maxlength={30}
                    label-placement="stacked" placeholder="Enter a password"
                    value={loginFormState.password}
                    helperText=""
                    errorText="Password should contain atleast 8 characters with 1 capital letter, lowercase, 1 number and 1 special character"
                    onIonChange={(event) => validate(event)}
                    //onIonInput={(event) => validate(event)}
                  ></IonInput>
                  {/* <IonNote>Password should be of </IonNote> */}
                </IonItem>
                <IonButton
                  expand="block"
                  className="registerButtonSpan"
                  disabled={!(isUserNameValid && isEmailValid && isPasswordValid)}
                > <IonIcon color="white" icon={logInOutline} size="medium"></IonIcon>
                  REGISTER </IonButton>
                <IonItem lines="none">
                  Have an Account?
                  <IonButton fill="clear" onClick={() => {

                    setLoginType(0);

                    clearForms();
                  }}> Sign in. </IonButton>
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
                    value={loginFormState.userName}
                    placeholder="Enter an username"
                    errorText="Username should be of atleast 8 characters consisting of alphabets and numbers"
                    onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="password"
                    label="Password"
                    maxlength={30}
                    label-placement="stacked" placeholder="Enter a password"
                    value={loginFormState.password}
                    helperText=""
                    errorText="Please enter a valid password"
                    onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                  {/* <IonNote>Password should be of </IonNote> */}
                </IonItem>
                {/* <IonItem className="signInButtonSpan"> */}
                <IonButton
                  expand="block"
                  className="signInButtonSpan"
                  disabled={!(isUserNameValid && isPasswordValid)}
                > <IonIcon color="white" icon={logInOutline} size="medium"></IonIcon>
                  Sign in
                </IonButton>
                <IonItem lines="none">
                  Don't Have an Account?
                  <IonButton fill="clear" onClick={() => {
                    setLoginType(1);
                    clearForms();

                  }}> Create Account. </IonButton>
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
