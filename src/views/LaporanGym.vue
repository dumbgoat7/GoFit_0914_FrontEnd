<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>>mdi-chevron-right</v-icon>

          <h3 class="h2"> Laporan</h3>
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Laporan Gym</h3>
          
      </div>
      <v-card>
        <div class="mb-10" style="display: flex">
          <v-col>
            <v-select
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
            clearable
            ></v-select>
            <v-btn color="#9155FD" style="font-weight: bold; color: white" @click="searchByMonth">Search</v-btn>
            
          </v-col>
          <div class="ml-auto">
            
          </div>
        </div>
      </v-card>
      <v-card>
        <v-card-title>
          Laporan Gym
          <v-spacer></v-spacer>
          <v-btn
              color="#9155FD"
              style="font-weight: bold; color: white"
              @click="printData">
              Print
            </v-btn> 
        </v-card-title>
        
            <v-data-table :headers="headers" :items="dataJadwal" :search="search" :loading="load"
                loading-text="Sedang mengambil data" no-data-text="Tidak ada Data">
                
            </v-data-table>
        </v-card>
    </v-main>
</template>

<script>
import { ref } from 'vue';
export default {
    data() {
        return {
            editId: "",
            selectedMonth: null,
            months: [
                {
                    text: 'January',
                    value: '1'
                },
                {
                    text: 'February',
                    value: '2'
                },
                {
                    text: 'March',
                    value: '3'
                },
                {
                    text: 'April',
                    value: '4'
                },
                {
                    text: 'May',
                    value: '5'
                },
                {
                    text: 'June',
                    value: '6'
                },
                {
                    text: 'July',
                    value: '7'
                },
                {
                    text: 'Agustus',
                    value: '8'
                },
                {
                    text: 'September',
                    value: '9'
                },
                {
                    text: 'October',
                    value: '10'
                },
                {
                    text: 'November',
                    value: '11'
                },
                {
                    text: 'December',
                    value: '12'
                },
                ],
            search: null,
            load: false,
            snackbar: false,
            totalMember: 0,
            deleteId: '',
            dataJadwal: ref([]),
            headers: [
                {
                    text: 'Tanggal',
                    value: 'tanggal'
                },
                {
                    text: 'Jumlah Member',
                    value: 'count'
                }
            ],
        };
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
        currentMonth() {
            return new Date().getMonth() + 1;
        }
    },
    mounted() {
        this.getDataJadwalGymBulanan();
        this.selectedMonth = this.currentMonth.toString();
    },
    methods: {
        printTable() {
            window.print();
        },

        printData() {
            // Membuka jendela baru untuk mencetak konten
            const printWindow = window.open('', '', 'width=800,height=600');
            const currentDate = new Date().toISOString().substr(0, 10);
            printWindow.document.open();
            printWindow.document.write(`
      <html>
      <head>
          <style>
          @media print {
              /* Gaya untuk menyembunyikan elemen yang tidak perlu dicetak */
              #printable {
                  visibility: visible;
              }
              /* Gaya khusus lainnya sesuai kebutuhan Anda */
          }
      table {
          border-collapse: collapse;
          width: 100%;
      }
      
      th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
      }
      
      th {
          background-color: #f2f2f2;
      }
      </style>
      </head>
      <body>
          <h1>Laporan Gym Bulanan</h1>
          <h3>Tanggal Cetak: ${currentDate}</h3>
          <table>
              <thead>
                  <tr>
                      <th>Tanggal</th>
                      <th>Jumlah Member</th>
                  </tr>
              </thead>
              <tbody>
                  ${this.dataJadwal.map(row => `
                      <tr>
                          <td>${row.tanggal}</td>
                          <td>${row.count}</td>
                      </tr>
                  `).join('')}
                    <tr>
                      <td>Total</td>  
                      <td>${this.totalMember}</td>  
                    </tr>
              </tbody>
          </table>
      </body>
      </html>
  `);
            printWindow.document.close();

            // console.log(printWindow);
            // Tunggu beberapa saat sebelum mencetak untuk memastikan konten dimuat
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        },
        calculateTotalMember() {
            this.totalMember = this.dataJadwal.reduce((total, row) => total + row.count, 0);
        },
        getDataJadwalGymBulanan() {
            this.load = true;
            var url = this.$api + "/laporanGym/" + this.selectedMonth;
            this.$http
            .get(url, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              console.log(response);
              this.dataJadwal = response.data.data;
              this.calculateTotalMember();
              this.load = false;
            })
        },
        searchByMonth() {
            this.load = true;
            var url = this.$api + "/laporanGym/" + this.selectedMonth;
            this.$http
            .get(url, {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              console.log(response);
              this.dataJadwal = response.data.data;
              this.calculateTotalMember();
              this.load = false;
            })
        }
    },
};
</script>

<style>
@media print {

    /* Hide unnecessary elements when printing */
    /* * v-data-table {
  visibility: visible !important;
}
body * {
  visibility: hidden; */
    body>*:not(#printable) {
        display: none
    }
}

#app {
    margin-top: -10px;
    background-color: #ffffff;
}

@media screen {
    .v-data-table>.v-data-table__wrapper>table>tbody>tr:nth-child(odd) {
        border-left: 6px solid #1428de;
    }

    .v-data-table>.v-data-table__wrapper>table>tbody>tr:nth-child(even) {
        border-left: 6px solid #ffffff;
    }
}
</style>