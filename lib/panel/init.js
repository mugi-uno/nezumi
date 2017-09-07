import Vue from 'vue';
import Vuetify from 'vuetify';
import store from './store';
import App from './components/App';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default function() {
  document.addEventListener('DOMContentLoaded', () => {
    new Vue({ el: '#app', store, render: h => h(App) }); // eslint-disable-line
  });
}
