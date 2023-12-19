

<template>
     <header class="head">
        <Header @adduser_popover="handlePopover($event)" />
    </header>
<div class="container">
    
  
<h1>
    Cancellation and Refund Policy
</h1>
<br>
<h5>
    Cancellation/Refund in not entertained.
</h5>

</div>
	
</template>

<style scoped>
head{
margin: 10px;
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
}
</script>