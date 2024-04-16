import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonButton,
  IonInput,
  IonList,
  IonRouterLink,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonRouterOutlet
} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import './Home.css';
import KitchenPage from './KitchenPage';
import InventoryPage from './InventoryPage';




const Home: React.FC = () => {



  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kitchen App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              KitchenPage
            </IonTitle>
          </IonToolbar>
        </IonHeader>         
        <IonInput placeholder="User Name"></IonInput>
        
        <IonButton href="/kitchen">Login</IonButton>
        
        
        
      </IonContent>
    </IonPage>
  );
};



export default Home;
