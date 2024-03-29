import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon,  useIonLoading,
  IonLabel, IonRouterOutlet, IonList, IonItem,IonTabs, IonTab, IonTabBar, IonTabButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import { search, personCircle, logOut, person } from 'ionicons/icons';
import { logout, concatenateArraysAndJoin } from '../helper/APIRequest';

// import {AddEditItemModal} from  './inventory/AddEditItemModal';

import './Home.css';
import AddInventoryItemPage from './AddInventoryItemPage';
import {addCircle} from 'ionicons/icons';
import AddEditItemModal from './inventory/AddEditItemModal';

let inventoryListItems = [
  {category:"Cereal",
  itemName:"Lucky Charms",
  quantity:1,
  units:"Count"},
  {category:"Fruit",
  itemName:"Apple",
  quantity:1,
  units:"Count"},
  {category:"Ice",
  itemName:"Ice",
  quantity:1,
  units:"lb"},
  {category:"Water",
  itemName:"Irish Spring Gallon Water",
  quantity:1,
  units:"Gallon"}
]

function InventoryItem(props:any){
  return  <IonItem>
            <IonLabel>
              {props.category + " "}
            </IonLabel>
            <IonLabel>
              {props.itemName + " "}
            </IonLabel>
            <IonLabel>
              {props.quantity + " "}
            </IonLabel>
            <IonLabel>
              {props.units}
            </IonLabel>
          </IonItem>;
}

function Inventory()
{  
      
  
    return(
      //{this.state.inventoryListItems.map((itemName, category, quantity,))}       
          <IonList>
          {inventoryListItems.map((item) => 
          <InventoryItem category={item.category}
            itemName={item.itemName}
            quantity={item.quantity}
            units={item.units}/>)}
          </IonList>
    );
  
}

function handleAddItemToList()
{
  
}

const InventoryPage = (props:any) => {
  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();
  
  return (<>
  <IonHeader>
    <IonRouterOutlet>
      <Route path="/addInventoryItem" render={()=> <AddInventoryItemPage />} exact={true}/>
    </IonRouterOutlet>
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
  <IonReactRouter>
        {/*<IonTabs>
          <IonRouterOutlet>              
                <Route path="/pantry" render={()=> <InventoryPage />} exact={true}/>              
                <Route path="/fridge" render={()=> <InventoryPage />} exact={true}/>  
            </IonRouterOutlet>
          <IonTabBar slot="top">
            <IonTabButton tab="pantry" href='/pantry'>          
                <IonLabel> Pantry </IonLabel>
            </IonTabButton>
            <IonTabButton tab="fridge" href='/fridge'>          
                <IonLabel> Fridge </IonLabel>
            </IonTabButton>
        </IonTabBar>
        </IonTabs>  */}    
      </IonReactRouter>
    <Inventory/>
    
    <IonButton id="open-modal">
      <IonIcon icon={addCircle} />      
    </IonButton>
    <AddEditItemModal action="add" listItems={inventoryListItems} token={props.token}/>
    
  </IonContent>
</>);
};

export default InventoryPage;