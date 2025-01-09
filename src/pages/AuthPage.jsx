//
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
//

function AuthPage(props) {
  const [signup, setSignup] = useState(true);
  function togglePage() {
    setSignup(!signup);
  }

  return (
    <>
      <div> Auth page</div>
      <h1>Sign Up or Login</h1>
      <>
        {signup ? (
          <SignUpForm setUser={props.setUser} />
        ) : (
          <LoginForm setUser={props.setUser} />
        )}
      </>
      <h2>OR go here to{signup ? "login" : "Register"}</h2>
      <button onClick={togglePage}>{signup ? "login" : "Register"}</button>
    </>
  );
}
export default AuthPage;
