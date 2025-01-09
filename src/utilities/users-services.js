//i need to pass in user data because this is attempting to add new user to the database

import * as userAPI from "./users-api";

export async function signUp(userData) {
  //delegate the network request code to the users-api.js API module
  //which will ultimately return a json web token(jwt)
  const token = await userAPI.signUp(userData);
  console.log(token);
  //for now, we will console.log the token to see that it exists and return the name and email
  //we will also eventually save the token in local storage
  localStorage.setItem("token", token);

  return getUser();
}

export function getToken() {
  //getItem returns null if there is no string in the key 'token' or the key doesnt exist

  const token = localStorage.getItem("token");
  if (!token) return null;
  //obtain the payload
  const payload = JSON.parse(atob(token.split(".")[1]));
  //check the expiration
  //jwt expiration is expressed in milliseconds, not seconds, so convert
  if (payload.exp < Date.now() / 1000) {
    //token has expired and we remove it from local storage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  //split the token, parse the second part of it, once you decode, access the user key in the object //if there is a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut() {
  localStorage.removeItem("token");
}
