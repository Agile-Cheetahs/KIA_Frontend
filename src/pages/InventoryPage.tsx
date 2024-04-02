import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon,  useIonLoading,
  IonLabel, IonRouterOutlet, IonList, IonItem,IonTabs, IonTab, IonTabBar, IonTabButton, useIonModal } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import { search, personCircle, logOut, person } from 'ionicons/icons';
import { getInventory,logout, concatenateArraysAndJoin } from '../helper/APIRequest';
import {useState} from 'react';


import './InventoryPage.css';
import AddInventoryItemPage from './AddInventoryItemPage';
import {addCircle, trash, createOutline} from 'ionicons/icons';
import AddEditItemModal from './inventory/AddEditItemModal';

export interface InventoryItemModel{
  category:string;
  name:string;
  quantity:number;
  unit:string;  
  location:string;
  id?:any;
  expiration_date?:string;
}

let inventoryListItems = [
  {
    id: 1,
    category:"Cereal",
  name:"Lucky Charms",
  quantity:1,
  unit:"count",
  location: "Pantry"},
  { id: 2,
    category:"Fruit",
  name:"Apple",
  quantity:1,
  unit:"count",
  location: "Fridge"},
  {
    id: 3,
    category:"Ice",
  name:"Ice",
  quantity:1,
  unit:"lb",
  location: "Fridge"},
  {
    id: 4,
    category:"Water",
  name:"Irish Spring Gallon Water",
  quantity:1,
  unit:"g",
  location: "Fridge"}
]

let kitchenTabs = ["Kitchen", "Fridge", "Pantry" ];

function InventoryItemView(props:any){
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
              {props.unit}
            </IonLabel>
            <IonButton id={"edit-item-" + props.id} className="">
              <IonIcon icon={createOutline}/>
            </IonButton>                   
            <IonButton onClick={()=>{props.setInventoryItems(props.inventoryItems.filter(
              (a:any)=>a.name !== props.itemName
            )

            )}}>
              <IonIcon icon={trash}/>
            </IonButton>
         
            <AddEditItemModal modalTriggerID={"edit-item-" + props.id} action="edit" editItem={props.item} token={props.token}
            />
            {/* listItems={{itemName:props.name, quantity:props.quantity}} */}
          </IonItem>;
}

function Inventory(props:any)
{  
  let inventoryData = getInventory({token:props.token}).then((resp) => {
    if (resp.response == "failed") {
      const msg = concatenateArraysAndJoin(resp.data);      

    } else if (resp.response == "successful") {
      
      /*listItems.push( {category:"Cereal",
      itemName:"Trix",
      quantity:1,
      units:"Count"});
      modal.current?.dismiss();*/
    }
  });
 
  let filteredItems = props.inventoryItems.filter((item) => item.location === props.location);
    return(
      //{this.state.inventoryListItems.map((itemName, category, quantity,))}       
          <IonList>
          {filteredItems.map((item, index) => 
          <InventoryItemView key={item.id} 
            category={item.category}
            itemName={item.name}
            quantity={item.quantity}
            unit={item.unit}
            id={item.id}
            item={item}
            inventoryItems = {props.inventoryItems}
            setInventoryItems = {props.setInventoryItems}/>)}
          <IonItem className={"add-item-row"}>
          <IonButton size="default" expand={"block"} id={"AddInventoryItem"}>
            <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
          </IonButton> 
          <AddEditItemModal modalTriggerID={"AddInventoryItem"} action="add" token={props.token}
            />
          </IonItem>
          </IonList>
           

    );
  
}

/**
 * Adds item to inventory list.  
 * @param item 
 */
export function addItemToList(item:InventoryItemModel)
{
  inventoryListItems.push(item);
}

/**
 * Removes the item from the inventory.  
 * @param item 
 */
function removeItemFromList(index:number)
{
   //let index:number = inventoryListItems.findIndex((element) => element == item);
   inventoryListItems.splice(index,index + 1);

}

const InventoryPage = (props:any) => {
  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();

  const [inventoryItems, setInventoryItems ] = useState(inventoryListItems); 
  
  const getInventoryComponent = (location) => (<Inventory inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} token={props.token} location={location}/>);
  
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
       {/* <IonButton>
          <IonIcon icon={createOutline}/>
        </IonButton>   */}
    </IonToolbar>
    
  </IonHeader>
  <IonContent>  
  {/*<IonButton>
    <IonLabel>Edit Tab</IonLabel>
    <IonIcon icon={createOutline}/>
        </IonButton>  */}

  <IonReactRouter>
        {<IonTabs>
          <IonRouterOutlet>         
          {/*<Redirect exact path="iKitchen" to="/inventory"/>*/}
          <Route path="iKitchen" render={()=> getInventoryComponent("kitchen")} exact={true}/>              
                <Route path="Fridge" render={()=> getInventoryComponent("Fridge")} exact={true}/>              
                <Route path="Pantry" render={()=> getInventoryComponent("Pantry")} exact={true}/>  
            </IonRouterOutlet>
          <IonTabBar slot="top">
          <IonTabButton tab="kitchen" href='iKitchen'>          
                <IonLabel> Kitchen </IonLabel>
            </IonTabButton>
            <IonTabButton tab="pantry" href='Pantry'>          
                <IonLabel> Pantry </IonLabel>
            </IonTabButton>
            <IonTabButton tab="fridge" href='Fridge'>          
                <IonLabel> Fridge </IonLabel>
            </IonTabButton>            
        </IonTabBar>        
        </IonTabs>  }    
      </IonReactRouter>
    {/*<Inventory token={props.token}/> */}
  </IonContent>
</>);
};

export default InventoryPage;