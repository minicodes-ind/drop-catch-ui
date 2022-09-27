<script setup>
import Toast from 'primevue/toast';
</script>

<script >
export default {
        props: {
           success: false,
           error: false,
           info: false,
          errorDetail: "",
           message: "",
           detail: ""
        },
        
        watch: {
           success(newVal, _) {
                if(newVal === true) {
                        this.successAlert({summary: this.message, detail: this.detail });
                         this.$emit("shown_alert");
                }
           },
           error(newVal, _) {
                if(newVal === true) {
                      this.errorAlert({error: this.errorDetail,summary: this.message});
                        this.$emit("shown_alert");
                }
           },
           info(newVal, _) {
                 if(newVal === true) {
                        this.infoAlert({summary: this.message, detail: this.detail});
                        this.$emit("shown_alert");                
                        }
           }
        },
        methods: {
        successAlert({summary, detail}){
                this.$toast.add({severity:"success", summary: summary, detail: detail, life: 3000});
                },
        errorAlert({error, summary}){
                this.$toast.add({severity:'error', summary: summary, detail: error, life: 3000});
                }, 
        infoAlert({summary, detail}){
                this.$toast.add({severity:'info', summary: summary, detail: detail, life: 3000});
                }
        }
}
</script>

<template>
        <Toast />
</template>


