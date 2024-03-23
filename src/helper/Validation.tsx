


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
    return null;
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
    /^[A-Za-z0-9_]{1,20}\s+[A-Za-z0-9_]{1,40}$/
  );
}

export const validatePhoneNumber = (phonenumber: string) => {
  return phonenumber.match(
    /^[0-9]{10}$/
  );
}


// Add/Edit inventory form validation
export const validateNumber = (quantity: string) => {
  const num = parseInt(quantity, 10);
  return num >= 0 && quantity.match(/^[0-9]+$/) != null;
}

export const validateItemName = (itemname: string) => {
  return itemname.match(
    /^[A-Za-z0-9 _]{1,40}$/
  ) != undefined;

}

export const validateUnits = (units: string) => {
  return units.match(
    /^[A-Za-z0-9]+$/
  ) != undefined;

}

// For location tab, category select fields. optional
export const validateOptionalSelectText = (units: string) => {
  return units.match(
    /^[A-Za-z0-9]*$/
  ) != undefined;

}

//For Expiration date
export const validateDate = (date: string, inFuture: boolean, isOptional: boolean ) => {
  const currentDate = new Date();
  const inputDate = new Date(date);
  console.log(date);
  if (!date) {
    console.log(date);
    return isOptional;
  }
  return inFuture ? inputDate >= currentDate : true;

}



// export const validateAddInventoryItem = () => {

// }



