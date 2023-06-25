var Detail_Transaksi_Manager={
    template : `
            <div class="row ">
            <div class="col-12 grid-margin">
                <div class="card">
                <div class="card-body">
                    <table class="table text-light">
                    <tbody>
                        <tr>
                            <td>Nama Pelanggan</td>
                            <td> : </td>
                            <td> {{data_parent.nama_pelanggan}} </td>
                            <td>Subtotal </td>
                            <td>:</td>
                            <td> Rp {{data_parent.tagihan}} </td>
                        </tr>
                        <tr>
                            <td>Tanggal Transaksi</td>
                            <td> : </td>
                            <td> {{data_parent.tgl_transaksi}} </td>
                            <td>Status </td>
                            <td> : </td>
                            <td> {{data_parent.status}} </td>
                        </tr>
                        <tr>
                            <td> Kasir </td>
                            <td> : </td>
                            <td> {{data_parent.nama_user}} </td>
                            <td> Nomor Meja </td>
                            <td> : </td>
                            <td> {{data_parent.nomor_meja}} </td>
                        </tr>
                    </tbody>
                </table>
                <div class="table-responsive card-body">
                    <h5 class="card-title"> List Pesanan</h5>
                    <table class="table table-bordered text-light">
                        <thead>
                        <tr>
                            <th> No </th>
                            <th> Menu </th>
                            <th> Qty </th>
                            <th> Total </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(detail,index) in data_pesanan">
                            <td>{{index+1}}</td>
                            <td> {{detail.nama_menu}} </td>
                            <td> {{detail.qty}} </td>
                            <td> {{detail.harga}} </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            `,
            data(){
                return{
                    data_parent:[],
                    data_pesanan :[]
                }
            },
            methods :{
                async get_data(id){
                    var option={
                        headers:{
                            'Authorization' : 'bearer '+localStorage.getItem('token')
                        }
                    };
                    var parent = await axios.get("http://localhost/ukk_cafe/public/api/admin/detail_trx_parent/"+id, option);
                    console.log(parent);
                    this.data_parent = parent.data;

                    var pesanan = await axios.get("http://localhost/ukk_cafe/public/api/admin/detail_trx_pesanan/"+id, option);
                    console.log(pesanan);
                    this.data_pesanan = pesanan.data;
                }
            },
            mounted(){
                this.get_data(this.$route.params.id);
            }
}