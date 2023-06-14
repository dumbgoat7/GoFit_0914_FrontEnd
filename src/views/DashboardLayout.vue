<template>
  <div class="dashboard ml-5 mr-5">
    <v-navigation-drawer
      v-model="drawer"
      width="256"
      app
      color="#28243d"
    >
    <div style="background-color: #845EC2;">
      <v-list-item class="px-2">
        <v-avatar class="mb-2 mt-2">
          <img src="../assets/logo-gofit.png" alt="logo" class="center"/>
        </v-avatar>
        <div class="ml-5">
          <v-list-item-title style="color: aliceblue; font-weight: bold">{{
            getName()
          }}</v-list-item-title>
          <v-list-item-subtitle style="color: aliceblue">{{
            getRole()
          }}</v-list-item-subtitle>
        </div>
      </v-list-item>
    </div>
      <v-divider></v-divider>

      <v-list dense nav v-if="loggedInAdmin" shaped>
        <v-list-item
          v-for="item in admin"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content style="color: white; font-weight: bold">
            <v-list-item-title
              ><v-icon class="mr-1 mb-1" style="color: aliceblue;">{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav v-else-if="loggedInKasir" shaped>
        <v-list-item
          v-for="item in kasir"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content style="color: white; font-weight: bold">
            <v-list-item-title
              ><v-icon style="color: aliceblue;">{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <v-list nav v-else-if="loggedInMO" shaped>
        <v-list-item
          v-for="item in MO"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content style="color: white; font-weight: bold">
            <v-list-item-title
              ><v-icon style="color: aliceblue;">{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav v-else shaped>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content style="color: white; font-weight: bold">
            <v-list-item-title 
              ><v-icon class="mr-1 mb-1" style="color: aliceblue;">{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed height="60px" color="#ffffff">
      <v-btn icon @click.stop="drawer = !drawer">
        <img src="@/assets/icons/menu.svg" alt="close" />
      </v-btn>
      <div class="ml-auto" style="display: flex">
        <div class="mt-1" @click="btnLogout()">
          <v-btn icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <div class="fullheigh pa-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: "mdi-home",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-calendar-blank",
          title: "Schedule",
          to: "/jadwal",
        },
        {
          icon: "mdi-calendar-blank",
          title: "Daily Schedule",
          to: "/jadwal-harian",
        },
        {
          icon: "mdi-human-male-board",
          title: "Instructur",
          to: "/instruktur",
        },
        {
          icon: "mdi-account-outline",
          title: "Member",
          to: "/member",
        },
        {
          icon: "mdi-cash-100",
          title: "Activation Transaction",
          to: "/aktivasi",
        },
        {
          icon: "mdi-cash",
          title: "Regular Deposit Transaction",
          to: "/deposit-reguler",
        },
        {
          icon: "mdi-cash-multiple",
          title: "Class Deposit Transaction",
          to: "/deposit-kelas",
        },
        {
          icon: "mdi-email",
          title: "Instructur Absense Request",
          to: "/ijin-instruktur",
        },
        {
          icon: "mdi-email",
          title: "Booking Gym",
          to: "/booking-gym",
        },
        {
          icon: "mdi-email",
          title: "Booking Class",
          to: "/booking-kelas",
        },
        {
          icon: "mdi-email",
          title: "Gym Monthly Reports",
          to: "/laporanGym",
        },
        {
          icon: "mdi-email",
          title: "Gym Class Monthly Reports",
          to: "/laporanKelas",
        },
        {
          icon: "mdi-email",
          title: "Annual Income Reports",
          to: "/laporanPendapatan",
        },
        {
          icon: "mdi-email",
          title: "Instructor Performance Reports",
          to: "/laporanKinerja",
        }
      ],
      kasir: [
      {
          icon: "mdi-home",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-account-outline",
          title: "Member",
          to: "/member",
        },
        {
          icon: "mdi-cash-100",
          title: "Activation Transaction",
          to: "/aktivasi",
        },
        {
          icon: "mdi-cash",
          title: "Regular Deposit Transaction",
          to: "/deposit-reguler",
        },
        {
          icon: "mdi-cash-multiple",
          title: "Class Deposit Transaction",
          to: "/deposit-kelas",
        },
        {
          icon: "mdi-email",
          title: "Booking Gym",
          to: "/booking-gym",
        },
        {
          icon: "mdi-email",
          title: "Booking Class",
          to: "/booking-kelas",
        }
      ],
      admin: [
        {
          icon: "mdi-home",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-human-male-board",
          title: "Instructur",
          to: "/instruktur",
        },
      ],
      MO: [
        {
          icon: "mdi-home",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-calendar-blank",
          title: "Schedule",
          to: "/jadwal",
        },
        {
          icon: "mdi-calendar-blank",
          title: "Daily Schedule",
          to: "/jadwal-harian",
        },
        {
          icon: "mdi-email",
          title: "Instructur Absense Request",
          to: "/ijin-instruktur",
        },
        {
          icon: "mdi-email",
          title: "Laporan Gym",
          to: "/laporanGym",
        },
        {
          icon: "mdi-email",
          title: "Laporan Kelas",
          to: "/laporanKelas",
        },
        {
          icon: "mdi-email",
          title: "Instructor Performance Reports",
          to: "/laporanKinerja",
        }
      ],
      mini: true,
    };
  },
  methods: {
    btnLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id_pegawai");
      localStorage.removeItem("nama_pegawai");
      localStorage.removeItem("role");
      this.$router.push("/");
    },
    getName() {
      if (localStorage.getItem("id_pegawai") != null) {
        return localStorage.getItem("nama_pegawai");
      } else {
        return localStorage.getItem("nama_member");
      }
    },
    getRole() {
      return localStorage.getItem("role");
    },
  },
  computed: {
    loggedIn() {
      return localStorage.getItem("token") != null;
    },
    loggedInAdmin() {
      return localStorage.getItem("role") == "Admin";
    },
    loggedInMO() {
      return localStorage.getItem("role") == "Manager Operasional";
    },
    loggedInKasir() {
      return localStorage.getItem("role") == "Kasir";
    },
  },
  mounted() {
    this.getName();
    this.getRole();
  },
};
</script>
<style scoped>
.navbar-drawer {
  min-height: 100vh !important;
  color: #28243d;
}
.dashboard {
  color: black;
  text-align: left;
}
.v-list-item--active{
  background-image: linear-gradient(to right, #ae84fc, #9a70e4, #865dcd, #724ab6, #5f379f);
  /* border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
   */
  margin-left: -10px;
}
  </style>
