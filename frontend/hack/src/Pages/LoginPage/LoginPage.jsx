import React from "react"
import "./LoginPage.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginPage(){
    const navigate = useNavigate();
    const [form,setForm]=React.useState({email:"",password:""})
    const [error,setError] = React.useState("");
    function handleChange(event){
        const {name,value,type}=event.target
        setForm(prev =>{
            return{...prev,
                [name]:value
            }
        })
    }
    async function handleSubmit(event){
       event.preventDefault();

       const response = await axios.post("http://localhost:8000/login",form);
       if(!response.error){
        navigate("/");
       }else{
        setError(response.message);
       }
    }
return(
    <div className="loginpage">
    <form onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        <input onChange={handleChange}
        type="email"
        name="email" 
        placeholder="Email"
        value={form.email}/>
        <input onChange={handleChange}
        type="password"
        name="password" 
        placeholder="Password"
        value={form.password} required />
        {error && <h2>{error}</h2>}
            <button type="submit">Login</button>
            <h4>Not Registred yet?<a href="/signup">Create an Account</a>.</h4>
           
    </form>
    </div>
)
}