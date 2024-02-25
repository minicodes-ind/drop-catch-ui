<script setup>
import Header from './Header.vue';

</script>
<script>
export default {
    data() {
        return {
            subject: '',
            message: ''
        }
    },
    methods: {
        sendEmail() {
            let mailtoLink = `mailto:dropcatchalerts@outlook.com?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(this.message)}`;
            window.location.href = mailtoLink;
        }
    }
}
</script>

<template>
    <div class="container fade-in-from-right">
        <h1 class="title">Contact Us</h1>
        <h3 class="sub-title">Share your thoughts with us!</h3>
        <form @submit.prevent="sendEmail" class="contact-form">

            <div class="form-group">
                <label for="subject" class="form-label">Subject:</label>
                <input type="text" class="form-control" id="subject" v-model="subject" placeholder="Enter subject...">
            </div>
            <div class="form-group">
                <label for="message" class="form-label">Message:</label>
                <textarea class="form-control" id="message" rows="5" v-model="message"
                    placeholder="Enter your message..."></textarea>
            </div>
            <!-- <button  class="btn btn-primary">
        Send Email <i class="fas fa-arrow-right"></i>
    </button> -->
            <Button type="submit" title="Home" class="p-button-raised p-button-rounded btn btn-primary" label="Send Email"
                icon="pi pi-send" iconPos="right"></Button>
        </form>
    </div>
</template>

<style scoped>
.container {
    padding: 50px;
    margin-bottom: 50px;
    font-family: Arial, sans-serif;
    overflow-x: auto;
    /* Add horizontal scrollbar if needed */
    max-width: 100%;
    /* Allow container to shrink */
}

.contact-form {
    max-width: 500px;
    margin: auto;
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

.form-group {
    margin-bottom: 20px;
}

.form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Add shadow */
}

.form-control:focus {
    border-color: #6f2393;
}

.btn-primary {
    background-color: #6f2393;
    border: 1px solid #6f2393;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    float: right;
    /* Move button to the right */
}

.btn-primary:hover {
    background-color: #8c3ea1;
}

.title {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
}

.sub-title {
    text-align: center;
    margin-bottom: 30px;
}

/* Style for the arrow icon */
.btn-primary i {
    margin-left: 5px;
}</style>

