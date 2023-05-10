<template>
    <v-main>
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>>mdi-chevron-right</v-icon>

          <h3 class="h2"> Regular Deposit</h3>
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">List Member</h3>
          
      </div>
      <v-card>
        <div class="mb-10" style="display: flex">
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Cari Data"
              single-line
              hide-details
              outlined
            ></v-text-field>
          </v-col>
        </div>
      </v-card>
      <v-card>
        <v-card-title>
          Member's Regular Deposit
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="members"
          :search="search"
          :loading="load"
          loading-text="Sedang mengambil data"
          no-data-text="Tidak ada Data"
        >
          <template v-slot:[`item.status`]="{ item }">
            <p v-if="item.status == 1">Active</p>
            <p v-else>Not Active</p>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="#AE8DC9" class="mr-2 white--text" @click="setDialogRegular(item)">
             Regular
            </v-btn>
            <v-btn color="#9B84D0" class="mr-2 white--text" @click="setDialogKelas(item)">
              Class
            </v-btn>
            
          </template>
  
        </v-data-table>
      </v-card>
      
      <v-dialog
        max-width="70%"
        v-model="dialog"
        persistent
        transition="dialog-bottom-transition">
        <v-card class="center" >
          <v-card-title>
            <div >
              <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">{{ formTitle }} Activation Transaction</span>
            </div>
          </v-card-title>
          <hr/>
          <v-card-text>
            <v-container>
                <v-select
                :items="members"
                v-model="form.id_member"
                label="Member's Name"
                item-value="id_member"
                item-text="nama_member"
                required
                ></v-select>
              <v-select
                :items="pegawai"
                v-model="form.id_kasir"
                label="Employee's Name"
                item-value="id_kasir"
                item-text="nama_kasir"
                required
                disabled>
              </v-select>

              <v-select
                :items="promo"
                v-model="form.id_promo"
                label="Promo"
                item-value="id"
                item-text="nama_promo"
                required>
              </v-select>

              <v-text-field
                v-model="form.deposit"
                label="Deposit"
                required></v-text-field>

            </v-container>
            <v-card-actions>
              <v-btn text @click="cancel">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text style="margin-left: 15px" @click="dialogConfirm = true">
                  Save
                </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
      
      <v-dialog
        max-width="70%"
        v-model="dialogKelas"
        persistent
        transition="dialog-bottom-transition">
        <v-card class="center" >
          <v-card-title>
            <div >
              <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">{{ formTitle }} Activation Transaction</span>
            </div>
          </v-card-title>
          <hr/>
          <v-card-text>
            <v-container>
                <v-select
                :items="members"
                v-model="form.id_member"
                label="Member's Name"
                item-value="id_member"
                item-text="nama_member"
                required
                ></v-select>
              <v-select
                :items="pegawai"
                v-model="form.id_kasir"
                label="Employee's Name"
                item-value="id_kasir"
                item-text="nama_kasir"
                required
                disabled>
              </v-select>

              <v-select
                :items="promo"
                v-model="form.id_promo"
                label="Promo"
                item-value="id_promo"
                item-text="nama_promo"
                required>
              </v-select>

              <v-text-field
                v-model="form.tanggal_transaksi"
                label="Date of Transaction"
                type="date"
                required></v-text-field>

            </v-container>
            <v-card-actions>
              <v-btn text @click="cancel">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text style="margin-left: 15px" @click="dialogConfirm = true">
                  Save
                </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
      

      <v-dialog 
      v-model="dialogConfirm" 
      persistent 
      max-width="300px">
        <v-card style="border-radius: 15px;">
          <v-card-title class="pa-0">
            <v-toolbar color="#B18CEF" elevation="0" height="70%">
              <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin: auto;">Alert!</span>   
            </v-toolbar>
          </v-card-title>
          <v-card-text class="mt-5" style="color:black" > Are you sure? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="dialogConfirm = false"> Cancel </v-btn>
            <v-btn text color="#9155FD" @click="submit"> Save </v-btn> 
            <!-- <v-btn v-if="inputType == 'Activate'" text color="#9155FD" @click="submit"> Activate </v-btn>  
            <v-btn v-else text color="#9155FD" @click="deactiveMember"> Deactive </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
      

      <v-snackbar v-model="snackbar" :color="color" bottom
        >{{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        deleteId: "",
        editId: "",
        inputType: "Regular",
        expanded: [],
        search: null,
        load: false,
        snackbar: false,
        members: [],
        promo: [],
        transactions: [],
        transaction: new FormData(),
        message: "",
        dialog: false,
        dialogKelas: false,
        color: "",
        dialogConfirm: false,
        
        pegawai: [ {
            id_kasir: localStorage.getItem("id_pegawai"),
            nama_kasir: localStorage.getItem("nama_pegawai"),
            }
        ],
        form: {
          id_member: null,
          id_kasir: localStorage.getItem("id_pegawai"),
          id_promo: null,
          deposit: null,
        },
        formDepoKelas: {
            id_member: null,
            id_kasir: localStorage.getItem("id_pegawai"),
            id_promo: null,
            id_kelas: null,
            deposit: null,
        },
        headers: [
        {
          text: "Id Number",
          value: "id_member",
        },
        {
          text: "Member's Name",
          value: "nama_member",
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Deposit Balance",
          value: "deposit_member",
        },
        {
          text: "Action",
          value: "actions",
        },
        ],
      };
    },
    computed: {
      formTitle() {
        return this.inputType;
      },
    },
    mounted() {
    this.getDataTransaction();
    this.getDataMember();
    this.getDataPromo();
    },
    methods: {
      getDataTransaction() {
        this.load = true;
        var url = this.$api + "/depositReguler";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.transactions = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataMember(){
        this.load = true;
        var url = this.$api + "/showActiveMember";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.members = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataPromo(){
        this.load = true;
        var url = this.$api + "/promo";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(response.data.data);
            this.promo = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      setDialogRegular(item) {
        this.dialog = true;
        this.form.id_member = item.id_member;
        this.form.id_kasir = localStorage.getItem("id_pegawai");
        this.form.id_promo = null;
        this.form.deposit = null;
      },
      setDialogKelas() {
        // this.dialog = true;
        // this.form.id_member = item.id_member;
        // this.form.id_kasir = localStorage.getItem("id_pegawai");
        // this.form.id_promo = '';
        // this.form.deposit = '';
      },
      submit() {
        if(this.form.id_member == null) {
          this.message = "Member's Name cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else if (this.form.id_promo == null) {
          this.message = "Promo cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
          if(this.form.id_promo == 2) {
            if(this.form.deposit < 500000) {
                this.message = "Deposit cannot be less than 500000";
                this.color = "error";
                this.snackbar = true;
                this.dialogConfirm = false;
            }
          }
        } else if (this.form.deposit == null){
            this.message = "Deposit cannot be empty";
            this.color = "error";
            this.snackbar = true;
            this.dialogConfirm = false;
        } else if (this.form.deposit < 0){
            this.message = "Deposit cannot be negative";
            this.color = "error";
            this.snackbar = true;
            this.dialogConfirm = false;
        }
        else {
            let formData = new FormData();
            console.log(this.form);
            formData.append("id_member", this.form.id_member);
            formData.append("id_kasir", this.form.id_kasir);
            formData.append("id_promo", this.form.id_promo);
            formData.append("deposit", this.form.deposit);
            this.load = true;
            var url = this.$api + "/depositReguler";
            this.$http
            .post(url, formData, {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                this.message = response.data.message;
                this.color = "success";
                this.snackbar = true;
                this.load = false;
                this.getDataTransaction();
                this.resetForm();
                this.dialog = false;
                this.dialogConfirm = false;
            })
            .catch((error) => {
                console.log(error.response.data.message);
                this.message = error.response.data.message;
                this.color = "error";
                this.snackbar = true;
                this.load = false;
            });
        }
      },
      cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Activate";
        this.getDataTransaction();
      },
      resetForm() {
        this.form = {
        id_member: "",
        id_kasir: localStorage.getItem("id_pegawai"),
        id_promo: "",
        deposit: "",
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
  }
  </style>
  
  <style>
  #app {
    margin-top: -10px;
    background-color: #ffffff;
  }
  @media screen {
    .v-data-table > .v-data-table__wrapper > table > tbody > tr:nth-child(odd) {
      border-left: 6px solid #1428de;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr:nth-child(even) {
      border-left: 6px solid #ffffff;
    }
  }
  </style>
  