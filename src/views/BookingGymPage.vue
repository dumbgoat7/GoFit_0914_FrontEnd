<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Booking Gym</h3>
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
                :to="'/presensi-gym'">
                Attandace List
                </v-btn>
            </div>
            </div>
        </v-card>

        <v-card>
        <v-card-title>
          List Data of Booking Gym
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="filteredBookings"
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

    </v-main>
</template>

<script>
export default {
  data() {
    return {
        search: '',
        load: false,
        snackbar: false,
        color: "",
        message: "",
        searchBoxClosed: true,
        headers: [
            { text: "ID", value: "id" },
            { text: "Member Name", value: "nama_member" },
            { text: "Booking Date", value: "tanggal_booking" },
            { text: "Booking Time", value: "slot_waktu" },
            { text: "Status", value: "status_booking" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        bookings: [],
    };
  },
  computed: {
    filteredBookings() {
      return this.bookings.filter((booking) => booking.nama_member.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  mounted() {
    this.getDataBooking();
    
  },
  methods: {
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
    }
  },
};
</script>