var Tambah_Meja = {
    template : `
            <div class="row">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                  <h4 class="card-title">Tambah Meja</h4>
                    <form v-on:submit="act_simpan()" class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputName1">Nomor Meja</label>
                        <input v-model="nomor_meja" type="text" class="form-control text-light" id="exampleInputName1" placeholder="Name">
                      </div>
                      <button type="submit" class="btn btn-primary me-2">Submit</button>
                      <button class="btn btn-dark" v-on:click="act_cancel()">Cancel</button>
                    </form>
                    <div>
                      <div v-bind:class="style_notif">{{msg}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `,

    data(){
      return {
        nomor_meja :'',
        style_notif : '',
        alert : false,
        msg : ''
      }
    },
    methods:{
      async act_simpan(){
        var data_meja={
          nomor_meja:this.nomor_meja,
        };
        var res = await axios.post("http://localhost/ukk_cafe/public/api/admin/create_meja", data_meja,
        { headers:{
          'Authorization' : 'bearer '+localStorage.getItem('token')
          }
        });
        console.log(res);
        if(res.data.status == true){
          this.alert = true;
          this.msg = res.data.message
          this.style_notif = 'alert alert-success'
          setTimeout(()=>{
            this.$router.push('/meja')
          },2000)
        }else{
          this.alert = true;
          this.msg = res.data.message
          this.style_notif = 'alert alert-danger'
        }
      },
      act_cancel(){
        this.$router.push('/meja')
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