import axios from 'axios'
import { setAlert } from './Alert';

export const RegisterUser =({fName,lName,email,password,passwordConfirm})=> async dispatch=>{
    try {
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }
        const body =JSON.stringify({fName,lName,email,password,passwordConfirm});

        const res = await axios.post("/api/user",body,config)
        dispatch({
            type:"REGISTER_SUCCESS",
            payload:{token:res.data.data[0].token}
        })
        if(res.status === 201){
            console.log("sdfs")
            res.data.data.forEach(err => {
                dispatch(setAlert(err.msg,"danger"))
            });
        }
        // console.log(res.data)
    } catch (error) {
        console.log(error.message)
        console.log(error)
    }
}
