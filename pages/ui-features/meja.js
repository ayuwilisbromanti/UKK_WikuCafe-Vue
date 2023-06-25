var Meja = {
    template : `
            <div class="row ">
              <div class="col-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <a class="card-title btn btn-success create-new-button-right"  v-bind:href="'#/tambah_meja'">+ Meja Baru</a>
                    <h4 class="card-title">List Meja</h4>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                              <tr>
                                <th> Nomor Meja </th>
                                <th> Aksi </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(meja,index) in list_meja" :key="index">
                                <td>
                                  <span class="ps-2">{{meja.nomor_meja}}</span>
                                </td>
                                <td>
                                  <div class="template-demo">
                                      <a type="button" class="btn btn-dark btn-icon-text" v-bind:href="'#/edit_meja/'+meja.id_meja"> Edit <i class="mdi mdi-file-check btn-icon-append"></i>
                                      </a>
                                      <button type="button" class="btn btn-outline-danger btn-icon-text" v-on:click="hapus(meja.id_meja)">
                                          <i class="mdi mdi-delete-forever btn-icon-prepend"></i> Hapus </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `,

    data(){
      return{
        list_meja:[],
      }
    },
    methods :{
      async get_meja(){
        var option={
            headers:{
                'Authorization' : 'bearer '+localStorage.getItem('token')
            }
        };
        var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/list_meja", option);
        console.log(res);
        this.list_meja = res.data;
      },
      async hapus(id){
        let confirmAction = confirm("Apakah anda yakin menghapus data ini?");
        if(confirmAction){
          var res = await axios.delete("http://localhost/ukk_cafe/public/api/admin/delete_meja/"+id,{
            headers:{
                'Authorization' : 'bearer '+localStorage.getItem('token')
            }
        });
          console.log(res);
          this.get_meja();
        }else{
          alert("Batal menghapus data.");
        }
      }
    },
    mounted(){
      this.get_meja();
      this.data_user=JSON.parse(localStorage.getItem('user'));
      if(this.data_user.role!='admin'){
        alert("Anda bukan admin!");
        this.$router.replace({name:"Dashboard"})
      }
    }
}