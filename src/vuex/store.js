import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       databases : [],
       db_infor: [],
       database : {
            name : '',
            tb_list : [],
       },
       table : {
            name: '',
            columns: [],
            structure: [],
            information: [],
            rows: [],
       },   
    },
    mutations: {
    	showlogin (state) {
    		state.isLoggedIn = !state.isLoggedIn
    	},
        setDBs (state, databases) {
            state.databases = databases;
        },
        setDbInf (state, databases) {
            state.db_infor.push(databases);
        },
        setDB (state, dbname) {
            state.database.name = dbname;
        },
    },
    actions: {

    },
    getters: {

    }
});