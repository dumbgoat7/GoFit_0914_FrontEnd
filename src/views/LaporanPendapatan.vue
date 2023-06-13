<template>
    <v-main>
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
          <v-icon>>mdi-chevron-right</v-icon>

          <h3 class="h2"> Reports</h3>
          <v-icon>mdi-chevron-right</v-icon>
          <h3 class="h2">Annual Income Reports</h3>
          
      </div>
      <v-card>
        <div class="mb-10" style="display: flex">
          <v-col>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="year"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="year"
                    label="Select Year"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
                <v-date-picker
                    v-model="year"
                    no-title
                    ref="picker"
                    scrollable
                    @click:year="saveYear(year)"
                >
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                    Cancel
                <v-spacer></v-spacer>
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click:year="saveYear(year)"
                >
                    OK
                </v-btn>
                </v-date-picker>
            </v-menu>
          </v-col>
        </div>
      </v-card>
        <v-card>
            <v-card-title>
                Annual Income Report
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
                
                <template v-slot:[`item.total_pendapatan`]="{ item }">
                    Rp {{ formatNumber(item.total_pendapatan) }}
                </template>
                <template v-slot:[`item.total_pendapatan_aktivasi`]="{ item }">
                    Rp {{ formatNumber(item.total_pendapatan_aktivasi) }}
                </template>
                <template v-slot:[`item.total_pendapatan_deposit`]="{ item }">
                    Rp {{ formatNumber(item.total_pendapatan_deposit) }}
                </template>

            </v-data-table>
            <canvas id="chart"></canvas>
        </v-card>
    </v-main>
</template>

<script>
import numeral from 'numeral'
import { ref } from 'vue';
import { Chart } from 'chart.js';
import { jsPDF } from 'jspdf';
import "blueimp-canvas-to-blob";

export default {
    data() {
        return {
            editId: "",
            menu: false,
            picker: false,
            year: null,
            total: 0,
            load: false,
            snackbar: false,
            totalMember: 0,
            deleteId: '',
            dataLaporan: ref([]),
            headers: [
                {
                    text: 'Bulan',
                    value: 'nama_bulan'
                },
                {
                    text: 'Aktivasi',
                    value: 'total_pendapatan_aktivasi'
                },
                {
                    text: 'Deposit',
                    value: 'total_pendapatan_deposit'
                },
                {
                    text: 'Total',
                    value: 'total_pendapatan'
                }
            ],
        };
    },
    watch: {
        menu (val) {
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
        currentYear() {
            return new Date().getFullYear();
        }
    },
    mounted() {
        this.year = this.currentYear;
        this.getdataLaporanPendapatanTahun();
    },
    methods: {
        saveYear(year) {
            this.$refs.menu.save(year)

            // Reset activePicker to type YEAR
            this.$refs.picker.activePicker = 'YEAR'

            // Close the menu/datepicker
            this.menu = false
        },
        formatNumber(value){
            return numeral(value).format('0,0.00');
        },
        printTable() {
            window.print();
        },
        getImageData(img) {
            return new Promise((resolve) => {
                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(function (blob) {
                        resolve(blob);
                    }, "image/png"); // Add the MIME type parameter

                    // Clean up
                    document.body.removeChild(canvas);
                };

                // Append the image to the document body
                document.body.appendChild(img);
            });
        },
        generatePDFChart() {
            const canvas = document.getElementById("chart");
            const dataURL = canvas.toDataURL("image/png");

            const img = new Image();
            img.src = dataURL;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    const imgData = URL.createObjectURL(blob);
                    const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
                    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
                    pdf.save("chart.pdf");
                }, "image/png");

                // Clean up
                URL.revokeObjectURL(img.src);
            };
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
              <h1>Laporan Tahunan</h1>
              <h3>Tanggal Cetak: ${currentDate}</h3>
              <table>
                  <thead>
                      <tr>
                          <th>Bulan</th>
                          <th>Aktivasi</th>
                          <th>Deposit</th>
                          <th>Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${this.dataLaporan
                    .map(
                        row => `
                          <tr>
                            <td>${row.nama_bulan}</td>
                            <td>Rp ${this.formatNumber(row.total_pendapatan_aktivasi)}</td>
                            <td>Rp ${this.formatNumber(row.total_pendapatan_deposit)}</td>
                            <td>Rp ${this.formatNumber(row.total_pendapatan)}</td>
                          </tr>
                      `
                    )
                    .join('')}
                    <tr>
                        <td colspan="3">Total</td>
                        <td>Rp ${this.formatNumber(this.total)})</td>
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
        getdataLaporanPendapatanTahun() {
            this.load = true;
            var url = this.$api + "/laporanPendapatan/" + this.year;
            this.$http
            .get(url, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              console.log(response);
              this.dataLaporan = response.data.data;
              this.getTotal();
              this.renderChart();
              this.load = false;
            })
        },
        getTotal(){
            for(var i = 0; i < this.dataLaporan.length; i++){
                this.total += this.dataLaporan[i].total_pendapatan;
            }
        },
        renderChart() {
            const ctx = document.getElementById('chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.dataLaporan.map(row => row.nama_bulan),
                    datasets: [
                        {
                            label: 'Aktivasi',
                            data: this.dataLaporan.map(row => row.total_pendapatan_aktivasi),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Deposit',
                            data: this.dataLaporan.map(row => row.total_pendapatan_deposit),
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Total',
                            data: this.dataLaporan.map(row => row.total_pendapatan),
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            display: true,
                            beginAtZero: true
                        }
                    }
                }
            });
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