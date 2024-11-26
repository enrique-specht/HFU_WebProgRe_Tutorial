import { useState } from "react";
import "./Account.css";

const Account = (props)=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const onEmailChange = (e)=>{
        setEmail(e.target.value);
    }

    const onPasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    return(
        <div className="Account">
            <div className="Account__Login">
                <h1>Login</h1>
                <div>
                    <label>email</label>
                    <input type="text" value={email} onChange={onEmailChange}/>
                </div>
                <div>
                    <label>password</label>
                    <input type="password" value={password} onChange={onPasswordChange}/>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
            <div className="Account__Signup">
                <h1>Registrieren</h1>
                <div>
                    <label>email</label>
                    <input type="text" value={email} onChange={onEmailChange}/>
                </div>
                <div>
                    <label>password</label>
                    <input type="password" value={password} onChange={onPasswordChange}/>
                </div>
                <div>
                    <button>Registrieren</button>
                </div>
            </div>
        </div>
    )
}

export default Account
