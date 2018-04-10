<template>
	 <div class="col-sm-3 col-md-3 sidebar">
<!-- 		  <div class="sidebarHeader">
		    <input type="search" placeholder="Type to search" class="form-control input-sm"  />
		  </div> -->

		  <div  style=" overflow-y:auto; overflow-x:auto; height:100%;">
		    <ul class="list-group">
		    	<li v-for="table in tables" :key="table.id" v-on:click="selectTable(table)" class="">
		    		<a href="#" class="list-group-item tableLink tb_list">
		    			<span class="glyphicon glyphicon-th-large"></span>
		    			{{table}}
		    		</a>
		    	</li>
		    </ul>
		  </div>

		  <nav class="navbar navbar-default navbar-fixed-bottom">
<!-- 			  <div class="sidebarFooter">
			    <div class="pull-left footerButtonLeft footerButtonDisable">
			      <span class="fa fa-refresh" title="Refresh the table list"></span>
			    </div>
			    <div class="pull-left footerButtonLeft">
			      <span class="fa fa-plus" title="Create a new table"></span>
			    </div>
			    <div class="pull-left footerButtonLeft">
			      <span class="fa fa-trash-o" title="Drop the selected table"></span>
			    </div>
			  </div> -->
		  </nav>
	  </div>
</template>

<script type="text/javascript">

  import {get_rows} from '../lib/vueHelper'
  import {get_struct} from '../lib/vueHelper' 
  import {get_columns} from '../lib/vueHelper'
  import {get_row_count} from '../lib/vueHelper'
  import store from '@/vuex/store'
	export default {
		name: "db-tables",
		data: function() {
			return {
				tbname: '',
			}
		},
		computed: {
			tables: function() {
				return this.$store.state.database.tb_list;
			}
		},
		methods: {
			selectTable: function(table_name) {
		        if(this.tbname != table_name) {

			        this.tbname = table_name;
			        store.commit('setTB',table_name)
			        var db = this.$store.state.database.name;
			        var data = {
			          params: {
			          	"db": db,
			            "table": table_name,
			          } 
			        };
			        get_columns(this, data);
			        //get row count of table
			        get_row_count(this, data);
			        //get the first page of table rows
			        data = {
			          params: {
			          	"db": db,
			            "table": table_name,
			            "offset": 0,
			            "count": 50
			          } 
			        };
			        get_rows(this, data);
			        // data = {
			        // 	params: {
			        // 		"db": db,
			        // 		"table": table_name,
			        // 	}
			        // }
			        // get_struct(this, data);    	
		        }
			},
		},
	}
</script>

<style type="text/css">
	.tb_list {
	  white-space: nowrap !important;
	  overflow: hidden !important;
	  text-overflow: ellipsis !important;
	}
</style>