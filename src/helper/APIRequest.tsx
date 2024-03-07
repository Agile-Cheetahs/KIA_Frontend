


/* 
Helper functions for performing API calls to backend server

*/

export async function register(requestObject: Object) {
    try {

        const endpoint = '/api/account/signup';


        const response = await fetch(endpoint, {
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
        return { response: "failed", status: error.msg};
    }
}

// sign in

// login



