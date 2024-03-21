import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel,
    IonButton, IonItem, IonInput, IonRouterOutlet } from '@ionic/react';
import './Home.css';
import InventoryPage from './InventoryPage';

import { Route } from 'react-router';

//Typescript interface 
interface InputFieldMap {
    "Name": string | any[],    
  }

const AddInventoryItemPage = () => (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Product</IonTitle>
        </IonToolbar>
        <IonRouterOutlet>
            <Route path="/inventory" render={()=> <InventoryPage />} exact={true}/>
        </IonRouterOutlet>
      </IonHeader>
      <IonContent>
        <IonItem>
            <IonInput placeholder="Name"></IonInput>
        </IonItem>
        <IonButton href='/inventory'>
            <IonLabel>Add </IonLabel>
        </IonButton>
        
      </IonContent>
    </>
  );

  export default AddInventoryItemPage;