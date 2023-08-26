

<template>
    <header class="head">
       <Header @adduser_popover="handlePopover($event)" />
   </header>
<div class="container">
   
 
<h1>
   Shipping Policy
</h1>
<br>
<h5>
   Tickets you purchase here will be credited to you dropcatch Account within 3 minutes. 
   <br><br>
   If not please <a @click="contactUs()">reach out to us </a>
</h5>

</div>
   
</template>

<style scoped>
head{
margin: 10px;
}
a{
        cursor: pointer;
        text-emphasis-style: none;
        border-radius: 10px;
        padding: 5px;
        background-color: rgb(246, 215, 253);
    }
.container{
   padding: 50px; 
   margin: 100px 0px 0px 0px;
   min-height: 700px;
}
</style>

<script setup>
import Header from './Header.vue';

</script>
<script>
export default{
   mounted() {
       window.scrollBy(0, -15500);
   },
   methods: {
    contactUs(){
        this.$router.push('/contact')
    }
   }
}
</script>