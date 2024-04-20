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

    function TrashButton(props:any){
        if(props.index > 0)
        {
            return (<IonButton onClick={()=>{
                props.setLocation(props.setLocation.setAllLocations.filter(
                (tabString:string, index:number) => props.index !== index
            ))}}>
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
       disabled={props.index==0} >
       </IonInput>     
      
       {/*Delete Tab Button */}
       <TrashButton index={props.index} setLocation={props}></TrashButton>
    </IonItem>
    )
  }

  const AddEditTabsModal = (props:any) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    
    let kitchenLocations = props.value;

    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
      }
    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
         // ('', itemState);
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
                    kitchenLocations.map((location:string, tabIndex:number, allLocations:any) => 
                    <TabEditItemView locationName={location} index={tabIndex} isLast={allLocations.length - 1 == tabIndex} setAllLocations={props.value}>
                        </TabEditItemView>)
                }
                <IonItem>
                    <IonInput
                    type="text" 
                    label="New Tab:" 
                    placeholder="Location Name" >
                        
                    </IonInput>
                    <IonButton>
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