import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const RecipesPage = () => (
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