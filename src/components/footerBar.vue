<script>
export default {


}
</script>
<template>
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">

            <div class="footer">
                <!-- <div style="margin-bottom:7px">
                    <img style="width: 35px; " src="../assets/DCLOGO.png"/>&nbsp; Dropcatch &trade;
                </div> -->
                <a class="copyrights">&nbsp;@COPYRIGHTS 2022&nbsp;</a>
                <p class="footerText">
                    <a class="footerText" href="https://sites.google.com/view/privacy-policy-drop-catch/home">&nbsp;
                        Privacy Policy&nbsp;</a>|
                    <a class="footerText" href="mailto:dropcatchalerts@outlook.com">&nbsp;Conatct us&nbsp;</a>
                </p>

            </div>

        </div>
    </nav>
</template>
<style scoped>
.copyrights {
    text-decoration: none;
    font-size: 14px;
    color: #ffffff
}

.DClogo {
    width: 20px;
    float: left;
    margin-right: 5px;
}

.footer {
    width: auto;
    margin: auto;

    text-align: center;
    color: #782388;
    padding: 0px 0px;
}

.footerText {

    width: auto;
    margin: auto;
    text-decoration: none;
    text-align: center;
    color: #ffffff;

}

.footerText :hover {
    color: #380342
}

.navbar {
  
    position: relative;
    bottom: 0;
    overflow: hidden;
    min-width: 800px;
    color: white;
    border-top: 1px solid #782388;
    background-image: linear-gradient(to right, #af2c77, #a4287a, #98257e,
            #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #7b20a6, #811db0,
            #871aba);
}

@media only screen and (max-width: 3268px) {
    .navbar {
        width: 100%;
        height: 70px
    }
}

@media only screen and (max-width: 768px) {
    .navbar {
        min-width: 920px;
        height: 70px
    }
}

@media only screen and (max-width: 320px) {
    .navbar {
        min-width: 700px;
        height: 93px
    }
}

@media only screen and (max-width: 375px) {
    .navbar {
        min-width: 700px;
        height: 93px
    }
}

@media only screen and (max-width: 425px) {
    .navbar {
        min-width: 425px;
        height: 63px
    }
}
</style>