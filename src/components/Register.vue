<template>
   <v-app id="inspire" class="full">
       <span class="bg"></span>
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="green">
                        <v-toolbar-title>Register Form</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <img src="../assets/aingmart.png" style="width: 30%; margin-left: 40%;">
                     </v-toolbar>
                     <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-text-field color="green" label="Name" v-model="name" :rules="nameRules" required></v-text-field>
                            <v-text-field color="green" label="E-mail" v-model="email" :rules="emailRules" required type="email"></v-text-field>
                            <v-text-field color="green" label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required></v-text-field>
                            <v-btn color="green" style="top: 55px" small class="mr-2 white--text" @click="login">Login</v-btn>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                         <v-btn color="green" class="mr-2 white--text" @click="submit">Register</v-btn>
                         <v-btn @click="clear">Clear</v-btn>
                     </v-card-actions>
                  </v-card>
                  <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
    .grey--text{
        font-family: "Jolly Lodger";
    }

    .posisinya{
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(https://wallpaperaccess.com/full/1624848.jpg);
        background-size: cover;
        transform: scale(1.1);
    }
    .full {
        overflow-y: hidden;
        overflow-x: hidden;
    }
</style>

<script>
    export default {
        name: "Register",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                password: '',
                name: '',
                nameRules: [
                    (v) => !!v || 'Nama tidak boleh kosong :(',
                ],
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'E-mail tidak boleh kosong :(',
                ]
            };
        },
    
    methods: {
        submit() {
            if(this.$refs.form.validate())
            {
                // Cek Validasi Data Yang Terkirim
                this.load = true;
                this.$http.post(this.$api + '/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    // Simpan Data ID User Yang Diinput
                    localStorage.setItem('id',response.data.user.id);
                    localStorage.setItem('token',response.data.access_token);
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    this.$router.push({
                        name: 'Login',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = 'red';
                    this.snackbar = true;
                    localStorage.removeItem('token');
                    this.load = false;
                })
            }
        },

        login()
        {
            this.$router.push({
                name: 'Login',
            });
        },

        clear()
        {
            this.$refs.form.reset() // Clear Form Login
        }
    },
};
</script>