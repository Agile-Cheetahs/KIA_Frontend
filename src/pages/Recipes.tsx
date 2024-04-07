import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const RecipesPage = (props:any) => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Recipes</IonTitle>
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
        Recipe Content
      </div>
    </IonContent>
  </>
);

export default RecipesPage;