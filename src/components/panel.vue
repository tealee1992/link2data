<template>
<div class="row">
	<div v-for="db in db_infor" v-on:click="selectDB(db.name)" class="width:50%">
	<div class="panel panel-primary width:50% ">
		<div class="panel-heading width:50%">
			<router-link :to="'/mysql'" class="router-link">{{db.name}}</router-link>
		</div>
		<div class="panel-body">
	        <table class=" table-bordered span6">
	            <thead>
	                <tr>
	                    <th>类型</th>
	                    <th>占用空间</th>
	                    <th>表数</th>
	                    <th>记录数</th>
	                </tr>
	            </thead>
	            <tbody>
	                <tr>
	                    <td>{{db.type}}</td>
	                    <td>{{db.db_size}}</td>
	                    <td>{{db.tb_count}}</td>
	                    <td>{{db.row_count}}</td>
	                </tr>
	            </tbody>
	        </table>
		</div>
		<div class="panel-footer">footer</div>
	</div>
	</div>
</div>
</template>

<script>
	/*获取数据库基本信息*/
	import {get_dbs} from '../lib/vueHelper'
	import {get_db_infor} from '../lib/vueHelper'
	// import store from '@/vuex/store'

	export default {
		name : 'panel',

		data () {
			return {
				databases : [],
				db_infor : [],
				hbase : {
					name: '',
					size: Number,
				},
			} 
		},
		created () {

	      	async function getdbs() {
		      	var data = {};
		      	return await get_dbs(this, data);
	      	}
	      	async function getdbinfor(data) {
				return await get_db_infor(this, data);
	      	}
	      	
	      	getdbs().then(()=>{
	      		this.databases = this.$store.state.databases;
	      		for (var i = this.databases.length - 1; i >= 0; i--) {
	      			// this.db_infor[this.databases[i]] = {
	      			// 	type: 'mysql',
	      			// 	db_size: '',
	      			// 	tb_count: '',
	      			// 	row_count: ''
	      			// };
	      			var data = {
	      				params: {
	      					db : this.databases[i],
	      				}   				
	      			}
	      			getdbinfor(data);
	      		}
	      	}).then(()=>{
	      		this.db_infor = this.$store.state.db_infor;
	      	})
    	},
	    methods: {
	      selectDB : function(dbname) {
	      	this.$store.commit('setDB',dbname);
	      },
	    },
	}
</script>

<style type="text/css">
	.router-link{
	  color: white!important;
	  margin-left: 40px;
	}
</style>