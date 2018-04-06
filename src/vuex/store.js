import Vue from 'vue';
import Vuex from 'Vuex';

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
            row_count: Number,
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
        setTBs (state, tables) {
            state.database.tb_list = tables;
        },
        setTB (state, tbname) {
            state.table.name = tbname;
        },
        setColumns (state, columns) {
            state.table.columns = columns;
        },
        setRowCount (state, row_count) {
            state.table.row_count = row_count;
        }, 
        setRows (state, rows) {
            state.table.rows = rows;
        },        
    },
    actions: {

    },
    getters: {

    }
});