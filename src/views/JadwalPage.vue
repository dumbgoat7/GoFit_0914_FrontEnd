<template>
  <v-main>
    <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Schedule</h3>
      </div>
      <v-card>
          <v-card-title>
            Timetables of GoFit
            <v-spacer></v-spacer>
            <v-btn
              class="mx-2 mt-4 mb-4 float-"
              color="#9155FD"
              style="font-weight: bold; color: white;"
              @click="dialog = true">
              Add Schedule
            </v-btn>
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
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td v-for="item in schedulesTuesday" :key="item.id_jadwal" >
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
                        </v-card-text>
                      </v-card>
                  </td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td v-for="item in schedulesWednesday" :key="item.id_jadwal">
                      <v-card elevation=0 v-if="item.sesi_jadwal == 0" @click="editJadwal(item)">
                        <v-card-text>
                          <p>{{ item.jam_mulai }}</p>
                          <p>{{ item.nama_kelas }}</p>
                          <p>{{ item.nama_instruktur }}</p>
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
                  <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">{{ formTitle }} Schedule</span>
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
                  <v-select
                      :items="hari"
                      v-model="form.hari"
                      label="Schedule's Day"
                      required>
                    </v-select>

                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="form.jam_mulai"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.jam_mulai"
                          label="Start Time"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="form.jam_mulai"
                        full-width
                        use-seconds
                      >
                        <v-btn
                          text
                          color="primary"
                          @click="menu2 = false"
                        >
                          Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(form.jam_mulai)"
                        >
                          OK
                        </v-btn>
                    </v-time-picker>
                    </v-menu>

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
                <v-btn text v-if="formTitle == 'Create'" color="#9155FD" @click="submit"> Create </v-btn>
                <v-btn text v-else-if="formTitle == 'Update'" color="#9155FD" @click="update"> Update </v-btn>
                <v-btn text v-else color="#9155FD" @click="deleteData"> Delete </v-btn>
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
        search: null,
        load: false,
        snackbar: false,
        menu2: false,
        hari:[
          { text: "Monday", value: "Monday" },
          { text: "Tuesday", value: "Tuesday" },
          { text: "Wednesday", value: "Wednesday" },
          { text: "Thursday", value: "Thursday" },
          { text: "Friday", value: "Friday" },
          { text: "Saturday", value: "Saturday" },
          { text: "Sunday", value: "Sunday" },
        ],
        instructur: [],
        kelas: [],
        member: [],
        schedules: [],
        schedulesMonday: [],
        schedulesTuesday: [],
        schedulesWednesday: [],
        schedulesThursday: [],
        schedulesFriday: [],
        schedulesSaturday: [],
        schedulesSunday: [],
        items: [],
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
          id_kelas: null,
          id_instruktur: null,
          hari: null,
          jam_mulai: null,
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
        var url = this.$api + "/showMonday";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.schedulesMonday = response.data.data;
            this.load = false;
          });
        this.load = true;
      },
      getDataScheduleTuesday() {
        this.load = true;
        var url = this.$api + "/showTuesday";
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
        var url = this.$api + "/showWednesday";
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
        var url = this.$api + "/showThursday";
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
        var url = this.$api + "/showFriday";
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
        var url = this.$api + "/showSaturday";
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
        var url = this.$api + "/showSunday";
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
      submit() {
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
        } else if (this.form.jam_mulai == null) {
          this.message = "Start Time cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else {
          let formData = new FormData();
          formData.append("id_kelas", this.form.id_kelas);
          formData.append("id_instruktur", this.form.id_instruktur);
          formData.append("hari", this.form.hari);
          formData.append("jam_mulai", this.form.jam_mulai);

          this.load = true;
          var url = this.$api + "/jadwal";
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
              this.resetForm();
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
              this.load = false;
              this.inputType = "Create";
              this.dialogConfirm = false;
          })
          .catch((error) => {
            this.message = error.response.data.message;
            this.color = "error";
            this.snackbar = true;
            this.load = false;
          });
        }
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
        } else if (this.form.jam_mulai == null) {
          this.message = "Start Time cannot be empty";
          this.color = "error";
          this.snackbar = true;
          this.dialogConfirm = false;
        } else {
          let newData = {
            id_kelas: this.form.id_kelas,
            id_instruktur: this.form.id_instruktur,
            hari: this.form.hari,
            jam_mulai: this.form.jam_mulai,
          };
          var url = this.$api + "/jadwal/" + this.editId;
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
                this.message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
              });

          }
        },
      editJadwal(item){
        console.log(item);
        this.inputType = "Update";
        this.editId = item.id_jadwal;
        this.form.id_kelas = item.id_kelas;
        this.form.id_instruktur = item.id_instruktur;
        this.form.hari = item.hari;
        this.form.jam_mulai = item.jam_mulai;
        this.dialog = true;
      },
      cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Create";
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
      resetForm() {
        this.form = {
          id_kelas: null,
          id_instruktur: null,
          hari: null,
          jam_mulai: null,
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

