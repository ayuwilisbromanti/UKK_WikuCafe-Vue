var Tambah_Menu = {
    template : `
            <div class="row">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                  <h4 class="card-title">Tambah Menu</h4>
                    <form v-on:submit="act_simpan()" class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputName1">Nama Menu</label>
                        <input v-model="nama_menu" type="text" class="form-control text-light" id="exampleInputName1" placeholder="Name">
                      </div>
                      <div class="form-group">
                        <label for="exampleSelectGender">Jenis</label>
                        <select v-model="jenis" class="form-control text-light" id="exampleSelectGender">
                          <option>makanan</option>
                          <option>minuman</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="exampleTextarea1">Deskripsi</label>
                        <textarea v-model="deskripsi" class="form-control text-light" id="exampleTextarea1" rows="4"></textarea>
                      </div>
                      <div class="form-group">
                        <label>Gambar</label>
                        <input type="file" ref="file" v-on:change="handleFileUpload()" class="form-control" id="foto">
                      </div>
                      <div class="form-group">
                        <label>Harga</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text bg-primary text-white">Rp</span>
                            </div>
                            <input v-model="harga" type="text" class="form-control text-light" aria-label="Amount (to the nearest dollar)">
                            <div class="input-group-append">
                            <span class="input-group-text">.00</span>
                            </div>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary me-2">Submit</button>
                      <button v-on:click="act_cancel()" class="btn btn-dark">Cancel</button>
                    </form>
                    <div v-if="alert">
                        <center>
                            <div v-bind:class="style_alert">{{msg}}</div>
                        </center
                    </div>
                  </div>
                </div>
              </div>
            </div>`,

          data(){
            return{
              nama_menu : '',
              jenis : '',
              deskripsi : '',
              harga : '',
              gambar : '',
              file: '',
              alert : false,
              msg : '',
              style_alert : ''
            }
          },
          methods : {
            handleFileUpload(){
              this.file = this.$refs.file.files[0];
            },
            async act_simpan(){
              var data_menu={
                nama_menu : this.nama_menu,
                jenis : this.jenis,
                deskripsi : this.deskripsi,
                gambar : this.file,
                harga : this.harga,
              };
              var token ={
                headers:{
                  'Authorization' : 'bearer '+localStorage.getItem('token'),
                  'Content-Type':'multipart/form-data'
              }
              };
              var res = await axios.post("http://localhost/ukk_cafe/public/api/admin/create_menu",data_menu, token);
              console.log(res);
              if(res.data.status==true){
                  this.alert=true;
                  this.msg=res.data.message;
                  this.style_alert='alert alert-success';
                  setTimeout(()=>{
                      this.$router.push('/menu')
                  },2000)
              }else{
                  this.alert=true;
                  this.msg=res.data.message;
                  this.style_alert='alert alert-danger';
              }
            },
            act_cancel(){
              this.$router.push('/menu')
          }
        },
        mounted(){
          this.data_user=JSON.parse(localStorage.getItem('user'));
          if(this.data_user.role!='admin'){
            alert("Anda bukan admin!");
            this.$router.replace({name:"Dashboard"})
            }
          }
      };