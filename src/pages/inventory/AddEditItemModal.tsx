import React, { useState, useRef } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonItem,
  IonInput,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import './AddEditItemModal.scss';
import { validateQuantity, validateUnits, validateUsername, validateItemName, validateNumber, validateEmpty, validateLocationTab } from '../../helper/Validation';

// COMMON CONSTANTS/ maps
const ADD = "add";
const EDIT = "edit";

let validationMethodMap = {
  "itemName": validateItemName,
  "quantity": validateNumber,
  "units": validateEmpty,
  "locationTab": validateEmpty,
  "category": validateEmpty,
  "expirationDate": validateEmpty
}



const AddEditItemModal = (props) => {

  // props.item, props.token, props.action = "add" or "edit"
  // For dropdown inputs -> props.locationtablist, props.categorylist, props.unittypes.
  // TODO - following should be in the parent page
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const action = props.action;
  const editItem = action == EDIT ? props.editItem : '';

  // accept no selection also
  const locationTabList = [{ id: 1, name: "kitchen" },
  { id: 2, name: "freezer" }]// props.locationTabList;
  const categoryList = [{ id: 1, name: "milk" },
  { id: 2, name: "bananas" },
  { id: 3, name: "cereal" }]//props.categoryList;
  const unitTypes = [{ id: 1, name: "count" },
  { id: 2, name: "lb" },
  { id: 3, name: "oz" }]
  //props.unitTypes;

  const [isItemNameValid, setIsItemNameValid] = useState<boolean>(false);
  const [isQuantityValid, setIsQuantityValid] = useState<boolean>(false);
  const [isUnitsValid, setIsUnitsValid] = useState<boolean>(false);
  const [isLocationTabValid, setIsLocationTabValid] = useState<boolean>(false);
  const [isCategoryValid, setIsCategoryValid] = useState<boolean>(false);
  const [isExpirationDateValid, setIsExpirationDateValid] = useState<boolean>(false);


  const [isUserNameTouched, setIsUserNameTouched] = useState<boolean>(false);
  const [isQuantityTouched, setIsQuantityTouched] = useState<boolean>(false);
  const [isUnitsTouched, setIsUnitsTouched] = useState<boolean>(false);
  const [isLocationTabTouched, setLocationTabTouched] = useState<boolean>(false);
  const [isCategoryTouched, setIsCategoryTouched] = useState<boolean>(false);
  const [isExpirationDateTouched, setExpirationDateTouched] = useState<boolean>(false);

  const emptyItemState = {
    "itemName": action == EDIT ? "" : "", // TODO: edit item payload used to populate these values
    "quantity": action == EDIT ? "" : "",
    "units": action == EDIT ? "" : "",
    "locationTab": action == EDIT ? "" : "",
    "category": action == EDIT ? "" : "",
    "expirationDate": action == EDIT ? "" : ""
  };
  const [itemState, setItemState] = useState(emptyItemState);


  // INput specific maps with each field - makes it easy for generic methods to set these
  // is it neede
  let inputFieldStateMap = {
    "itemName": [isItemNameValid, setIsItemNameValid, isUserNameTouched, setIsUserNameTouched],
    "quantity": [isQuantityValid, setIsQuantityValid, isQuantityTouched, setIsQuantityTouched],
    "units": [isUnitsValid, setIsUnitsValid, isUnitsTouched, setIsUnitsTouched],
    "locationTab": [isLocationTabValid, setIsLocationTabValid, isLocationTabTouched, setLocationTabTouched],
    "category": [isCategoryValid, setIsCategoryValid, isCategoryTouched, setIsCategoryTouched],
    "expirationDate": [isExpirationDateValid, setIsExpirationDateValid, isExpirationDateTouched, setExpirationDateTouched]
  }

  // JUST use THE fieldname directly...
  // let inputFieldNameMap: InputFieldMap = {
  //   "Name": validateEmpty,
  //   "Quantity": validateEmpty,
  //   "Units": validateEmpty,
  //   "LocationTab": validateEmpty,
  //   "Category": validateEmpty,
  //   "ExpirationDate": validateEmpty
  // }
  const formInputClassName = (fieldName: string) => {
    const validateField = inputFieldStateMap[fieldName][0];
    return `${validateField && 'ion-valid'} ${validateField === false && 'ion-invalid'} ${inputFieldStateMap[fieldName][2] && 'ion-touched'}`
  }

  // generic method for all input event callbacks.
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    const fieldName = (ev.target as HTMLInputElement).label;

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
    if (validateMethod(value)) {
      validateSetter(true);

    }
    else { validateSetter(false); }
    setItemState((itemState) => { return { ...itemState, [fieldName]: value }; });

  };



  const clearForms = () => {

    //clear form input
    Object.values(inputFieldStateMap).forEach(validator => {
      validator[1]('');
    });
    setItemState(emptyItemState);
  }


  function confirm() {
    // TODO: construct add/edit API method payload
    const addEditObject = { ...itemState, action: action };

    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      //setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  // const compareSelectItems = (l1 : object, l2 : object) => {
  //   return l1 && l2 ? l1.id === l2.id : l1 === l2;
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{`${action == ADD ? "Add " : "Edit "} Inventory item`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton id="open-modal" expand="block">
          Open
        </IonButton>

        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => {
                  clearForms();
                  modal.current?.dismiss();
                }
                }>Cancel</IonButton>
              </IonButtons>
              <IonTitle>{`${action == ADD ? "Add " : "Edit "} Inventory item`}</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem >
              {/*    "itemName": "",
    "quantity": "",
    "units": "",
    "locationTab": "",
    "category": "",
    "expirationDate": "" */}
              <IonInput
                type="text"
                className={formInputClassName("itemName")}
                label="itemName"
                maxlength={40}
                label-placement="stacked"
                placeholder="Name of inventory item"
                value={itemState.itemName}
                // errorText={errorLabels["itemName"]}
                onIonBlur={() => inputFieldStateMap["itemName"][3](true)}
                onIonInput={(event) => validate(event)}
              ></IonInput>
            </IonItem>
            <IonItem >
              <IonInput
                type="number"
                className={formInputClassName("quantity")}
                label="quantity"
                label-placement="stacked"
                value={itemState.quantity}
                errorText="Only positive numbers allowed"
                onIonBlur={() => inputFieldStateMap["quantity"][3](true)}
                onIonInput={(event) => validate(event)}
              ></IonInput>
            </IonItem>

            <IonItem >

              <IonSelect
                aria-label="Units"
                label="units"
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

            <IonItem >

              <IonSelect
                aria-label="Location"
                interface="popover"
                label="locationTab"
                className={formInputClassName("locationTab")}
                value={itemState.locationTab}
                //compareWith={compareSelectItems}
                onIonChange={(event) => { setItemState((state) => { return { ...itemState, locationTab: state }; }); validate(event); }}
                onIonBlur={() => inputFieldStateMap["locationTab"][3](true)}
                onIonCancel={() => console.log('ionCancel fired')}
                onIonDismiss={() => console.log('ionDismiss fired')}
                placeholder="Select location tab">
                {locationTabList.map((loc: object) => (
                  <IonSelectOption key={loc.id} value={loc.name}>
                    {loc.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem >
              <IonSelect
                aria-label="category"
                interface="popover"
                label="category"
                className={formInputClassName("category")}
                value={itemState.category}
                //compareWith={compareSelectItems}
                onIonChange={(event) => { setItemState((state) => { return { ...itemState, category: state }; }); validate(event); }}
                onIonBlur={() => inputFieldStateMap["category"][3](true)}
                onIonCancel={() => console.log('ionCancel fired')}
                onIonDismiss={() => console.log('ionDismiss fired')}
                placeholder="Select category type">
                {categoryList.map((category: object) => (
                  <IonSelectOption key={category.id} value={category.name}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem >
              <IonInput
                type="date"
                className={formInputClassName("expirationDate")}
                label="expirationDate"
                clearOnEdit={false}
                label-placement="stacked"
                value={itemState.expirationDate}
                helperText=""
                //errorText={errorLabels["expirationDate"]}
                onIonBlur={() => inputFieldStateMap["expirationDate"][3](true)}
                onIonInput={(event) => validate(event)}
              ></IonInput>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent >
    </IonPage >
  );
}

export default AddEditItemModal;