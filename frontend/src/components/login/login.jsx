import { useState } from "react";
import { serverURL } from "../../App";
import "./login.css";

function Login({}) {

    const [hasAccount, setHasAccount] = useState(1);

    function handleSubmit(e, mode) {
        e.preventDefault();
        e.persist();

        if(mode == "signup") {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const createUser = async () => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
                const response = await fetch(`${serverURL}/api/v1/sgpt/users/new`, options).catch((err) => console.warn(err));
                if(!response) {
                    console.warn("Response was not ok!")
                } else {
                    const data = await response.json();
                    console.log(data);
                }
            }
            createUser();
        } else {

        }
    }

    function handleLogInOrRegister() {
        if(hasAccount == 1) {
            return (
                <form onSubmit={(e) => handleSubmit(e, "login")}>
                    <input type="text" id="email" name="email" placeholder="Email" autoComplete="off"/>
                    <input type="text" id="password" name="password" placeholder="Password" autoComplete="off"/>
                    <div>
                        <button type="button" onClick={() => setHasAccount(0)}>Register</button>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            )
        } else {
            return (
                <form onSubmit={(e) => handleSubmit(e, "signup")}>
                    <input type="email" id="email" name="email" placeholder="Email" autoComplete="off"/>
                    <input type="password" id="password" name="password" placeholder="Password" autoComplete="off"/>
                    <input type="password" id="password" name="password" placeholder="Confirm Password" autoComplete="off"/>
                    <div>
                        <button type="button" onClick={() => setHasAccount(1)}>Back</button>
                        <button type="submit">Create Account</button>
                    </div>
                </form>
            )
        }
    }
    const formHTML = handleLogInOrRegister();


    return (
        <div className="login-container">
            {formHTML}
        </div>
    )
}

export default Login;