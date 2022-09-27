<script setup>
    import Header from './Header.vue';

</script>
<script>
    export default {
        data() {
     
                return {
                usersData: [],
                showTable: false,
                showAlert: false,
                tableHeaders: []
            }
        },
        
        props: {
            newUser: null
        },
        emits: ["show_alert"],
        mounted() {
            this.getUsers();
        },
        watch: {
            newUser(newVal, oldVal) {
                console.log("new user added", newVal, oldVal);
                this.usersData = [...this.usersData, newVal.raw_response];
            }
        },
        methods: {
            async getUsers() {
                this.$emit("loading", true);
                fetch(`${this.API_URL}/api/alerts/get?email=${sessionStorage.getItem('email')}`,
                {
                    method: "get",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": "bearer " + sessionStorage.getItem('token')
                    },
                   
                    body: JSON.stringify(this.userModel)
                })
                .then(response => response.json())
                .then(data => {
                    this.usersData = data.response;
                    this.tableData();
                    console.log("Users Data", this.usersData);
                })
            },
            deleteUser(id){
                // delete functionality
                this.$emit("show_alert", {message: "User Deleted Successfully", type: "info"});

            },
            viewProduct(url){
                window.open(url);
            },
            tableData() {
                this.$emit("loading", false);
                if(this.usersData.length > 0) {
                    this.showTable = true;
                    this.tableHeaders = Object.keys(this.usersData[0])
                    .map(val => val);
                } else {
                    this.showTable = false;
                    this.showAlert = true;
                    return;
                }
            },
           
        }
    }
</script>

<template>

<header>
    <Header @adduser_popover="handlePopover($event)" />
  </header>
    <div class="container-fluid">
        
        <!-- <table v-if="showTable" class="text-center">
            <th class="p-3" v-for="header of tableHeaders">{{header.replace("_", " ").toUpperCase()}}</th>
            <th class="p-1">ACTION</th>
            <tr v-for="user of usersData">
                <td class="p-3" v-for="header of tableHeaders">{{user[header]}}</td>
                <td class="p-1"><button class="btn btn-danger">Delete</button></td>
            </tr>
        </table> -->
        

        <DataTable :value="usersData" :paginator="true" :rows="5" responsiveLayout="stack" showGridlines paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users" :alwaysShowPaginator="false">
            <Column v-for="headers of tableHeaders" :field="headers" 
            :header="headers.replace('_', ' ').toUpperCase()" :key="headers"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="usersData">
                    <Button icon="pi pi-globe" label="View Product" class="p-button-rounded  mr-2" @click="viewProduct(usersData.data.url)" ></Button>
                    <Button icon="pi pi-trash" label="Remove" class="p-button-rounded p-button-danger mr-2" @click="deleteUser(usersData.data.id)" ></Button>

                </template>
            </Column>
        </DataTable>
        
    </div>

</template>

<style scoped>
.container-fluid{
    margin-top: 130px;
  padding: 50px 20px;
}
</style>