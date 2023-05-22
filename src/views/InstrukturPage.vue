<template>
  <v-main>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
        <v-icon>mdi-chevron-right</v-icon>
        <h3 class="h2">Instructur</h3>
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
              @click="dialog = true">
              Add Data
            </v-btn>
          </div>
      </div>
    </v-card>

    <v-card >
      <v-card-title>
        List Data of Instructur
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="instrukturs"
        :search="search"
        :loading="load"
        :expanded.sync="expanded"
        item-key="nama_instruktur"
        show-expand
        loading-text="Loading Data"
        no-data-text="No Data Available"
      >
      <!-- <template v-slot:[`item.gaji_instruktur`]="{ item }">
        {{ setCurrency(item.gaji_instruktur) }}
      </template> -->
      
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="#865dcd" class="mr-2 white--text" @click="btnEdit(item)">
            Update
          </v-btn>
          <v-btn depressed color="#5F379F" class="mr-2 white--text" @click="btnDelete(item.id)">
            Delete
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
                <p>Address: {{ item.alamat_instruktur }}</p>
                <p>Phone Number: {{ item.no_telp }}</p>
                <p>Salary: Rp. {{ formatNumber(item.gaji_instruktur) }}</p>
                <p>Email: {{ item.email_instruktur }}</p>
                <p>Date of Birth: {{ item.tanggal_lahir }}</p>
                <p>Username: {{ item.username }}</p>
                <p>Number of Absence: {{ item.jumlah_ijin }}</p>
              </v-container>
              
            </v-card>
            </td>
        </template>
      </v-data-table>
    </v-card>



    <v-dialog
      max-width="70%"
      v-model="dialog">
      <v-card class="center">
        <v-card-title>
          <div >
            <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">{{ formTitle }} Instructur</span>
          </div>
        </v-card-title>
        <hr/>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.nama_instruktur"
              label="Instructur's Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.no_telp"
              label="Phone Number"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.alamat_instruktur"
              label="Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.gaji_instruktur"
              label="Salary"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.email_instruktur"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.tanggal_lahir"
              label="Date of Birth"
              required
              type="date"
            ></v-text-field>
            <v-text-field
             v-if="formTitle == 'Create'"
              v-model="form.username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
            v-if="formTitle == 'Create'"
              v-model="form.password"
              label="Password"
              required
            ></v-text-field>
          </v-container>
          <v-card-actions>
            <v-btn color="red" text @click="cancel">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text v-if="formTitle == 'Create'" style="margin-left: 15px" @click="submitInstruktur">
                Save
              </v-btn>
              <v-btn text v-else-if="formTitle == 'Update'" tyle="margin-left: 15px" @click="updateInstruktur">
                Save
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
        <v-card-text class="mt-5" style="font-weight: 500;"> Are you sure to delete this data? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="dialogConfirm = false"> Cancel </v-btn>
          <v-btn text color="#9155FD" @click="deleteData"> Delete </v-btn>
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
import numeral from 'numeral';
export default {
  data() {
    return {
      deleteId: "",
      editId: "",
      inputType: "Create",
      expanded: [],
      search: null,
      searchBoxClosed: true,
      load: false,
      snackbar: false,
      instrukturs: [],
      countIjin: 0,
      message: "",
      dialog: false,
      color: "",
      dialogConfirm: false,
      form: {
        nama_instruktur: "",
        no_telp: "",
        alamat_instruktur: "",
        gaji_instruktur: "",
        email_instruktur: "",
        tanggal_lahir: "",
        username: "",
        password: "",
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
          text: "Phone Number",
          value: "no_telp",
        },
        {
          text: "Email",
          value: "email_instruktur",
          width: "200px",
        },
        {
          text: "Date of Birth",
          value: "tanggal_lahir",
          width: "200px",
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
    this.getDataInstruktur();
  },
  methods: {
    // setCurrency(value) {
    //   return value.toLocaleString("id-ID", {
    //     style: "currency",
    //     currency: "IDR",
    //   });
    // },
    formatNumber(value){
        return numeral(value).format('0,0.00');
    },
    setForm() {
      if (this.inputType !== "Create") {
        console.log(this.inputType);
        this.updateInstruktur();
      } else {
        this.submitInstruktur();
      }
    },
    getDataInstruktur() {
      this.load = true;
      var url = this.$api + "/instruktur";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.instrukturs = response.data.data;
          this.load = false;
        });
      this.load = true;
    },
    submitInstruktur() {
      if(this.form.nama_instruktur == "") {
        this.message = "Please fill the name";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp.length == 0) {
        this.message = "Please fill the phone number";
        this.color = "red";
        this.snackbar = true;
      } else if (isNaN(this.form.no_telp)){
        this.message = "Phone number must be numeric";
        this.color = "red";
        this.snackbar = true;
      }else if (this.form.no_telp.length > 12) {
        this.message = "Phone number cannot be more than 12 digits";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp.length < 10) {
        this.message = "Phone number cannot be less than 10 digits";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.alamat_instruktur == "") {
        this.message = "Please fill the address";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.gaji_instruktur == "") {
        this.message = "Please fill the salary";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.gaji_instruktur < 0) {
        this.message = "Salary value cannot be less than 0";
        this.color = "red";
        this.snackbar = true;
      } else if (isNaN(this.form.gaji_instruktur)){
        this.message = "Phone number must be numeric";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.email_instruktur == "") {
        this.message = "Please fill the email";
        this.color = "red";
        this.snackbar = true;
      } else if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.form.email_instruktur) == false ) {
        this.message = "Email format is wrong";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.tanggal_lahir == "") {
        this.message = "Please fill the date of birth";
        this.color = "red";
        this.snackbar = true;
      } else if(this.form.tanggal_lahir > Date.now()){ 
        this.message = "Date of birth cannot be more than today";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.username == "") {
        this.message = "Please fill the username";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.password == "") {
        this.message = "Please fill the password";
        this.color = "red";
        this.snackbar = true;
      } else {
        let formData = new FormData();
        formData.append("nama_instruktur", this.form.nama_instruktur);
        formData.append("no_telp", this.form.no_telp);
        formData.append("alamat_instruktur", this.form.alamat_instruktur);
        formData.append("gaji_instruktur", this.form.gaji_instruktur);
        formData.append("email_instruktur", this.form.email_instruktur);
        formData.append("tanggal_lahir", this.form.tanggal_lahir);
        formData.append("username", this.form.username);
        formData.append("password", this.form.password);

        this.load = true;
        var url = this.$api + "/instruktur";
        this.$http
          .post(url, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },})
          .then(() => {
            this.message = "Berhasil menambahkan data";
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.close();
          })
      }
    },
    updateInstruktur() {
      if(this.form.nama_instruktur == "") {
        this.message = "Please fill the name";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp.length == 0) {
        this.message = "Please fill the phone number";
        this.color = "red";
        this.snackbar = true;
      } else if (isNaN(this.form.no_telp)){
        this.message = "Phone number must be numeric";
        this.color = "red";
        this.snackbar = true;
      }else if (this.form.no_telp.length > 12) {
        this.message = "Phone number cannot be more than 12 digits";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp.length < 10) {
        this.message = "Phone number cannot be less than 10 digits";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.alamat_instruktur == "") {
        this.message = "Please fill the address";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.gaji_instruktur == "") {
        this.message = "Please fill the salary";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.gaji_instruktur < 0) {
        this.message = "Salary value cannot be less than 0";
        this.color = "red";
        this.snackbar = true;
      } else if (isNaN(this.form.gaji_instruktur)){
        this.message = "Phone number must be numeric";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.email_instruktur == "") {
        this.message = "Please fill the email";
        this.color = "red";
        this.snackbar = true;
      } else if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.form.email_instruktur) == false ) {
        this.message = "Email format is wrong";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.tanggal_lahir == "") {
        this.message = "Please fill the date of birth";
        this.color = "red";
        this.snackbar = true;
      } else if(this.form.tanggal_lahir > Date.now()){ 
        this.message = "Date of birth cannot be more than today";
        this.color = "red";
        this.snackbar = true;
      } else {
        let newData = {
        nama_instruktur: this.form.nama_instruktur,
        alamat_instruktur: this.form.alamat_instruktur,
        no_telp: this.form.no_telp,
        gaji_instruktur: this.form.gaji_instruktur,
        email_instruktur: this.form.email_instruktur,
        tanggal_lahir: this.form.tanggal_lahir,
        };
        
        var url = this.$api + "/instruktur/" + this.editId;
        this.load = true;
        this.$http
          .put(url, newData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.message = "Berhasil memperbarui data";
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.close();
            this.inputType = "Create";
          })
          .catch(error => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          localStorage.removeItem("token");
          this.load = false;
        });
        }
      
    },
    deleteData() {
      var url = this.$api + "/instruktur/" + this.deleteId;
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.message = "Delete data success";
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.inputType = "Create";
        })
        .catch((error) => {
          this.message = "Delete data failed" + error;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    cancel() {
      this.dialog = false;
      this.inputType = "Create";
      this.resetForm();
      this.getDataInstruktur();
    },
    close() {
      this.dialog = false;
      this.inputType = "Create";
      this.dialogConfirm = false;
      this.getDataInstruktur();
      this.resetForm();
    },
    btnEdit(item) {
      this.inputType = "Update";
      this.editId = item.id;
      this.form.nama_instruktur = item.nama_instruktur;
      this.form.no_telp = item.no_telp;
      this.form.alamat_instruktur = item.alamat_instruktur;
      this.form.gaji_instruktur = item.gaji_instruktur;
      this.form.email_instruktur = item.email_instruktur;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.dialog = true;
    },
    btnDelete(id) {
      console.log(id);
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    resetForm() {
      this.form = {
        nama_instruktur: "",
        no_telp: "",
        alamat_instruktur: "",
        gaji_instruktur: "",
        email_instruktur: "",
        tanggal_lahir: "",
        username: "",
        password: "",
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
