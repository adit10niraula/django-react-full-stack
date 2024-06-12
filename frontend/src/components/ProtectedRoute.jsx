import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useEffect, useState } from 'react'


function ProtectedRoute({children}){
    const [isAuthorized, setisAuthorized] = useState(null)


    useEffect(()=>{
        auth().catch(()=> setisAuthorized(false))

    },[])

    const refreshToken = async()=>{
        const refreshtoken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('/api/token/refresh/', {refresh: refreshtoken})
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setisAuthorized(true)
            }
            else{
                setisAuthorized(false)
            }

        }
        catch(error){
            console.log(error)
            setisAuthorized(false)
        }

    }

    const auth = async ()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setisAuthorized(false)
            return
        }
        const decode = jwtDecode(token)
        const tokenExporation = decode.exp
        const now = Date.now()/1000
        
        if(tokenExporation < now){
            await refreshToken()
        }else{
            setisAuthorized(true)
        }

    }
    if(isAuthorized === null){
        return <div>loading ... </div>
    }
    return isAuthorized ? children : <Navigate to='/login'/>
}


export default ProtectedRoute