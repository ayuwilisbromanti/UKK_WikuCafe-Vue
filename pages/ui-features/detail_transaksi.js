var Detail_Transaksi = {
    template : `
    <div class="row">
    <div class="col-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
        <h4 class="card-title">Pesanan</h4>
          <form class="forms-sample" v-on:submit="act_save()">
            <div class="form-group">
              <label for="exampleSelectGender">Nama Pelanggan</label>
              <select v-model="selected_trx" class="form-control text-light" id="exampleSelectGender">
                <option v-for="transaksi in list_transaksi" :value="transaksi.id_transaksi">{{transaksi.nama_pelanggan}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleSelectGender">Pesanan</label>
              <select v-model="selected_menu" class="form-control text-light" id="exampleSelectGender">
                <option v-for="menu in list_menu" :value="menu.id_menu">{{menu.nama_menu}}</option>
              </select>
            </div>
            <div class="col-md-12">
              <div class="form-group date">
                <label class="col-sm-12 col-form-label">Jumlah</label>
                <div class="col-sm-12">
                  <input v-model="qty" type="number" class="form-control text-light" v-on:keyup="gettotal()" placeholder="0" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Total</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-primary text-white">Rp</span>
                </div>
                <input v-model="total" type="number" class="form-control text-light" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                  <span class="input-group-text">00</span>
                </div>
            </div>
            </div>
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <router-link to="/transaksi" class="btn btn-dark">Cancel</router-link>
          </form>
          <div>
             <div v-bind:class="style_alert">{{notif}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>`,

  data(){
    return {
      list_transaksi:[],
      selected_trx : '',
      list_menu:[],
      selected_menu:'',
      qty:'',
      style_alert : '',
      alert : false,
      notif : '',
      total : 0,
      
    }
  },
  methods:{
    async get_transaksi(){
      var option={
          headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
          }
      };
      var trx_opt = await axios.get("http://localhost/ukk_cafe/public/api/admin/transaksi_option", option);
      console.log(trx_opt);
      this.list_transaksi = trx_opt.data;
    },
    async get_menu(){
      var option={
          headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
          }
      };
      var menu_opt = await axios.get("http://localhost/ukk_cafe/public/api/admin/list_menu_kasir", option);
      console.log(menu_opt);
      this.list_menu = menu_opt.data;
    },
    async act_save(){
      var data_detail={
        id_transaksi : this.selected_trx,
        id_menu : this.selected_menu,
        harga : this.total,
        qty : this.qty,
      };
      var option={
          headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
          }
      };
      var res = await axios.post("http://localhost/ukk_cafe/public/api/admin/create_detail", data_detail, option);
      console.log(res);
      if(res.data.status == true){
        this.alert=true;
        this.notif = res.data.message;
        this.style_alert = 'alert alert-success'
      }else{
        this.alert=true;
        this.notif=res.data.message
        this.style_alert='alert alert-danger'
      }
    },
     async gettotal(){
      var option={
          headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
          }
      };
      var hargas=await axios.get("http://localhost/ukk_cafe/public/api/admin/get_harga/"+this.selected_menu, option);
      this.total=this.qty*hargas.data.harga;
    }
  },
  mounted(){
    this.get_transaksi();
    this.get_menu();
    this.data_user=JSON.parse(localStorage.getItem('user'));
    if(this.data_user.role!='kasir'){
      alert("Anda bukan kasir!");
      this.$router.replace({name:"Dashboard"})
      }
  }
}