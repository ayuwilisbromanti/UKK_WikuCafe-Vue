var Tambah_Transaksi = {
    template : `
    <div class="row">
    <div class="col-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Transaksi Baru</h4>
          <form v-on:submit="act_simpan()" class="forms-sample">
            <div class="form-group">
              <label for="exampleInputName1">Nama Pelanggan</label>
              <input v-model="nama_pelanggan"  type="text" class="form-control text-light" id="exampleInputName1" placeholder="Name">
            </div>
            <div class="col-md-12">
              <div class="form-group date">
                <label class="col-sm-12 col-form-label">Tanggal Transaksi</label>
                <div class="col-sm-12">
                  <input v-model="tgl_transaksi" type="datetime-local" class="form-control text-light" placeholder="dd/mm/yyyy" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleSelectGender">Kasir</label>
              <select v-model="selected_user" v-on:load="get_kasir()" class="form-control text-light" id="exampleSelectGender">
              <option v-for="users in user_option" :value="users.id">{{users.nama_user}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleSelectGender">Nomor Meja</label>
              <select v-model="selected_meja" class="form-control text-light" id="exampleSelectGender">
                <option v-for="meja in meja_option" :value="meja.id_meja">{{meja.nomor_meja}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleSelectGender">Status Pesanan</label>
              <select v-model="status" class="form-control text-light" id="exampleSelectGender">
                <option value="lunas">Lunas</option>
                <option value="belum_bayar">Belum Dibayar</option>
              </select>
            </div>
            <input type="submit" class="btn btn-primary me-2">
            <a class="btn btn-dark" v-bind:href="'#/transaksi'">Cancel</a>
          </form>
          <div>
            <div v-bind:class="style_notif">{{notif}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>`,

  data(){
    return {
      user_option:[],
      selected_user :'',
      meja_option:[],
      selected_meja:'',
      nama_pelanggan : '',
      tgl_transaksi : '',
      status : '',
      style_notif : '',
      alert : false,
      notif : '',
      data_user:[]
    }
  },
  methods:{
    async get_user(){
      var option={
          headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
          }
      };
      var opt_user = await axios.get("http://localhost/ukk_cafe/public/api/admin/get_kasir", option);
      console.log(opt_user);
      this.user_option = opt_user.data;
    },
    async get_meja(){
      var option={
          headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
          }
      };
      var opt_meja = await axios.get("http://localhost/ukk_cafe/public/api/admin/opt_meja", option);
      console.log(opt_meja);
      this.meja_option = opt_meja.data;
    },
    get_kasir(){
      this.data_user=JSON.parse(localStorage.getItem('user'));
      this.selected_user = this.data_user.id
      console.log(this.selected_user);
    },
    async act_simpan(){
      var data_transaksi={
        nama_pelanggan : this.nama_pelanggan,
        tgl_transaksi : this.tgl_transaksi,
        id_user : this.selected_user,
        id_meja : this.selected_meja,
        status : this.status
      };
      var option={
          headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
          }
      };
      var res = await axios.post("http://localhost/ukk_cafe/public/api/admin/create_transaksi", data_transaksi, option);
      console.log(res);
      if(res.data.status_create==true){
            this.$router.push('/detail_transaksi')
      }else{
        this.alert=true;
        this.notif=res.data.message
        this.style_notif='alert alert-danger'
      }
    },
  },
  mounted(){
    this.get_user();
    this.get_meja();
    this.get_kasir();
    this.data_user=JSON.parse(localStorage.getItem('user'));
    if(this.data_user.role!='kasir'){
      alert("Anda bukan kasir!");
      this.$router.replace({name:"Dashboard"})
      }
  },
};