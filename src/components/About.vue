<script setup>
import Header from './Header.vue';

</script>
<script>
export default{
    mounted() {
        window.scrollBy(0, -1500);
    },
    methods:{
        profile(){
                this.$router.push('/profile')
        }
    }

}
</script>


<template>

<header>
    <Header @adduser_popover="handlePopover($event)" />
</header>
    <div class="container">
    <h1>About Us</h1>
    <b>Welcome to DropCatch</b>
    <p>Dropcatch is more over an automation for tracing prize from online shopping sites and alerting the customer promptly</p>
    

    <b> Pricing </b>
    <p> 1. Free for 5 products </p>
    <p> 2. Rs.50 to unlock 5 plus </p>
    <p> Go to profile to update you Account now <a @click="profile">My profile</a> </p>
  

    <b> How does it works? </b>
    <p> 1. Collecting users Mail Id to Notify </p>
    <p> 2. Gathering and saving URL of your favourite Products </p>
    <p> 3. Our bots will check for the price timely </p>
    <p> 4. If there is a price change, notify you through an email </p>
    <p> 5. Update the saved price </p>

    <b> Note: </b>
    <p> Price changes are determined within the individual shopping platforms and we are not influencing any of them. </p>



    </div>
</template>

<style scoped>
    .container{
        padding: 50px;
    }
    a{
        cursor: pointer;
        text-emphasis-style: none;
        border-radius: 10px;
        padding: 5px;
        background-color: rgb(246, 215, 253);
    }
</style>