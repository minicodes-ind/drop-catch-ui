<script>
export default {
    mounted() {

        this.userModel = {

            url: "",
            nickname: ""
        };
    },
    data() {
        return {
            userModel: {

                url: "",
                nickname: ""
            }
        };
    },
    props: {
        showModal: false
    },
    emits: ["opened_modal", "spinner", "show_alert", "loading", "addanim", "data_added"],
    methods: {
        async pasteText() {
            const inputElement = this.$refs.linkText;
            inputElement.focus();
            const clipboardContent = await navigator.clipboard.readText();
            this.userModel.url = clipboardContent;
        },
        clear() {
            this.userModel.url = "";
        },
        isUrlValid() {
            if (
                this.userModel.url.startsWith('https://amzn') ||
                this.userModel.url.startsWith('https://www.flipkart.com') ||
                this.userModel.url.startsWith('https://dl.flipkart.com') ||
                this.userModel.url.startsWith('https://www.myntra')
            ) {
                if (this.userModel.url.includes('?')) {
                    this.userModel.url = this.userModel.url.substr(0, this.userModel.url.indexOf('?'))
                }
                if (this.userModel.url.includes(' ')) {
                    const url = this.userModel.url.split(' ');
                    this.userModel.url = url[0];
                    console.log("EDITED URL ", this.userModel.url)
                }
                return true;
            }
            return false;
        },
        async handleUserSubmitWithLastCopiedUrl() {
            await this.pasteText();
            await this.handleUserSubmit();
        },
        handleUserSubmit() {
            const trimmedURL = this.userModel.url;
            const position = trimmedURL.search(/https/i);
            this.userModel.url = trimmedURL.slice(position);


            console.log("url 1", this.userModel.url)
            if (this.isUrlValid()) {
                this.$refs.closeButton.$el.click();
                this.$emit("addanim", true);
                console.log("url 1", this.userModel.url)

                fetch(`${this.API_URL}/api/alerts/add`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },
                    body: JSON.stringify(
                        {
                            name: localStorage.getItem('name'),
                            email: localStorage.getItem('email'),
                            url: this.userModel.url,
                        }
                    )

                })
                    .then(response => response.json())
                    .then(data => {
                        this.$refs.closeButton.$el.click();

                        this.$emit("addanim", false);
                        this.$emit("data_added", data);
                        if (data.status == 200 || data.status == 201) {
                            this.$emit("show_alert", { message: data.message, type: "success" });
                            this.clear()
                        }
                        else {
                            this.$emit("show_alert", { message: data.message, type: "error" });
                            this.clear()
                        }

                    })

                    .catch(err => {
                        console.log(err);
                        this.$emit("addanim", false);
                        this.$emit("show_alert", true);
                        this.$refs.closeButton.$el.click();
                        this.$emit("show_alert", { message: err, type: "error" });
                        this.clear()
                    })
            }

            else {
                this.$emit("show_alert", { message: "unsupported url", type: "error" });
            }
        }
    },
    watch: {
        showModal(newVal, oldVal) {
            console.log(newVal, oldVal);
            if ((newVal !== oldVal) && (newVal === true)) {
                this.$refs.hiddenButton.click();
                this.$emit("opened_modal");
            }
        }
    }
}
</script>
<template>
    <div>
        <!--This project contains html bootstrap which opens modal with attributes. v-show has been used on purpose-->
        <button ref="hiddenButton" type="button" v-show="false" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#addModal">
            Launch demo modal
        </button>

        <div id="addModal" class="modal modal-tansition" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Alert Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <form>
                                <div class="row">
                                    <div>
                                        <p>
                                            1. Choose the share option of your favourite product <br>
                                            2. Choose copy link <br>
                                            3. Paste the link here and click Add Alert !
                                        </p>
                                    </div>

                                    <div class="col-md-12">
                                        <label for="Product URL" class="form-label ">Enter URL Here</label>

                                        <div class="p-inputgroup input-container">
                                            <input ref="linkText" v-model="userModel.url" type="text"
                                                class="form-control linkbox"
                                                placeholder="Example: https://anysite/d/11MN43s" id="Product URL">



                                        </div>
                                        <div class="helper-button-box">
                                            <Button class="p-button helper-button p-button-raised p-button-rounded"
                                                @click="clear()"> Clear </Button>
                                            <Button class="p-button helper-button p-button-raised p-button-rounded"
                                                @click="pasteText()"> Paste</Button>
                                            <Button @click="handleUserSubmit" type="button"
                                                class="p-button-raised p-button-rounded buttonbg">Add Alert</Button>

                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="splbutton">
                            <Button id="closeButton" ref="closeButton" type="button" hidden
                                class="p-button-raised p-button-rounded " data-bs-dismiss="modal">Add Alert with Last Copied
                                URL</Button>
                            <Button @click="handleUserSubmitWithLastCopiedUrl" type="button"
                                class="p-button-raised p-button-rounded buttonbg">Add Alert with Last Copied URL</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.input-container {
    border: 1px solid #f8cbe2;
    padding: 2px;
    border-radius: 5px;
}
.modal-tansition {
        opacity: 0;
        animation: fadeInFromRight 1s forwards;
    }

    @keyframes fadeInFromRight {
        0% {
        opacity: 0;
        transform: scale(0);
        }

        100% {
        opacity: 1;
        transform: scale(1);
        }
    }
.helper-button-box {
    text-align: center;
    margin: 5px;
}

.helper-button {
    padding-right: 50px;
    margin: 3px;
    height: 40px;
    width: 60px;
    text-align: center;
    background-color: #d63384;
    border: #d63384;
}

.linkbox {
    text-align: center;
    text-decoration-style: solid;
    height: 70px;
    word-wrap: break-word;
    color: #541372;
    font-weight: bold;
    text-shadow: #deabf5;
}

.p-button {
    margin-left: 5px;
}

.modal {
    font-weight: 700;
    color: #6f2393;
}


.modal-title {
    font-weight: 700;
    color: #541372;
}

.modal-body {
    background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
    background-repeat: no-repeat;

}

.modal-header {
    background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
    background-repeat: no-repeat;

}

.modal-footer {
    background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);
    background-repeat: no-repeat;

}

.buttonbg {
    border-color: #541372;
    background-color: #541372;
}

.splbutton {
    width: auto;
    margin: auto;
}

@media (max-width: 768px) {
        .modal-dialog {
            max-width: 100%;
            margin: 0;
        }
}

@media (max-width: 576px) {
    .modal,
    .modal-dialog,
    .modal-body,
    .modal-content,
    .modal-header,
    .modal-footer {
        padding: 2px;
        width: 100%;
    }
 
}
</style>