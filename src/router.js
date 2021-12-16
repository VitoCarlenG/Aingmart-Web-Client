import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    // Register
    {
      path: '/register',
      name: 'Register',
      meta: { title: 'Register' },
      component: importComponent('Register'),
    },

    // Login
    {
      path: '/',
      name: 'Login',
      meta: { title: 'Login' },
      component: importComponent('Login'),
    },

    {
      path: '/',
      name: 'Dashboard',
      meta: { title: 'Dashboard' },
      component: importComponent('DashboardLayout'),

      children: [
        // Dashboard
        {
          path: '/dashboard',
          name: 'Dashboard',
          meta: { title: 'Dashboard' },
          component: importComponent('Dashboard'),
        },
        // User
        {
          path: '/user',
          name: 'User',
          meta: { title: 'Profile Pengguna' },
          component: importComponent('DataMaster/Users'),
        },
        // Makanan
        {
          path: '/makanan',
          name: 'Makanan',
          meta: { title: 'Daftar Makanan' },
          component: importComponent('DataMaster/Makanans'),
        },
        // Minuman
        {
          path: '/minuman',
          name: 'Minuman',
          meta: { title: 'Daftar Minuman' },
          component: importComponent('DataMaster/Minumans'),
        },
        // Voucher
        {
          path: '/voucher',
          name: 'Voucher',
          meta: { title: 'Daftar Vouchers' },
          component: importComponent('DataMaster/Vouchers'),
        },
      ],
    },
    
    {
      path: '*',
      redirect: '/'
    },
  ],
});

// Set Judul
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;