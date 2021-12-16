<template>
  <v-main class="bgt">
      
    
    

    <v-card style="top: 160px; width: 50%; left: 25%;" class="justify-center">

        <h3  class="font-weight-medium"
       style="text-align: center; font-style: italic;  font-size:72px; color:green;" font-weight-medium mb-5>Profile Pengguna</h3>

        
            <v-card-title>
                <span class="headline" style="width: 100%; text-align: center">Nama Pengguna: {{ penggunaName }}</span>
            </v-card-title>
     
            <v-card-title>
                <span class="headline" style="width: 100%;text-align: center">Email Pengguna: {{ penggunaEmail }}</span>
            </v-card-title>

            <v-card-title>
                <v-btn style="left: 45%;" class="mr-2" @click="editHandler()"><font-awesome-icon icon="pencil-alt" color="green"/></v-btn>
            </v-card-title>

    </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Ubah Profile Pengguna</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.email" color="green" label="E-mail" type="email" disabled required></v-text-field>
                        <v-text-field v-model="form.name" color="green" label="Nama" required></v-text-field>
                        <v-text-field v-model="form.password" color="green" type="password" min="8" label="Password" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"><font-awesome-icon icon="times" color="red"/></v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"><font-awesome-icon icon="save" color="green"/></v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<style>

    .bgt {
            width: 100%;
            height: 95%;
            position: absolute;
            top: 0;
            left: 0;
            background: url(https://i.postimg.cc/vHg4ynxg/3.jpg);
            background-size: cover;
            transform: scale(1.1);
        }

</style>

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
            penggunaId: localStorage.getItem('id'),
            penggunaName: localStorage.getItem('name'),
            penggunaEmail: localStorage.getItem('email'),
            penggunaPassword: localStorage.getItem('password'),
            headers: [
                {
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "name"
                },

                { text: "Email", value: "email" },
                { text: "Password", value: "password" },
                { text: "Actions", value: "actions" },
            ],
            user: new FormData,
            users: [],
            form: {
                name: null,
                email: null,
                password: null,
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
        // Read Data Users
        readData() {
            var url = this.$api + '/user';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.users = response.data.data;
            })
        },
        //Simpan data User
        save() {
            this.user.append('name', this.form.name);
            this.user.append('email', this.form.email);
            this.user.append('password', this.form.password);

            var url = this.$api + '/user/'
            this.load = true;
            this.$http.post(url, this.user, {
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
        // Ubah data User
        update(){
            let newData = {
                name : this.form.name,
                email : this.form.email,
                password : this.form.password
            };

           this.penggunaName = this.form.name;

            var url = this.$api + '/user/' + this.editId;
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
        // Hapus data User
        deleteData(){
            var url = this.$api + '/user/' + this.deleteId;
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
        editHandler() {
            this.inputType = 'Ubah';
            this.editId = this.penggunaId;
            this.form.name = this.penggunaName;
            this.form.email = this.penggunaEmail;
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
                email: null,
                password: null };
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