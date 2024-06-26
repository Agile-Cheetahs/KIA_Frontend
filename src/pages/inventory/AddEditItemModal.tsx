import React, { useState, useRef, useEffect } from 'react';
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
  useIonToast
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import './AddEditItemModal.scss';
import { validateOptionalSelectText, validateUnits, validateDate, validateItemName, validateNumber, validateEmpty, validateLocationTab } from '../../helper/Validation';
import { addEditItems, concatenateArraysAndJoin } from '../../helper/APIRequest';
import { addItemToList, InventoryItemModel } from '../InventoryPage';

// COMMON CONSTANTS/ maps
const ADD = "add";
const EDIT = "edit";


// partial application for validateDate, 
// as there are multiple parameters and validate function assumes only one parameter.

//moved it inside as whether action is edit or not is needed.
const validateExpDateWrapper = (datestring: string, action = ADD) => {
  return validateDate(datestring, action != EDIT, true);
}


let validationMethodMap = {
  "itemName": validateItemName,
  "quantity": validateNumber,
  "units": validateUnits,
  "location": validateOptionalSelectText,
  "category": validateOptionalSelectText,
  "expiration_date": validateExpDateWrapper
}

let errorLabels = {
  "expiration_date": "Date should be today or in future"
}




const AddEditItemModal = (props:any) => {

  // props.item, props.token, props.action = "add" or "edit"

  const modal = useRef<HTMLIonModalElement>(null);
  //move this to parent page
  const [errorToast] = useIonToast();
  const [messageToast] = useIonToast();


  const {showLoading: showLoading, hideLoading: hideLoading, token: token} = props
  const action = props.action;
  const editItem = action == EDIT ? props.editItem : '';
  const listItems = props.listItems;

  let locationTabList:any = [];

  if(props.kitchenTabs === undefined)
  {
     
  }
  else
  {
    locationTabList = props.kitchenTabs;
  }
  // set a consistent list of options for each field

  // accept no selection also
   
   /* [{ id: 1, name: "Kitchen" },
    { id: 2, name: "Pantry" },
    { id: 3, name: "Cabinet" }
    ]// props.locationTabList;*/
  const categoryList = [{ id: 1, name: "Fruit" },
  { id: 2, name: "Grocery" }
  ]
  //props.categoryList;
  const unitTypes = [{ id: 1, name: "count" },
  { id: 2, name: "lb" },
  { id: 3, name: "t" },
  { id: 4, name: "kg" },
  { id: 5, name: "oz" },
  { id: 6, name: "g" },
  ]
  //props.unitTypes;

  // precondition: the edited item is valid
  const [isItemNameValid, setIsItemNameValid] = useState<boolean>(action == EDIT);
  const [isQuantityValid, setIsQuantityValid] = useState<boolean>(action == EDIT);
  // below 3 fields will always have 1 value selected. date is optional, hence default validation is true.
  const [isUnitsValid, setIsUnitsValid] = useState<boolean>(true);
  const [isLocationTabValid, setIsLocationTabValid] = useState<boolean>(true);
  const [isCategoryValid, setIsCategoryValid] = useState<boolean>(true);
  const [isExpirationDateValid, setIsExpirationDateValid] = useState<boolean>(true);


  const [isUserNameTouched, setIsUserNameTouched] = useState<boolean>(false);
  const [isQuantityTouched, setIsQuantityTouched] = useState<boolean>(false);
  const [isUnitsTouched, setIsUnitsTouched] = useState<boolean>(false);
  const [isLocationTabTouched, setLocationTabTouched] = useState<boolean>(false);
  const [isCategoryTouched, setIsCategoryTouched] = useState<boolean>(false);
  const [isExpirationDateTouched, setExpirationDateTouched] = useState<boolean>(false);

  const emptyItemState = {
    "itemName": action == EDIT ? editItem.name : "", // TODO: edit item payload used to populate these values
    "quantity": action == EDIT ? editItem.quantity : "",
    "units": action == EDIT ? editItem.units : "count",
    "location": action == EDIT ? editItem.location : "Kitchen",
    "category": action == EDIT ? editItem.category : "Grocery",
    "expiration_date": action == EDIT ? editItem.expiration_date : ""
  };
  const [itemState, setItemState] = useState(emptyItemState);

  useEffect(() => {
    // when modal is opened after mounting, update state after validation
        setIsItemNameValid(action == EDIT);
        setIsQuantityValid(action == EDIT);

        setItemState(emptyItemState);
    
  }, 
  [props.editItem]
  );


  // INput specific maps with each field - makes it easy for generic methods to set these
  // is it neede
  let inputFieldStateMap = {
    //            0, `1, 2, 3
    "itemName": [isItemNameValid, setIsItemNameValid, isUserNameTouched, setIsUserNameTouched],
    "quantity": [isQuantityValid, setIsQuantityValid, isQuantityTouched, setIsQuantityTouched],
    "units": [isUnitsValid, setIsUnitsValid, isUnitsTouched, setIsUnitsTouched],
    "location": [isLocationTabValid, setIsLocationTabValid, isLocationTabTouched, setLocationTabTouched],
    "category": [isCategoryValid, setIsCategoryValid, isCategoryTouched, setIsCategoryTouched],
    "expiration_date": [isExpirationDateValid, setIsExpirationDateValid, isExpirationDateTouched, setExpirationDateTouched]
  }

  // JUST use THE fieldname directly...
  // let inputFieldNameMap: InputFieldMap = {
  //   "Name": validateEmpty,
  //   "Quantity": validateEmpty,
  //   "Units": validateEmpty,
  //   "location": validateEmpty,
  //   "Category": validateEmpty,
  //   "expiration_date": validateEmpty
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
    // console.log(fieldName);
    // console.log(validateMethod);
    // console.log(validateSetter);


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


  function confirm() {
    // TODO: construct add/edit API method payload
    const addEditObject = { ...itemState };



    const addEditRequest: InventoryItemModel = {
      //full name string split here
      "name": addEditObject.itemName,
      "quantity": addEditObject.quantity,
      "units": addEditObject.units,
      "location": addEditObject.location,
      "category": addEditObject.category
    };

    if (action == EDIT) {
      // TODO: add string to the end
      addEditRequest.id = editItem.id;
    }

    if (addEditObject.expiration_date) {
      addEditRequest.expiration_date = addEditObject.expiration_date;
    }
    //showLoading();
    addEditItems(addEditRequest, props.token, action).then((resp) => {
      if (resp.response == "failed") {
        const msg = concatenateArraysAndJoin(resp.data);

        errorToast({
          message: msg,
          duration: 1500,
          position: "top",
          color: "warning"
        });


      } else if (resp.response == "successful") {

        messageToast({
          message: `User ${action == EDIT ? "edited" : "added"} item succesfully!`,
          duration: 1500,
          position: "top",
          color: "success"
        });
        // TEMPORARY: only for add, process id X in message
        if (action == ADD) {
          const list = Object.keys(resp).map(function(k) { return  resp[k] });
          list.pop();
          const message : string = list.join('');
          addEditRequest.id = Number(message.match(/\d+/g)[0]);
          // addEditRequest.expiration_date  = addEditRequest.expiration_date;
        }
        
        props.actionConfirm(action, addEditRequest);

      }

     // hideLoading();
    });


  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
     // ('', itemState);
    }
  }

  // const compareSelectItems = (l1 : object, l2 : object) => {
  //   return l1 && l2 ? l1.id === l2.id : l1 === l2;
  // }

  return (
    <IonModal ref={modal} trigger={props.modalTriggerID} onWillDismiss={(ev) => onWillDismiss(ev)}>
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
            <IonButton
              strong={true}
              disabled={!(isItemNameValid && isQuantityValid &&
                isUnitsValid && isLocationTabValid && isCategoryValid
                && isExpirationDateValid)}
              onClick={() => {
                confirm();
                modal.current?.dismiss();
              }}>
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
    "location": "",
    "category": "",
    "expiration_date": "" */}
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
            step="1"
            min="1"
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
            label="location"
            className={formInputClassName("location")}
            value={itemState.location}
            //compareWith={compareSelectItems}
            onIonChange={(event) => { setItemState((state) => { return { ...itemState, location: state }; }); validate(event); }}
            onIonBlur={() => inputFieldStateMap["location"][3](true)}
            onIonCancel={() => console.log('ionCancel fired')}
            onIonDismiss={() => console.log('ionDismiss fired')}
            placeholder="Select location tab">
            {locationTabList.map((loc: any) => (
              <IonSelectOption key={loc.locationID} value={loc.name}>
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
            className={formInputClassName("expiration_date")}
            label="expiration_date"
            clearOnEdit={false}
            label-placement="stacked"
            value={itemState.expiration_date}
            helperText=""
            errorText={errorLabels["expiration_date"]}
            onIonBlur={() => inputFieldStateMap["expiration_date"][3](true)}
            onIonChange={(event) => { setItemState((state) => { return { ...itemState, expiration_date: state }; }); validate(event); }}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonModal>

  );
}

export default AddEditItemModal;