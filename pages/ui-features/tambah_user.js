var Tambah_User ={
    template : `
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                  <h4 class="card-title">Tambah User</h4>
                    <form v-on:submit="save()" class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputName1">Nama</label>
                        <input v-model="nama_staff" type="text" class="form-control text-light" id="exampleInputName1" placeholder="Name">
                      </div>
                      <div class="form-group">
                        <label for="exampleSelectGender">Role</label>
                        <select v-model="role_staff" class="form-control text-light" id="exampleSelectGender">
                          <option value="admin">Admin</option>
                          <option value="kasir">Kasir</option>
                          <option value="manager">Manager</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputUsername1">Username</label>
                        <input v-model="username" type="text" class="form-control text-light" id="exampleInputUsername1" placeholder="Username">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="password" type="password" class="form-control text-light" id="exampleInputPassword1" placeholder="Password">
                      </div>
                      <button type="submit" class="btn btn-primary me-2">Submit</button>
                      <router-link to="/user" class="btn btn-dark">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="alert">
              <center>
                  <div v-bind:class="style_alert">{{message}}</div>
              </center
          </div>
    `,
    data(){
      return {
        nama_staff : '',
        role_staff : '',
        username : '',
        password :'',
        alert: false,
        message: '',
        style_alert: '',
      }
    },
    methods:{
      async save(){
        var data_staff = {
          nama_user : this.nama_staff,
          role : this.role_staff,
          username : this.username,
          password : this.password
        };
        var res = await axios.post("http://localhost/ukk_cafe/public/api/admin/register", data_staff,
        { headers:{
          'Authorization' : 'bearer '+localStorage.getItem('token')
          }
        }
       );
        console.log(res);
        if(res.data.status==true){
          this.alert = true;
          this.message = res.data.message;
          this.style_alert='alert alert-success';
          setTimeout(()=>{
          this.$router.push('/user')
          },2000)
        }else{
          this.alert=true;
          this.message=res.data.message;
          this.style_alert='alert alert-danger';
        }
      }
    },
    mounted(){
      this.data_user=JSON.parse(localStorage.getItem('user'));
      if(this.data_user.role!='admin'){
        alert("Anda bukan admin!");
        this.$router.replace({name:"Dashboard"})
        }
      }
    }