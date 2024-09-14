import React from "react"
import "./SignupPage.css"
import axios from "axios"
export default function SignupPage(){
    const [form,setForm]=React.useState({username:"",email:"",password:""})
    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setForm(prev=>({...prev,[name]:value}));
    }

    React.useEffect(()=>{
        console.log(form)
    },[form])
    async function handleSubmit(event){
       event.preventDefault();

       //Signup API Call
       const response = await axios.post("http://localhost:8000/signup",form);
    }
return(
    <div className="signuppage">
    <form onSubmit={handleSubmit}>
        <h1>Signup Page</h1>
        <input onChange={handleChange}
        type="text"
        name="username" 
        placeholder="Name"
        value={form.username} required/>
         <input onChange={handleChange}
        type="email"
        name="email" 
        placeholder="Email"
        value={form.email} required />
        <input onChange={handleChange}
        type="password"
        name="password" 
        placeholder="Password"
        value={form.password} required />

       <button type="submit">Create Account</button>
       <h4>Already have an account?<a href="/login">Login</a>.</h4>
    </form>
    </div>
)
}