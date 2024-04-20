import React from 'react';
import { IonContent,
        IonPage,
        IonHeader,
        IonNav,
        IonButton, 
        IonLabel,
        IonTabButton,      
        IonRouterOutlet,
        IonTabBar,
        IonIcon,
        IonTabs,
         } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import {cart, restaurant, book } from 'ionicons/icons';

//import { cart-outline, restaurant-outline} from 'ionicons/icons';

//<ion-icon name="cart-outline"></ion-icon>;
//<ion-icon name="restaurant-outline"></ion-icon>;

import ShoppingPage from './shopping/ShoppingPage';
import InventoryPage from './InventoryPage';
import RecipesPage from './Recipes';

const KitchenPage: React.FC = (props:any) => {
    //const token = props.token;
    //delete props.history;
    return (            
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Redirect exact path="/kitchen" to="/inventory"/>
                            <Route path="/shopping" exact={true}>
                                <IonNav rootParams={{...props, token: props.token, setToken: props.setToken }} root={(props) => <ShoppingPage {...props} />}></IonNav>    
                            </Route>
                            <Route path="/inventory" exact={true}>
                                <InventoryPage  history={history} token={props.token} setToken={props.setToken} {...props}/>
                            </Route>
                            <Route path="/recipes" render={()=><RecipesPage />} exact={true}/>
                        </IonRouterOutlet>
                    
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="inventory" href='/inventory'>
                                <IonIcon icon={restaurant} />
                                <IonLabel> Kitchen </IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="shopping" href='/shopping'>
                                <IonIcon icon={cart} />
                                <IonLabel> Shopping </IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="recipes" href='/recipes'>
                                <IonIcon icon={book} />
                                <IonLabel> Recipes </IonLabel>
                            </IonTabButton>
                            
                        </IonTabBar>   
                    </IonTabs>
                </IonReactRouter>            
    );
};

export default KitchenPage;

