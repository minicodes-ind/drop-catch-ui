<script>
    export default {
        methods:{
            backtohome(){
                this.$router.push('/home')
            },
            alerts(){
               this.$router.push('/users')
            },
            profile(){
                this.$router.push('/profile')
            }
        },
        emits: ["adduser_popover"]
    }
</script>
<template>
    <nav class="navbar navbar-expand-lg ">
                <Button  @click="backtohome" title="Home"
                    class="p-button-raised p-button-rounded homeButton"  
                    label="" icon="pi pi-home" iconPos="right"></Button>

                    <Button  @click="alerts" title="Alerts List"
                    class=" p-button-raised p-button-rounded alertsButton"  
                     icon="pi pi-bell" iconPos="right"></Button>

                     <Button  @click="profile" title="Profile"
                    class=" p-button-raised p-button-rounded profileButton"  
                     icon="pi pi-user" iconPos="right"></Button>
    </nav>
</template>
<style scoped>
.navbar-brand{
    color:white
}
.homeButton{
    border-color: rgb(85, 14, 126);;
    background-color: rgb(85, 14, 126);
}
.alertsButton{
    border-color: rgb(85, 14, 126);;
    background-color: rgb(85, 14, 126);
}
.profileButton{
    border-color: rgb(85, 14, 126);;
    background-color: rgb(85, 14, 126);
}
.butons{
    position: relative;
}
.navbar{
    color: white;
    /* background-image: linear-gradient(to right , #e9efff, #eeefff, #f3effe, #f7effd, #fbeffb, #fad8fa, #fad8fa, #faf0fc, #f6f0fe, #f2f1ff, #edf1ff, #e9f2ff);      border: 1px solid rgb(221, 178, 178); */
    margin-top: 10px;
    margin-right: 8px;
    border-radius: 40px;
    width:150px;
    height:75px;
    float: right;
}
.p-button-rounded{
    width: auto;
    margin: auto;
    margin-top: 10px ;
}

</style>