
<script setup>


import Header from './Header.vue';
</script>

<script>
export default {

    mounted() {

        window.scrollBy(0, -1500);
    },
    methods: {

        addAlert() {
            this.$emit('adduser_popover', true);
        },

    },
    emits: ["adduser_popover"]
}

</script>



<template>
    <header>
        <Header @adduser_popover="handlePopover($event)" />
    </header>

    <div>
        <!-- <div id="adsterra"></div> -->
    </div>

    <body>

        <div class="mainContainer fade-in-from-right" style="text-align: center;">
            
            <div class="banner">
                <img class="welcome-anim" src="../../src/assets/home-anim.gif" />
            </div>

            <div class="card-group cDiv" style="width:auto;margin:auto;margin-top:13px">

                <div class="card" style="width: 18rem;text-align: center; 
    background-image: linear-gradient(to right , #e9efff, #eeefff, #f3effe, #f7effd, #fbeffb, #fad8fa, #fad8fa, #faf0fc, #f6f0fe, #f2f1ff, #edf1ff, #e9f2ff);    
   color:white;border-radius:10px;margin-left:24px; ">
                    <div class="card-body">
                        <h4 class="card-title">Add New Product Alerts Here</h4>
                        <h6>Supported Sites</h6>
                        <p class="list">• Amazon</p>
                        <p class="list">• Flipkart</p>
                        <p class="list">• Myntra</p>

                    </div>

                    <div class="card-footer">
                        <Button @click="addAlert" class=" p-button-raised p-button-rounded add" label="Add New Alert"
                            icon="pi pi-bell" iconPos="right"></Button>
                    </div>
                </div>
            </div>
            
        </div>
    </body>
</template>



<style  scoped>
.fade-in-from-right {
    opacity: 0;
    animation: fadeInFromRight 1s forwards;
}

@keyframes fadeInFromRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.title {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
}

.welcome-anim {
    width: auto;
    margin: auto;
    height: 250px;
}

.banner {
    width: auto;
    margin: auto;
    position: relative;
    height: auto;
}

.add {
    background-color: #6f2393;
    border: #6f2393;
}

.mainContainer {
    margin-top: 10px;

}

body {
    padding: 80px;
    border: 1px solid rgb(255, 255, 255);
    /* background-color: #dc98fc   ; */
}

p {
    line-height: 1.5;
    margin: 0;
}

h4 {
    color: #6f2393
}

h6 {
    color: #6f2393
}

.list {
    text-align: center;
    color: #6f2393
}

/* .card{
  
   margin-left: 19px;
    width: auto;
    margin: auto;
    width: 15px;
}
.crd{
    width: 10rem;
    background-image: linear-gradient(to right, #af2c77, #a4287a, #98257e,
     #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #af2c77, #a4287a, #98257e);   
    color:white;
    border-radius:10px;
    margin-left:5px;
    margin-top:5px;
    
} */


@media only screen and (max-width: 425px) {
    body {
        padding: 10px;
        width: 420px;
    }

    .crd {
        width: 10rem;
        background-image: linear-gradient(to right, #af2c77, #a4287a, #98257e,
                #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #af2c77, #a4287a, #98257e);
        color: white;
        border-radius: 10px;

        padding: 5px;
        width: auto;
        margin: auto;
        margin-top: 15px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .mainContainer {
        width: 315px;
        margin: auto;
        margin-top: 110px;

    }

}
</style>