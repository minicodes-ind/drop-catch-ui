<script>
export default {
    methods:{
            privacyPolicy() {
                this.$router.push('/privacy-policy')
            },
            termsAndConditions() {
               this.$router.push('terms-and-conditions')
            },
            aboutUs() {
                this.$router.push('/about-us')
            },
            shipping() {
                this.$router.push('/shipping')
            },
            cancellationAndRefund() {
                this.$router.push('/cancellation-and-refund')
            },
            contact() {
                this.$router.push('/contact')
            }

        },

}
</script>
<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <div class="footer">
                <a class="copyrights">&nbsp;@COPYRIGHTS 2022&nbsp;</a>
                <!-- <p class="footerText">
                    <a class="footerText" @click="privacyPolicy()">&nbsp;Privacy Policy&nbsp;</a>|
                    <a class="footerText" @click="contact()">&nbsp;Contact us&nbsp;</a> |
                    <a class="footerText" @click="termsAndConditions()">&nbsp;Terms and Conditions&nbsp;</a> |
                    <a class="footerText" @click="aboutUs()">&nbsp;About Us&nbsp;</a>
                </p> -->
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .copyrights {
        text-decoration: none;
        font-size: 14px;
        color: #ffffff;
    }

    .footer {
        position: fixed;
        bottom: 0;
       left: -0px;
        width:100%;
        background-image: linear-gradient(to right, #af2c77, #a4287a, #98257e, #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #7b20a6, #811db0, #871aba);
        border-top: 1px solid #782388;
        color: white;
        padding: 10px 0;
        text-align: center;
    }

    .footerText {
        cursor: pointer;
        margin: 0 10px;
        text-decoration: none;
        color: #ffffff;
    }

    .footerText:hover {
        color: #380342;
    }
   

    @media only screen and (max-width: 425px) {
        .footer {
            height: 50px;
            
        }
    }
</style>
