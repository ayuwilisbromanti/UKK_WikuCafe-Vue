var User = {
   template : `
      <div class="row">
          <div class="col-12 grid-margin">
            <div class="card">
              <div class="card-body">
              <a class="card-title btn btn-success create-new-button-right"  v-bind:href="'#/tambah_user'">+ User Baru</a>
                <h4 class="card-title">List User</h4>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th> Nama User </th>
                        <th> Role </th>
                        <th> Username </th>
                        <th> Transaksi </th>
                        <th> Aksi </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user,index) in list_user" :key="index">
                        <td>
                          <img src="assets/images/faces/face1.jpg" alt="image" />
                          <span class="ps-2">{{user.nama_user}}</span>
                        </td>
                        <td> {{user.role}} </td>
                        <td> {{user.username}} </td>
                        <td> {{user.jumlah_trx}} </td>
                        <td>
                        <div class="template-demo">
                        <a type="button" class="btn btn-dark btn-icon-text" v-bind:href="'#/edit_user/'+user.id"> Edit <i class="mdi mdi-file-check btn-icon-append"></i></a>
                        <button v-on:click="hapus(user.id)" type="button" class="btn btn-outline-danger btn-icon-text">
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
        </div>`,
          data(){
            return {
              list_user:[],
            }
          },
          methods :{
            async get_user(){
              var option={
                  headers:{
                      'Authorization' : 'bearer '+localStorage.getItem('token')
                  }
              };
              var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/list_user",option);
              console.log(res);
              this.list_user = res.data;
              },
            async hapus(id){
              let confirmAction = confirm("Apakah anda yakin ingin menghapus user ini?");
              if(confirmAction){
                var res = await axios.delete("http://localhost/ukk_cafe/public/api/admin/delete_user/"+id,
                { headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token')
                  }
                }
               );
                console.log(res);
                this.get_user();
              }else{
                alert("Batal menghapus user.");
              }
            }
          },
          mounted(){
            this.get_user();
            this.data_user=JSON.parse(localStorage.getItem('user'));
            if(this.data_user.role!='admin'){
              alert("Anda bukan admin!");
              this.$router.replace({name:"Dashboard"})
              }
            }
          }