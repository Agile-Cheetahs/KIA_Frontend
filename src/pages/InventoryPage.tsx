import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const InventoryPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Inventory</IonTitle>
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
  </>
);

export default InventoryPage;