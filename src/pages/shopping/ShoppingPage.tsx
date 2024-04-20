import React from 'react';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, useIonToast, IonButtons, IonIcon, IonNavLink,
  IonLabel, IonFooter, IonList, IonItem, IonItemOptions, IonItemSliding, IonItemOption, IonPage
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
  unit: string;
  id?:  number;
  crossed?: boolean,
  isComplete? : boolean
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
        unit: "lb",
        id: 1,
        crossed: false},
        {  
          name: "Cereal",
          quantity: 1,
          unit: "count",
          id:2,
          crossed: false},

          {  
            name: "apple",
            quantity: 2,
            unit: "count",
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
      unit: "oz",
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
      // let newitem: ActionModel = {
      //   type: 'add-item',
      //   id: 11,
      //   itemId: false,
      //   newItem: {},
      //   itemList: []
      // }

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
    case 'cross-item': {
      return lists;
    }
    case 'edit': {
      return lists;
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

  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();

  let shoppingLists = props.shoppingLists;
  let dispatch = props.dispatch;
  return (
    //{this.state.shoppingListItems.map((itemName, category, quantity,))}
    // <IonPage>    
    //    <IonContent>  
    <IonList>

      {shoppingLists.map((item) =>
        <IonItemSliding key={item.id}>
              <IonNavLink routerDirection="forward" componentProps={
        {id: item.id, history:history, shoppingLists:shoppingLists, dispatch:dispatch, token:props.token, setToken:props.setToken}
      } component={(props) =>  <ShoppingList {...props}/>  }>
          <IonItem key={item.id}>
            <IonLabel>
              {item.name}
            </IonLabel>
          </IonItem>
          </IonNavLink>
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
        {/* TODO: need to fix the ID below after new row is added */}
      {/* <IonNavLink routerDirection="forward"  componentProps={
        {id: "",history:history, shoppingLists:shoppingLists, dispatch:dispatch, token:props.token, setToken:props.setToken}
      } component={(props) =>  <ShoppingList {...props}/>  }> */}
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
          // props.history.push(`/shoppinglist/${newitem.id}`);

        }}>
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        </IonButton>
      {/* </IonNavLink> */}

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

  let history = props.history;



  return (<IonPage>
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
    <ShoppingPageMain shoppingLists={lists} dispatch={dispatch} token={props.token} setToken={props.setToken}></ShoppingPageMain>
      {/* <IonReactRouter>
        {
          <IonRouterOutlet>
            <Route path="/shoppinglist/:id" exact={true}>
              <ShoppingList history={history} shoppingLists={lists} dispatch={dispatch} token={props.token} setToken={props.setToken}/>
            </Route> */}
            {/* <Route path="/shopping" exact={true}>
            
            </Route>
          </IonRouterOutlet>
        }
      </IonReactRouter> */}
      {/*<Inventory token={props.token}/> */}
    </IonContent>
    </IonPage>);
};

export default ShoppingPage;