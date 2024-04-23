
import {
  IonContent, IonHeader, IonSelect, IonInput, IonSelectOption, IonToolbar, IonButton, IonPage, IonButtons, IonIcon,
  IonLabel, IonBackButton, IonCheckbox, IonList, IonItem, IonListHeader, IonFooter, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader,
  IonTitle, useIonToast, IonModal
} from '@ionic/react';

import {
  useHistory,
  useParams
} from "react-router-dom";

import React, { useState, useRef, useEffect } from 'react';
import { validateUnits, validateItemName, validateNumber } from '../../helper/Validation';

import { createOutline, addCircleOutline, logOut, person, trash } from 'ionicons/icons';
import { getInventory, fetchShoppingListItems, concatenateArraysAndJoin } from '../../helper/APIRequest';




const ShoppingList = (props) => {

  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();

  let shoppingLists = props.shoppingLists;
  let dispatch = props.dispatch;
  let id = props.id;
  let action = props.action || "add";
  const { showLoading: showLoading, hideLoading: hideLoading, token: token } = props

  const shoppinglist = shoppingLists.find((element) => Number(id) == element.id);




  const [items, setItems] = useState([]);

  useEffect(() => {
    //fetch inventory id and items if not found
    // TODO:

    // showL();
    // (async () => await showLoading())();
    fetchShoppingListItems({}, props.token, "GET", { id: id }).then((resp) => {
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

        dispatch({ id: id, items: resp.items, type: 'fetch-listitems' });
        setItems(resp.items.map((item) => ({ ...item, id: item.item_id })));

        //   messageToast({
        //     message: msg,
        //     duration: 1500,
        //     position: "top",
        //     color: "success"
        //   });
      }
      // (async () => await hideLoading())();

    })
      .catch((err) => {
        const msg = concatenateArraysAndJoin(err.data);

        errorToast({
          message: msg,
          duration: 1500,
          position: "top",
          color: "warning"
        });
        // (async () => await hideLoading())();

      });

  }, [props.id]);
  const name = shoppinglist.name;

  // Add shopping list item form.
  const [isItemNameValid, setIsItemNameValid] = useState<boolean>(false);
  const [isQuantityValid, setIsQuantityValid] = useState<boolean>(false);
  // below 3 fields will always have 1 value selected. date is optional, hence default validation is true.
  const [isUnitsValid, setIsUnitsValid] = useState<boolean>(true);


  const [isUserNameTouched, setIsUserNameTouched] = useState<boolean>(false);
  const [isQuantityTouched, setIsQuantityTouched] = useState<boolean>(false);
  const [isUnitsTouched, setIsUnitsTouched] = useState<boolean>(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const emptyItemState = {
    "name": "", // TODO: edit item payload used to populate these values
    "quantity": "",
    "units": "count",
    "crossed": false
  };
  let inputFieldStateMap = {
    //            0, `1, 2, 3
    "name": [isItemNameValid, setIsItemNameValid, isUserNameTouched, setIsUserNameTouched],
    "quantity": [isQuantityValid, setIsQuantityValid, isQuantityTouched, setIsQuantityTouched],
    "units": [isUnitsValid, setIsUnitsValid, isUnitsTouched, setIsUnitsTouched]
  }
  // add item state
  const [itemState, setItemState] = useState(emptyItemState);

  let validationMethodMap = {
    "name": validateItemName,
    "quantity": validateNumber,
    "units": validateUnits,
  }

  const formInputClassName = (fieldName: string) => {
    const validateField = inputFieldStateMap[fieldName][0];
    return `${validateField && 'ion-valid'} ${validateField === false && 'ion-invalid'} ${inputFieldStateMap[fieldName][2] && 'ion-touched'} ion-padding-start`
  }

  // generic method for all input event callbacks.
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    const fieldName = (ev.target as HTMLInputElement).id;

    // select the correct field
    const validateMethod = validationMethodMap[fieldName];
    const validateSetter = inputFieldStateMap[fieldName][1];
    //const fieldSetter = inputFieldNameMap[fieldName];



    // log statements
    console.log(fieldName);
    console.log(validateMethod);
    console.log(validateSetter);


    // if (value === '') return;
    // validate also includes checking for blank values
    console.log(action);
    if (validateMethod(value, action)) {
      validateSetter(true);

    }
    else { validateSetter(false); }
    setItemState((itemState) => { return { ...itemState, [fieldName]: value }; });

  };




  const clearForms = () => {

    //clear form input
    Object.values(inputFieldStateMap).forEach(validator => {
      validator[1](true);
    });
    setItemState(emptyItemState);
  }


  function confirm(action, item_id) {
    // TODO: construct add/edit API method payload
    const addShoppingItem = { ...itemState };



    const item = {
      //full name string split here
      "name": addShoppingItem.name,
      "quantity": addShoppingItem.quantity,
      "unit": addShoppingItem.units,
      "crossed": addShoppingItem.crossed
    };
    showLoading().then(() => fetchShoppingListItems(item, props.token, action == "add" ? "POST" : "PUT", { id: id, item_id: item_id })).then((resp) => {
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

        dispatch({ id: id, newItem: { ...resp, id: resp.item_id }, type: 'add-item' });

        // as the update doesn't reflect right away, navlink doesn't probably support it
        // manually update the item list here.
        if (action == "edit") {
          dispatch({ id: id, newItem: { ...resp, id: resp.item_id }, type: 'edit-item' });
          setItems((items) => items.map(item =>
            item.id === action.itemId ? action.newItem : item
          ));
        }
        else {
          dispatch({ id: id, newItem: { ...resp, id: resp.item_id }, type: 'add-item' });
          setItems((items) => [...items, { ...resp, id: resp.item_id }]);
        }


        messageToast({
          message: `Shopping item ${resp.name} added successfully!`,
          duration: 1500,
          position: "top",
          color: "success"
        });
      }
      // (async () => await hideLoading())();

    })
      .catch((err) => {
        const msg = concatenateArraysAndJoin(err.data);

        errorToast({
          message: msg,
          duration: 1500,
          position: "top",
          color: "warning"
        });

      }
      ).then(() => hideLoading());


  }

  const unitTypes = [{ id: 1, name: "count" },
  { id: 2, name: "lb" },
  { id: 3, name: "t" },
  { id: 4, name: "kg" },
  { id: 5, name: "oz" },
  { id: 6, name: "g" },
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopping"></IonBackButton>
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {/* <IonListHeader className={"shoppinglist-item-headers"}>
            <IonLabel>
              <b>Name</b>
            </IonLabel>
            <IonLabel>
              <b>Quantity</b>
            </IonLabel>
            <IonLabel>
              <b>Units</b>
            </IonLabel>
          </IonListHeader> */}
          {items.map((item) =>
            <IonItem key={item.id}>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{item.name + " "}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid class="ion-justify-content-between">
                    <IonRow class="ion-align-self-center">
                      <IonCol size="auto">{item.quantity + " "}</IonCol>
                      <IonCol >{item.unit} </IonCol>
                      <IonCol class="ion-align-items-end">
                        <IonButton id="open-modal" className="edit-item" onClick={() => {
                          
                          clearForms();
                          setItemState(item);
                          // setIsEditModalOpen(true);

                          //temporary
                        }}>
                          <IonIcon icon={createOutline} />
                        </IonButton>
                        <IonButton onClick={() => {

                          // setItems(items => items.filter(i =>
                          //   i.id !== item.id));
                          // API CALL for remove
                          showLoading().then(() => fetchShoppingListItems({}, props.token, "DELETE", { id: id, item_id: item.id })).then((resp) => {
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

                              setItems((items) => [ ...items.filter(i =>
                                item.id !== i.id)]);
                              dispatch({ type: 'remove-item', itemId: item.id, id: id });
                              messageToast({
                                message: `Item ${item.name} has been removed successfully`,
                                duration: 1500,
                                position: "top",
                                color: "success"
                              });
                            }


                          })
                            .catch((err) => {
                              const msg = concatenateArraysAndJoin(err.data);

                              errorToast({
                                message: msg,
                                duration: 1500,
                                position: "top",
                                color: "warning"
                              });

                            }
                            ).then(() => hideLoading());

                        }}>
                          <IonIcon icon={trash} />
                        </IonButton>
                        <IonModal ref={modal} trigger="open-modal"  onDidDismiss={(ev)=> {}}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Edit Shopping list item</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  disabled={!(isItemNameValid && isQuantityValid &&
                    isUnitsValid)}
                  onClick={() => {
                    confirm('edit', itemState.id);
                    clearForms();
                    modal.current?.dismiss();
                  }}>Confirm</IonButton>
              </IonButtons>
        
              <IonButtons slot="end">
                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem >
              <IonInput
                type="text"
                className={formInputClassName("name")}
                label="Name"
                id="name"
                maxlength={40}
                label-placement="stacked"
                placeholder="Shopping list item"
                value={itemState.name}
                onIonBlur={() => inputFieldStateMap["name"][3](true)}
                onIonInput={(event) => validate(event)}
              ></IonInput>


              <IonInput
                type="number"
                className={formInputClassName("quantity")}
                label="Quantity"
                id="quantity"
                label-placement="stacked"
                step="1"
                min="1"
                value={itemState.quantity}
                errorText="Only positive numbers allowed"
                onIonBlur={() => inputFieldStateMap["quantity"][3](true)}
                onIonInput={(event) => validate(event)}
              ></IonInput>

              <IonSelect
                aria-label="Units"
                label="Units"
                id="units"
                interface="popover"
                className={formInputClassName("units")}
                value={itemState.units}
                onIonChange={(event) => { setItemState((state) => { return { ...itemState, units: state }; }); validate(event); }}
                onIonBlur={() => inputFieldStateMap["units"][3](true)}
                onIonCancel={() => console.log('ionCancel fired')}
                onIonDismiss={() => console.log('ionDismiss fired')}
                placeholder="Select units">
                {/*  TODO: hook up the units list here  */}
                {unitTypes.map((unit: object) => (
                  <IonSelectOption key={unit.id} value={unit.name}>
                    {unit.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonContent>
        </IonModal>
                        <IonCheckbox justify="end"></IonCheckbox>


                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  {/* <IonLabel>

                  </IonLabel> */}
                </IonCardContent>

              </IonCard>
              {/* <IonLabel>
                
              </IonLabel> */}
              {/* <IonLabel>
                {item.quantity + " "}
              </IonLabel>
              <IonLabel>
                {item.unit}
              </IonLabel> */}

            </IonItem>)}
        </IonList>
        
      </IonContent>
      <IonFooter collapse="fade">
        <IonToolbar>
          <IonItem >
            <IonInput
              type="text"
              className={formInputClassName("name")}
              label="Name"
              id="name"
              maxlength={40}
              label-placement="stacked"
              placeholder="Shopping list item"
              value={itemState.name}
              onIonBlur={() => inputFieldStateMap["name"][3](true)}
              onIonInput={(event) => validate(event)}
            ></IonInput>


            <IonInput
              type="number"
              className={formInputClassName("quantity")}
              label="Quantity"
              id="quantity"
              label-placement="stacked"
              step="1"
              min="1"
              value={itemState.quantity}
              errorText="Only positive numbers allowed"
              onIonBlur={() => inputFieldStateMap["quantity"][3](true)}
              onIonInput={(event) => validate(event)}
            ></IonInput>

            <IonSelect
              aria-label="Units"
              label="Units"
              id="units"
              interface="popover"
              className={formInputClassName("units")}
              value={itemState.units}
              onIonChange={(event) => { setItemState((state) => { return { ...itemState, units: state }; }); validate(event); }}
              onIonBlur={() => inputFieldStateMap["units"][3](true)}
              onIonCancel={() => console.log('ionCancel fired')}
              onIonDismiss={() => console.log('ionDismiss fired')}
              placeholder="Select units">
              {/*  TODO: hook up the units list here  */}
              {unitTypes.map((unit: object) => (
                <IonSelectOption key={unit.id} value={unit.name}>
                  {unit.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              disabled={!(isItemNameValid && isQuantityValid &&
                isUnitsValid)}
              onClick={() => {
                confirm('add',"");
                clearForms();
              }}>
              <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ShoppingList;
