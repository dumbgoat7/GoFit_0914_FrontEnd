<template>
  <main>
    <v-container fluid fill-height style="position: absolute;">
      <v-layout flex align-center justify-center>
        <v-card style="width: 40%;padding: 5px 40px 10px 40px;border-radius: 10px;border: transparent;" elevation="24">
          <div>
              <div class="left-half">
                <img src="../assets/logo-gofit.png" alt="logo" height="100px" width="100px" class="center"/>
              </div>
              <v-divider style="margin-left: 8%;width: 100%;" inset></v-divider>
              <div class="right-half">
                <h2 style="font-family: 'Playfair Display', serif; font-weight: 600;">
                  Welcome to GoFit DBMS
                </h2>
                <br/>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Username"
                    v-model="username"
                    required
                    prepend-icon="mdi-account-circle-outline"
                    
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    required
                    prepend-icon="mdi-form-textbox-password"
                  >
                  </v-text-field>
                  <v-layout justify-end>
                    <v-btn class="mr-2 mb-5 mt-5" @click="loginPegawai" :class="{'blue darken-1 white--text': valid, disabled: !valid,}">
                      Login
                    </v-btn>
                  </v-layout>
                </v-form>
              </div>
            </div>
        </v-card>
      </v-layout>
      <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
        {{ error_message }}
      </v-snackbar>
    </v-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      password: "",
      posisi: "",
      username: "",
    };
  },
  methods: {
    loginPegawai() {
      if(this.username == "") {
        this.error_message = "Username tidak boleh kosong";
        this.color = "red";
        this.snackbar = true;
      } else if (this.password == "") {
        this.error_message = "Password tidak boleh kosong";
        this.color = "red";
        this.snackbar = true;
      } else {
      let url = this.$api + "/loginPegawai";
      this.$http
        .post(url, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          
          if (response.data.user.id_pegawai != null) {
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("id_pegawai", response.data.user.id_pegawai);
            localStorage.setItem("nama_pegawai",response.data.user.nama_pegawai);
            localStorage.setItem("role", response.data.user.role);
            console.log(localStorage.getItem("role"));
            console.log(localStorage.getItem("id_pegawai"));
            console.log(localStorage.getItem("nama_pegawai"));
            
            this.$router.push("/dashboard");
          }
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

<style scoped>

.left-half {
  flex: 30%;
  padding: 1rem;
}

.right-half {
  flex: 70%;
  padding: 1rem;
}
</style>
