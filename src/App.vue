<script setup>
import navbar from './components/navbar.vue';
import AlertList from './components/AlertList.vue';
import AddAlertForm from './components/AddAlertForm.vue';
import Alert from './components/Alert.vue';
import login from './auth/components/login.vue';
import signup from './auth/components/signup.vue';
import home from './components/home.vue';
import profile from './components/profile.vue';
import PrivacyPolicy from './components/PrivacyPolicy.vue';
import footerBar from './components/footerBar.vue';
import TermsAndConditions from './components/TermsAndConditions.vue';
import About from './components/About.vue';
import BuyTickets from './components/BuyTickets.vue';
</script>

<script>
export default {
  mounted(){
    window.addEventListener("scroll", this.handleScroll);
    setInterval(() => {
  window.location.reload();
}, 1200000);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      isVisible: false,
      addanim:false,
      spinner: false,
      showPopup: false,
      newData: null,
      alertMessage: "",
      showAlert: "",
    }
  },
  methods: {
    handleScroll() {
      const threshold = 300; // Adjust as needed
      this.isVisible = window.scrollY > threshold;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
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
        <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
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
    <div>
      <AddAlertForm :showModal="showPopup" 
    @addanim="handleAddAnim($event)" 
    @opened_modal="showPopup = false" 
    @loading="handleLoading($event)"
    @data_added="handleDataAdd($event)" 
    @show_alert="handleShowAlert($event)"
    />
    </div>
    
    <div v-if="isVisible" class="scroll-to-top" @click="scrollToTop">
      <i class="pi pi-angle-up"></i>
    </div>
    <footer>
    <footerBar />
  </footer>
  
</body>
 
</template>
<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 70px;
  right: 10%;
  background-color: #380650;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  z-index: 999;
}

.scroll-to-top:hover {
  opacity: 0.8;
}

.fa-arrow-up {
  font-size: 20px;
}
.lds-grid {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-grid div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
    background-color: blueviolet;
  }
  50% {
    background-color: rgb(43, 137, 226);
    opacity: 0.5;
  }
}
.row{
  position: relative;
  margin-left: 20px;
}
/* .footer{
  width:100%;
  position: fixed;
  bottom:0;
  overflow:hidden;
} */
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
    margin-right: 160px;
    background-color: rgb(255, 255, 255);
  }
  .show {
  
    z-index: 90000000;
  }
  @media only screen and (max-width: 4205px) {
    .anim{
    position: absolute;
    width: auto;
    margin: auto;
    background-color: rgb(168, 164, 164);
    border-radius: 10px;
    padding: 10px;
    margin-top: 200px;
  }
  body{
    margin-right: 160px;
    background-color: rgb(255, 255, 255);
  }
  .outer{
    position: absolute;
    width: 700px;
    margin: auto;
    padding: 10px;
  }
}
  @media only screen and (max-width: 468px) {
    .anim{
    position: absolute;
    width: 370px;
    margin: auto;
    background-color: rgb(168, 164, 164);
    border-radius: 10px;
    padding: 10px;
    margin-top: 120px;
  }
  body{
    margin-right: 0px;
    background-color: rgb(255, 255, 255);
  }
  .outer{
    position: absolute;
    width: auto;
    margin: auto;
    padding: 10px;
  }
}
</style>./components/AlertList.vue./components/AddAlertForm.vue
