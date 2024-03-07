


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
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };


  export const validatePassword = (password: string) => {

    return password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    );
  }


  export const validateUsername = (username: string) => {
    return username.match(
        /^[A-Za-z][A-Za-z0-9_ ]{7,29}$/
    );
  }


//   export const validateEmail, validatePassword, validateUsername;
