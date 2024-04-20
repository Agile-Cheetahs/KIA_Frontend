import { Redirect, Route } from 'react-router-dom';
import { useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonLoading, IonNav } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';




/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/*pages*/
import InventoryPage from './pages/InventoryPage';
import KitchenPage from './pages/KitchenPage';
import ShoppingPage from './pages/shopping/ShoppingPage';
import AddEditItemModal from './pages/inventory/AddEditItemModal';
import Login from './pages/Login';
import RecipesPage from './pages/Recipes';
import AddEditTabsModal from './pages/inventory/addEditTabsModal';

setupIonicReact();


const App: React.FC = () => {

  const [showLoading, hideLoading] = useIonLoading();


  // User login management - move this to useToken.tsx?
  const getToken = () => {
    const tokenString: string | null = sessionStorage.getItem('token');
    return tokenString;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  let appProps = {
    token : token,
    setToken :saveToken,
    showLoading: showLoading,
    hideLoading: hideLoading
  }

  if (!token) {
    return <Login {...appProps} />;
  }

  const item = {
    "id": 1,
    "itemName": "bananas",
    "quantity": 2,
    "units": "lb",
    "locationTab": "pantry",
    "category": "Grocery",
    "expirationDate": ""
  };

 

  // const {token, setToken} = useToken();
  return (<IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        <Route path="/" exact={true}>
          <Redirect to="/kitchen" />
        </Route>
        {/* TODO: remove /home? */}
        {/* <Route path="/home" exact={true} >
          <Home />
        </Route> */}
        <Route path="/kitchen" exact={true}>
          <KitchenPage history={history} {...appProps} />
        </Route>
        <Route path="/inventory" exact={true}>
          <InventoryPage history={history} {...appProps} />
        </Route>
        <Route path="/shopping" exact={true}>
          <ShoppingPage history={history} setToken={saveToken} token={token} />
        </Route>
        {/*<Route path="/inventory" exact={true}>
          <InventoryPage history={history} token={token} setToken={saveToken} />
        </Route>
        <Route path="/recipes" exact={true}>
          <RecipesPage history={history} token={token} setToken={saveToken} />
        </Route>
         */}
        {/* TODO: hook following up to inventory main page item actions  */}
        <Route path="/addinventory">
          <AddEditItemModal token={token} setToken={saveToken} action={"add"} />
        </Route>
        <Route path="/editinventory">
          <AddEditItemModal editItem={item} token={token} setToken={saveToken} action={"edit"} />
        </Route>
        <Route path="/addEditTabs" >
          <AddEditTabsModal token={token} setToken={saveToken} />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>);
};

export default App;
