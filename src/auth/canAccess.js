
export const  canAccess = async()=>{
    if(localStorage.getItem('token')){
       
        return true
    }
    else{
   
        return false
    }

}
export default canAccess;