<template>
  <v-main>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
        <v-icon>mdi-chevron-right</v-icon>
        <h3 class="h2">Member</h3>
    </div>
    
    <v-card>
      <v-card-title>
        List Data of Member
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="members"
        :search="search"
        :loading="load"
        :expanded.sync="expanded"
        item-key="nama_member"
        show-expand
        loading-text="Sedang mengambil data"
        no-data-text="Tidak ada Data"
      >
        <template v-slot:[`item.actions`]="{ item }">
           <v-btn color="#AE8DC9" class="mr-2 white--text" @click="btnEdit(item)">
            Update
          </v-btn>
          
          <v-btn color="#9B84D0" class="mr-2 white--text" @click="btnDelete(item.id_member)"
          >
            Delete
          </v-btn>
          <v-btn color="#8753DE" class="mr-2 white--text" @click="resetPassword(item)">
            Reset Password
          </v-btn>
          <!-- <v-icon color="black" @click="btnEdit(item)"> mdi-dots-vertical</v-icon> -->
        </template>
        

        <template v-slot:[`item.status`]="{ item }">
          <p v-if="item.status == 1">Active</p>
          <p v-else>Not Active</p>
        </template>

        <template v-slot:[`item.masa_berlaku`]="{ item }">
          <p v-if="item.masa_berlaku == null">-</p>
          <p v-else>{{ item.masa_berlaku }}</p>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card :elevation = 5 class="mt-2 mb-2">
              <v-card-title>
                Details Information
              </v-card-title>
              <v-container >
                <p>Name: {{ item.nama_member }}</p>
                <p>Address: {{ item.alamat_member }}</p>
                <p>Phone Number: {{ item.no_telp }}</p>
                <p>Deposit: Rp. {{ formatNumber(item.deposit_member) }}</p>
                <p v-if="item.masa_berlaku == null">Masa Berlaku: -</p>
                <p v-else>Active Until: {{ item.masa_berlaku }}</p>
                <p>Email: {{ item.email_member }}</p>
                <p v-if="item.status == 1">Status: Active</p>
                <p v-else>Status: Not Active</p>
                <p>Date of Birth: {{ item.tanggal_lahir }}</p>
                <p>Username: {{ item.username }}</p>         
              </v-container>
            </v-card>
            </td>
        </template>
      </v-data-table>
    </v-card>
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
            @click="dialog = true">
            Add Data
          </v-btn>
        </div>
      </div>
    </v-card>


    <v-dialog
      max-width="70%"
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition">
      <v-card class="center" >
        <v-card-title>
          <div >
            <span class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">{{ formTitle }} Member</span>
          </div>
        </v-card-title>
        <hr/>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.nama_member"
              label="Member's Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.alamat_member"
              label="Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.no_telp"
              label="Phone Number"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.deposit_member"
              label="Deposit"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.email_member"
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
            <v-btn text @click="cancel">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text v-if="formTitle == 'Create'" style="margin-left: 15px" @click="submitMember">
                Save
              </v-btn>
              <v-btn text v-else-if="formTitle == 'Update'" tyle="margin-left: 15px" @click="updateMember">
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
      load: false,
      snackbar: false,
      members: [],
      member: new FormData(),
      message: "",
      dialog: false,
      color: "",
      dialogConfirm: false,
      form: {
        nama_member: "",
        alamat_member: "",
        no_telp: "",
        deposit_member: "",
        email_member: "",
        tanggal_lahir: "",
        username: "",
        password: "",
      },
      statusAktif: [
        {
          text: "Active",
          value: 1,
        },
        {
          text: "Not Active",
          value: 0,
        },
      ],
      headers: [
        {
          text: "Id Number",
          value: "id_member",
        },
        {
          text: "Member's Name",
          value: "nama_member",
          width: "110px",
        },
        {
          text: "Email",
          value: "email_member",
          width: "90px",
        },
        {
          text: "Status",
          value: "status",
          width: "90px",
        },
        {
          text: "Active Until",
          value: "masa_berlaku",
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
    this.getDataMember();
  },
  methods: {
    formatNumber(value){
        return numeral(value).format('0,0.00');
      },
    setForm() {
      if (this.inputType !== "Create") {
        this.updateMember();
      } else {
        this.submitMember();
      }
    },
    getDataMember() {
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
    submitMember() {
      console.log(this.form);
      if(this.form.nama_member == "") {
        this.message = "Please fill in the name";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.alamat_member == "") {
        this.message = "Please fill in the address";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp == "") {
        this.message = "Please fill in the phone number";
        this.color = "red";
        this.snackbar = true;
      } else if (isNaN(this.form.no_telp)){
        this.message = "Phone number must be numeric";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp.length > 12) {
        this.message = "Phone number cannot be more than 12 digits";
        this.color = "red";
        this.snackbar = true;  
      } else if (this.form.no_telp.length < 10) { 
        this.message = "Phone number cannot be less than 10 digits";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.deposit_member == "") {
        this.message = "Please fill in the deposit";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.deposit_member < 0) {
        this.message = "Deposit value cannot be less than 0";
        this.color = "red";
        this.snackbar = true;  
      } else if (isNaN(this.form.deposit_member)) {
        this.message = "Deposit must be numeric";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.email_member == "") {
        this.message = "Please fill in the email";
        this.color = "red";
        this.snackbar = true;
      } else if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.form.email_member) == false) {
        this.message = "Email format is incorrect";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.tanggal_lahir == "") {
        this.message = "Please fill in the date of birth";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.tanggal_lahir > Date.now()) {
        this.message = "Date of birth cannot be more than today's date";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.username == "") {
        this.message = "Please fill in the username";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.password == "") {
        this.message = "Please fill in the password";
        this.color = "red";
        this.snackbar = true;
      } else {
        let formData = new FormData();
        formData.append("nama_member", this.form.nama_member);
        formData.append("alamat_member", this.form.alamat_member);
        formData.append("no_telp", this.form.no_telp);
        formData.append("deposit_member", this.form.deposit_member);
        formData.append("email_member", this.form.email_member);
        formData.append("tanggal_lahir", this.form.tanggal_lahir);
        formData.append("username", this.form.username);
        formData.append("password", this.form.password);
        
        this.load = true;
        var url = this.$api + "/member";
        this.$http
          .post(url, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.message = "Successfully added data member";
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.dialog = false;
            this.getDataMember();
            this.resetForm();
          })
          .catch((error) => {
            this.message = error;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
      
    },
    updateMember() {
      if(this.form.nama_member == "") {
        this.message = "Please fill in the name";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.alamat_member == "") {
        this.message = "Please fill in the address";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp == "") {
        this.message = "Please fill in the phone number";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.no_telp.length > 12) {
        this.message = "Phone number cannot be more than 12 digits";
        this.color = "red";
        this.snackbar = true;  
      } else if (this.form.no_telp.length < 10) { 
        this.message = "Phone number cannot be less than 10 digits";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.deposit_member < 0) {
        this.message = "Deposit value cannot be less than 0";
        this.color = "red";
        this.snackbar = true;  
      } else if (this.form.email_member == "") {
        this.message = "Please fill in the email";
        this.color = "red";
        this.snackbar = true;
      } else if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.form.email_member) == false) {
        this.message = "Email format is incorrect";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.tanggal_lahir < Date.now()) {
        this.message = "Date of birth cannot be less than today's date";
        this.color = "red";
        this.snackbar = true;
      } else {
        let newData = {
        nama_member: this.form.nama_member,
        no_telp: this.form.no_telp,
        alamat_member: this.form.alamat_member,
        deposit_member: this.form.deposit_member,
        email_member: this.form.email_member,
        tanggal_lahir: this.form.tanggal_lahir,
      };
      console.log(newData);
      var url = this.$api + "/member/" + this.editId;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.message = "Successfully updated data member";
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.dialog = false;
          this.getDataMember();
          this.resetForm();
          this.inputType = "Create";
        })
        .catch((error) => {
          this.message = error;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
      }

      
    },
    deleteData() {
      var url = this.$api + "/member/" + this.deleteId;
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
          this.getDataMember(); //mengambil data
          this.resetForm();
          location.reload();
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
      this.resetForm();
      this.dialog = false;
      this.inputType = "Create";
      this.getDataMember();
    },
    btnEdit(item) {
      this.inputType = "Update";
      this.editId = item.id_member;
      this.form.nama_member = item.nama_member;
      this.form.no_telp = item.no_telp;
      this.form.alamat_member = item.alamat_member;
      this.form.deposit_member = item.deposit_member;
      this.form.masa_berlaku = item.masa_berlaku;
      this.form.email_member = item.email_member;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.form.status = item.status;
      // this.form.username = item.username;
      //   this.form.password = item.password;
      this.dialog = true;
    },
    resetPassword(item) {
      let newData = {
        nama_member: item.nama_member,
        no_telp: item.no_telp,
        alamat_member: item.alamat_member,
        deposit_member: item.deposit_member,
        masa_berlaku: item.masa_berlaku,
        tanggal_lahir: item.tanggal_lahir,
        status: item.status,
        email_member: item.email_member,
        username: item.username,
        password: item.tanggal_lahir,
      };
      var url = this.$api + "/member/resetPassword/" + item.id_member;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.message = "Reset password success";
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.getDataMember();
          this.resetForm();
          this.inputType = "Create";
        })
    },
    btnDelete(id_member) {
      this.deleteId = id_member;
      this.dialogConfirm = true;
    },
    resetForm() {
      this.form = {
        nama_member: null,
        no_telp: null,
        alamat_member: null,
        deposit_member: null,
        masa_berlaku: null,
        tanggal_lahir: null,
        status: null,
        email_member: null,
        username: null,
        password: null,
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
