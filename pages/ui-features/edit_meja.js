var Edit_Meja = {
    template : `
            <div class="row">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                  <h4 class="card-title">Edit Meja</h4>
                    <form v-on:submit="act_simpan(this.$route.params.id)" class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputName1">Nomor Meja</label>
                        <input v-model="nomor_meja" type="text" class="form-control text-light" id="exampleInputName1" placeholder="Nomor Meja">
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
    `,
    data(){
      return {
        nomor_meja : '',
        style_notif : '',
        alert : false,
        msg : '',
      }
    },
    methods:{
      async get_detail(id){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/admin/get_detailMeja/"+id,
        { headers:{
          'Authorization' : 'bearer '+localStorage.getItem('token')
          }
        });
        this.nomor_meja = res.data.nomor_meja;
        console.log(res);
      },
      act_cancel(){
        this.$router.push('/meja')
      },
      async act_simpan(id){
        var data_meja={
          nomor_meja:this.nomor_meja
        };
        var res = await axios.put("http://localhost/ukk_cafe/public/api/admin/update_meja/"+id, data_meja,
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
    },
    mounted(){
      this.get_detail(this.$route.params.id);
      this.data_user=JSON.parse(localStorage.getItem('user'));
      if(this.data_user.role!='admin'){
        alert("Anda bukan admin!");
        this.$router.replace({name:"Dashboard"})
      }
    }
}