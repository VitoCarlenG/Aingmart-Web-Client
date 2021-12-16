<template>
  <div class="dashboard">
    <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"><img src="../assets/aingmart.png" style="width: 90%"></v-list-item-title>
          <v-list-item-subtitle><img src="../assets/slogan.png" style="width: 90%"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title><font-awesome-icon icon="angle-double-right" color="green"/> {{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="green" app fixed height="75px">
      <v-app-bar-nav-icon  color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer/>
      <v-toolbar-items>
        <img src="../assets/aingmart.png" style="width: 85%;">
      </v-toolbar-items>
    </v-app-bar>

    <div class="fullheight pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", to: "/dashboard" },
        { title: "Profile Pengguna", to: "/user" },
        { title: "Daftar Makanan", to: "/makanan" },
        { title: "Daftar Minuman", to: "/minuman" },
        { title: "Daftar Voucher", to: "/voucher" },
        { title: "Logout", to: "logout" },
      ],
    };
  },

  methods: {
    logout()
    {
      localStorage.removeItem('token');
      this.$router.push({
          name: 'Login',
      });
    },
  },
};
</script>

<style scoped>
  .fullheight {
    min-height: 100vh !important;
  }

  .items {
    font: italic;
  }

  .router{
    text-decoration: none;
    color: black;
  }
</style>


