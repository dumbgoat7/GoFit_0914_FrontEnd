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
            <v-btn color="#9155FD" style="font-weight: bold; color: white" @click="getDataLaporanKinerja">Search</v-btn>
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
            <v-data-table :headers="headers" :items="dataLaporan" :search="search" :loading="load"
                loading-text="Sedang mengambil data" no-data-text="Tidak ada Data">
                <template v-slot:[`item.waktu_terlambat`]="{ item }">
                    <span>{{ item.waktu_terlambat }} seconds</span>
                </template>
            </v-data-table>
        </v-card>
    </v-main>
</template>

<script>
import { ref } from 'vue';
export default {
    data() {
        return {
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
            dialogConfirm2: false,
            dialogConfirm: false,
            color: '',
            search: '',
            editId: '',
            deleteId: '',
            dataLaporan: ref([]),
            headers: [

                {
                    text: 'Instructor Name',
                    value: 'nama_instruktur'
                },
                {
                    text: 'Amount of Attendance',
                    value: 'jumlah_hadir'
                },
                {
                    text: 'Amount of Absence',
                    value: 'jumlah_ijin'
                },
                {
                    text: 'Total of Late Time',
                    value: 'waktu_terlambat'
                },
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
        this.getDataLaporanKinerja();
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
            /* Gaya khusus untuk mencetak */
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
        <title>Gofit</title>
        <subtitle>Jl. Centralpark No. 10 Yogyakarta</subtitle>
        <body>
            <h1>Laporan Kinerja Instruktur</h1>
            <h3>Tanggal Cetak: ${currentDate}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Jumlah Hadir</th>
                        <th>Jumlah Libur</th>
                        <th>Waktu Terlambat (detik)</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.dataLaporan.map(row => `
                        <tr>
                            <td>${row.nama_instruktur}</td>
                            <td>${row.jumlah_hadir}</td>
                            <td>${row.jumlah_ijin}</td>
                            <td>${row.waktu_terlambat} seconds</td>
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
        getDataLaporanKinerja(){
            this.load = true;
            console.log(this.selectedMonth);
            var url = this.$api + "/laporanKinerja/" + this.selectedMonth;
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
        
        editHandler(item){
            // this.dialogConfirm = true;
            console.log('Gagal')
            console.log(item)
            this.$router.push({name: 'Mo-Jadwal-UmumViewEdit', query : item})
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