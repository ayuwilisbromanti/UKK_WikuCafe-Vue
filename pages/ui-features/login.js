var Login ={
    template : `
            <div class="card col-lg-4 mx-auto">
              <div class="card-body px-5 py-5">
                <h3 class="card-title text-left mb-3">Login</h3>
                <form>
                  <div class="form-group">
                    <label>Username *</label>
                    <input v-model="username" type="text" class="form-control p_input text-light">
                  </div>
                  <div class="form-group">
                    <label>Password *</label>
                    <input v-model="password" type="password" class="form-control p_input text-light">
                  </div>
                  <div class="text-center">
                    <button type="button" v-on:click="login()"  class="btn btn-primary btn-block enter-btn">Login</button>
                  </div>
                </form>
              </div>
            </div>
    `,

    data(){
      return {
        username : '',
        password : '',
        role : ''
      }
    },
    methods : {
      async login(){
        var data = {
          username : this.username,
          password : this.password
        };
        try{
          var login = await axios.post("http://localhost/ukk_cafe/public/api/admin/login", data);
          console.log(login);
          localStorage.setItem('token',login.data.access_token);
          localStorage.setItem('user',JSON.stringify(login.data.data_user));
          localStorage.setItem('status',true);

          this.authenticated = true;
          this.$router.replace({name :"Dashboard"})
          location.reload()
        }catch(error) {
          alert('Gagal');
        }
      }
    },
    mounted(){
      if(localStorage.getItem('status')=='true'){
        this.$router.replace({name:"Dashboard"})
      }
    }
}