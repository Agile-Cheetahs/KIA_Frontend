import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon , useIonLoading} from '@ionic/react';
import { search, personCircle, logOut, person } from 'ionicons/icons';
import { logout, concatenateArraysAndJoin } from '../helper/APIRequest';

import './Home.css';

const InventoryPage = (props) => {
  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();

  
  return (<>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Inventory</IonTitle>
      <IonButtons slot="primary">
        <IonButton onClick={() => {
          //log out 
          logout({ token: props.token }).then((resp) => {
            if (resp.response == "failed") {
              const msg = concatenateArraysAndJoin(resp.data);

              errorToast({
                message: msg,
                duration: 1500,
                position: "top",
                color: "warning"
              });


            } else if (resp.response == "successful") {
              const msg = "User logged out succesfully!";

              messageToast({
                message: msg,
                duration: 1500,
                position: "top",
                color: "success"
              });
              // set the login token here.
              props.setToken('');
              props.history.push('/');
            }
            
          });

          
        }} >
          <IonIcon slot="icon-only" icon={logOut}></IonIcon>
        </IonButton>
        {/* <IonButton>
            <IonIcon slot="icon-only" icon={person}></IonIcon>
          </IonButton> */}
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      Inventory Content
    </div>
  </IonContent>
</>);
};

export default InventoryPage;