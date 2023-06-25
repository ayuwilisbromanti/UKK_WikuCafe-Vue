var Transaksi = {
    template : `
    <div class="row ">
    <div class="col-12 grid-margin">
      <div class="card">
        <div class="card-body">
        <div class="row">
          <div class="col-12 col-xl-8 mb-4 mb-xl-0">
            <a class="card-title btn btn-success create-new-button-right"  v-bind:href="'#/tambah_transaksi'" v-if="data_user.role=='kasir'">+ Transaksi Baru</a>
          </div>
          <div class="col-sm-2 flex-md-grow-1 flex-xl-grow-0">
            <p for="exampleSelectGender">Dari Tanggal</p>
            <input v-model="start_date" v-on:change="get_transaksi()"  type="date" class="form-control text-light" placeholder="dd/mm/yyyy"/>
          </div>
          <div class="col-sm-2 flex-md-grow-1 flex-xl-grow-0">
            <p for="exampleSelectGender">Sampai Tanggal</p>
            <input v-model="end_date" v-on:change="get_transaksi()" type="date" class="form-control text-light" placeholder="dd/mm/yyyy"/>
          </div>
          </div>
          <h4 class="card-title">List Transaksi</h4>
          <div class="table-responsive">
            <table class="table text-light">
              <thead>
                <tr>
                  <th> Nama Pelanggan </th>
                  <th> Tanggal </th>
                  <th> Subtotal </th>
                  <th> Status Pembayaran </th>
                  <th> Aksi </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(transaksi,index) in list_transaksi">
                  <td>
                    <img src="assets/images/faces/face1.jpg" alt="image" />
                    <span class="ps-2">{{transaksi.nama_pelanggan}}</span>
                  </td>
                  <td> {{transaksi.tgl_transaksi}} </td>
                  <td> Rp {{transaksi.tagihan}} </td>
                  <td> {{transaksi.status}} </td>
                  <td>
                  <div class="template-demo">
                      <a v-bind:href="'#/bayar/'+transaksi.id_transaksi" type="button" class="btn btn-outline-success btn-icon-text" v-if="data_user.role=='kasir'">
                          <i class="mdi mdi mdi-briefcase-check btn-icon-prepend"></i> Bayar </a>
                      <button v-on:click="hapus(transaksi.id_transaksi)" type="button" class="btn btn-outline-danger btn-icon-text" v-if="data_user.role=='kasir'">
                          <i class="mdi mdi-delete-forever btn-icon-prepend"></i> Hapus </button>
                      <a type="button" class="btn btn-outline-warning btn-icon-text" v-bind:href="'#/detail/'+transaksi.id_transaksi" v-if="data_user.role=='manager'"> Detail <i class="mdi mdi-printer btn-icon-append"></i>
                          </a>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>`,
    data(){
      return {
        status_style : '',
        list_transaksi:[],
        lunas : [],
        start_date : '',
        end_date : '',
        data_user:[],
       }
      },
      methods :{
        async get_transaksi(){
          var option={
              headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
              }
          };
          this.data_user=JSON.parse(localStorage.getItem('user'));
          if(this.data_user.role=='kasir'){
            if(this.start_date === "" && this.end_date === ""){
              var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/trx_list",option);
              console.log(res);
              this.list_transaksi=res.data;
            }else{
              var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/filter_tgl/"+this.start_date+'/'+this.end_date, option);
              console.log(res);
              this.list_transaksi=res.data;
            }
          }else if(this.data_user.role=='manager'){
            if(this.start_date === "" && this.end_date === ""){
              var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/trx_list_manager",option);
              console.log(res);
              this.list_transaksi=res.data;
            }else{
              var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/filter_tgl_manager/"+this.start_date+'/'+this.end_date, option);
              console.log(res);
              this.list_transaksi=res.data;
            }
          }
        },
        async hapus(id){
          var option={
              headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
              }
          };
          let confirmAction = confirm("Apakah anda yakin ingin menghapus transaksi ini?");
          if(confirmAction){
            var res = await axios.delete("http://localhost/ukk_cafe/public/api/admin/delete_trx/"+id, option);
            console.log(res);
            this.get_transaksi();
          }else{
            alert("Batal menghapus Transaksi.");
          }
        },
        validasi_role(){
          this.data_user=JSON.parse(localStorage.getItem('user'));
          if(this.data_user.role=='admin'){
            alert("Anda tidak diperbolehkan mengakses halaman ini!");
            this.$router.replace({name:"Dashboard"})
            }else{
              this.$router.push('/transaksi')
            }
          }
      },
      mounted(){
        this.get_transaksi();
        this.validasi_role();
    }
  }