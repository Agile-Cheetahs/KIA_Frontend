
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonPage, IonButtons, IonIcon,
  IonLabel, IonBackButton, IonList, IonItem, IonListHeader
} from '@ionic/react';

import {
  useHistory,
  useParams
} from "react-router-dom";

import { createOutline, personCircle, logOut, person, trash } from 'ionicons/icons';
import { getInventory, logout, concatenateArraysAndJoin } from '../../helper/APIRequest';



const ShoppingList = (props) => {

  let shoppingLists = props.shoppingLists;
  let dispatch = props.dispatch;
  let id = props.id;

  const shoppinglist = shoppingLists.find((element) => Number(id) == element.id);

  const items = shoppinglist.itemList;
  const name = shoppinglist.name;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopping"></IonBackButton>
          </IonButtons>
          
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonListHeader className={"shoppinglist-item-headers"}>
            <IonLabel>
              <b>Name</b>
            </IonLabel>
            <IonLabel>
              <b>Quantity</b>
            </IonLabel>
            <IonLabel>
              <b>Units</b>
            </IonLabel>
          </IonListHeader>
          {items.map((item) =>
            <IonItem>
              {/* <IonLabel>
           {item.category + " "}
         </IonLabel> */}
              <IonLabel>
                {item.name + " "}
              </IonLabel>
              <IonLabel>
                {item.quantity + " "}
              </IonLabel>
              <IonLabel>
                {item.units}
              </IonLabel>
              <IonButton id={"edit-item-" + item.id} className="edit-item" onClick={() => {

                //temporary
              }}>
                <IonIcon icon={createOutline} />
              </IonButton>
              <IonButton onClick={() => {
                props.setInventoryItems(props.inventoryItems.filter(
                  (a: any) => a.name !== props.itemName
                )

                )
              }}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ShoppingList;
