<template>
    <v-main>
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Class Deposit</h3>
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
              class="mt-9 mr-2"
              color="#9155FD"
              style="font-weight: bold; color: white"
              link
              tag="router-link"
              :to="'/memberDeposit'">
              View Member List
            </v-btn>
          </div>
        </div>
      </v-card>

      <v-card>
        <v-card-title>
          List Data of Deposit (Class)
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="transactions"
          :search="search"
          :loading="load"
          loading-text="Loading Data"
          no-data-text="No Data Available"
        >
        <template v-slot:[`item.actions`]="{ item }">
           <v-icon color="black" @click="print(item)">mdi-printer</v-icon>

            <v-icon class="ml-5" color="black" @click="SetDialogReset(item)">mdi-refresh</v-icon>
        </template>

        <template v-slot:[`item.deposit`]="{ item }">
            <p> Rp. {{ formatNumber(item.deposit) }}</p>
        </template>
        </v-data-table>
      </v-card>
      
      <v-snackbar v-model="snackbar" :color="color" bottom
        >{{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-dialog
      max-width="70%"
      v-model="printDialog"
      persistent
      transition="dialog-bottom-transition">
      
      <v-card class="center" style="padding: ;">
        <v-card-text>
          <v-row class="pt-5">
            <p style="font-weight: bold;" class="text--primary">GoFit</p>
            <v-spacer></v-spacer>
            <p class="pr-16 text--primary">No Struk : {{ Printdata.no_struk }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jl. Centralpark No.10 Yogyakarta</p>
            <v-spacer></v-spacer>
            <p class="text--primary">Tanggal : {{ Printdata.tanggal_transaksi }}</p>
          </v-row>
          <v-row>
            <p style="font-weight: bold;" class="text--primary">Member :</p>
            <p class="text--primary" style="float: left;"> {{ Printdata.id_member }} / {{ Printdata.nama_member}}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Deposit : Rp. {{ formatNumber(Printdata.deposit) }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jenis Kelas : {{ Printdata.nama_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Total Deposit {{ Printdata.nama_kelas }} : {{ Printdata.deposit_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Masa Berlaku : {{ Printdata.masa_berlaku }}</p>
          </v-row>
          <v-row class="mt-0">
            <v-spacer></v-spacer>
            <p class="text--primary pr-16">Kasir : P{{ Printdata.id_kasir }}/{{ Printdata.nama_pegawai }}</p>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="windowPrint()">Print</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="printDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      fullscreen
      v-model="printView"
      persistent
      transition="dialog-bottom-transition">
      
      <v-card class="center" style="padding: ;">
        <v-card-text>
          <v-row class="pt-5">
            <p style="font-weight: bold;" class="text--primary">GoFit</p>
            <v-spacer></v-spacer>
            <p class="pr-16 text--primary">No Struk : {{ Printdata.no_struk }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jl. Centralpark No.10 Yogyakarta</p>
            <v-spacer></v-spacer>
            <p class="text--primary">Tanggal : {{ Printdata.tanggal_transaksi }}</p>
          </v-row>
          <v-row>
            <p style="font-weight: bold;" class="text--primary">Member :</p>
            <p class="text--primary" style="float: left;"> {{ Printdata.id_member }} / {{ Printdata.nama_member}}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Deposit : Rp. {{ formatNumber(Printdata.deposit) }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jenis Kelas : {{ Printdata.nama_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Total Deposit {{ Printdata.nama_kelas }} : {{ Printdata.deposit_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Masa Berlaku : {{ Printdata.masa_berlaku }}</p>
          </v-row>
          <v-row class="mt-0">
            <v-spacer></v-spacer>
            <p class="text--primary pr-16">Kasir : P{{ Printdata.id_kasir }}/{{ Printdata.nama_pegawai }}</p>
          </v-row>
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
          <v-card-text class="mt-5" style="color:black" > Are you sure to reset this class deposit? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="dialogConfirm = false"> Cancel </v-btn>
            <v-btn text color="#9155FD" @click="resetDeposit"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-main>
  </template>
  
  <script>
  import numeral from "numeral";
  export default {
    data() {
      return {
        deleteId: "",
        editId: "",
        inputType: "Create",
        expanded: [],
        printDialog: false,
        printView: false,
        search: null,
        searchBoxClosed: true,
        load: false,
        snackbar: false,
        members: [],
        transactions: [],
        reset: [],
        transaction: new FormData(),
        message: "",
        dialog: false,
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
          id_promo: 3,
          deposit: null,
        },
        dataprint: {
          no_struk: "",
          id_member: "",
          nama_member: "",
          deposit: "",
          jenis_kelas: "",
          deposit_kelas: "",
          masa_berlaku: "",
          nama_pegawai: "",
          nama_kelas: "",
        },
        headers: [
          {
            text: "Id Transaction",
            value: "no_struk",
          },
          {
            text: "Member's Name",
            value: "nama_member",
          },
          {
            text: "Deposit Class",
            value: "deposit_kelas",
          },
          {
            text: "Deposit",
            value: "deposit",
          },
          {
            text: "Active Until",
            value: "masa_berlaku",
          },
          {
            text: "Action",
            value: "actions",
          }
        ],
      };
    },
    computed: {
      formTitle() {
        return this.inputType;
      },
      Printdata() {
        // console.log(this.dataprint);
        return this.dataprint;
      },
    },
    mounted() {
    this.getDataTransaction();
    this.getDataMember();
    },
    methods: {
      formatNumber(value){
        return numeral(value).format('0,0.00');
      },
      getDataTransaction() {
        this.load = true;
        var url = this.$api + "/depositKelas";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.transactions = response.data.data;
            // console.log(this.transactions);
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
      SetDialogReset(item){
        this.editId = item.no_struk;
        this.dialogConfirm = true;
      },
      resetDeposit(){
        this.load = true;
        var url = this.$api + "/resetDeposit/" + this.editId;
        this.$http
            .put(url, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.message = response.data.message;
          this.color = "success";
          this.snackbar = true;
          this.getDataTransaction();
          this.dialogConfirm = false;
          this.reset = response.data.data;
          console.log(this.reset);
          this.load = false;
        })
        .catch((error) => {
          this.message = error.response.data.message;
          this.color = "error";
          this.snackbar = true;
          this.load = false;
          this.dialogConfirm = false;
        });
      },
      print(item){
        // console.log(item);
        this.printDialog = true;
        this.dataprint.no_struk = item.no_struk;
        this.dataprint.id_member = item.id_member;
        this.dataprint.nama_member = item.nama_member;
        this.dataprint.deposit = item.deposit;
        this.dataprint.deposit_kelas = item.deposit_kelas;
        this.dataprint.tanggal_transaksi = item.tanggal_transaksi;
        this.dataprint.id_kasir = item.id_kasir;
        this.dataprint.nama_pegawai = item.nama_pegawai;
        this.dataprint.nama_kelas = item.nama_kelas;
        this.dataprint.masa_berlaku = item.masa_berlaku;
      },
      windowPrint(){
        this.printDialog = false;
        this.printView = true;
        setTimeout(() => {
          window.print();
        }, 300);
        setTimeout(() => {
          this.printView = false;
        }, 500);
      },
      cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Create";
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

@media print {

html, body {
  height:100%; 
  margin: 0 !important; 
  padding: 0 !important;
  overflow: hidden;
}
}
  </style>
  