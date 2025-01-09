//
import { useState } from "react";
//adding in auth, i am importing signup from utilities

import { signUp } from "../utilities/users-services";
//

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    //this is where we would eventually add this to our database
    //but through utilities/user-services (soam making util function to handle api)
    try {
      //set this up to be able to add new users
      const submitData = { ...formData };
      delete submitData.confirm;
      console.log(submitData);
      const user = await signUp(submitData);
      props.setUser(user);
    } catch (e) {
      setError("Sign Up Failed - Try Again");
    }
  };

  //

  //
  return (
    <>
      <h2>Sign Up to start using your own Calendar</h2>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Display Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Display name"
            required
          />
          <br />
          <label>Email Address (needs to be unique)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="enter email"
            required
          />
          <br />
          <label>enter password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="enter password"
            required
          />
          <br />
          <label>confirm password</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="must match password"
            required
          />
          <br />
          <button
            type="submit"
            disabled={formData.password !== formData.confirm}
          >
            Sign Up
          </button>
        </form>
        <p>{error} </p>
      </div>
    </>
  );
}
export default SignUpForm;
