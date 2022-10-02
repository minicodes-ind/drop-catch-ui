        <script setup>
            import Header from './Header.vue';
            import ConfirmDialog from 'primevue/confirmdialog';
            import {FilterMatchMode,FilterOperator} from 'primevue/api';

        </script>
        <script>
            export default {
                data() {
            
                        return {
                        filters: {'global': {value: null, matchMode: FilterMatchMode.CONTAINS}},
                    
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
                    deleteAlert(url){
                        fetch(`${this.API_URL}/api/alerts/delete`,
                        {
                            method: "DELETE",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "bearer " + sessionStorage.getItem('token')
                            },
                        
                            body: JSON.stringify({email: sessionStorage.getItem('email'), url: url})
                        })
                        .then( this.$emit("show_alert", {message: "Alert Deleted Successfully", type: "info"}))
                        .then(this.getUsers());
                    
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
        <ConfirmDialog :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}"></ConfirmDialog>
        <ConfirmDialog group="templating">
                        <template #message="slotProps">
                            <div class="flex p-4">
                                <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                                <p class="pl-2">{{slotProps.message.message}}</p>
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
                <h2 style="text-align: center;">ALert List</h2>
            <div class="card">
                <DataTable :value="usersData" :paginator="true" :rows="5" 
                        responsiveLayout="stack" 
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                        :rowsPerPageOptions="[5,10,25]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users" :alwaysShowPaginator="false"
                        :globalFilterFields="['product_name','url','current_Price']"
                        v-model:filters="filters" filterDisplay="menu"
                        :rowHover="true"
                        >
                        <template #header>
                        <div class="flex justify-content-center align-items-center">
                            
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search here..." />
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        Go Home Add New Alerts.
                    </template>
                    <template #loading>
                        Loading Alerts Please wait.
                    </template>
                    <Column v-for="headers of tableHeaders" :field="headers" style="text-align: center;
                   font-size: medium;"
                    :header="headers.replace('_', ' ').toUpperCase()" :key="headers" :sortable="true"></Column>
                    <Column :exportable="false"  class="cols" >
                        <template #body="usersData" >
                            <Button @click="confirmPosition('bottom', usersData.data.url, usersData.data.product_name)" 
                            icon="pi pi-trash" label="Remove" class="p-button-danger mr-2 tablebtn" title="Delete Alert"></Button>

                            <Button icon="pi pi-globe" label="View Product" class="mr-2 tablebtn" 
                            @click="viewProduct(usersData.data.url)" title="View product on site"></Button>

                        </template>
                    </Column>
                </DataTable>
            </div>   
            </div>

        </template>

        <style scoped>
            .tablebtn{
                margin-top: 3px;
                min-width: 150px;
            }
        .container-fluid{
            margin-top: 130px;
            padding: 50px 20px;
        }
        .cols{
            color:blue;
            background-color: aqua;
        }
        .card{
            padding: 6px;
            border-radius: 5px;
            box-shadow: -3px 3px rgb(220, 221, 223);
            background-color: rgb(212, 233, 252);
        }
        </style>