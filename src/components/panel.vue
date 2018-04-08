<template>
	
	<div class="container">
		<div class="row-fluid">
		<ul class="thumbnails">
			<li class="col-xs-6 col-md-3" v-for="db in db_infor" v-on:click="selectDB(db.name)">
				<div class="thumbnail">
					<router-link :to="'/mysql'" class="router-link">
					<img style="width:200px;height: 100px" src="../assets/mysql.jpg">
					</router-link>
					<div class="caption">
						<h4>{{db.name}}</h4>
						<ul class="list-group">
							<li class="list-group-item">
								<span class="badge">{{db.type}}</span>
								类型: 
							</li>
							<li class="list-group-item">
								<span class="badge">{{db.db_size}}</span>
								占用空间:
							</li>
							<li class="list-group-item">
								<span class="badge">{{db.tb_count}}</span>
								表数: 
							</li>
							<li class="list-group-item">
								<span class="badge">{{db.row_count}}</span>
								记录数: 
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
		</div>
	</div>
<!-- <div class="row">
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
</div> -->
</template>

<script>
	/*获取数据库基本信息*/
	import {get_dbs} from '../lib/vueHelper'
	import {get_db_infor} from '../lib/vueHelper'
	import {get_tables} from '../lib/vueHelper'
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
	        var data = {
	          params: {
	            "db": dbname,
	          } 
	        };
	        get_tables(this, data);
	      },
	    },
	}
</script>

<style type="text/css">
	li{
		list-style: none;
	}
	.list-group {
		margin-bottom: 10px;
	}
	.router-link{
	  color: white!important;
	  margin-left: 40px;
	}
</style>