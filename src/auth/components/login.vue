

<script>
export default {
    mounted() {
        this.forgotPassword = false;
        this.loginModel = {
            email: "",
            password: ""
        };
    },
    data() {
        return {
            forgotPassword: false,
            loginModel: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        back() {
            this.forgotPassword = false

        },
        forgot() {
            this.forgotPassword = true
        },
        reset() {
            if (this.loginModel.email) {
                this.$emit("loading", true);
                fetch(`${this.API_URL}/api/resetpassword`, {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: this.loginModel.email })

                })
                    .then(response => response.json())
                    .then(response => {
                        this.$emit("loading", false);
                        if (response.status = 200) {
                            this.$emit("show_alert", { message: "New Password will be sent to Your mail", type: "success" });
                            this.$router.push('/');
                        }
                        else {
                            this.$emit("show_alert", { message: response.message, type: "error" });
                        }
                    })

                    .catch(err => {
                        console.log(err);
                        this.$emit("show_alert", true);
                        this.$emit("show_alert", { message: err, type: "Error" });
                    })
            }
        },


        signup() {
            this.$router.push('/signup');
        },
        login() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginModel.email)) {

                window.scrollBy(0, -1500);
                if (this.loginModel.password) {
                    this.$emit("loading", true);
                    fetch(`${this.API_URL}/api/login/`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: this.loginModel.email.toLowerCase().trim(),
                            password: this.loginModel.password
                        })

                    })
                        .then(response => response.json())
                        .then(response => {
                            localStorage.setItem('token', response.Token)
                            localStorage.setItem('email', response.email)
                            localStorage.setItem('name', response.name)
                            this.$emit("loading", false);
                            if (response.Token) {
                                //this.$emit("show_alert", {message: "Login Success", type: "success"});
                                this.$router.push('/home');
                            }
                            else {
                                this.$emit("show_alert", { message: response.message, type: "error" });
                            }
                        })

                        .catch(err => {
                            console.log(err);
                            this.$emit("show_alert", true);
                            this.$emit("show_alert", { message: err, type: "Error" });
                        })
                } else {
                    this.$emit("show_alert", { message: "Enter a Password", type: "info" });

                }
            }
            else {
                this.$emit("show_alert", { message: "Enter a Valid email", type: "info" });
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
        <div class="cont">
            <div class="loginlogoBox">
                <h1 class="projectTitle">Drop Catch</h1>
            </div>
            <div class="loginBox">
                <h4 v-show="!forgotPassword">Login to continue</h4>
                <span @click="back" v-show="forgotPassword" class="back"><i class="pi pi-arrow-circle-left"></i></span>
                <h4 v-show="forgotPassword">Enter your Email to reset Password</h4>
                <div class="p-grid p-fluid">
                    <div class="p-col-12 p-lg-4 box">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-user"></i></span>
                            <input class="tb" type="text" pInputText v-model="loginModel.email" placeholder="Email ID">
                        </div>
                    </div>
                    <div v-show="!forgotPassword" class="p-col-12 p-lg-4 box">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
                            <Password :feedback="false" toggleMask pInputText class="tb" v-model="loginModel.password"
                                placeholder="Password" @keyup.enter="login" />
                        </div>
                        <span @click="forgot" class="forgot">Forgot Password?</span>
                    </div>
                    <div v-show="!forgotPassword" class="loginbutton">
                        <Button @click="login" type="button" label="Login" class="    lb"></Button>
                    </div>
                    <div v-show="forgotPassword" class="loginbutton">
                        <Button @click="reset" type="button" label="Reset Password" class="     lb"></Button>
                    </div>
                    <p class="regMessage">Don't Have an account?
                        <router-link class="link" to="/signup">Register Now</router-link>
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
    margin: auto;
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
    height: 550px;
}

h4 {
    margin-top: 15px;
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
    height: 390px
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


/* --------------------------------------------------------------- 3564px ----------------- */
@media only screen and (max-width: 3564px) {
    body {
        padding: 10px 120px;
        background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
        background-repeat: no-repeat;
        min-height: 1000px;
        background-color: hwb(0 100% 0%);
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
        position: relative;
        font-weight: 800;
        font-style: italic;
        color: #a4287a;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

    }

    .cont {
        height: 650px;
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
        height: 450px
    }


}


/* ___________________________________________------------------------___ */

@media only screen and (max-width: 1440px) {
    body {
        padding: 10px 120px;
        background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
        background-repeat: no-repeat;
        min-height: 900px;
        background-color: hwb(0 100% 0%);
    }

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
        height: auto;
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
        height: auto;
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
        height: 600px;
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
        height: 350px;
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