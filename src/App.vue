<script setup>
import navbar from './components/navbar.vue'
import Users from './components/Users.vue';
import AddUserForm from './components/AddUserForm.vue';
import Alert from './components/Alert.vue';
import login from './auth/components/login.vue'
import signup from './auth/components/signup.vue';
import home from './components/home.vue';
import profile from './components/profile.vue'

</script>

<script>
export default {
  data() {
    return {
      addanim:false,
      spinner: false,
      showPopup: false,
      newData: null,
      alertMessage: "",
      showAlert: "",
    }
  },
  methods: {
    handleLoading(event) {
      this.spinner = event;
    },
    handlePopover(event) {
      this.showPopup = event;
    },
    handleDataAdd(data) {
      this.newData = data;
      },
    handleShowAlert(event) {
     console.log("Reached show alert", event);
      this.alertMessage = event.message;
      this.alertType = event.type;
    },
    handleShownAlert(){
       console.log("Reached shown alert");
      this.alertMessage = "";
      this.alertType = "";
    },
    handleAddAnim(event){
      this.addanim=event
    }
  }
}
</script>

<template>
  
  <body>
  <!-- <header>
    <Header @adduser_popover="handlePopover($event)" />
  </header> -->
 
    <div class="cont">
      <div v-if="spinner" class="row position-absolute top-50 end-50 show">
        <div class="col">
          <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col">
          <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col">
          <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          
        </div>
      </div>

      
       <header >
    <navbar  @adduser_popover="handlePopover($event)"  @show_alert="handleShowAlert($event)"/>
   
   
  </header>

<div v-if="addanim" class="cont"> 
  <div class="row outer position-absolute show" >
        <div class="carding" >
          <img class="anim" src="../src/assets/addAnimation.gif"/>
        </div>
  </div>
</div>
       <router-view 
       @loading="handleLoading($event)" 
       @addanim="handleAddAnim($event)" 
       @adduser_popover="handlePopover($event)" 
       @show_alert="handleShowAlert($event)"
       
       >
      
      </router-view>

      <!-- <login @loading="handleLoading($event)"  @show_alert="handleShowAlert($event)"/> -->
      <!-- <Users @loading="handleLoading($event)" :newUser="newData" @show_alert="handleShowAlert($event)"/> -->
      <Alert :[alertType]= true :message="alertMessage" @shown_alert="handleShownAlert()"/>


    </div>
    <AddUserForm :showModal="showPopup" 
    @addanim="handleAddAnim($event)" 
    @opened_modal="showPopup = false" 
    @loading="handleLoading($event)"
    @data_added="handleDataAdd($event)" 
    @show_alert="handleShowAlert($event)"
    />
   
  
</body>
</template>
<style scoped>
  .carding{
    width:auto;
    margin: auto;
  }
  .anim{
    position: absolute;
    width: 600px;
    margin: auto;
    background-color: rgb(168, 164, 164);
    border-radius: 10px;
    padding: 10px;
  }
  .outer{
    position: absolute;
    width: 600px;
    margin: auto;
    padding: 10px;
  }
.cont{
  width: 600px;
  width:auto;
  }
  body{
    background-color: rgb(255, 255, 255);
  }
  .show {
    z-index: 90000000;
  }

  @media only screen and (max-width: 425px) {
    .anim{
    position: absolute;
    width: 370px;
    margin: auto;
    background-color: rgb(168, 164, 164);
    border-radius: 10px;
    padding: 10px;
    margin-top: 120px;
  }
  .outer{
    position: absolute;
    width: auto;
    margin: auto;
    padding: 10px;
  }
}
</style>
