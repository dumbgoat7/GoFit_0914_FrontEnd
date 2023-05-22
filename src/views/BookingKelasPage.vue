<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Booking Class</h3>
      </div>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Dates"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-text-field v-model="searchClassName" label="What class are you searching for?" type="text"></v-text-field>

      <v-card>
        <v-card-title>
            List Data of Gym Attendance
        </v-card-title>
        
        <v-data-table
            :headers="headers"
            :items="filteredItems"
            :loading="load"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
            loading-text="Loading Data"
            no-data-text="No Booking on this date">
            
            <template v-slot:[`item.status_presensi`]="{ item }">
            <p class="mt-3" v-if="item.status_presensi == 1">Attended</p>
            <p class="mt-3" v-else-if="isToday(item.tanggal_booking) && item.status_presensi == 0">Not yet take attendance</p>
            <p class="mt-3" v-else-if="isPastDate(item.tanggal_booking) && item.status_presensi == 0">Did not attend</p>
            <p class="mt-3" v-else-if="isFutureDate(item.tanggal_booking) && item.status_presensi == 0">-</p>
           </template>

           <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-btn v-if="item.status_presensi == 1 && item.metode_pembayaran == 1" text color="purple" @click="setPrintPaket(item)"> Print</v-btn>
              <v-btn v-if="item.status_presensi == 1 && item.metode_pembayaran == 0" text color="purple" @click="setPrint(item)"> Print</v-btn>
              
            </td>
          </template>

        </v-data-table>
        </v-card>

        <v-dialog
      max-width="30%"
      v-model="printDialog"
      persistent
      transition="dialog-bottom-transition">
      
      <v-card class="center" style="padding: ;">
        <v-card-text>
          <v-row class="pt-5">
            <p style="font-weight: bold;" class="text--primary">GoFit</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jl. Centralpark No.10 Yogyakarta</p>
          </v-row>
          <v-row>
            <p style="font-weight: bold;" class="text--primary">STRUK PRESENSI KELAS</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">No Struk : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.id }} </p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Tanggal : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.tanggal_presensi }}</p>
          </v-row>
          
          <v-row>
            <p style="font-weight: bold;" class="text--primary">Member : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.id_member }} / {{ Printdata.nama_member}}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Kelas : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.nama_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Instruktur : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.nama_instruktur }}</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Tarif : </p>
            <p class="text--primary" style="float: left;"> Rp. {{ formatNumber(Printdata.harga) }}</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Sisa Deposit : </p>
            <p class="text--primary" style="float: left;"> Rp. {{ formatNumber(Printdata.deposit_member) }}</p>
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
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jl. Centralpark No.10 Yogyakarta</p>
          </v-row>
          <v-row>
            <p style="font-weight: bold;" class="text--primary">STRUK PRESENSI KELAS</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">No Struk : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.id }} </p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Tanggal : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.tanggal_presensi }}</p>
          </v-row>
          
          <v-row>
            <p style="font-weight: bold;" class="text--primary">Member : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.id_member }} / {{ Printdata.nama_member}}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Kelas : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.nama_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Instruktur : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.nama_instruktur }}</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Tarif : </p>
            <p class="text--primary" style="float: left;"> Rp. {{ formatNumber(Printdata.harga) }}</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Sisa Deposit : </p>
            <p class="text--primary" style="float: left;"> Rp. {{ formatNumber(Printdata.deposit_member) }}</p>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      max-width="30%"
      v-model="printPaketDialog"
      persistent
      transition="dialog-bottom-transition">
      
      <v-card class="center" style="padding: ;">
        <v-card-text>
          <v-row class="pt-5">
            <p style="font-weight: bold;" class="text--primary">GoFit</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jl. Centralpark No.10 Yogyakarta</p>
          </v-row>
          <v-row>
            <p style="font-weight: bold;" class="text--primary">STRUK PRESENSI KELAS</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">No Struk : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.id }} </p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Tanggal : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.tanggal_presensi }}</p>
          </v-row>
          
          <v-row>
            <p style="font-weight: bold;" class="text--primary">Member : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.id_member }} / {{ PrintdataPaket.nama_member}}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Kelas : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.nama_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Instruktur : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.nama_instruktur }}</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Sisa Deposit : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.deposit_kelas }}x</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Masa Berlaku : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.masa_berlaku }}</p>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="windowPrintPaket()">Print</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="printPaketDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      fullscreen
      v-model="printPaketView"
      persistent
      transition="dialog-bottom-transition">
      
      <v-card class="center" style="padding: ;">
        <v-card-text>
          <v-row class="pt-5">
            <p style="font-weight: bold;" class="text--primary">GoFit</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Jl. Centralpark No.10 Yogyakarta</p>
          </v-row>
          <v-row>
            <p style="font-weight: bold;" class="text--primary">STRUK PRESENSI KELAS</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">No Struk : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.id }} </p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Tanggal : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.tanggal_presensi }}</p>
          </v-row>
          
          <v-row>
            <p style="font-weight: bold;" class="text--primary">Member : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.id_member }} / {{ PrintdataPaket.nama_member}}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Kelas : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.nama_kelas }}</p>
          </v-row>
          <v-row class="mt-0">
            <p class="text--primary">Instruktur : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.nama_instruktur }}</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Sisa Deposit : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.deposit_kelas }}x</p>
          </v-row>
          
          <v-row class="mt-0">
            <p class="text--primary">Masa Berlaku : </p>
            <p class="text--primary" style="float: left;"> {{ PrintdataPaket.masa_berlaku }}</p>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    </v-main>
