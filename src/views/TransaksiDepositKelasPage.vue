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
            <p class="text--primary">Deposit : {{Printdata.deposit }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Bonus Deposit : {{ Printdata.bonus_deposit }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Sisa deposit : {{ Printdata.sisa_deposit }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Total deposit : {{ Printdata.total_deposit }}</p>
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

    </v-main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        deleteId: "",
        editId: "",
        inputType: "Create",
        expanded: [],
        printDialog: false,
        search: null,
        searchBoxClosed: true,
        load: false,
        snackbar: false,
        members: [],
        transactions: [],
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
          id_promo: null,
          deposit: null,
        },
        dataprint: {
          no_struk: "",
          id_member: "",
          nama_member: "",
          deposit: "",
          jenis_kelas: "",
          total_deposit: "",
          tanggal_transaksi: "",
          masa_berlaku: "",
          nama_pegawai: "",
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
            text: "Total Deposit",
            value: "total_deposit",
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
        console.log(this.dataprint);
        return this.dataprint;
      },
    },
    mounted() {
    this.getDataTransaction();
    this.getDataMember();
    },
    methods: {
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
            console.log(this.transactions);
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
      print(item){
        console.log(item);
        this.printDialog = true;
        this.dataprint.no_struk = item.no_struk;
        this.dataprint.id_member = item.id_member;
        this.dataprint.nama_member = item.nama_member;
        this.dataprint.bonus_deposit = item.bonus_deposit;
        this.dataprint.deposit = item.deposit;
        this.dataprint.sisa_deposit = item.sisa_deposit;
        this.dataprint.total_deposit = item.total_deposit;
        this.dataprint.tanggal_transaksi = item.tanggal_transaksi;
        this.dataprint.id_kasir = item.id_kasir;
        this.dataprint.nama_pegawai = item.nama_pegawai;
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
  </style>
  