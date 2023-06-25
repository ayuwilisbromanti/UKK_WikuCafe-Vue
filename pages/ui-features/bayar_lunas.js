var Bayar = {
    template : `
    <div class="row">
    <div class="col-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
        <h4 class="card-title">Bayar</h4>
          <form class="forms-sample" v-on:submit="update_tagihan(this.$route.params.id)">
            <div class="form-group">
              <label for="exampleSelectGender">Nama Pelanggan</label>
              <select v-model="selected_trx" class="form-control text-light" id="exampleSelectGender">
                <option v-for="transaksi in opt_trx" :value="transaksi.id_transaksi">{{transaksi.nama_pelanggan}}</option>
              </select>
            </div>
            <div class="col-md-12">
              <div class="form-group date">
                <label class="col-sm-12 col-form-label">Tanggal Transaksi</label>
                <div class="col-sm-12">
                  <input v-model="tgl_trx" type="datetime-local" class="form-control text-light" placeholder="dd/mm/yyyy" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Tagihan</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-primary text-white">Rp</span>
                </div>
                <input v-model="tagihan" type="number" class="form-control text-light" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                  <span class="input-group-text">00</span>
                </div>
            </div>
            </div>
            <div class="form-group">
              <label>Dibayar</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-primary text-white">Rp</span>
                </div>
                <input v-model="dibayar" v-on:keyup="getKembalian()" type="number" class="form-control text-light" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                  <span class="input-group-text">00</span>
                </div>
            </div>
            </div>
            <div class="form-group">
              <label>Kembalian</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-primary text-white">Rp</span>
                </div>
                <input v-model="kembalian" type="number" class="form-control text-light" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                  <span class="input-group-text">00</span>
                </div>
            </div>
            </div>
            <button type="submit" class="btn btn-success me-2">Bayar</button>
            <router-link to="/transaksi" class="btn btn-dark">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div>
     <div v-bind:class="notif_style">{{notif}}</div>
  </div>
    `,

    data(){
        return {
            opt_trx : [],
            selected_trx : '',
            tgl_trx : '',
            tagihan : 0,
            dibayar : 0,
            kembalian : 0,
            id_trx : '',
            status : 'lunas',
            notif_style : '',
            alert : false,
            notif : ''
        }
    },
    methods:{
        async trx_option(){
          var option={
              headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
              }
          };
            var opt = await axios.get("http://localhost/ukk_cafe/public/api/admin/transaksi_option", option);
            console.log(opt);
            this.opt_trx = opt.data;
        },
        async get_tagihan(id){
          var option={
              headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
              }
          };
          var get_tagihan = await axios.get("http://localhost/ukk_cafe/public/api/admin/get_sum/"+id, option);
          console.log(get_tagihan);
          this.tagihan = get_tagihan.data.total;
        },
        async get_data(id){
          var option={
              headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
              }
          };
            var get_trx = await axios.get("http://localhost/ukk_cafe/public/api/admin/detail_trx/"+id, option);
            this.selected_trx = get_trx.data.id_transaksi;
            this.tgl_trx = get_trx.data.tgl_transaksi;
            console.log(get_trx);
        },
        getKembalian(){
          this.kembalian = this.dibayar - this.tagihan;
        },
        async update_tagihan(id){
          data={
            tagihan : this.tagihan,
            dibayar : this.dibayar,
            kembalian : this.kembalian
          };
          lunas={
            status_lunas : this.status
          };
          var option={
              headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
              }
          };
          var update = await axios.put("http://localhost/ukk_cafe/public/api/admin/update_tagihan/"+id, data, option);
          console.log(update);
          var res = await axios.put("http://localhost/ukk_cafe/public/api/admin/update_lunas/"+this.$route.params.id, lunas, option);
          console.log(res);
          if(res.data.status == true){
            this.alert=true;
            this.notif=res.data.message
            this.notif_style = 'alert alert-success'
            setTimeout(()=>{
                this.$router.push('/transaksi')
            },2000)
        }else{
            this.alert = true;
            this.notif = res.data.message
            this.notif_style = 'alert alert-danger'
        }
      },
    },
    mounted(){
        this.trx_option();
        this.get_data(this.$route.params.id);
        this.get_tagihan(this.$route.params.id);
        this.data_user=JSON.parse(localStorage.getItem('user'));
        if(this.data_user.role!='kasir'){
          alert("Anda bukan kasir!");
          this.$router.replace({name:"Dashboard"})
          }
    }
};