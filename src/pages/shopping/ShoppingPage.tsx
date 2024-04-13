import React from 'react';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon, useIonLoading,
  IonLabel, IonRouterOutlet, IonList, IonItem, IonItemOptions, IonItemSliding, IonItemOption
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  useHistory
} from "react-router-dom";
import { Route, Redirect } from 'react-router';

import { getInventory, logout, concatenateArraysAndJoin } from '../../helper/APIRequest';
import { useState, useReducer } from 'react';


import './ShoppingPage.css';
import { addCircle, trash, createOutline, search, personCircle, logOut, star, starSharp } from 'ionicons/icons';
import ShoppingList from './ShoppingList';

// export interface ShoppingListModel{
//   category:string;
//   name:string;
//   quantity:number;
//   unit:string;  
//   location:string;
//   id?:any;
//   expiration_date?:string;
// }

export interface ShoppingListItemModel {
  name: string;
  quantity: number;
  units: string;
  id?:  number;
  crossed?: boolean
}

export interface ShoppingListModel {
  name: string;
  starred: boolean;
  isComplete: boolean;
  id?: string | number;
  itemList?: ShoppingListItemModel[]
}


export interface ActionModel extends ShoppingListModel {
  type: string;
}

// ttypescript declarations end here

// fixed item list for now
let fixedShoppingListItems: ShoppingListModel[] = [
  {
    id: 1,
    name: "Frys List",
    starred: false,
    isComplete: false,
    itemList: [
      {  
        name: "Lettuce",
        quantity: 2,
        units: "lb",
        id: 1,
        crossed: false},
        {  
          name: "Cereal",
          quantity: 1,
          units: "count",
          id:2,
          crossed: false},

          {  
            name: "apple",
            quantity: 2,
            units: "count",
            id: 3,
            crossed: false}
    ]
  },
  {
    id: 2,
    name: "Safeway List",
    starred: false,
    isComplete: false,
    itemList: [ {  
      name: "milk",
      quantity: 2,
      units: "oz",
      id: 4,
      crossed: false}]
  },
  {
    id: 3,
    name: "Running list",
    starred: false,
    isComplete: false,
    itemList: []
  }
]

function shoppingListReducer(lists, action) {
  switch (action.type) {
    case 'create': {
      return [...lists, {
        id: action.id,
        name: action.name,
        starred: action.starred,
        isComplete: action.isComplete,
        itemList: []
      }];
    }
    case 'remove': {
      return lists.filter(t => {
        return t.id !== action.id;
      });
    }
 
    case 'favorite': {
      return lists.map(t =>
        t.id === action.id ? { ...t, starred: action.starred } : t
      )
    }
    case 'add-item': {
      return lists;
    }
    case 'edit-item': {
      return lists;
    }
    case 'cross-item': {
      return lists;
    }
    case 'edit': {

    }
    case 'reset': {
      return lists;
    }
    case 'unload': {
      return lists;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}



// view shopping list in page
function ShoppingPageMain(props: any) {

  let shoppingLists = props.shoppingLists;
  let dispatch = props.dispatch;
  return (
    //{this.state.shoppingListItems.map((itemName, category, quantity,))}
    // <IonPage>    
    //    <IonContent>  
    <IonList>

      {shoppingLists.map((item) =>
        <IonItemSliding>

          <IonItem routerLink={`/shoppinglist/${item.id}`}>
            <IonLabel>
              {item.name}
            </IonLabel>


          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption>

              <IonIcon slot="icon-only" icon={starSharp} id={"star-shoppinglist-" + item.id} className="star-item" onClick={() => {
                //Add API call
                dispatch({ type: 'favorite', id: item.id, starred: !item.starred });
              }} />


            </IonItemOption>
            <IonItemOption color="danger">
              {/* <IonButton > */}
              <IonIcon slot="icon-only" icon={trash} id={"remove-shoppinglist-" + item.id} onClick={() => {

                dispatch({ type: 'remove', id: item.id });
              }} />
              {/* </IonButton> */}
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      )}
      <IonItem className={"add-shopping-row"}>
        <IonButton size="default" expand={"block"} id={"addShopping"} onClick={() => {
          //open shopping list add
          // Add API call here
          let newitem: ActionModel = {
            type: 'create',
            id: 11,
            name: "",
            starred: false,
            isComplete: false,
            itemList: []
          }
          dispatch(newitem);
          props.history.push(`/shoppinglist/${newitem.id}`);

        }}>
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        </IonButton>

      </IonItem>

    </IonList>
    // </IonContent>  
    // </IonPage>
  );

}



const ShoppingPage = (props: any) => {
  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();

  //const [shoppingListItems, setshoppingListItems ] = useState(fixedShoppingListItems); 

  const [lists, dispatch] = useReducer(
    shoppingListReducer,
    fixedShoppingListItems
  );

  let history = useHistory();



  return (<>
    <IonHeader>

      <IonToolbar>
        <IonTitle>Shopping Lists</IonTitle>
        <IonButtons slot="primary">
          <IonButton onClick={() => {
            //TODO: refactor this commondlog out 
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
                history.push('/');
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
        {
          <IonRouterOutlet>
            <Route path="/shoppinglist/:id" exact={true}>
              <ShoppingList history={history} shoppingLists={lists} dispatch={dispatch} token={props.token} setToken={props.setToken}/>
            </Route>
            <Route path="/shopping" exact={true}>
              <ShoppingPageMain shoppingLists={lists} dispatch={dispatch} token={props.token} setToken={props.setToken}></ShoppingPageMain>
            </Route>
          </IonRouterOutlet>
        }
      </IonReactRouter>
      {/*<Inventory token={props.token}/> */}
    </IonContent>
  </>);
};

export default ShoppingPage;