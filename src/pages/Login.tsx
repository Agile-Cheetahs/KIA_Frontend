
//import {  } from '../data/messages';
import {
  useIonLoading,
  IonContent,
  IonHeader,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonList,
  IonTitle,
  IonInput,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonButton,
  useIonToast
} from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import { Redirect, useParams } from 'react-router';
import { useState, useRef } from 'react';
import './Login.scss';
import { validateEmail, validatePassword, validateUsername, validateEmpty, validatePhoneNumber } from '../helper/Validation';
import { register, login } from '../helper/APIRequest';

/* Login/Signup Landing Page
*/

//Typescript interface 
interface InputFieldMap {
  "Username": string | any[],
  "Email": string | any[],
  "Password": string | any[],
  "PhoneNumber": string | any[]
}

// TODO: refactor this
const errorLabels = {
  "username": "Username should be of 2 words separated by space consisting of alphabets and/or numbers",
  "password": "Password should contain atleast 8 characters with 1 capital letter, lowercase, 1 number and 1 special character"
}


let validationMethodMap = {
  "Username": validateUsername,
  "Email": validateEmail,
  "Password": validatePassword,
  "PhoneNumber": validatePhoneNumber
}

// Helper method - TODO: refactor later!

function concatenateArraysAndJoin(obj: object) {
  let combinedArray: string[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        combinedArray = combinedArray.concat(obj[key]);
      }
    }
  }
  // Join the elements of the combinedArray into a string, separated by commas
  const resultString = combinedArray.join(',');

  // Return the resulting string
  return resultString;
}

