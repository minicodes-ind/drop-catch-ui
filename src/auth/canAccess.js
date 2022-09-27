
export const  canAccess = async()=>{
    if(sessionStorage.getItem('token')){
       
        return true
    }
    else{
   
        return false
    }

}
export default canAccess;