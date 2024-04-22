import { Capacitor } from "@capacitor/core";

const BASE_API_URL = Capacitor.getPlatform() === "android" ? import.meta.env.VITE_BASE_API_URL : '';

/* 
Helper functions for performing API calls to backend server

*/

export async function register(requestObject: Object) {

    let response;
    try {

        const endpoint = '/api/account/signup';

        //(Capacitor.getPlatform() === "android" ? 'https://danibazi9.pythonanywhere.com/api/account/login'

        response = await fetch(BASE_API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //  credentials: "include",
            body: JSON.stringify(requestObject),
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return data;

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}

export async function login(requestObject: Object) {
    let response;
    try {

        const endpoint = '/api/account/login';

        //(Capacitor.getPlatform() === "android" ? 'https://danibazi9.pythonanywhere.com/api/account/login'
        response = await fetch(BASE_API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //  credentials: "include",
            body: JSON.stringify(requestObject),
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();

        return { response: "failed", status: error.msg, data: data };
    }
}

// sign in

// login

//logout

export async function logout(requestObject: any) {

    let response;
    try {

        const endpoint = '/api/account/logout';


        response = await fetch(BASE_API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${requestObject.token}`
            },
            //  credentials: "include",
            body: JSON.stringify(requestObject),
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}

export async function addInventoryLocation(requestObject: any, method: string) {
    let response;
    let token = requestObject.token
    //delete requestObject.token 

    try {

        const endpoint = '/api/inventory/locations/';


        response = await fetch(BASE_API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            //  credentials: "include",
            body: JSON.stringify(requestObject),
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}

export async function editInventoryTab(requestObject: any, method: string) {
    let response;
    let token = requestObject.token
    // delete requestObject.token 

    try {

        const endpoint = '/api/inventory/locations/';


        response = await fetch(BASE_API_URL + endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            //  credentials: "include",
            body: JSON.stringify(requestObject),
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}

export async function getInventoryLocations(requestObject: any, method: string) {
    let response;
    let token = requestObject.token
    // delete requestObject.token 

    try {

        const endpoint = '/api/inventory/locations/';


        response = await fetch(BASE_API_URL + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            //  credentials: "include",

        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}
// Inventory APIs

export async function addInventory(requestObject: any, method: string) {
    let response;
    let token = requestObject.token
    // delete requestObject.token 
    try {

        const endpoint = '/api/inventory/me/';
        response = await fetch(BASE_API_URL + endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(requestObject)
            //  credentials: "include",

        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}


export async function getInventory(requestObject: any) {
    let response;
    try {

        const endpoint = '/api/inventory/me/';

        response = await fetch(BASE_API_URL + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${requestObject.token}`
            },
            //  credentials: "include",

        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}

/* Function for inventory page  */


export async function addEditItems(requestObject: Object, token: String, action: string) {

    let response;
    try {

        let endpoint = '/api/inventory/items/';
        let options = {
            method: '',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        };
        let method;
        switch (action) {
            case 'add':
                method = 'POST';
                endpoint = endpoint + "?me";
                options.body = JSON.stringify(requestObject);
                break;
            case 'edit':
                method = 'PUT';
                endpoint = endpoint + "?" + new URLSearchParams({id :requestObject.id});
                options.body = JSON.stringify(requestObject);
                break;
            case 'remove':
                method = 'DELETE';
                endpoint = endpoint + "?" + new URLSearchParams({id :requestObject.id});

                
                break;
        }
        options.method = method;

        response = await fetch(BASE_API_URL + endpoint, options);


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.status == 204) {
            return {response: "successful" };
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}

export async function fetchShoppingList(requestObject: any, token: String, method: string) {
    let response;
    //delete requestObject.token 

    try {

        const endpoint = '/api/inventory/shopping-lists/';
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }

        };
        if (method != "GET") 
        { 
            options.body = JSON.stringify(requestObject); 
        }


        response = await fetch(BASE_API_URL + endpoint, options);


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();

        // Return the data
        return { ...data, response: "successful" };

    }
    catch (error: any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data };
    }
}


// helper function 
export function concatenateArraysAndJoin(obj: object) {

    let combinedArray: string[] = [];


    for (const key in obj) {

        if (obj.hasOwnProperty(key)) {

            if (Array.isArray(obj[key])) {

                combinedArray = combinedArray.concat(obj[key]);
            }
        }
    }

    // Join the elements of the combinedArray into a string, separated by commas
    const resultString = combinedArray.join(',');

    // Return the resulting string
    return resultString;
}