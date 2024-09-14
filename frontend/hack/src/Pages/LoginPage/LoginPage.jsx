import React from "react"
import "./LoginPage.css"
export default function LoginPage(){
    const [form,setForm]=React.useState({username:"",password:""})
    function handleChange(event){
        const {name,value,type}=event.target
        setForm(prev =>{
            return{...prev,
                [name]:value
            }
        })
    }
    function handleSubmit(event){
       event.preventDefault();
       
    }
return(
    <div class="loginpage">
    <form>
        <h1>Login Page</h1>
        <input onChange={handleChange}
        type="text"
        name="userame" 
        placeholder="Name"
        value={form.Name}/>
        <input onChange={handleChange}
        type="password"
        name="password" 
        placeholder="Password"
        value={form.password} required />
            <button type="submit">Create Account</button>
            <h4>Not Registred yet?<a href="/signup">Create an Account</a>.</h4>
           
    </form>
    </div>
)
}