<template>
    <v-main>
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>>mdi-chevron-right</v-icon>

          <h3 class="h2"> Activation Transaction</h3>
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">List Member</h3>
          
      </div>
      <v-card>
        <div class="mb-10" style="display: flex">
          <v-col>
            <v-text-field
              v-model="search"
              dense filled rounded clearable placeholder="Search" 
              prepend-inner-icon="mdi-magnify" 
              class="pt-6 shrink expanding-search" 
              :class="{ closed: searchBoxClosed && !search }"
              @focus="searchBoxClosed = false"
              @blur="searchBoxClosed = true">
            ></v-text-field>
          </v-col>
          <div class="ml-auto">
            <v-btn
              class="mt-9 mr-2 pt-5 pb-5"
              color="#9155FD"
              style="font-weight: bold; color: white"
              @click="getDeactiveMember">
              Today's Deactivated <br> Member
            </v-btn>
          </div>
        </div>
      </v-card>

      <v-card>
        <v-card-title>
          Member's Activitation Transaction
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="members"
          :search="search"
          :loading="load"
          loading-text="Loading Data"
          no-data-text="No Data Available"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn v-if="item.status == 1"  disabled color="#AE8DC9" class="mr-2 white--text" @click="activate(item)">
             Activate
            </v-btn>
            <v-btn v-else color="#AE8DC9" class="mr-2 white--text" @click="activate(item)">
             Activate
            </v-btn>
            <v-btn v-if="item.status == 0" disabled color="#9B84D0" class="mr-2 white--text" @click="btnDeactive(item.id_member)">
              Deactive
            </v-btn>
            <v-btn v-else color="#9B84D0" class="mr-2 white--text" @click="btnDeactive(item.id_member)">
              Deactive
            </v-btn>
            <!-- <v-btn color="#8753DE" class="mr-2 white--text" @click="resetPassword(item)">
              Reset Password
            </v-btn> -->
          </template>
  
          <template v-slot:[`item.status`]="{ item }">
            <p v-if="item.status == 1">Active</p>
            <p v-else>Not Active</p>
          </template>
  
          <template v-slot:[`item.masa_berlaku`]="{ item }">
            <p v-if="item.masa_berlaku == null">-</p>
            <p v-else>{{ item.masa_berlaku }}</p>
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
              <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">{{ formTitle }} Member</span>
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

              <!-- <v-text-field
                v-model="form.tanggal_transaksi"
                label="Date of Transaction"
                type="date"
                required></v-text-field> -->

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
            v-model="dialogDeactiveMember"
            persistent
            transition="dialog-bottom-transition">
            <v-card class="center" >
              <v-card-title>
                <div >
                  <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">Today Deactivated Members</span>
                </div>
              </v-card-title>
              <hr/>
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Member's Name</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Active Until</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in deactiveMembers" :key="item.id_member">
                        <td class="text-left">{{ item.id_member }}</td>
                        <td class="text-left">{{ item.nama_member }}</td>
                        <td class="text-left">{{ item.masa_berlaku }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="cancel">
                    Cancel
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
          <v-card-text class="mt-5" style="color:black" > Are you sure to {{ inputType }} this member? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="dialogConfirm = false"> Cancel </v-btn>
            <v-btn v-if="inputType == 'Activate'" text color="#9155FD" @click="submit"> Activate </v-btn>  
            <v-btn v-else text color="#9155FD" @click="deactiveMember"> Deactive </v-btn>
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
        editId: "",
        inputType: "Activate",
        expanded: [],
        search: null,
        searchBoxClosed: true,
        load: false,
        snackbar: false,
        members: [],
        deactiveMembers: [],
        transactions: [],
        transaction: new FormData(),
        message: "",
        dialog: false,
        color: "",
        dialogConfirm: false,
        dialogDeactiveMember: false,
        pegawai: [ {
            id_kasir: localStorage.getItem("id_pegawai"),
            nama_kasir: localStorage.getItem("nama_pegawai"),
            }
        ],
        form: {
          id_member: null,
          id_kasir: localStorage.getItem("id_pegawai"),
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
          text: "Email",
          value: "email_member",
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Active Until",
          value: "masa_berlaku",
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
    },
    methods: {
      setForm() {
        if (this.inputType == "Activate") {
            this.submit();
        }
      },
      getDataTransaction() {
        this.load = true;
        var url = this.$api + "/aktivasi";
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
        var url = this.$api + "/member";
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
      activate(item) {
        this.dialog = true;
        this.form.id_member = item.id_member;
        this.form.id_kasir = localStorage.getItem("id_pegawai");
      },
      submit() {
        if(this.form.id_member == null) {
          this.message = "Member's Name cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else {
            let formData = new FormData();
            console.log(this.form);
            formData.append("id_member", this.form.id_member);
            formData.append("id_kasir", this.form.id_kasir);
            this.load = true;
            var url = this.$api + "/aktivasi";
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
                // console.log(error.response.data);
                this.message = error.response.data.message;
                this.color = "error";
                this.snackbar = true;
                this.load = false;
            });
        }
      },
        btnDeactive(id_member) {
        this.editId = id_member;
        this.inputType = "Deactive";
        this.dialogConfirm = true;
      },
        deactiveMember() {
            this.load = true;
            var url = this.$api + "/member/deactiveMember/" + this.editId;
            this.$http
            .put(url, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.message = "Member has been deactivated";
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.dialogConfirm = false;
          this.getDataMember();
          this.resetForm();
          this.inputType = "Activate";
        })
        .catch((error) => {
          this.message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
      },
      getDeactiveMember(){
        this.load = true;
        var url = this.$api + "/showDeactiveMember";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.deactiveMembers = response.data.data;
            console.log(this.deactiveMembers);
            this.dialogDeactiveMember = true;
            this.load = false;
          });
        this.load = true;
      },
      cancel() {
        this.resetForm();
        this.dialog = false;
        this.dialogConfirm = false;
        this.dialogDeactiveMember = false;
        this.inputType = "Activate";
        this.getDataTransaction();
      },
      resetForm() {
        this.form = {
        id_member: "",
        id_kasir: localStorage.getItem("id_pegawai"),
        tanggal_transaksi: "",
        biaya_transaksi: "",
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
  