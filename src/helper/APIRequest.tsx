


/* 
Helper functions for performing API calls to backend server

*/

export async function register(requestObject: Object) {
    
    let response;
    try {

        const endpoint = '/api/account/signup';


         response = await fetch(endpoint, {
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
    catch (error : any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data};
    }
}

export async function login(requestObject: Object) {
    
    let response;
    try {

        const endpoint = '/api/account/login';


         response = await fetch(endpoint, {
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
        return {...data, response: "successful"};

    }
    catch (error : any) {
        // Log any errors to the console
        console.error("There has been a problem with your fetch operation:", error);
        const data = await response.json();
        return { response: "failed", status: error.msg, data: data};
    }
}

// sign in

// login



