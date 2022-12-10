<script setup>
import Header from './Header.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

</script>
<script>
export default {
    data() {

        return {
            filters: { 'global': { value: null, matchMode: FilterMatchMode.CONTAINS } },

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
        exportCSV() {
            this.$refs.dt.exportPDF();
        },
        async getUsers() {
            this.$emit("loading", true);
            fetch(`${this.API_URL}/api/alerts/get?email=${localStorage.getItem('email')}`,
                {
                    method: "get",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",

                        "Authorization": "bearer " + localStorage.getItem('token')
                    },

                    body: JSON.stringify(this.userModel)
                })
                .then(response => response.json())
                .then(data => {
                    this.usersData = data.response;
                    this.usersData.map(data => data.current_Price = "₹ " + data.current_Price)
                    this.tableData();
                    console.log("Users Data", this.usersData);

                })
        },
        deleteAlert(url) {
            fetch(`${this.API_URL}/api/alerts/delete`,
                {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },

                    body: JSON.stringify({ email: localStorage.getItem('email'), url: url })
                })
                .then(this.$emit("show_alert", { message: "Alert Deleted Successfully", type: "info" }))
                .then(this.getUsers());

        },
        viewProduct(url) {
            window.open(url);
        },
        tableData() {
            this.$emit("loading", false);
            if (this.usersData.length > 0) {
                this.showTable = true;
                this.tableHeaders = Object.keys(this.usersData[0])
                    .map(val => val);
            } else {
                this.showTable = false;
                this.showAlert = true;
                return;
            }
        },
        confirmPosition(position, url, name) {
            this.$confirm.require({
                group: 'positionDialog',
                message: `Do you want to remove ${name.toUpperCase()} from your alert list?`,
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                position: position,
                accept: () => {
                    this.deleteAlert(url);
                },
                reject: () => {
                    // this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                },
                onHide: () => {
                    // this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
                }
            });
        },

    }
}
</script>

<template>
    <ConfirmDialog :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '50vw' }"></ConfirmDialog>
    <ConfirmDialog group="templating">
        <template #message="slotProps">
            <div class="flex p-4">
                <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                <p class="pl-2">{{ slotProps.message.message }}</p>
            </div>
        </template>
    </ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <header>
        <Header @adduser_popover="handlePopover($event)" />
    </header>
    <div class="container-fluid ">

        <!-- <table v-if="showTable" class="text-center">
                    <th class="p-3" v-for="header of tableHeaders">{{header.replace("_", " ").toUpperCase()}}</th>
                    <th class="p-1">ACTION</th>
                    <tr v-for="user of usersData">
                        <td class="p-3" v-for="header of tableHeaders">{{user[header]}}</td>
                        <td class="p-1"><button class="btn btn-danger">Delete</button></td>
                    </tr>
                </table> -->
        <h2 style="text-align: center;">Alert List</h2>

        <div class="card">
            <DataTable :value="usersData" :paginator="true" :rows="5"  ref="dt"  responsiveLayout="stack"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
                :alwaysShowPaginator="false" :globalFilterFields="['product_name', 'url', 'current_Price']"
                v-model:filters="filters" filterDisplay="menu" :rowHover="true" >
              
                <template #header>
                    <div class="flex justify-content-center align-items-center">

                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search here..." />
                        </span>
                    </div>
                </template>
                <template #empty>
                    <div class="boxforSearch">
                        <img class="searchAnim" src="../../src/assets/searchAnim.gif">
                        <div>Sorry Boss, there is nothing like
                            <strong>"{{ filters['global'].value }}"</strong>
                        </div>
                    </div>


                </template>
                <template #loading>
                    <img src="../../src/assets/searchAnim.gif">
                    Loading Alerts Please wait.
                </template>
                <Column v-for="headers of tableHeaders" :field="headers" style="text-align: center;font-size: small;"
                 :header="headers.replace('_', ' ').replace('product name','ITEM').toUpperCase()" :key="headers"
                    :sortable="true">  </Column>
                <Column :exportable="false" class="cols">
                    <template #body="usersData">
                        <Button @click="confirmPosition('bottom', usersData.data.url, usersData.data.product_name)"
                            icon="pi pi-trash" label="Remove" class="p-button-danger mr-2 tablebtn"
                            title="Delete Alert"></Button>
                            
                        <Button icon="pi pi-globe" label="View Product" class="mr-2 tablebtn"
                            @click="viewProduct(usersData.data.url)" title="View product on site"></Button>
                           
                    </template> 
                   
                </Column>
                <column >
                </column>
            </DataTable>
                <div class="shareBox">
                    <button label="Share Alert List" class=" share"
                            @click="exportCSV($event)" title="Share Alert List">
                            <i class="pi pi-external-link"></i>
                            Share Alert List</button>
                </div>
        </div>
    </div>

</template>

<style scoped>
.shareBox{
    width:auto;
    margin:auto;
}
.share{
    border:#782388;
   background-image: linear-gradient(to right, #af2c77, #a4287a, #98257e,
    #8a2481, #7c2483, #782388, #74238d, #6f2393, #75229d, #7b20a6, #811db0,
     #871aba);    
   border-radius: 10px;
   width:auto;
   margin: auto;
   text-align: center;
   margin-top: 10px;
   padding: 10px;
   color: white;
}
.shareBox :hover {
    padding: 10.2px;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);

}
.boxforSearch {
    width: auto;
    margin: auto;
    width: 300px;
    padding: 22px;
    border-radius: 30px;
    background-color: white;
}

.searchAnim {
    margin: auto;
    width: 200px;
}

.tablebtn {
    border-radius: 10px;
    margin-top: 3px;
    min-width: 150px;
}
.tablebtn :hover {
    padding:1px 1px;
}
.container-fluid {
    margin-top: 130px;
    padding: 10px 100px;
}

.cols {
    color: blue;
    background-color: aqua;
}

.card {
    padding: 3px;
    border: 2px solid rgb(148, 147, 147);
    border-radius: 5px;
    box-shadow:  1px 10px 10px 10px rgb(199, 194, 194);
    background-color: rgb(199, 208, 218);
    margin-bottom: 100px;
    margin-top: 30px;
}


@media only screen and (max-width: 425px) {
    body{
        width:424px;
    }
    .container-fluid {
    width:420px;
    margin-top: 130px;
    padding: 5px 12px;
}
.card {
    padding: 3px;
    border-radius: 5px;
    box-shadow:  1px 10px 10px 10px rgb(199, 194, 194);
    background-color: rgb(199, 208, 218);
}

}
</style>