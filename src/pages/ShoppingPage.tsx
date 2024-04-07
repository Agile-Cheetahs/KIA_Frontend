import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const ShoppingPage = (props:any) => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Shopping</IonTitle>
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
        Shopping Content
      </div>
    </IonContent>
  </>
);

export default ShoppingPage;