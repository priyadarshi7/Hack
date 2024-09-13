import React from "react"
import "./LoginPage.css"
export default function LoginPage(){
    const [form,setForm]=React.useState({Name:"",Password:""})
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
    <form>
        <h1>Login Page</h1>
        <input onChange={handleChange}
        type="text"
        name="Name" 
        placeholder="Name"
        value={form.Name}/>
        <input onChange={handleChange}
        type="password"
        name="Password" 
        placeholder="Password"
        value={form.Password} required />

       <button type="submit">Submit</button>
    </form>
)
}