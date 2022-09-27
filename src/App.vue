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
      <!-- <div v-if="spinner" class="row position-absolute top-50 end-50 show">
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
      </div> -->
       <header >
    <navbar  @adduser_popover="handlePopover($event)"  @show_alert="handleShowAlert($event)"/>
  </header>
       <router-view 
       @loading="handleLoading($event)"  
       @adduser_popover="handlePopover($event)" 
       @show_alert="handleShowAlert($event)"
       
       >
      </router-view>

      <!-- <login @loading="handleLoading($event)"  @show_alert="handleShowAlert($event)"/> -->
      <!-- <Users @loading="handleLoading($event)" :newUser="newData" @show_alert="handleShowAlert($event)"/> -->
      <Alert :[alertType]= true :message="alertMessage" @shown_alert="handleShownAlert()"/>
    </div>
    <AddUserForm :showModal="showPopup" 
    @opened_modal="showPopup = false" 
    @loading="handleLoading($event)"
    @data_added="handleDataAdd($event)" 
    @show_alert="handleShowAlert($event)"
    />

  
</body>
</template>
<style scoped>
  .cont{
   position: relative;

  }
  body{
    background-color: rgb(255, 255, 255);
  }
  .show {
    z-index: 1000000;
  }
</style>
