import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(VueRouter)
function importViewComponent(path) {
  return () => import(`../views/${path}.vue`)
}
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: importViewComponent('LoginPage'),
    },
    {
      path: '/',
        component: importViewComponent('DashboardLayout'),
        children: [
            //Dashboard
            {
                path: '/laporanGym',
                name: 'laporanGym',
                meta: {title : 'laporan gym'},
                component: importViewComponent('LaporanGym'),
            },
            {
              path: '/laporanKelas',
              name: 'laporanKelas',
              meta: {title : 'laporan Kelas'},
              component: importViewComponent('LaporanKelas'),
            },
            {
              path: '/laporanPendapatan',
              name: 'laporanPendapatan',
              meta: {title : 'laporan Pendapatan'},
              component: importViewComponent('LaporanPendapatan'),
            },
            {
              path: '/laporanKinerja',
              name: 'laporanKinerja',
              meta: {title : 'laporan Kinerja'},
              component: importViewComponent('LaporanKinerjaInstruktur'),
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {title : 'dashboard'},
                component: importViewComponent('DashboardComponent'),
            },
            //member
            {
              path: '/member',
              name: 'member',
              meta: {title : 'member'},
              component: importViewComponent('MemberPage'),
            },
            //instruktur
            {
              path: '/instruktur',
              name: 'instruktur',
              meta: {title : 'instruktur'},
              component: importViewComponent('InstrukturPage'),
            },
            //jadwal
            {
              path: '/jadwal',
              name: 'jadwal',
              meta: {title : 'jadwal'},
              component: importViewComponent('JadwalPage'),
            },
            //jadwalHarian
            {
              path: '/jadwal-harian',
              name: 'jadwalHarian',
              meta: {title : 'jadwalHarian'},
              component: importViewComponent('JadwalHarianPage'),
            },
            //aktivasi
            {
              path: '/aktivasi',
              name: 'aktivasi',
              meta: {title : 'aktivasi'},
              component: importViewComponent('TransaksiAktivasiPage'),
            },
            {
              path: '/aktivasiMember',
              name: 'aktivasiMember',
              meta: {title : 'aktivasiMember'},
              component: importViewComponent('MemberActivationPage'),
            },
            //deposit
            {
              path: '/memberDeposit',
              name: 'memberDeposit',
              meta: {title : 'memberDeposit'},
              component: importViewComponent('MemberDepositPage'),
            },
            //depositReguler
            {
              path: '/deposit-reguler',
              name: 'depositReguler',
              meta: {title : 'depositReguler'},
              component: importViewComponent('TransaksiDepositRegulerPage'),
            },
            //depositKelas
            {
              path: '/deposit-kelas',
              name: 'depositKelas',
              meta: {title : 'depositKelas'},
              component: importViewComponent('TransaksiDepositKelasPage'),
            },
            {
              path: '/ijin-instruktur',
              name: 'ijinInstruktur',
              meta: {title : 'ijinInstruktur'},
              component: importViewComponent('IjinInstrukturPage'),
            },
            {
              path:'/booking-gym',
              name:'bookingGym',
              meta: {title : 'bookingGym'},
              component: importViewComponent('BookingGymPage'),
            },
            {
              path:'/booking-kelas',
              name:'bookingKelas',
              meta: {title : 'bookingKelas'},
              component: importViewComponent('BookingKelasPage'),
            },
            {
              path:'/presensi-gym',
              name:'presensiGym',
              meta: {title : 'presensiGym'},
              component: importViewComponent('PresensiGymPage'),
            }
          ]
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})

export default router
