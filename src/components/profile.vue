<script setup>
    import Header from './Header.vue'
</script>
<script> 
   export default {
       data() {
           return {
               name:sessionStorage.getItem('name'),
               email:sessionStorage.getItem('email'),
               showPasswordBox: false,
               passwordModel: {
                   email:sessionStorage.getItem('email'),
                   currentPassword: "",
                   password: ""
               }
           };
       },

       mounted() {

           this.passwordModel = {
           email: sessionStorage.getItem('email'),
           currentPassword: "",
           password: ""
       };
       },
        
       
       methods:{
           change() { 
               window.scrollBy(0, 500);
               this.showPasswordBox=true;
           },
           submit(){
               this.$emit("loading", true);
               if(this.passwordModel.password && this.passwordModel.currentPassword){
               fetch(`${this.API_URL}/api/resetpassword`,
               {
                   method: "PATCH",
                   mode: "cors",
                   headers: {
                       "Content-Type": "application/json",
                       },
                  
                   body: JSON.stringify(this.passwordModel)
               })
               .then(response => response.json())
               .then(response => {
                  if (response){
                       if(response.status == 200){
                       this.$emit("show_alert", {message: "Password Reset Success", type: "success"});

                       }
                       if(response.status == 403){
                           this.$emit("show_alert", {message: "Current Password is Incorrect", type: "info"});
                           this.passwordModel.currentPassword=""
                       }
                       
                  }
                  else{
                       this.$emit("show_alert", {message: "something went wrong", type: "error"});
                       }
               })
           }
           else{
               this.$emit("show_alert", {message: "Enter All fields", type: "info"});

           }

               this.showPasswordBox=false;
               window.scrollBy(0, -500);
           },
           home(){
               this.$router.push('/home');
           },
           cancelReset(){
               
               this.showPasswordBox=false;
               window.scrollBy(0, -500);
           },

       }
   }
</script>


<template>
   <header>
   <Header @adduser_popover="handlePopover($event)" />
 </header>
<body>

   <div class="headerBox">
      
       <div class="icoCont">
           <img class="profile" src="../assets/profile.png"/>
       </div>
       <h2 class="title">My Profile  </h2>
   </div>

   <div class="detailsBox">
       <div class="textCont">
           <h4>Name </h4>
               <h2 class="detail">{{name}}</h2>
           <h4>Email</h4>
               <h2 class="detail">{{email}}</h2>
           <h4>Password </h4>
               <h1>*******</h1>
           <Button class="p-button change" label="change password" @click="change()">Change Password</Button>
           <div class="passwordBox" v-show="showPasswordBox">
               <form>
                    <div class="row">    
                       
                       <div class="col-md-12 textDiv">
                           <div class="p-inputgroup">
                           <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
                           <Password :feedback="false" toggleMask pInputText class = "tb"  v-model="passwordModel.currentPassword" placeholder="Enter Current Password"/>   
                       </div>
                       </div>
                       <div class="col-md-12 textDiv">
                           <div class="p-inputgroup">
                               <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
                               <Password class = "tb"  pInputText v-model="passwordModel.password" placeholder="Password"/>   
                           </div>
                        </div>
                        <Button class="p-button submit" icon="pi pi-times"  label="Cancel" @click="cancelReset"></Button>     

                        <Button class="p-button submit" icon="pi pi-check"  label="Change" @click="submit"></Button>     
                   </div>
               </form>

           </div>
       </div>
   </div>
</body>  
</template>

<style scoped>
   .title{
       color: #380650;
   }
   .detailsBox{
     
       width:auto;
       margin: auto;
   }
   .textCont{
       text-align: center;
       width:auto;
       margin: auto;
      
   }
   .icoCont{
       padding: 25px;
       border-radius: 150px;
       font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
       text-align: center;
       width: 150px;
       margin: auto;
       margin-top: 50px;
       background-color: #ffafdc;
       border: 10px solid #af2c77;

   }
.profile{
   height:80px;
   text-align: center;
}
.headerBox{
   
   text-align: center;
   width:auto;
   margin: auto;
  
}
.detail{
   font-size: larger;
   color: #6f2393;
   margin-top: 10px;
   text-align:center;
}
body{
   margin-bottom: 250px;
   padding:10px 30px;
}

.textDiv{
   
   margin-top: 15px;
}
.passwordBox{
   width: auto;
   margin: auto;
   width:350px;
   
}
.change{
   background-color: #380650;
   border: #380650;
}
.submit{
   border:#782388;
   background-image: linear-gradient(to right, #af2c77, #a4287a, #98257e,
    #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #7b20a6, #811db0,
     #871aba);    
   border-radius: 10px;
   width:auto;
   margin: auto;
   text-align: center;
   margin-top: 10px;
   padding: 10px;
   
   
}
@media only screen and (max-width: 425px) {
   body{
       width:425px;
   }
   .headerBox{
   text-align: center;
   width:auto;
   margin: auto;
   margin-top: 120px;
   }
   .textCont{
       text-align: center;
       width:auto;
       margin: auto;
      
   }
}
</style>