</template>

<script>
import numeral from 'numeral';
export default {
  data() {
    return {
        menu: false,
        date: '',
        id: '',
        load: false,
        snackbar: false,
        color: "",
        searchClassName: '',
        searchBoxClosed: true,
        headers: [
            { text: "ID", value: "id" },
            { text: "Member Name", value: "nama_member" },
            { text: "Class Name", value: "nama_kelas"},
            { text: "Booking Date", value: "tanggal_booking" },
            { text: "Status", value: "status_presensi" },
        ],
        items: [],
        expanded: [],
        data: [],
        dataPaket: [],
        dialog: false,
        dialogConfirm: false,
        printDialog: false,
        printPaketDialog: false,
        printView: false,
        printPaketView: false,
        idPresensi: '',
        form:{
          id: '',
          tanggal_presensi: '',
          id_member: '',
          nama_member: '',
          nama_kelas: '',
          nama_instruktur: '',
          harga_kelas: '',
          sisa_deposit: '',

        },
        formPaket:{
          id: '',
          tanggal_presensi: '',
          id_member: '',
          nama_member: '',
          nama_kelas: '',
          nama_instruktur: '',
          sisa_deposit: '',
          masa_berlaku: '',
        }
    };
  },
  computed: {
    Printdata() {
      console.log(this.data);
      return this.data;
    },
    PrintdataPaket() {
      console.log(this.dataPaket);
      return this.dataPaket;
    },
    today() {
      const now = new Date();
      return now.toISOString().substr(0, 10); // Format: YYYY-MM-DD
    },
    filteredItems() {
      let filteredItems = this.items;
      
      if (this.date) {
        filteredItems = filteredItems.filter((item) => item.tanggal_booking == this.date);
        console.log(filteredItems);
      }

      if (this.searchClassName) {
        filteredItems = filteredItems.filter((item) =>
          item.nama_kelas.toLowerCase().includes(this.searchClassName.toLowerCase())
        );
      }
      return filteredItems;
    },
  },
  mounted() {
    this.date = this.today;
    this.getDataBooking();
    
  },
  methods: {
    formatNumber(value){
        return numeral(value).format('0,0.00');
      },
    isToday(date){
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate.toISOString().substr(0, 10) === today.toISOString().substr(0, 10);
    },
    isPastDate(date) {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate < today;
    },
    isFutureDate(date) {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate >= today;
    },
    getDataBooking(){
        this.load = true;
        var url = this.$api + "/bookingKelas";
        this.$http
        .get(url, {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data.data);
            this.items = response.data.data;
            this.load = false;
        })
        this.load = true;
    },
    setPrint(item) {
      this.id = item.id;
      console.log(this.id);
      this.load
      var url = this.$api + "/getDatabookingKelas/" + this.id;
      this.$http
      .get(url, {
          headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((response) => {
          // console.log(response.data.data[0]);
          this.data = response.data.data[0];
          // console.log(this.data);
          this.printDialog = true;

          this.load = false;
      })
    },
    setPrintPaket(item){
      this.id = item.id;
      console.log(this.id);
      this.load
      var url = this.$api + "/getDatabookingKelasPaket/" + this.id;
      this.$http
      .get(url, {
          headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((response) => {
          // console.log(response.data.data[0]);
          this.dataPaket = response.data.data[0];
          // console.log(this.data);
          this.printPaketDialog = true;

          this.load = false;
      })
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
      windowPrintPaket(){
        this.printPaketDialog = false;
        this.printPaketView = true;
        setTimeout(() => {
          window.print();
        }, 300);
        setTimeout(() => {
          this.printPaketView = false;
        }, 500);
      },
  },
};
</script>

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