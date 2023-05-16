<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Instructur Absence Request List</h3>
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
              :to="'/jadwal-harian'">
              Go to Daily Schedule
            </v-btn>
          </div>
        </div>
      </v-card>

      <v-card>
        <v-card-title>
          List Data of Instructur Absence Request
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="ijins"
          :search="search"
          :loading="load"
          :expanded.sync="expanded"
          item-key="id"
          show-expand
          loading-text="Loading Data"
          no-data-text="No Data Available"
        >
        <template v-slot:[`item.actions`]="{ item }">
           <v-btn v-if="item.status == 1" @click="confirm(item)" disabled>
            Confirm
           </v-btn>
           <v-btn v-else @click="confirm(item)">
            Confirm
           </v-btn>
           
        </template>
        
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card :elevation = 5 class="mt-2 mb-2">
              <v-card-title>
                Details Information
              </v-card-title>
              <v-container >
                <p>Name: {{ item.nama_instruktur }}</p>
                <p>Request created on: {{ item.tanggal_pembuatan_ijin }}</p>
                <p>Substitute Instructur: {{ item.nama_instruktur_pengganti }}</p>
                <p>Absence on: {{ item.tanggal_ijin }}</p>
                <p>Description: {{ item.keterangan }}</p>
                <p v-if="item.status == 1">Status: Confirmed</p>
                <p v-else>Status: Not yet Confirmed</p>
              </v-container>
              
            </v-card>
            </td>
        </template>
        </v-data-table>
      </v-card>

      <v-dialog
            max-width="70%"
            v-model="dialogData"
            persistent
            transition="dialog-bottom-transition">
            <v-card class="center" >
              <v-card-title>
                <div >
                  <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom"> Confirm Absence Request</span>
                </div>
              </v-card-title>
              <hr/>
              <v-card-text>
                <v-container>
                  <v-text-field
                  v-model="form.nama_instruktur"
                  label="Instructur's Name"
                  disabled>
                  </v-text-field>

                  <v-text-field
                    v-model="form.nama_instruktur_pengganti"
                    label="Substitute Instructur's Name"
                    disabled>
                  </v-text-field>

                  <v-text-field
                    v-model="form.tanggal_pembuatan_ijin"
                    label="Request Created on"
                    disabled>
                  </v-text-field>
                  
                  <v-text-field
                    v-model="form.tanggal_ijin"
                    label="Absence on"
                    disabled>
                  </v-text-field>

                  <v-text-field
                  v-model="form.keterangan"
                  label="Description"
                  disabled>
                  </v-text-field>

                </v-container>
                <v-card-actions>
                  <v-btn text @click="cancel">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                    <v-btn style="margin-left: 15px" @click="dialogConfirm = true">
                      Confirm
                    </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-dialog>


      <v-dialog v-model="dialogConfirm" persistent max-width="300px">
      <v-card style="border-radius: 15px;">
        <v-card-title class="pa-0">
          <v-toolbar color="#B18CEF" elevation="0" height="80%">
            <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin: auto;">Alert!</span>   
          </v-toolbar>
        </v-card-title>
        <v-card-text class="mt-5" style="font-weight: 500;"> Are you sure to confirm this request? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="dialogConfirm = false"> Cancel </v-btn>
          <v-btn text color="#9155FD" @click="changeStatus()"> Yes </v-btn>
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
      expanded: [],
      search: null,
      load: false,
      snackbar: false,
      ijins: [],
      dialogConfirm: false,
      message: "",
      id: "",
      color: "",
      searchBoxClosed: true, 
      form:{
        nama_instruktur: "",
        tanggal_pembuatan_ijin: "",
        tanggal_ijin: "",
        nama_instruktur_pengganti: "",
        keterangan: "",
      },
      headers: [
        {
          text: "Id Number",
          value: "id",
        },
        {
          text: "Instructur's Name",
          value: "nama_instruktur",
        },
        {
          text: "Action",
          value: "actions",
        },
      ],
    }
  },
  mounted() {
    this.getDataIjin();
    
  },
  methods:{
    getDataIjin(){
      this.load = true;
      var url = this.$api + "/ijin";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.ijins = response.data.data;
          this.load = false;
        });
      this.load = true;
    },
    confirm(item){
      this.dialogData = true;
      console.log(item);
      this.id = item.id;
      this.form.nama_instruktur = item.nama_instruktur;
      this.form.tanggal_pembuatan_ijin = item.tanggal_pembuatan_ijin;
      this.form.tanggal_ijin = item.tanggal_ijin;
      this.form.nama_instruktur_pengganti = item.nama_instruktur_pengganti;
      this.form.keterangan = item.keterangan;
    },
    changeStatus(){
      this.load = true;
      var url = this.$api + "/ijin/isConfirmed/" + this.id;
      this.$http
        .put(url, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data.message);
          this.message = response.data.message;
          this.color = "success";
          this.snackbar = true;
          this.dialogConfirm = false;
          this.getDataIjin();
          this.load = false;
        })
        .catch(error => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          localStorage.removeItem("token");
          this.load = false;
        });
    },
    cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Create";
        this.dialogData = false;
        this.searchText = null;
      },
      resetForm() {
        this.form = {
          nama_instruktur: null,
          tanggal_pembuatan_ijin: null,
          tanggal_ijin: null,
          nama_instruktur_pengganti: null,
          keterangan: null,
        };
    },
  }
  }

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