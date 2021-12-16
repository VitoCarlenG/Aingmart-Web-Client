<template>
  <v-main class="list">
    <h3 class="font-weight-medium"
       style="text-align: center; font-style: italic;  font-size:72px; color:green;" font-weight-medium mb-5>Daftar Voucher</h3>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-ticket-percent"
          label="Search"
          single-line
          hide-details
          color="green">
        </v-text-field>

        <v-spacer></v-spacer>
        
        <v-btn color="success" dark @click="dialog = true">Tambah</v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="vouchers" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)"><font-awesome-icon icon="pencil-alt" color="green"/></v-btn>
                    <v-btn small @click="deleteHandler(item.id)"><font-awesome-icon icon="trash-alt" color="green"/></v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Voucher</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.name" color="green" label="Nama" required></v-text-field>
                        <v-text-field v-model="form.stok" color="green" label="Stok" required></v-text-field>
                        <v-text-field v-model="form.harga" color="green" label="Harga" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"><font-awesome-icon icon="times" color="red"/></v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"><font-awesome-icon icon="save" color="green"/></v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>
                    Anda yakin ingin menghapus voucher ini?
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"><font-awesome-icon icon="times" color="red"/></v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData"><font-awesome-icon icon="trash-alt" color="green"/></v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "Name",
                    align: "start",
                    sortable: true,
                    value: "name"
                },

                { text: "Stok", value: "stok" },
                { text: "Harga (Rp)", value: "harga" },
                { text: "Actions", value: "actions" },
            ],
            voucher: new FormData,
            vouchers: [],
            form: {
                name: null,
                stok: null,
                harga: null,
            },
            deleteId: '',
            editId: ''
        };
    },
    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },
        // Read Data Courses
        readData() {
            var url = this.$api + '/voucher';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.vouchers = response.data.data;
            })
        },
        //Simpan data Course
        save() {
            this.voucher.append('name', this.form.name);
            this.voucher.append('stok', this.form.stok);
            this.voucher.append('harga', this.form.harga);

            var url = this.$api + '/voucher/'
            this.load = true;
            this.$http.post(url, this.voucher, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); // Baca Data
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        // Ubah data Course
        update(){
            let newData = {
                name : this.form.name,
                stok : this.form.stok,
                harga : this.form.harga
            };

            var url = this.$api + '/voucher/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        // Hapus data Produk
        deleteData(){
            var url = this.$api + '/voucher/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.name = item.name;
            this.form.stok = item.stok;
            this.form.harga = item.harga;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = { name: null,
                stok: null,
                harga: null};
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readData();
    },
};
</script>