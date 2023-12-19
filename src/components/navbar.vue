<script>
    export default {
       
       
    }
</script>
<template>
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <img class="DClogo" src="../assets/DCLOGO2.png">
            <a class="navbar-brand" href="#">Dropcatch&trade;</a>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    
            </div>
        </div>
    </nav>
</template>
<style scoped>
    .DClogo{
        width:50px;
        margin-right: 5px;
    }
    .navbar-brand{
        color:white
    }
.navbar{
    min-width: 800px;
    color: white;
    background-image: linear-gradient(to right, #af2c77, #a4287a, #98257e,
     #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #7b20a6, #811db0,
      #871aba);    
}

@media only screen and (max-width: 1024px) {
.navbar{
    min-width: 920px;
    height:70px
}
}
@media only screen and (max-width: 768px) {
.navbar{
    min-width: 920px;
    height:70px
}
}
@media only screen and (max-width: 320px) {
.navbar{
    min-width: 700px;
    height:70px
}
}

@media only screen and (max-width: 375px) {
.navbar{
    min-width: 700px;
    height:70px
}
}
@media only screen and (max-width: 425px) {
.navbar{
    min-width: 425px;
    height:70px
}
}
</style>