<script >
export default {

    mounted() {
        this.isVerified = false;
        this.isOtpSent = false;

        this.repassword = "",
            this.onetimepass = "",
            this.signupModel = {
                name: "",
                email: "",
                password: "",
            };

    },
    data() {
        return {
            isVerified: false,
            isOtpSent: false,
            repassword: "",
            onetimepass: "",
            signupModel: {
                name: "",
                email: "",
                password: "",
            }
        };
    },
    methods: {
        sendOTP() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.signupModel.email)) {
                if (this.signupModel.password &&
                    this.repassword &&
                    this.signupModel.name &&
                    this.signupModel.email
                ) {
                    if (this.repassword == this.signupModel.password) {
                        const min = 111111; const max = 999999
                        const otp = Math.ceil(Math.random() * (max - min))
                        const storedotp = otp * 4343
                        localStorage.setItem('address', storedotp)
                        this.$emit("loading", true);
                        this.isOtpSent = true;

                        fetch(`${this.API_URL}/api/sendemail/8124`, {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: this.signupModel.email,
                                name: this.signupModel.name,
                                message: `Welcome to Dropcatch Your One time password is ${otp} 
                            please do not share your OTP with any one`,
                                subject: `${otp} is your Dropcatch OTP`
                            })

                        })
                            .then(response => response.json())
                            .then(response => {
                                this.$emit("loading", false);
                                this.$emit("show_alert", { message: "OTP SENT", type: "success" });
                                this.$emit("show_alert",
                                    { message: "Check your Spam Folder if You don't receive", type: "info" });


                            })

                            .catch(err => {
                                console.log(err);
                                this.$emit("show_alert", true);
                                this.$emit("show_alert", { message: err, type: "Error" });
                            })
                    }
                    else {
                        this.$emit("show_alert", { message: "Passwords doesn't Match", type: "info" });
                    }
                } else {
                    this.$emit("show_alert", { message: "Enter All Fields", type: "info" });

                }
            } else {
                this.$emit("show_alert", { message: "Invalid Email", type: "info" })
            }


        },




        signup() {

            window.scrollBy(0, -1500);
            if (this.onetimepass) {
                const otpgot = localStorage.getItem('address')

                const processed = parseInt(otpgot) / 4343;
                if (this.onetimepass == processed) {
                    this.$emit("loading", true);
                    fetch(`${this.API_URL}/api/signup/`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: this.signupModel.name,
                            email: this.signupModel.email.toLowerCase().trim(),
                            password: this.signupModel.password
                        })

                    })
                        .then(response => response.json())
                        .then(response => {
                            this.$emit("loading", false);
                            if (response.status == 201) {
                                this.$emit("show_alert", { message: response.message, type: "success" });
                                this.$router.push('/');
                                localStorage.removeItem('address')
                            }
                            else {
                                if (response.raw_response.code == 11000) {
                                    this.$emit("show_alert", { message: response.message, type: "error" });
                                }
                                else {
                                    this.$emit("show_alert", { message: "Unknown Error occurred", type: "error" });
                                }
                            }
                        })

                        .catch(err => {
                            console.log(err);
                            this.$emit("show_alert", true);
                            this.$emit("show_alert", { message: err, type: "Error" });
                        })
                }
                else {
                    this.$emit("show_alert", { message: " ", type: "info" });
                }

            }
            else {
                this.$emit("show_alert", { message: "Incorrect OTP", type: "info" });
            }

        }
    },
}
</script>
<template>
    <html>

    <body>
        <div class="welcomeBanner">
            <div class="logoBox">
                <h1 class="projectTitle">
                    Meet Mr.Catch, who catches all your favourite price drops

                </h1>
                <div>
                    <img class="helloAnim" src="../../assets/welcome-hello.gif" />
                </div>

                <h3>Step 1: copy the link of your favourite product</h3>
                <h3>Step 2: Give it to us</h3>
                <h3>Step 3: And get notified whenever the price drops</h3>
                <h2 class="yeah">Yeah, it's simple as that !</h2>

            </div>
        </div>
        <div class="cont ">
            <div class="loginlogoBox">
                <h1 class="projectTitle">Drop Catch</h1>


            </div>

            <div class="loginBox">
                <h4>Welcome to Drop Catch</h4>
                <div class="p-grid p-fluid">
                    <div class="p-col-12 p-lg-3 box">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-user"></i></span>
                            <input class="tb" type="text" pInputText v-model="signupModel.name" placeholder="Name">
                        </div>
                    </div>
                    <div class="p-col-12 p-lg-3 box">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-at"></i></span>
                            <input class="tb" type="email" pInputText v-model="signupModel.email" placeholder="Email">
                        </div>
                    </div>

                    <div class="p-col-12 p-lg-3 box">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
                            <Password class="tb" pInputText v-model="signupModel.password" placeholder="Password" />
                            <!--<span class="p-inputgroup-addon">.00</span>-->
                        </div>
                    </div>
                    <div class="p-col-12 p-lg-3 box">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
                            <Password :feedback="false" toggleMask pInputText class="tb" v-model="this.repassword"
                                placeholder="Re-Enter Password" @keyup.enter="sendOTP()" />
                            <!--<span class="p-inputgroup-addon">.00</span>-->
                        </div>
                    </div>

                    <div v-show="this.isOtpSent" class="p-col-12 p-lg-3 box">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
                            <Password :feedback="false" toggleMask pInputText class="tb" v-model="this.onetimepass"
                                placeholder="Enter OTP" @keyup.enter="signup()" />
                            <!--<span class="p-inputgroup-addon">.00</span>-->
                        </div>
                    </div>

                    <div v-show="this.isOtpSent" class="loginbutton">
                        <Button @click="signup()" type="button" label="Verify and Signup" class="   lb"></Button>
                    </div>

                    <div v-show="!this.isOtpSent" class="loginbutton">
                        <Button @click="sendOTP()" type="button" label="Send OTP Mail" class="   lb"></Button>
                    </div>


                    <p class="regMessage">Already Have an account?
                        <router-link to="/">Login Now</router-link>
                    </p>

                </div>
            </div>
        </div>
    </body>

    </html>
