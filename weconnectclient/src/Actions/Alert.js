export const setAlert = (msg,alertType)=>dispatch=>{
    const id = String(Math.random()).split(".")[1];
    dispatch({
        type:"SET_ALERT",
        payload:{msg,alertType,id}
    })
    setTimeout(() => dispatch({type:"REMOVE_ALERT", payload:id}),5000)
}
