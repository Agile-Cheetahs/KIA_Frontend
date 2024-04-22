import React, {useState, useRef, useEffect } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonSelect,
    IonLabel,
    IonSelectOption,
    IonPage,
    IonList,
    IonListHeader,
    IonItem,
    IonInput,
    IonIcon,
    useIonToast
  } from '@ionic/react';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { addCircle, arrowDown,arrowUp, trash} from 'ionicons/icons';
  import { addInventoryLocation} from '../../helper/APIRequest';

  import {KitchenLocationModel} from '../InventoryPage'

  function TabEditItemView(props:any){
    
    /**
     * Hide the Up Button
     * @param props 
     * @returns 
     */
    function UpButton(props:any){
        if(props.index > 1)
        {
            return (<IonButton>
                        <IonIcon icon={arrowUp}/>
                    </IonButton>);
        }
        else
        {
            return <></>
        }
    }

    /**
     * Hide the Up Button
     * @param props 
     * @returns 
     */
    function DownButton(props:any){
        if(!props.isLast && props.index!=0)
        {
            return (<IonButton>
                        <IonIcon icon={arrowDown}/>
                    </IonButton>);
        }
        else
        {
            return <></>
        }
    }
    /**
     * Trash Button
     * @param props 
     * @returns 
     */
    function TrashButton(props:any){
        if(props.index > 0)
        {
            return (<IonButton onClick={()=>{
                
               /* let newFilterArray = props.location.setAllLocations.filter(
                    (tabString:string, index:number) => props.index !== index
                );*/
                props.location.resetItemsToKitFunc(props.locationName);
                //Set the Kitchen tabs with new smaller array.  
                //props.location.setKitchenTabsFunc(newFilterArray);            
                props.location.removeKitchenTabFunc(props.locationModel);
            }}>
                <IonIcon icon={trash}/>
                 </IonButton>);
        }
        else
        {
            return <></>
        }
    }

    return( 
    <IonItem>
       <IonInput 
       type="text" 
       label={props.index} 
       placeholder="Location Name" 
       value={props.locationName} 
       disabled={props.index==0} 
       onIonChange={(e)=> {
       let changingLocationID=0;
        /**
         * Updating the tab name when being edited.  
         */
        let newReplaceArray = props.setAllLocations.map((elem:any, index:number) =>{
            if(index == props.index)
            {
                changingLocationID = elem.locationID;
                    return {locationID:elem.locationID, name:e.target.value};
            }
            else{
                return elem;
            }
        })
        props.editItemsKitFunc(changingLocationID, e.target.value, props.locationName);
        props.setKitchenTabsFunc(newReplaceArray); 
       }
        }
       >
       </IonInput>     
      
       {/*Delete Tab Button */}
       <TrashButton index={props.index} locationName={props.locationName} 
       locationModel={props.locationModel} location={props} ></TrashButton>
    </IonItem>
    )
  }

 

  const AddEditTabsModal = (props:any) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const [newTabInput, setTabInput] = useState('');
    
    let kitchenLocations = props.value;
    
    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
      }
    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
         // ('', itemState);
        }
      }
    function onAddTab(props:any){
        if(props.tabInput != "")
        {
          //TODO
            //props.setKitchenTabsFunc([...props.kitchenLocations,props.tabInput]);
            props.addKitchenTabFunc([props.tabInput]);
        }
        
    }
    
    return(
       <IonModal ref={modal} trigger="open-modal-tabs" onWillDismiss={(ev) => onWillDismiss(ev)}>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Edit Tabs</IonTitle>
            </IonToolbar>
        </IonHeader>           
        <IonContent>
            <IonList>
                <IonListHeader>
                    Kitchen Locations
                </IonListHeader>
                {
                    kitchenLocations.map((location:KitchenLocationModel, tabIndex:number, allLocations:any) => 
                    <TabEditItemView locationName={location.name} 
                    index={tabIndex} 
                    isLast={allLocations.length - 1 == tabIndex}
                    setAllLocations={props.value}
                    removeKitchenTabFunc = {props.removeKitchenTabFunc}
                    setKitchenTabsFunc = {props.setKitchenTabsFunc}
                    resetItemsToKitFunc = {props.resetItemsToKitFunc}
                    editItemsKitFunc = {props.editItemsKitchenLocation}
                    locationModel = {location}
                    >
                    </TabEditItemView>)
                }
                <IonItem>
                    <IonInput                    
                    type="text" 
                    label="New Tab:" 
                    placeholder="Location Name"
                    value={newTabInput}
                    onIonInput={(e)=> setTabInput((e.target as HTMLInputElement).value)}
                    >
                    
                        
                    </IonInput>
                    <IonButton onClick={()=>onAddTab({tabInput:newTabInput, 
                        kitchenLocations:props.value,
                         addKitchenTabFunc:props.addKitchenTabFunc})}>
                        <IonIcon icon={addCircle}/>
                    </IonButton>                    
                </IonItem>
                
            </IonList>
        </IonContent>      
        <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
                Confirm
            </IonButton>
        </IonButtons>
       </IonModal>
        )
  }
  export default AddEditTabsModal;