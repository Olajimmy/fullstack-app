//
import { useState } from "react";
import { Link } from "react-router";
import userServices from "../utilities/users-services";

//

function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }
  //
  async function handleSubmit(e) {
    e.preventDefault();
    //console.log(formData);
    const credentials = { ...formData };
    console.log(credentials);
    try {
      //the promise returned by the login service method will resolve to the user

      //object includes in the payload of the jwt
      const user = await userServices.login(credentials);
      setUser(user);
    } catch (err) {
      setError("log in failed - try again");
    }
  }

  //
  return (
    <>
      <h2>Sign Up to start using your own Calendar</h2>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
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

          <br />
          <button type="submit">Login</button>
        </form>
        <p>{error}</p>
      </div>
    </>
  );
}
export default LoginForm;
