import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon,  useIonLoading,
  IonLabel, IonRouterOutlet, IonList, IonItem,IonTabs, IonTab,IonPage, IonListHeader,  IonTabBar, IonTabButton, useIonModal } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import { search, personCircle, logOut, person } from 'ionicons/icons';
import { getInventory,logout, concatenateArraysAndJoin, addEditItems } from '../helper/APIRequest';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


import './InventoryPage.css';
import {addCircle, trash, createOutline} from 'ionicons/icons';
import { addInventoryLocation} from '../helper/APIRequest';
import AddEditItemModal from './inventory/AddEditItemModal';
import AddEditTabsModal from './inventory/AddEditTabsModal';1

export interface InventoryItemModel{
  category:string;
  name:string;
  quantity:number;
  units:string;  
  location:string;
  id?:any;
  expiration_date?:string;
}


const  inventoryListReducer = (lists, action) => {
  switch (action.type) {
    case 'add-item': {
      // const addEditRequest: InventoryItemModel = {
      //   //full name string split here
      //   "name": addEditObject.itemName,
      //   "quantity": addEditObject.quantity,
      //   "unit": addEditObject.units,
      //   "location": addEditObject.locationTab,
      //   "category": addEditObject.category
      // };
  
      // if (action == EDIT) {
      //  
      //   addEditRequest.id = editItem.id;
      // }
  
      // if (addEditObject.expirationDate) {
      //   addEditRequest.expiration_date = addEditObject.expirationDate;
      // }
      return [...lists, {
        id: action.id,
        name: action.name,
        starred: action.starred,
        isComplete: action.isComplete,
        itemList: []
      }]

      return lists.map(t =>
        t.id === action.id ? { ...t, itemList: [...t.itemList,action.newItem] } : t
      );
    }
    case 'edit-item': {
      return lists.map(t =>
        t.id === action.id ? { ...t, itemList: t.itemList.map(item =>
          item.id === action.itemId ? action.newItem : item
        ) } : t
      );
    }
    case 'remove-item': {
      return lists.map(t =>
        t.id === action.id ? { ...t, itemList: t.itemList.filter(item =>
          item.id !== action.itemId) } : t
      );
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
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
];
let kitchenTabs:any = [];



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
              {props.units}
            </IonLabel>
            <IonButton id={"edit-item-" + props.id} className="edit-item" onClick={() => {

              //temporary
            }}>
              <IonIcon icon={createOutline}/>
            </IonButton>                   
            <IonButton onClick={()=>{
             props.setInventoryItems(props.inventoryItems.filter(
              (a:any)=>a.name !== props.itemName));
              props.showLoading();
              addEditItems({id: props.id }, props.token, "remove").then((resp) => {
                if (resp.response == "failed") {
                  const msg = concatenateArraysAndJoin(resp.data);
          
                  props.errorToast({
                    message: msg,
                    duration: 1500,
                    position: "top",
                    color: "warning"
                  });
          
          
                } else if (resp.response == "successful") {
          
                  props.messageToast({
                    message: `User removed item succesfully!`,
                    duration: 1500,
                    position: "top",
                    color: "success"
                  });
                  // props.actionConfirm(action, addEditRequest);
          
                }
          
                props.hideLoading();
              });
            
            }}>
              <IonIcon icon={trash}/>
            </IonButton>
         
            <AddEditItemModal modalTriggerID={"edit-item-" + props.id} action="edit" actionConfirm={props.actionConfirm} editItem={props.item} token={props.token}
            showLoading={props.showLoading} hideLoading={props.hideLoading}
            />
          </IonItem>;
}

function Inventory(props:any)
{  
  const addEditItemToList = (action: string, item: InventoryItemModel) => {
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
  };

  let filteredItems = props.inventoryItems.filter((item) => item.location === props.location);
    return(
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
            units={item.units}
            id={item.id}
            item={item}
            errorToast={props.errorToast} messageToast={props.messageToast}
            inventoryItems = {props.inventoryItems}
            actionConfirm={addEditItemToList}
            setInventoryItems = {props.setInventoryItems}
            {...props}
            />)}
          <IonItem className={"add-item-row"}>
          <IonButton size="default" expand={"block"} id={"AddInventoryItem"}>
            <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
          </IonButton> 
          <AddEditItemModal modalTriggerID={"AddInventoryItem"} actionConfirm={addEditItemToList} action="add" {...props}
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
  const {showLoading: showLoading, hideLoading: hideLoading, token: token} = props
  const [inventoryId, setInventoryId] = useState(0);
  const [inventoryItems, setInventoryItems ] = useState([]);

  useEffect(()=> {
    //fetch inventory id and items if not found
    // TODO:
    const showL = async () => {
      await showLoading();
    }
    
    
    // showL();
    getInventory({token: props.token}).then((resp) => {
      if (resp.response == "failed") {


        // merge together all response error message for a toast message.
        const msg = concatenateArraysAndJoin(resp.data);

        errorToast({
          message: resp.detail,
          duration: 1500,
          position: "top",
          color: "warning"
        });

      }
      
      
       else if (resp.response == "successful") {
        setInventoryId(resp[0]['inventory_id']);
        const recItems = resp[0]['items'].map((item) => ({...item, id: item.item_id}));
        setInventoryItems(recItems);

      //   messageToast({
      //     message: msg,
      //     duration: 1500,
      //     position: "top",
      //     color: "success"
      //   });
       }
      //  hideLoading();

    });
    // .catch((err) => {
    //   const msg = concatenateArraysAndJoin(err.data);

    //   errorToast({
    //     message: msg,
    //     duration: 1500,
    //     position: "top",
    //     color: "warning"
    //   });

    // });

  }, [token])

  
   
  
  const getInventoryComponent = (location) => (<Inventory errorToast={errorToast} messageToast={messageToast} inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} {...props} location={location}/>);
  
  return (<IonPage>
  <IonHeader>      
    <IonToolbar>
      <IonTitle>Inventory</IonTitle>
      <IonButtons slot="primary">
       { <IonButton id="open-modal-tabs">          
           <IonIcon icon={createOutline}></IonIcon>
           <AddEditTabsModal value={kitchenTabs}></AddEditTabsModal>
          </IonButton>    }
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
              //props.history.push('/');
            }
            
          });
          
        }} >
          <IonIcon slot="icon-only" icon={logOut}></IonIcon>
        </IonButton>

      </IonButtons>

    </IonToolbar>
    
  </IonHeader>
  <IonContent>  


  <IonReactRouter>
        {<IonTabs>
          <IonRouterOutlet>         
 
          <Route path="kitchen"  render={()=> getInventoryComponent("kitchen")}  exact={true}/>              
                <Route path="Fridge" render={()=> getInventoryComponent("Cabinet")} exact={true}/>              
                <Route path="Pantry" render={()=> getInventoryComponent("Pantry")} exact={true}/>  
            </IonRouterOutlet>
          <IonTabBar slot="top">
          <IonTabButton tab="kitchen" href='kitchen'>          
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