import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon,  useIonLoading,
  IonLabel, IonRouterOutlet, IonList, IonItem,IonTabs, IonTab,IonPage, IonListHeader,  IonTabBar, IonTabButton, useIonModal } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import { search, personCircle, logOut, person } from 'ionicons/icons';
import { getInventory,logout, concatenateArraysAndJoin } from '../helper/APIRequest';
import {useState} from 'react';


import './InventoryPage.css';
import AddInventoryItemPage from './AddInventoryItemPage';
import {addCircle, trash, createOutline} from 'ionicons/icons';
import AddEditItemModal from './inventory/AddEditItemModal';
import AddEditTabsModal from './inventory/AddEditTabsModal';

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
    id: 17,
    category:"Grocery",
  name:"Lucky Charms",
  quantity:1,
  unit:"count",
  location: "Pantry"},
  {
    id: 13,
    category:"Grocery",
  name:"sugar",
  quantity:1,
  unit:"kg",
  location: "Pantry"},
  { id: 18,
    category:"Fruit",
  name:"Apple",
  quantity:1,
  unit:"count",
  location: "Cabinet"},
  {
    id: 15,
    category:"Grocery",
  name:"Ice",
  quantity:1,
  unit:"lb",
  location: "Cabinet"},
  {
    id: 16,
    category:"Grocery",
  name:"Irish Spring Gallon Water",
  quantity:1,
  unit:"g",
  location: "Cabinet"}
]

let kitchenTabs = ["Kitchen", "Cabinet", "Pantry" ];

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
            <IonButton id={"edit-item-" + props.id} className="edit-item" onClick={() => {

              //temporary
            }}>
              <IonIcon icon={createOutline}/>
            </IonButton>                   
            <IonButton onClick={()=>{props.setInventoryItems(props.inventoryItems.filter(
              (a:any)=>a.name !== props.itemName
            )

            )}}>
              <IonIcon icon={trash}/>
            </IonButton>
         
            <AddEditItemModal modalTriggerID={"edit-item-" + props.id} action="edit" actionConfirm={props.actionConfirm} editItem={props.item} token={props.token}
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
  const addItemToList = (action: string, item: InventoryItemModel) => {
    if (action == "add") {

      props.setInventoryItems((lst) => {
        return [...lst,
          item];
      })
    } else {

      props.setInventoryItems((lst) => {
        return lst.map(obj => item.id === obj.id ? item : obj);
      }

      )
    }

    // }).filter(
    //   (a:any)=>a.name !== props.itemName
    // )
  };

  let filteredItems = props.inventoryItems.filter((item) => item.location === props.location);
    return(
      //{this.state.inventoryListItems.map((itemName, category, quantity,))}
      // <IonPage>    
      //    <IonContent>  
          <IonList>
            <IonListHeader className={"inventory-item-headers"}>
            <IonLabel>
            <b>Category</b>
            </IonLabel>
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
          {filteredItems.map((item) => 
          <InventoryItemView 
            key={item.id} 
            token={props.token}
            category={item.category}
            itemName={item.name}
            quantity={item.quantity}
            unit={item.unit}
            id={item.id}
            item={item}
            inventoryItems = {props.inventoryItems}
            actionConfirm={addItemToList}
            setInventoryItems = {props.setInventoryItems}/>)}
          <IonItem className={"add-item-row"}>
          <IonButton size="default" expand={"block"} id={"AddInventoryItem"}>
            <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
          </IonButton> 
          <AddEditItemModal modalTriggerID={"AddInventoryItem"} actionConfirm={addItemToList} action="add" token={props.token}
            />
          </IonItem>
          </IonList>
          // </IonContent>  
          // </IonPage>
    );
  
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
  
  const getInventoryComponent = (location:any) => (<Inventory inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} token={props.token} location={location}/>);
  
  return (<IonPage>
  <IonHeader>

    <IonToolbar>
      <IonTitle>Inventory</IonTitle>
      <IonButtons slot="primary">
        <IonButton id="open-modal-tabs">          
           <IonIcon icon={createOutline}></IonIcon>
           <AddEditTabsModal value={kitchenTabs}></AddEditTabsModal>
        </IonButton>   
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
          {<Redirect exact path="/inventory" to="/Inventory/Kitchen"/>}
          {/*  render={()=> getInventoryComponent("kitchen")} */}
          <Route path="/Inventory/Kitchen"  render={()=> getInventoryComponent("kitchen")}  exact={true}/>              
                <Route path="/Inventory/Fridge" render={()=> getInventoryComponent("Cabinet")} exact={true}/>              
                <Route path="/Inventory/Pantry" render={()=> getInventoryComponent("Pantry")} exact={true}/>  
            </IonRouterOutlet>
          <IonTabBar slot="top">
          <IonTabButton tab="kitchen" href='/Inventory/Kitchen'>          
                <IonLabel> Kitchen </IonLabel>
            </IonTabButton>
            <IonTabButton tab="pantry" href='/Inventory/Pantry'>          
                <IonLabel> Pantry </IonLabel>
            </IonTabButton>
            <IonTabButton tab="fridge" href='/Inventory/Fridge'>          
                <IonLabel> Cabinet </IonLabel>
            </IonTabButton>                     
        </IonTabBar>        
        </IonTabs>  }    
      </IonReactRouter>
      
    {/*<Inventory token={props.token}/> */}
  </IonContent>
</IonPage>);
};

export default InventoryPage;