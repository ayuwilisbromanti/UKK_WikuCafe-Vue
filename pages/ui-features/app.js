var routes = [
    {
        path : '/',
        name : 'Dashboard',
        component : Dashboard
    },
    {
        path : '/user',
        name : 'User',
        component : User
    },
    {
        path : '/tambah_user',
        name : 'Tambah_User',
        component : Tambah_User
    },
    {
        path : '/edit_user/:id',
        name : 'Edit_User',
        component : Edit_User
    },
    {
        path : '/menu',
        name : 'Menu',
        component : Menu
    },
    {
        path : '/tambah_menu',
        name : 'Tambah_Menu',
        component : Tambah_Menu
    },
    {
        path : '/edit_menu/:id',
        name : 'Edit_Menu',
        component : Edit_Menu
    },
    {
        path : '/meja',
        name : 'Meja',
        component : Meja
    },
    {
        path : '/tambah_meja',
        name : 'Tambah_Meja',
        component : Tambah_Meja
    },
    {
        path : '/edit_meja/:id',
        name : 'Edit_Meja',
        component : Edit_Meja
    },
    {
        path : '/transaksi',
        name : 'Transaksi',
        component : Transaksi
    },
    {
        path : '/tambah_transaksi',
        name : 'Tambah_Transaksi',
        component : Tambah_Transaksi
    },
    {
        path : '/detail_transaksi',
        name : 'Detail_Transaksi',
        component : Detail_Transaksi
    },
    {
        path : '/bayar/:id',
        name : 'Bayar',
        component : Bayar
    },
    {
        path : '/login', 
        name: 'Login', 
        component : Login
    },
    {
        path : '/detail/:id', 
        name: 'Detail_Transaksi_Manager', 
        component : Detail_Transaksi_Manager
    },
];

var router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

var app = Vue.createApp({
    data(){
        return{
            authenticated : (localStorage.getItem('status')=='true'?true:false),
            data:[]
        }
    },
    methods:{
        setAuthenticated(status){
            this.authenticated=status
        },
        logout(){
            this.authenticated = false;
            localStorage.clear();
            location.reload();
        },
        redirectLogin(){
            if(!this.authenticated){
                this.$router.replace({name : "Login"})
            }
        },
    },
    mounted(){
        this.redirectLogin()
        if(JSON.parse(localStorage.getItem('user'))!=null){
            this.data = JSON.parse(localStorage.getItem('user'))
        }
    }
});
app.use(router);
app.mount('#app');