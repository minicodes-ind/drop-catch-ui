<template>
    <header>
        <Header @adduser_popover="handlePopover($event)" />
    </header>
    <div class="container">
        <div>
        <h2>
            Hello Boss Choose Your Plan to buy tickets
        </h2>
        <img class="helloAnim" src="../assets/helloanimation.gif">
        </div>
        

        <div >
          
            <div class="card-group">
                <div v-for = "data in priceList" class="card" style="text-align: center; 
            background-image: linear-gradient(to right , #e9efff, #eeefff, #f3effe, #f7effd, #fbeffb, #fad8fa, #fad8fa, #faf0fc, #f6f0fe, #f2f1ff, #edf1ff, #e9f2ff);    
            color:white;border-radius:10px;margin-left:24px; ">
                    <div class="card-body">
                        <img src="../assets/ticket.png" class="ticket"> <a class="item">X {{ data.tickets }}</a>
                        <h4>{{data.tickets}} Tickets @</h4> 
                        <h4>₹{{data.price}}</h4>
                        
                        <Button @click="habdleBuyTickets(data)" type="button"
                                class="p-button-raised p-button-rounded buttonbg">Buy Now ₹{{data.price}}</Button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.helloAnim {
    width: 220px;
}

.container {
    padding: 50px;
}
a{
    color: #6f2393;
}
.item {
    box-shadow: #6f2393;
   style:none;
   font-style: none;
}
.buttonbg {
    border-color: #541372;
    background-color: #541372;
}
h4 {
    color: #6f2393
}

h6 {
    color: #6f2393
}
.ticket{
    width:50px
}
</style>
<script>
export default {
    data() {
        return {
            priceList : [
                {
                    price: 50,
                    tickets: 5
                },
                {
                    price: 90,
                    tickets: 10
                },
                {
                    price: 170,
                    tickets: 20
                },
            ]
        }
    },
    mounted(){
        console.log("PRICELIST", this.priceList)
    },
    emits: ["opened_modal", "spinner", "show_alert", "loading", "addanim", "data_added"],

    methods: {
        async habdleBuyTickets(data) {
            this.$emit("show_alert", { message: "response.message", type: "success" });

            let options = {
        "key": "rzp_test_0crnvzTOTZwzwR", // Enter the Key ID generated from the Razorpay Setting -> API Keys
        "amount": data.price*100, // Amount is in currency. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Drop Catch",
        "description": "Test Transaction",
        "image": "./src/assets/DCLOGO2.png",
        "handler": function (response){
            fetch(`${this.API_URL}/api/orders/add`, {
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
                            tickets: data.tickets,
                            price: data.price,
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                        }
                    )

                })
            .then(function (response) {
                this.$emit("show_alert", { message: response.message, type: "success" });
            })
            .catch(function (error) {
                this.$emit("show_alert", { message: "Something went Wrong", type: "error" });

            });
        },
        "prefill": {
            "name":  localStorage.getItem('name'),
            "email": localStorage.getItem('email'),
        },
        "notes": {
            "address": "Customer Address"
        },
        "theme": {
            "color": "#6f2393"
        }
    };
    var rzp = new Razorpay(options);

    rzp.on('payment.failed', function (response){
        axios.post("PAYMENT_FAILURE_API", {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            code: response.error.code,
            description: response.error.description,
        })
        .then(function (response) {
            // Show failed message
        })
        .catch(function (error) {
            // Show error message
        });
    });
    rzp.open();
        }
    }
}
</script>
<script setup>


import Header from './Header.vue';
</script>