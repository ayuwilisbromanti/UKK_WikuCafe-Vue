var Dashboard = {
    template : `
        <div class="row ">
          <div class="col-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="card-title">
                  <h2>Welcome, {{data_user.nama_user}}!</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                      <h6 class="text-muted font-weight-normal">Makanan Terlaris</h6>
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">{{makanan_terbanyak.jumlah}}</h3>
                          <p class="text-success ms-2 mb-0 font-weight-medium">porsi</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success ">
                          <span class="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">{{makanan_terbanyak.nama_menu}}</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                      <h6 class="text-muted font-weight-normal">Paling Jarang Dipesan</h6>
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">{{min_makanan.jumlah}}</h3>
                          <p class="text-danger ms-2 mb-0 font-weight-medium">porsi</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-danger">
                          <span class="mdi mdi-arrow-bottom-right icon-item"></span>
                        </div>
                      </div>
                      <h6 class="text-muted font-weight-normal">{{min_makanan.nama_menu}}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                      <h6 class="text-muted font-weight-normal">Minuman Terlaris</h6>
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">{{minuman_terbanyak.jumlah}}</h3>
                          <p class="text-success ms-2 mb-0 font-weight-medium">gelas</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success">
                          <span class="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                      <h6 class="text-muted font-weight-normal">{{minuman_terbanyak.nama_menu}}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                      <h6 class="text-muted font-weight-normal">Paling Jarang Dipesan</h6>
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">{{min_minuman.jumlah}}</h3>
                          <p class="text-danger ms-2 mb-0 font-weight-medium">gelas</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-danger ">
                          <span class="mdi mdi-arrow-bottom-right icon-item"></span>
                        </div>
                      </div>
                      <h6 class="text-muted font-weight-normal">{{min_minuman.nama_menu}}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Pendapatan</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 class="mb-0">Rp {{income}}</h2>
                        </div>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i class="icon-lg mdi mdi-codepen text-primary ms-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Produk Terjual</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 class="mb-0">{{terjual}}</h2>
                          <p class="text-success ms-2 mb-0 font-weight-medium">items</p>
                        </div>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i class="icon-lg mdi mdi-wallet-travel text-danger ms-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Transaksi</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 class="mb-0">{{jumlah}}</h2>
                          <p class="text-danger ms-2 mb-0 font-weight-medium">pengunjung </p>
                        </div>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i class="icon-lg mdi mdi-monitor text-success ms-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
    `,
    data(){
      return{
        makanan_terbanyak:[],
        minuman_terbanyak:[],
        min_makanan:[],
        min_minuman:[],
        user:[],
        income:'',
        terjual : '',
        jumlah:'',
        data_user:[]
      }
    },

    methods:{
      get_role(){
        this.data_user=JSON.parse(localStorage.getItem('user'));
        console.log(this.data_user);
      },
      async getMaxFood(){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/max_makan");
        console.log(res);
        this.makanan_terbanyak = res.data;
      },
      async getMinFood(){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/min_makanan");
        console.log(res);
        this.min_makanan=res.data;
      },
      async getMaxDrink(){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/max_minum");
        console.log(res);
        this.minuman_terbanyak = res.data;
      },
      async getMinDrink(){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/min_minuman");
        console.log(res);
        this.min_minuman = res.data;
      },
      async getIncome(){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/income");
        console.log(res);
        this.income = res.data.income;
      },
      async getTerjual(){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/terjual");
        console.log(res);
        this.terjual = res.data.total;
      },
      async getTrx(){
        var res = await axios.get("http://localhost/ukk_cafe/public/api/total_trx");
        console.log(res);
        this.jumlah = res.data.jumlah;
      }
    },
    
    mounted(){
      this.getMaxFood();
      this.getMinFood();
      this.getMaxDrink();
      this.getMinDrink();
      this.getIncome();
      this.getTerjual();
      this.getTrx();
      this.get_role();
    }
  }