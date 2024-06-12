import React, { useState } from 'react'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { useNavigate } from 'react-router-dom'
import '../styles/form.css'
// import Loadingind from './Loadingind'


function Form({route,method}){
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loding, setloading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        setloading(true)
        e.preventDefault()

        try{
            const res = await api.post(route, {username, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            }
            else{
                navigate('/login')
            }


        }catch(error){
            alert(error)

        }finally{
            setloading(false)
        }
    }
    const name = method === "login"? "login": "register"

    return(
    <form action="" onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input type="text" className="form-input" value={username} onChange={(e)=>setusername(e.target.value)} placeholder='username' />
        <input type="password" className="form-input" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='password'/>
        {loding && <p>loading...</p>}
        <button type="submit" className='form-button'> {name}</button>



    </form>)
}

export default Form