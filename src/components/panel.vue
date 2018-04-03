<template>
	<div v-for="database in databases" v-on:click="selectDB(database)" class="panel panel-primary">
		<div class="panel-heading">
			<router-link :to="/mysql">{{database.name}}</router-link>
		</div>
		<div class="panel-body">cotent</div>
		<div class="panel-footer">footer</div>
	</div>
	<div class="panel panel-primary">
		<div class="panel-heading">
			<router-link :to="/hbase">{{hbase}}</router-link>
		</div>
		<div class="panel-body">cotent</div>
		<div class="panel-footer">footer</div>
	</div>
	<div class="panel panel-default">
	    <div class="panel-heading">图解CSS3</div>
	    <div class="panel-body">
	        <p>详细讲解了选择器、边框、背景、文本、颜色、盒模型、伸缩布局盒模型、多列布局、渐变、过渡、动画、媒体、响应Web设计、Web字体等主题下涵盖的所有CSS3新特性
	        </p>
	        <table class="table table-bordered">
	            <thead>
	                <tr>
	                    <th>＃</th>
	                    <th>我的书</th>
	                    <th>发布时间</th>
	                </tr>
	            </thead>
	            <tbody>
	                <tr>
	                    <td>1</td>
	                    <td>《图解CSS3》</td>
	                    <td>2014-07-10</td>
	                </tr>
	            </tbody>
	        </table>
	    </div>
	    <div class="panel-footer"></div>
	</div>
</template>

<script>
	/*获取数据库基本信息*/
	import {get_dbs} from '../lib/vueHelper'
	import store from '@/vuex/store'
	export default {
		name : panel,

		data () {
			return {
				databases : [],
				hbase : {
					name: '',
					size: Number,
				},
			} 
		},
		created () {
	      	var data = {};
	      	get_dbs(this, data);
    	},
	    methods: {
	      selectDB : function(dbname) {
	      	store.commit('setDbName',dbname);
	        var data = {
	          params: {
	            "db": dbname,
	          } 
	        };
	        get_tables(this, data);
	      },
	      //the management on tables like "create a new table" should go through database
	      tableEvent : function() {

	      }
	    },
	}
</script>