</template>
    
 
<style scoped>
.projectTitle {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 800;
    font-size: xx-large;
    color: rgb(119, 11, 133);
    box-shadow: #75229d;
}

h3 {
    padding: 3px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 900;
    font-size: larger;
    text-align: left;
    color: #6f2393;
}

.yeah {
    font-weight: 800;
    font-style: italic;
    color: #a4287a;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.helloAnim {
    height: 300px
}

.welcomeBanner {
    position: absolute;
    float: left;
    width: 400px;
    margin-top: 50px;
}

body {
    padding: 10px 120px;
    background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
    background-repeat: no-repeat;
    min-height: 700px;
    background-color: hwb(0 100% 0%);
}

.pi-arrow-circle-left {
    margin: auto;
    width: auto;
    font-size: 30px;
}

.back {

    color: white;
    width: auto;
}

.forgot {
    cursor: help;
    color: rgb(0, 217, 255);
    float: right;
    font-size: 13px;
    margin: 5px 0px 15px 0px;
}

.logoBox {
    width: auto;
    position: absolute;
    align-content: flex-start;
    height: 20px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
}

.loginlogoBox {
    width: auto;
    position: absolute;
    align-content: flex-start;
    height: 20px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
}

.orionbranding {
    color: rgb(58, 57, 57);
}

