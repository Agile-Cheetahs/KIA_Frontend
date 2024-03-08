


/* 
Helper functions for validating input components in Login/Register Page
Each input component will have a respective validation method

*/
export const validateEmpty = (str: string) => {
    return true;
}

export const validateEmail = (email: string) => {
    // Taken from the Ionic docs
    if (!email) {
        return  null;
    }
    return email.match(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    );
  };


  export const validatePassword = (password: string) => {

    return password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    );
  }


  export const validateUsername = (username: string) => {
    return username.match(
        /^[A-Za-z0-9_ ]{1,20}\s+[A-Za-z0-9_ ]{1,20}$/
    );
  }

  export const validatePhoneNumber = (phonenumber: string) => {
    return phonenumber.match(
        /^[0-9]{10}$/
    );
  }


//   export const validateEmail, validatePassword, validateUsername;
