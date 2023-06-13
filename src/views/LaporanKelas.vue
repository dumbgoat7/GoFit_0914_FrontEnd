<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>>mdi-chevron-right</v-icon>

          <h3 class="h2"> Reports</h3>
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Gym Class Monthly Reports</h3>
          
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
            <v-btn color="#9155FD" style="font-weight: bold; color: white" @click="getdataLaporanKelasBulanan">Search</v-btn>
          </v-col>
        </div>
      </v-card>
        <v-card>
            <v-card-title>
                Gym Class Monthly Report
                <v-spacer></v-spacer>
            <v-btn
                color="#9155FD"
                style="font-weight: bold; color: white"
                @click="printData">
                Print
            </v-btn> 
        </v-card-title>
            <v-data-table :headers="headers" :items="dataLaporan" :loading="load"
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
            load: false,
            snackbar: false,
            totalMember: 0,
            deleteId: '',
            dataLaporan: ref([]),
            headers: [
                {
                    text: 'Kelas',
                    value: 'kelas'
                },
                {
                    text: 'Instruktur',
                    value: 'instruktur'
                },
                {
                    text: 'Jumlah Peserta',
                    value: 'jumlah_peserta'
                },
                {
                    text: 'Jumlah Libur',
                    value: 'jumlah_libur'
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
        this.selectedMonth = this.currentMonth.toString();
        this.getdataLaporanKelasBulanan();
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
            <h1>Laporan Kelas Bulanan</h1>
            <h3>Tanggal Cetak: ${currentDate}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Kelas</th>
                        <th>Instruktur</th>
                        <th>Jumlah Peserta</th>
                        <th>Jumlah Libur</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.dataLaporan.map(row => `
                        <tr>
                            <td>${row.kelas}</td>
                            <td>${row.instruktur}</td>
                            <td>${row.jumlah_peserta}</td>
                            <td>${row.jumlah_libur}</td>
                        </tr>
                    `).join('')}
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
            this.totalMember = this.dataLaporan.reduce((total, row) => total + row.count, 0);
        },
        getdataLaporanKelasBulanan() {
            this.load = true;
            console.log(this.selectedMonth);
            var url = this.$api + "/laporanKelas/" + this.selectedMonth;
            this.$http
            .get(url, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              console.log(response);
              this.dataLaporan = response.data.data;
              this.calculateTotalMember();
              this.load = false;
            })
        },
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