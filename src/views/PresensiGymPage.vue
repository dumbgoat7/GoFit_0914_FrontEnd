<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Gym Attendance List</h3>
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
      <!-- <v-text-field v-model="searchDate" label="Search by Date" type="date"></v-text-field> -->

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
              <v-btn v-if="item.status_presensi == 0" text color="purple" @click="submit(item)"> Take Attendance</v-btn>
              <v-btn v-if="item.status_presensi == 1" text color="purple" @click="setPrint(item)"> Print</v-btn>
            </td>
          </template>
        </v-data-table>
        </v-card>


        <v-dialog v-model="dialogConfirm" persistent max-width="300px">
          <v-card style="border-radius: 15px;">
            <v-card-title class="pa-0">
              <v-toolbar color="#B18CEF" elevation="0" height="80%">
                <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin: auto;">Alert!</span>   
              </v-toolbar>
            </v-card-title>
            <v-card-text class="mt-5" style="font-weight: 500;"> Are you sure to take attendance of this member? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="dialogConfirm = false"> Cancel </v-btn>
              <v-btn text color="#9155FD" @click="presensi()"> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


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
            <p style="font-weight: bold;" class="text--primary">STRUK PRESENSI GYM</p>
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
            <p class="text--primary">Slot Waktu : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.slot_waktu }}</p>
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
            <p style="font-weight: bold;" class="text--primary">STRUK PRESENSI GYM</p>
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
            <p class="text--primary">Slot Waktu : </p>
            <p class="text--primary" style="float: left;"> {{ Printdata.slot_waktu }}</p>
          </v-row>
        </v-card-text>
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
        menu: false,
        date: '',
        load: false,
        snackbar: false,
        message: "",
        color: "",
        expanded: [],
        searchBoxClosed: true,
        headers: [
            { text: "ID", value: "id" },
            { text: "Member Name", value: "nama_member" },
            { text: "Booking Date", value: "tanggal_booking" },
            { text: "Booking Time", value: "slot_waktu", },
            { text: "Status", value: "status_presensi" },
        ],
        bookings: [],
        dialog: false,
        dialogConfirm: false,
        printDialog: false,
        printView: false,
        idPresensi: '',
        form:{
          id: '',
          id_member: '',
          tanggal_presensi: '',
          nama_member: '',
          slot_waktu: '',
        },
    };
  },
  computed: {
    Printdata() {
      return this.form;
    },
    today() {
      const now = new Date();
      return now.toISOString().substr(0, 10); // Format: YYYY-MM-DD
    },
    filteredItems() {
      if (!this.date) {
        return this.bookings;
      }
      const formattedSearchDate = new Date(this.date).toISOString().substr(0, 10);
      return this.bookings.filter((booking) => {
        const formattedItemDate = new Date(booking.tanggal_booking).toISOString().substr(0, 10);
        return formattedItemDate === formattedSearchDate;
      });
    },
  },
  mounted() {
    this.date = this.today;
    this.getDataBooking();
    
  },
  methods: {
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
        var url = this.$api + "/bookingGym";
        this.$http
        .get(url, {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data.data);
            this.bookings = response.data.data;
            this.load = false;
        })
        this.load = true;
    },
    submit(item) {
      this.idPresensi = item.id;
      this.dialogConfirm = true;
    },
    setPrint(item) {
      this.form.id = item.id;
      this.form.id_member = item.id_member;
      this.form.tanggal_presensi = item.tanggal_presensi;
      this.form.nama_member = item.nama_member;
      this.form.slot_waktu = item.slot_waktu;
      this.printDialog = true;
    },
    presensi() {
      this.load = true;
      var url = this.$api + "/presensiGym/" +this.idPresensi;
      this.$http
        .put(url, this.form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.load = false;
          this.dialogConfirm = false;
          this.snackbar = true;
          this.color = "success";
          this.message = response.data.message;
          this.getDataBooking();
        })
        .catch((error) => {
          this.load = false;
          this.dialogConfirm = false;
          this.snackbar = true;
          this.color = "error";
          this.message = error.response.data.message;
        });
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
