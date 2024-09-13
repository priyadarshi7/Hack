import React from "react"
import "./SignupPage.css"
export default function SignupPage(){
    const [form,setForm]=React.useState({Name:"",Email:"",Password:""})
    function handleChange(event){
        const {name,value,type}=event.target
        setForm(prev =>{
            return{...prev,
                [name]:value
            }
        })
    }
    function handleSubmit(event){
       event.preventDefault()
    }
return(
    <div class="signuppage">
    <form>
        <h1>Signup Page</h1>
        <input onChange={handleChange}
        type="text"
        name="Name" 
        placeholder="Name"
        value={form.Name} required/>
         <input onChange={handleChange}
        type="email"
        name="Email" 
        placeholder="Email"
        value={form.Email} required />
        <input onChange={handleChange}
        type="password"
        name="Password" 
        placeholder="Password"
        value={form.Password} required />

       <button type="submit">Create Account</button>
       <h4>Already have an account?<a href="">Login</a>.</h4>
    </form>
    </div>
)
}