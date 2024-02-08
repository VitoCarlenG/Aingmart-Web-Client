import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCommentDollar)
library.add(faAngleDoubleRight)
library.add(faPencilAlt)
library.add(faSave)
library.add(faTimes)
library.add(faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://aingmart.store/api';

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
