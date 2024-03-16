<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <img class="DClogo" src="../assets/DCLOGO2.png">
            <a class="navbar-brand" href="#">Dropcatch&trade;</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" @click="home" :class="{ 'active': activeTab === 'home' }">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="aboutUs" :class="{ 'active': activeTab === 'about' }">ABOUT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="contact" :class="{ 'active': activeTab === 'contact' }">CONTACT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="termsAndConditions" :class="{ 'active': activeTab === 'terms' }">TERMS AND CONDITIONS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="privacyPolicy" :class="{ 'active': activeTab === 'privacy' }">PRIVACY POLICY</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="cancellationAndRefund" :class="{ 'active': activeTab === 'cancellationAndRefund' }">CANCELLATION AND REFUND</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'home' // Set default active tab
        }
    },
    methods: {
        home() {
            this.activeTab = 'home';
            this.$router.push('/home')
        },
        aboutUs() {
            this.activeTab = 'about';
            this.$router.push('/about-us')
        },
        contact() {
            this.activeTab = 'contact';
            this.$router.push('/contact')
        },
        termsAndConditions() {
            this.activeTab = 'terms';
            this.$router.push('/terms-and-conditions')
        },
        privacyPolicy() {
            this.activeTab = 'privacy';
            this.$router.push('/privacy-policy')
        },
        cancellationAndRefund() {
            this.activeTab = 'cancellationAndRefund'
            this.$router.push('/cancellation-and-refund')
        }
    }
}
</script>

<style scoped>
    .DClogo {
        width: 50px;
        margin-right: 5px;
    }
    .navbar-brand {
        color: rgb(131, 19, 116);
    }
    .navbar-nav .nav-item {
        color: white;
        position: relative;
    }
    .navbar-nav .nav-link {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        transition: color 0.3s ease;
        position: relative;
    }
    .navbar-nav .nav-link:hover {
        color: #ccc; /* Change color as needed */
    }
    .navbar-nav .nav-link::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        background-color:rgb(85, 14, 126);
        transition: width 0.3s ease; /* Add transition effect */
    }
    .navbar-nav .nav-link.active::after {
        width: 100%; /* Change width to 100% when active */
    }
</style>



