var Menu ={
    template : `
    <div class="row ">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <a class="card-title btn btn-success create-new-button-right"  v-bind:href="'#/tambah_menu'">+ Menu Baru</a>
            <h4 class="card-title">List Menu</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th> Menu </th>
                    <th> Jenis </th>
                    <th> Deskripsi </th>
                    <th> Harga </th>
                    <th> Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(menu,index) in list_menu" :key="index">
                    <td>
                      <img v-bind:src="'http://localhost/ukk_cafe/public/foto_produk/'+menu.gambar" alt="image"/>
                      <span class="ps-2">{{menu.nama_menu}}</span>
                    </td>
                    <td> {{menu.jenis}} </td>
                    <td> {{menu.deskripsi}} </td>
                    <td> Rp {{menu.harga}} </td>
                    <td>
                      <div class="template-demo">
                        <a type="button" class="btn btn-dark btn-icon-text" v-bind:href="'#/edit_menu/'+menu.id_menu"> Edit <i class="mdi mdi-file-check btn-icon-append"></i>
                        </a>
                        <button v-on:click="hapus(menu.id_menu)" type="button" class="btn btn-outline-danger btn-icon-text">
                            <i class="mdi mdi-delete-forever btn-icon-prepend"></i> Hapus </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>`,

      data(){
        return{
          list_menu:[],
          data_user:[]
        }
      },
      methods:{
        async get_menu(){
          var option={
              headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
              }
          };
          var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/list_menu",option);
          console.log(res);
          this.list_menu = res.data;
        },
        async hapus(id){
          let confirmAction = confirm("Apakah anda yakin ingin menghapus menu ini?");
          if(confirmAction){
            var res = await axios.delete("http://localhost/ukk_cafe/public/api/admin/delete_menu/"+id,
            { headers:{
              'Authorization' : 'bearer '+localStorage.getItem('token')
              }
            }
           );
            console.log(res);
            this.get_menu();
          }else{
            alert("Batal menghapus menu.");
          }
        }
      },
      mounted(){
        this.get_menu();
        this.data_user=JSON.parse(localStorage.getItem('user'));
        if(this.data_user.role!='admin'){
          alert("Anda bukan admin!");
          this.$router.replace({name:"Dashboard"})
        }
      }
}