.cont {
    position: relative;
    float: right;
    background-image: linear-gradient(to right top, #e9efff, #eeefff, #f3effe, #f7effd, #fbeffb, #fad8fa, #fad8fa, #faf0fc, #f6f0fe, #f2f1ff, #edf1ff, #e9f2ff);
    margin-top: 150px;
    padding: 50px;
    border: 2px solid rgb(183, 187, 185);
    border-radius: 50px;
    box-shadow: 0px 10px rgb(238, 200, 214);
    width: 500px;
    height: 650px;
}

h4 {
    margin-top: 1px;
    margin-bottom: 25px;
    text-align: center;
    color: white;
}

.tb {
    border: 1px solid white;
    width: 350px;
    height: 40px;
}

.box {

    width: 450px;
}

.loginBox {
    /* position:inherit; */
    box-shadow: 0px 10px rgb(195, 199, 201);
    padding: 80px;
    border-radius: 50px;
    background-image: radial-gradient(circle, #af2c77, #a4287a, #98257e,
            #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #7b20a6, #811db0,
            #871aba);
    width: 500px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
    /* margin-left: 540px; */
    height: 520px
}

.loginbutton {
    margin: auto;
    margin-top: 10px;
}

.registerButton {

    margin: auto;
    margin-top: 1px;
}

.lb {
    border: #6f2393;
    background-image: linear-gradient(to right top, #e107ac, #e70baa, #ec10a8, #f215a5, #f71aa3, #fa1ea8, #fc22ac, #ff26b1, #fe2cbf, #fd33cc, #fa3adb, #f543e9);
    font-weight: 500;
    border-radius: 8px;
}


.regMessage {
    margin-top: 15px;
    color: rgb(219, 219, 219);
    text-align: center;
}

.link {
    color: rgb(0, 217, 255);
}

@media only screen and (max-width: 2564px) {
    body {
        padding: 10px 120px;
        background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
        background-repeat: no-repeat;
        min-height: 1000px;
        background-color: hwb(0 100% 0%);
    }

    .cont {
        height: 720px;
        margin: 55px 10px;
        padding: 55px;
        border: 2px solid rgb(183, 187, 185);
        border-radius: 50px;
        width: auto;
    }

    .logoBox {
        width: auto;
        position: relative;
        align-content: center;
        height: 30px;
        margin: auto;
    }

    .box {
        margin-top: -12px;
        width: auto;
    }

    .tb {
        border: 1px solid white;
        width: 450px;
        height: 50px;
    }

    .loginBox {
        position: relative;
        box-shadow: 0px 10px rgb(195, 199, 201);
        padding: 50px;
        border-radius: 50px;
        width: 590px;
        margin: auto;
        margin-bottom: 150px;
        margin-top: 110px;
        height: 510px
    }


}

/* ___________________________________________------------------------___ */

@media only screen and (max-width: 1440px) {

    .cont {

        margin: 35px 10px;
        padding: 15px;
        border: 2px solid rgb(183, 187, 185);
        border-radius: 50px;
        width: auto;
    }

    .logoBox {
        width: auto;
        position: relative;
        align-content: center;
        height: 20px;
        margin: auto;
    }

    .box {
        margin-top: -12px;
        width: auto;
    }

    .tb {
        border: 1px solid white;
        width: 400px;
        height: 40px;
    }

    .loginBox {
        position: relative;
        box-shadow: 0px 10px rgb(195, 199, 201);
        padding: 50px;
        border-radius: 50px;
        width: 390px;
        margin: auto;
        margin-bottom: 150px;
        margin-top: 70px;

    }


}

/* =============================================================1024======================================== */

@media only screen and (max-width: 1024px) {
    .yeah {
        font-size: x-large;
    }

    h3 {
        background-color: rgb(236, 232, 232);
        border-radius: 10px;
        font-size: large;
        text-align: center;
        color: #6f2393;
    }

    .welcomeBanner {
        margin-bottom: 500px;
        position: relative;
        float: left;
        width: 690px;
        margin-top: 50px;
    }

    body {
        padding: 10px 150px;
        background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
        background-repeat: no-repeat;
        width: 1024px;
        background-color: hwb(0 100% 0%);
    }

    .cont {
        position: relative;
        float: left;
        padding: 50px;
        border: 2px solid rgb(183, 187, 185);
        border-radius: 50px;
        box-shadow: 0px 10px rgb(197, 207, 207);
        width: auto;

    }

    .logoBox {
        float: none;
        width: auto;
        text-align: center;
        margin-top: 10px;
        position: relative;
        margin-left: 0px;
    }

    .box {
        margin-top: 10px;
        width: auto;
    }

    .tb {
        border: 1px solid white;
        width: 610px;
        height: 60px;
    }

    .loginBox {
        position: relative;
        box-shadow: 0px 10px rgb(195, 199, 201);
        padding: 50px;
        border-radius: 50px;
        width: 560px;
        height: 650px;
        margin: auto;
        margin-bottom: 75px;
        margin-top: 120px;

    }

    h2 {
        font-size: small;
    }

    .loginbutton {
        height: 70px;
    }

    .regMessage {
        font-size: small;
    }
}

/* ===================================================================768============= */

@media only screen and (max-width: 768px) {
    h3 {
        background-color: rgb(236, 232, 232);
        border-radius: 10px;
        font-size: large;
        text-align: center;
        color: #6f2393;
    }

    .welcomeBanner {
        margin-bottom: 500px;
        position: relative;
        float: left;
        width: 690px;
        margin-top: 50px;
    }

    body {
        padding: 10px 150px;
        background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
        background-repeat: no-repeat;
        width: 920px;
        background-color: hwb(0 100% 0%);
    }

    .cont {
        position: relative;
        float: left;
        padding: 50px;
        border: 2px solid rgb(183, 187, 185);
        border-radius: 50px;
        box-shadow: 0px 10px rgb(197, 207, 207);
        width: auto;

    }

    .logoBox {
        float: none;
        width: auto;
        text-align: center;
        margin-top: 10px;
        position: relative;
        margin-left: 0px;
    }

    .box {
        margin-top: 10px;
        width: auto;
    }

    .tb {
        border: 1px solid white;
        width: 610px;
        height: 60px;
    }

    .loginBox {
        position: relative;
        box-shadow: 0px 10px rgb(195, 199, 201);
        padding: 50px;
        border-radius: 50px;
        width: 560px;
        height: 490px;
        margin: auto;
        margin-bottom: 75px;
        margin-top: 110px;

    }

    h2 {
        font-size: small;
    }

    .loginbutton {
        height: 70px;
    }

    .regMessage {
        font-size: small;
    }
}


/* ===================================================================425============= */

@media only screen and (max-width: 425px) {
    .header {
        visibility: hidden;
    }

    h3 {
        background-color: rgb(236, 232, 232);
        border-radius: 10px;
        font-size: large;
        text-align: center;
        color: #6f2393;
    }

    .yeah {
        font-size: xx-large;
    }

    .welcomeBanner {
        margin-bottom: 500px;
        position: relative;
        float: left;
        width: 420px;
        margin-top: 50px;
    }

    body {
        padding: 100px 0px;
        background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
        background-repeat: no-repeat;
        width: 425px;
        background-color: hwb(0 100% 0%);
    }

    .cont {
        position: relative;
        float: left;
        padding: 10px;

        border: 2px solid rgb(183, 187, 185);
        border-radius: 50px;
        box-shadow: 0px 10px rgb(197, 207, 207);
        width: 400px;
        height: 630px;
    }

    .logoBox {
        float: none;
        width: 420px;
        text-align: center;
        margin-top: 10px;
        position: relative;
        margin-left: 0px;
        padding: 5px;

    }

    .box {
        margin-top: 10px;
        width: auto;
    }

    .tb {
        border: 1px solid white;
        width: 280px;
        height: 39px;
    }

    .loginBox {
        position: relative;
        box-shadow: 0px 10px rgb(195, 199, 201);
        padding: 20px;
        border-radius: 50px;
        width: 360px;
        height: 450px;
        margin: auto;
        margin-bottom: 75px;
        margin-top: 90px;


    }

    h2 {
        font-size: small;
    }

    .loginbutton {
        height: 70px;
    }

    .regMessage {
        font-size: small;
    }

    .projectTitle {

        text-align: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 800;
        font-size: x-large;
        color: rgb(119, 11, 133);
        box-shadow: #75229d;
    }
}
</style>