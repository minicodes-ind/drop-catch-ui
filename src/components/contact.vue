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

<template>
     <header class="head">
        <Header @adduser_popover="handlePopover($event)" />
    </header>
<div class="container">
    <h1 style="text-align:center;">
        We'd Love To Hear from You
    </h1>
    <h3>
        <br>
       Location: <br>
        319, Peelamedu, <br>
        Coimbatore, Tamilnadu - 641024
        <br> India <br>
        <br>
        Email: <br>
        dropcatchalerts@outlook.com<br>
        <br>
        <a href="mailto:dropcatchalerts@outlook.com" class=" p-button-raised p-button-rounded"> Write to us </a>
    </h3>


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