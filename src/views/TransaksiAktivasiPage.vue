<template>
    <v-main>
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Activation Transaction</h3>
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
          <div style="margin-top: 5px" class="ml-auto">
            <v-btn
              class="mx-2 mt-4 mb-4"
              color="#9155FD"
              style="font-weight: bold; color: white"
              link
              tag="router-link"
              :to="'/aktivasiMember'">
              View Member List
            </v-btn>
          </div>
        </div>
      </v-card>
      <v-card>
        <v-card-title>
          List Data of Activation Transaction
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
            <p class="pr-16 text--primary">No Struk : {{ Printdata.no_struk_akt }}</p>
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
            <p class="text--primary">Aktivasi Tahunan : {{ Printdata.biaya_transaksi }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Masa aktif Member : {{ Printdata.masa_berlaku }}</p>
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
        search: null,
        load: false,
        printDialog: false,
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
        dataprint: {
          no_struk_akt: "",
          id_member: "",
          nama_member: "",
          masa_berlaku: "",
          tanggal_transaksi: "",
          biaya_transaksi: "",
          id_kasir: "",
          nama_pegawai: "",
        },
        headers: [
          {
            text: "Id Transaction",
            value: "no_struk_akt",
          },
          {
            text: "Member's Name",
            value: "nama_member",
          },
          {
            text: "Date of Transaction",
            value: "tanggal_transaksi",
          },
          {
            text: "Price",
            value: "biaya_transaksi",
          },
          {
            text: "Action",
            value: "actions",
          }
        ],
      };
    },
    computed: {
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
      print(item){
        console.log(item);
        this.printDialog = true;
        this.dataprint.no_struk_akt = item.no_struk_akt;
        this.dataprint.id_member = item.id_member;
        this.dataprint.nama_member = item.nama_member;
        this.dataprint.masa_berlaku = item.masa_berlaku;
        this.dataprint.tanggal_transaksi = item.tanggal_transaksi;
        this.dataprint.biaya_transaksi = item.biaya_transaksi;
        this.dataprint.id_kasir = item.id_kasir;
        this.dataprint.nama_pegawai = item.nama_pegawai;
      },
      windowPrint(){
        window.print();
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
    body {
    height: 0%;
    width: 0%;
    overflow: hidden;
    margin: 0;
    padding: 0;

  }
}
  </style>
  