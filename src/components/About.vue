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
        },
        home(){
            this.$router.push('/home')
        }
    }

}
</script>

<template>
    <div>
        <!-- <header>
            <Header @adduser_popover="handlePopover($event)" />
        </header> -->
        <div class="container fade-in-from-right">
            <h1 class="title">About Us</h1>
            <div class="section">
                <h2>Welcome to DropCatch</h2>
                <p >DropCatch is an automation tool designed to track prices from online shopping sites and promptly alert customers about price drops.</p>
            </div>
            
            <div class="section">
                <h2>How To Use</h2>
                <ol>
                    <li>Copy the link of any product you want to set a price drop alert for.</li>
                    <li>Don't worry about additional text included with the copied URL.</li>
                    <li>Click on 'Add New Alert' on the <router-link to="/home">home page</router-link> and paste the URL.</li>
                    <li>Your alert will be set!</li>
                </ol>
                <p><b>Note:</b> Make sure you have selected the size of the product (if applicable) before copying the link for accurate alerts.</p>
            </div>
    
            <div class="section">
                <h2>How It Works</h2>
                <ol>
                    <li>Collecting users' email addresses to notify them.</li>
                    <li>Gathering and saving URLs of your favorite products.</li>
                    <li>Our bots will check for price changes regularly.</li>
                    <li>If there is a price change, we'll notify you via email.</li>
                    <li>Update the saved price.</li>
                </ol>
                <p><b>Note:</b> Price changes are determined within the individual shopping platforms, and we do not influence them.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        padding: 50px;
        font-family: Arial, sans-serif;
        overflow-x: auto;
        max-width: 100%;
    }

    .section {
        margin-bottom: 40px;
    }

    h1, h2 {
        color: #333;
        transition: color 0.3s ease;
    }

    p {
        color: #666;
        line-height: 1.6;
        transition: color 0.3s ease;
    }

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

    ol {
        padding-left: 20px;
    }

    a {
        cursor: pointer;
        text-decoration: none;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: #f6d7fd;
        color: #333;
        transition: background-color 0.3s ease;
    }

    a:hover {
        background-color: #e8c4f4;
    }

    .title {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 30px;
    }
</style>
