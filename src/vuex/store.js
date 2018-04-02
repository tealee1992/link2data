import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       isLoggedIn: false,
    },
    mutations: {
    	showlogin (state) {
    		state.isLoggedIn = !state.isLoggedIn
    	},
    },
    actions: {

    },
    getters: {

    }
});