const Login = (props) => {
  // 0 -> sign in, 1 -> Create account
  const [loginType, setLoginType] = useState(0);



  const [showLoading, hideLoading] = useIonLoading();
  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();

  //const [isValid, setIsValid] = useState<boolean>(true);

  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);

  const [isUserNameTouched, setIsUserNameTouched] = useState<boolean>(false);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);
  const [isPhoneNumberTouched, setPhoneNumberTouched] = useState<boolean>(false);

  // state of each field value (used for clearing fields)
  const [loginFormState, setLoginFormState] = useState({
    userName: "",
    email: "",
    userPhone: "",
    password: ""
  });


  // INput specific maps with each field
  let inputFieldStateMap: InputFieldMap = {
    "Username": [isUserNameValid, setIsUserNameValid, isUserNameTouched, setIsUserNameTouched],
    "Email": [isEmailValid, setIsEmailValid, isEmailTouched, setIsEmailTouched],
    "Password": [isPasswordValid, setIsPasswordValid, isPasswordTouched, setIsPasswordTouched],
    "PhoneNumber": [isPhoneNumberValid, setIsPhoneNumberValid, isPhoneNumberTouched, setPhoneNumberTouched]
  }

  let inputFieldNameMap: InputFieldMap = {
    "Username": "userName",
    "Email": "email",
    "Password": "password",
    "PhoneNumber": "userPhone"
  }
  const formInputClassName = (fieldName: string) => {
    const validateField = inputFieldStateMap[fieldName][0];
    return `${validateField && 'ion-valid'} ${validateField === false && 'ion-invalid'} ${inputFieldStateMap[fieldName][2] && 'ion-touched'}`
  }

  // generic method for all input event callbacks.
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    const fieldName = (ev.target as HTMLInputElement).label;

    // select the correct field
    const validateMethod = validationMethodMap[fieldName];
    const validateSetter = inputFieldStateMap[fieldName][1];
    const fieldSetter = inputFieldNameMap[fieldName];



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
    setLoginFormState((loginFormState) => { return { ...loginFormState, [fieldSetter]: value }; });

  };


  // Event callback methods
  const clearForms = () => {

    //clear form input
    Object.values(inputFieldStateMap).forEach(validator => {
      validator[1]('');
    });
    setLoginFormState({
      userName: "",
      email: "",
      userPhone: "",
      password: ""
    });
  }


  return (
    <IonPage id="login-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Kitchen Inventory Application Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" >
        <IonList inset={false}>
          {loginType ?
            <IonCard className='registerCard'>
              <IonCardContent>
                <IonItem >
                  <IonInput
                    type="text"
                    className={formInputClassName("Username")}
                    label="Username"
                    maxlength={60}
                    label-placement="stacked"
                    placeholder="First Name Last Name"
                    value={loginFormState.userName}
                    errorText={errorLabels["username"]}
                    onIonBlur={() => inputFieldStateMap["Username"][3](true)}
                    //onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                </IonItem>
                <IonItem >
                  <IonInput
                    type="email"
                    className={formInputClassName("Email")}
                    label="Email"
                    maxlength={60}
                    label-placement="stacked"
                    placeholder="email@domain.com"
                    value={loginFormState.email}
                    errorText="Email ID should be in email@domain.com format"
                    onIonBlur={() => inputFieldStateMap["Email"][3](true)}
                    //onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="tel"
                    className={formInputClassName("PhoneNumber")}
                    label="PhoneNumber"
                    maxlength={13}
                    label-placement="stacked"
                    placeholder="(000)-000-0000"
                    value={loginFormState.userPhone}
                    errorText="Only Numbers allowed in US format"
                    onIonBlur={() => inputFieldStateMap["PhoneNumber"][3](true)}
                    onIonInput={(event) => validate(event)}
                  //onIonChange={(event) => validate(event)}
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="password"
                    className={formInputClassName("Password")}
                    label="Password"
                    maxlength={20}
                    clearOnEdit={false}
                    label-placement="stacked" placeholder="Enter a password"
                    value={loginFormState.password}
                    helperText=""
                    errorText={errorLabels["password"]}
                    onIonBlur={() => inputFieldStateMap["Password"][3](true)}
                    onIonInput={(event) => validate(event)}
                  //onIonInput={(event) => validate(event)}
                  ></IonInput>
                  {/* <IonNote>Password should be of </IonNote> */}
                </IonItem>
                <IonButton
                  expand="block"
                  className="registerButtonSpan"
                  disabled={!(isUserNameValid && isEmailValid && isPasswordValid && isPhoneNumberValid)}
                  onClick={
                    // register button signup
                   async () => {
                      const usernameSplit = loginFormState.userName.split(' ');
                      const registerRequest = {
                        //full name string split here
                        "first_name": usernameSplit[0],
                        "last_name": usernameSplit[1],
                        "email": loginFormState.email,
                        "phone_number": loginFormState.userPhone,
                        "password": loginFormState.password,
                        "vc_code": "000000"
                      };

                      await showLoading();
                      register(registerRequest).then((resp) => {
                        if (resp.response == "failed") {
                          const msg = concatenateArraysAndJoin(resp.data);

                          errorToast({
                            message: msg,
                            duration: 1500,
                            position: "top",
                            color: "warning"
                          });


                        } else if (resp.response == "successful") {
                          const msg = "User registered succesfully!";

                          messageToast({
                            message: msg,
                            duration: 1500,
                            position: "top",
                            color: "success"
                          });
                          // set the login token here.
                          props.setToken(resp.token);
                        }
                      });

                      await hideLoading();



                    }
                  }
                > <IonIcon
                  color="white"
                  icon={logInOutline}
                  size="medium"
                ></IonIcon>
                  REGISTER </IonButton>
                <IonItem lines="none">
                  Have an Account?
                  <IonButton fill="clear" onClick={() => {

                    setLoginType(0);

                    clearForms();
                  }}> Sign in. </IonButton>
                </IonItem>

              </IonCardContent>

            </IonCard>
            :
            <IonCard className='loginCard'>

              <IonCardContent>
                <IonItem >
                  <IonInput
                    type="email"
                    className={formInputClassName("Email")}
                    label="Email"
                    data-testid="login-email"
                    maxlength={60}
                    label-placement="stacked"
                    placeholder="email@domain.com"
                    value={loginFormState.email}
                    errorText="Email ID should not have invalid characters"
                    onIonBlur={() => inputFieldStateMap["Email"][3](true)}
                    //onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                </IonItem>

                <IonItem >
                  <IonInput
                    type="password"
                    className={formInputClassName("Password")}
                    label="Password"
                    data-testid="login-password"
                    maxlength={20}
                    clearOnEdit={false}
                    label-placement="stacked"
                    value={loginFormState.password}
                    onIonBlur={() => inputFieldStateMap["Password"][3](true)}
                    errorText={errorLabels["password"]}
                    // onIonChange={(event) => validate(event)}
                    onIonInput={(event) => validate(event)}
                  ></IonInput>
                  {/* <IonNote>Password should be of </IonNote> */}
                </IonItem>
                {/* <IonItem className="signInButtonSpan"> */}
                <IonButton
                  expand="block"
                  className="signInButtonSpan"
                  data-testid="signin-button"
                  disabled={!(isEmailValid && isPasswordValid)}
                  onClick={async () => {
                    const siginRequest = {
                      "username": loginFormState.email,
                      "password": loginFormState.password,
                    };

                    await showLoading();
                    login(siginRequest).then((resp) => {
                      if (resp.response == "failed") {


                        // merge together all response error message for a toast message.
                        const msg = concatenateArraysAndJoin(resp.data);

                        errorToast({
                          message: msg,
                          duration: 1500,
                          position: "top",
                          color: "warning"
                        });

                      } else if (resp.response == "successful") {
                        const msg = "User logged in succesfully!";

                        messageToast({
                          message: msg,
                          duration: 1500,
                          position: "top",
                          color: "success"
                        });
                        // set the login token here.
                        props.setToken(resp.token);
                        //go to home page from here?
                      }
                    });
                    await hideLoading();



                  }}
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


        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Login;
