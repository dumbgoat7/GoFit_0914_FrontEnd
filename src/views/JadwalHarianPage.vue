<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Schedule (Daily)</h3>
      </div>

      <v-card>
          <v-card-title>
            Timetables of GoFit
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchText"
              dense filled rounded clearable placeholder="Search" 
              prepend-inner-icon="mdi-magnify" 
              class="pt-6 shrink expanding-search" 
              :class="{ closed: searchBoxClosed && !searchText }" 
              @keyup.enter="onSearch(searchText)" 
              @focus="searchBoxClosed = false"
              @blur="searchBoxClosed = true">
            </v-text-field>
          </v-card-title>
          
      </v-card>
          <v-divider class="mx-4"></v-divider>
          <v-card elevation=2 class="mb-5">

            <v-simple-table>
            <template v-slot:default>
              <thead >
                <tr>
                  <th>Morning Classes</th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td v-for="item in schedulesMonday" :key="item.id_jadwal">
                      <v-card class="mt-1" elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td v-for="item in schedulesTuesday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td v-for="item in schedulesWednesday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)" >
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td v-for="item in schedulesThursday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td v-for="item in schedulesFriday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td v-for="item in schedulesSaturday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td v-for="item in schedulesSunday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-card>

          <v-card class="mt-5">

            <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>
                    Evening Classes
                  </th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td v-for="item in schedulesMonday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 1" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td v-for="item in schedulesTuesday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 1" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td v-for="item in schedulesWednesday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 1" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p> 
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td v-for="item in schedulesThursday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 1" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p> {{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td v-for="item in schedulesFriday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 1" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p> {{ item.nama_instruktur }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td v-for="item in schedulesSaturday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 1" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p> {{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td v-for="item in schedulesSunday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 1" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p> {{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          </v-card>
        
          <v-dialog
            max-width="70%"
            v-model="dialog"
            persistent
            transition="dialog-bottom-transition">
            <v-card class="center" >
              <v-card-title>
                <div >
                  <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">{{ formTitle }} Daily Schedule</span>
                </div>
              </v-card-title>
              <hr/>
              <v-card-text>
                <v-container>
                  <v-select
                      :items="kelas"
                      v-model="form.id_kelas"
                      label="Class's Name"
                      item-value="id_kelas"
                      item-text="nama_kelas"
                      required
                  ></v-select>

                  <v-select
                      :items="instructur"
                      v-model="form.id_instruktur"
                      label="Instructor's Name"
                      item-value="id"
                      item-text="nama_instruktur"
                      required
                  ></v-select>
                  <v-text-field
                      v-model="form.hari"
                      label="Schedule's Day"
                      required>
                    </v-text-field>

                    <v-text-field
                      v-model="form.tanggal_jadwal"
                      label="Schedule's Date"
                      type="date"
                      required>
                    </v-text-field>

                    <v-text-field
                      v-model="form.jam_mulai"
                      label="Start Time (hh:mm:ss)"
                      required>
                    </v-text-field>

                    <v-select
                    :items="sesi"
                    v-model="form.sesi_jadwal"
                    label="Session"
                    item-value="value"
                    item-text="text"
                    required> 
                    </v-select>
                    
                    <v-text-field
                      v-model="form.status"
                      label="Status Description"
                      required>
                    </v-text-field>

                </v-container>
                <v-card-actions>
                  <v-btn text @click="cancel">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text v-if="formTitle == 'Create'" style="margin-left: 15px" @click="dialogConfirm = true">
                      Save
                    </v-btn>
                    <v-btn text v-else-if="formTitle == 'Update'" tyle="margin-left: 15px" @click="dialogConfirm = true">
                      Save
                    </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog
            max-width="70%"
            v-model="dialogSearch"
            persistent
            transition="dialog-bottom-transition">
            <v-card class="center" >
              <v-card-title>
                <div >
                  <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">Searched Daily Schedule</span>
                </div>
              </v-card-title>
              <hr/>
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                    </thead>
                    <tbody>
                      <tr style="float: left;">Morning Class</tr>
                      <tr v-for="item in searchSchedule" :key="item.id_jadwal">
                        <v-card class="ml-10 mt-2 mb-2" max-width="70%" elevation=5 v-if="item.sesi_jadwal == 0">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
                      </tr>
                      <tr class="mt-5" style="float: left;">Evening Class</tr>
                      <tr v-for="item in searchSchedule" :key="item.id_jadwal">
                        <v-card class="ml-10 mt-2 mb-5" max-width="70%" elevation=5 v-if="item.sesi_jadwal == 1">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                          <p>{{ item.status }}</p>
                        </v-card-text>
                      </v-card>
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
                <v-toolbar color="#B18CEF" elevation="0" height="80%">
                    <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin: auto;">Alert!</span>   
                </v-toolbar>
                </v-card-title>
                <v-card-text class="mt-5" style="font-weight: 500;"> Are you sure to {{ formTitle }} this data? </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="red" @click="dialogConfirm = false"> Cancel </v-btn>
                <v-btn text color="#9155FD" @click="update"> Update </v-btn>
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
        inputType: "Create",
        deleteId: "",
        editId: "",
        searchText: null,
        searchBoxClosed: true,
        load: false,
        snackbar: false,
        column: [
          { number : 1 },
          { number: 2 }
        ],
        sesi: [
          { text: "Morning", value: 0 },
          { text: "Evening", value: 1 },
        ],
        instructur: [],
        kelas: [],
        member: [],
        schedulesMonday: [],
        schedulesTuesday: [],
        schedulesWednesday: [],
        schedulesThursday: [],
        schedulesFriday: [],
        schedulesSaturday: [],
        schedulesSunday: [],
        searchSchedule:[],
        items: [],
        transaction: new FormData(),
        message: "",
        dialog: false,
        color: "",
        dialogConfirm: false,
        dialogSearch: false,
        pegawai: [ {
            id_kasir: localStorage.getItem("id_pegawai"),
            nama_kasir: localStorage.getItem("nama_pegawai"),
            }
        ],
        form: {
          id_kelas: null,
          id_instruktur: null,
          hari: null,
          tanggal_jadwal: null,
          jam_mulai: null,
          sesi_jadwal: null,
          status: null,
          id_jadwal_umum: null,
        },
      };
    },
    computed: {
    formTitle() {
      return this.inputType;
    },
  },
    mounted() {
    this.getDataScheduleMonday();
    this.getDataScheduleTuesday();
    this.getDataScheduleWednesday();
    this.getDataScheduleThursday();
    this.getDataScheduleFriday();
    this.getDataScheduleSaturday();
    this.getDataScheduleSunday();
    this.getDataClass();
    this.getDataInstructur();
    },
    methods: {
      getDataScheduleMonday() {
        this.load = true;
        var url = this.$api + "/showMondayHarian";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(response.data.data);
            this.schedulesMonday = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataScheduleTuesday() {
        this.load = true;
        var url = this.$api + "/showTuesdayHarian";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.schedulesTuesday = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataScheduleWednesday() {
        this.load = true;
        var url = this.$api + "/showWednesdayHarian";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.schedulesWednesday = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataScheduleThursday() {
        this.load = true;
        var url = this.$api + "/showThursdayHarian";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.schedulesThursday = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataScheduleFriday() {
        this.load = true;
        var url = this.$api + "/showFridayHarian";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.schedulesFriday = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataScheduleSaturday() {
        this.load = true;
        var url = this.$api + "/showSaturdayHarian";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.schedulesSaturday = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataScheduleSunday() {
        this.load = true;
        var url = this.$api + "/showSundayHarian";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.schedulesSunday = response.data.data;
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
      getDataClass(){
        this.load = true;
        var url = this.$api + "/kelas";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.kelas = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataInstructur() {
        this.load = true;
        var url = this.$api + "/instruktur";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.instructur = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      update() {
        if(this.form.id_kelas == null) {
          this.message = "Class's Name cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else if (this.form.id_instruktur == null) {
          this.message = "Instructor's Name cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else if (this.form.hari == null) {
          this.message = "Day cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else if (this.form.tanggal_jadwal == null) {
          this.message = "Date cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else if (this.form.jam_mulai == null) {
          this.message = "Start Time cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else if (this.form.sesi_jadwal == null) {
          this.message = "Session cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else if (this.form.status == "") {
          this.message = "Status cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else {
          let newData = {
            id_kelas: this.form.id_kelas,
            id_instruktur: this.form.id_instruktur,
            hari: this.form.hari,
            tanggal_jadwal: this.form.tanggal_jadwal,
            jam_mulai: this.form.jam_mulai,
            sesi_jadwal: this.form.sesi_jadwal,
            status: this.form.status,
            id_jadwal_umum: this.form.id_jadwal_umum,
          };
          var url = this.$api + "/jadwalHarian/" + this.editId;
          this.load = true;
          this.$http
              .put(url, newData, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then(() => {
                this.message = "Successfully Updated";
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.dialog = false;
                this.getDataScheduleMonday();
                this.getDataScheduleTuesday();
                this.getDataScheduleWednesday();
                this.getDataScheduleThursday();
                this.getDataScheduleFriday();
                this.getDataScheduleSaturday();
                this.getDataScheduleSunday();
                this.getDataClass();
                this.getDataInstructur();
                this.resetForm();
                this.inputType = "Create";
                this.dialogConfirm = false;
              })
              .catch((error) => {
                this.message = error;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
              });

          }
        },
      onSearch(searchText) {
        console.log(searchText);
        if(searchText == null || searchText == "") {
          this.snackbar = true;
          this.message = "Search Text cannot be empty";
          this.color = "red";

        } else {
          var url = this.$api + "/search/" + searchText;
          this.load = true;
          this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(response.data.data);
            this.searchSchedule = response.data.data;
            this.dialogSearch = true;
            this.load = false;
          })
          .catch((error) => {
            console.log(error);
            this.message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
        }
      },
      cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Create";
        this.dialogSearch = false;
        this.searchText = null;
      },
      editJadwal(item){
        this.inputType = "Update";
        this.editId = item.id;
        this.form.id_kelas = item.id_kelas;
        this.form.id_instruktur = item.id_instruktur;
        this.form.hari = item.hari;
        this.form.tanggal_jadwal = item.tanggal_jadwal;
        this.form.jam_mulai = item.jam_mulai;
        this.form.sesi_jadwal = item.sesi_jadwal;
        this.form.status = item.status;
        this.form.id_jadwal_umum = item.id_jadwal_umum;
        this.dialog = true;
      },
      resetForm() {
        this.form = {
          id_kelas: null,
          id_instruktur: null,
          hari: null,
          tanggal_jadwal: null,
          jam_mulai: null,
          sesi_jadwal: null,
          status: null,
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

.v-input.expanding-search {
  transition: max-width 0.5s;
}
.v-input.expanding-search.closed {
  max-width: 70px;
}
</style>