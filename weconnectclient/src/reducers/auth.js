const initState = {
    token:localStorage.getItem("token"),
    isAuthenticated:null,
    loading:true,
    user:null,
}
export default function(state=initState,action) {
    switch(action.type) {
        case "REGISTER_SUCCESS":
            console.log(action.payload.token)
            localStorage.setItem("token",action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false
            }
        case "REGISTER_FAIL":
            localStorage.remove("token");
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return state;

    }
}
