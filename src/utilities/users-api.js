//
//user-api.js

//setup base url for the routr
const LOCAL_URL = `http://localhost:5050`;
const API_POINT = "/api/users";
const URL = LOCAL_URL + API_POINT;

export async function signUp(userData) {
  //fetch uses an option object as a second arg to make requests
  //other than basic GET requests, include data,headers, etc
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //fetch requires data payload to be stringlfied
    //and assigned to a body object property
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`invalid SignUp`);
  }
}
