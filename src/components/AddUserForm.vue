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
        emits: ["opened_modal", "spinner", "show_alert", "loading" , "addanim", "data_added"],
        methods: {

            handleUserSubmit() {
                if(this.userModel.url.startsWith('https://amzn')){
                    this.$refs.closeButton.$el.click();
                this.$emit("addanim", true);
                fetch(`${this.API_URL}/api/alerts/add`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(
                        {
                        name:sessionStorage.getItem('name'),
                        email:sessionStorage.getItem('email'),
                        url:this.userModel.url,
                        }
                        )
                    
                })
                .then(response => response.json())
                .then(data => {
                    this.$refs.closeButton.$el.click();

                    this.$emit("addanim", false);
                    this.$emit("data_added", data);
                    if(data.status==200 || data.status==201){
                        this.$emit("show_alert", {message: data.message, type: "success"});
                    }
                    else{
                        this.$emit("show_alert", {message: data.message, type: "error"});
                    }
                    
                })
                
                .catch(err => {
                    console.log(err);
                    this.$emit("addanim", false);
                    this.$emit("show_alert", true);
                    this.$refs.closeButton.$el.click();
                    this.$emit("show_alert", {message: err, type: "error"});
                })
            }
            
        else{
            this.$emit("show_alert", {message: "unsupported url", type: "error"});
        }
    }
        },
        watch: {
            showModal(newVal, oldVal) {
                console.log(newVal, oldVal);
                if((newVal !== oldVal) && (newVal === true)) {
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

    <div id="addModal" class="modal" tabindex="-1">
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
                              
                               
                                <div class="col-md-12">
                                    <label for="Product URL" class="form-label ">Product URL</label>
                                    <input v-model="userModel.url" type="text" class="form-control linkbox" placeholder="Enter the Product URL" id="Product URL">
                                </div>
                                <!-- <div class="col-md-12">
                                    <label for="Nick Name" class="form-label">Nick Name</label>
                                    <input v-model="userModel.nickname" type="text" class="form-control" placeholder="Enter a Nick Name for your product" id="Nick Name">
                                </div> -->
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <Button id="closeButton" ref="closeButton" type="button" class="p-button-raised p-button-rounded p-button-danger" data-bs-dismiss="modal">Close</Button>
                    <Button @click="handleUserSubmit" type="button" class="p-button-raised p-button-rounded buttonbg">Add Alert</Button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.linkbox{
    height:70px;
    word-wrap: break-word;
}
.p-button{
    margin-left: 5px;
}
.modal{
    
    font-weight: 700;
    color:#6f2393;
}
.modal-title{
    font-weight: 700;
    color: #541372;
}
.modal-body{
    
    background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);    background-repeat: no-repeat;

}
.modal-header{
    background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);    background-repeat: no-repeat;

}
.modal-footer{
    background-image: linear-gradient(to left, #deabf5, #e4adf1, #e9b0ed, #edb3ea, #f1b6e7, #f4b1e8, #f8ace8, #fba7e8, #fd98ec, #fe89f2, #fe79f8, #fc68ff);    background-repeat: no-repeat;

}
.buttonbg{
    border-color: #541372;
    background-color: #541372;
}
</style>