import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import toast, { Toaster } from "react-hot-toast";

export default function register(){
    
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axiosClient.post('/register',payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            // console.log(response);
            if(response && response.status === 422){
                for (let key in response.data.errors) {
                    if (response.data.errors.hasOwnProperty(key)) {
                        toast.error(response.data.errors[key][0]);
                    }
                }
            }
        });
    }

    return (
        <div className="auth-section" >
        <div className="login-signup-form animated fadeInDown" >
        <div className="form" >
        <img src="./images/logo/logo_white.png" style={{width: '185px'}} alt="" />
            <h1 className="title" >
                Create A New Account
            </h1>
            <Toaster /> 
            <form onSubmit={Submit}>
                <input ref={nameRef} type="text" placeholder="Name" required/>
                <input ref={emailRef} type="email" placeholder="Email" required/>
                <input ref={passwordRef} type="password" placeholder="Password" required/>
                <button className="btn btn-block" >Register</button>
                <p className="message">
                    Already Have An Account? <Link to='/login' >Login</Link>
                </p>
            </form>
        </div>
        </div>
        </div>
    )
}