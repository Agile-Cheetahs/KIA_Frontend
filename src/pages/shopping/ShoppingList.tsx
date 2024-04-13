
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon,
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



  let { id } = useParams();

  const shoppinglist = shoppingLists.find((element) => Number(id) == element.id);

  const items = shoppinglist.itemList;
  const name = shoppinglist.name;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Back</IonTitle>
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
    </>
  );
};

export default ShoppingList;
