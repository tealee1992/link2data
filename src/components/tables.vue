<template>
	<div>
	 <div class="col-sm-3 col-md-3 sidebar"> 
		  <div class="sidebarHeader">
		    <input type="search" placeholder="Type to search" class="form-control input-sm"  />
		  </div>

		  <div id="tableList">
		  <div class="pre-scrollable">
		    <ul class="list-group">
		    	<li v-for="table in tables" v-on:click="selectTable(table)">
		    		<a href="#" class="list-group-item tableLink">
		    			<span class="glyphicon glyphicon-th-large"></span>
		    			{{table}}
		    		</a>
		    	</li>
		    </ul>
		  </div>
		  </div>

		  <nav class="navbar navbar-default navbar-fixed-bottom">
			  <div class="sidebarFooter">
			    <div class="pull-left footerButtonLeft footerButtonDisable">
			      <span class="fa fa-refresh" title="Refresh the table list"></span>
			    </div>
			    <div class="pull-left footerButtonLeft">
			      <span class="fa fa-plus" title="Create a new table"></span>
			    </div>
			    <div class="pull-left footerButtonLeft">
			      <span class="fa fa-trash-o" title="Drop the selected table"></span>
			    </div>
			  </div>
		  </nav>
	  </div>

	  <tb-rows v-on:rowEvent="rowEvent" 
	  :rows="rows"
	  :totalRows="totalRows"
	  :columns="columns"
	  :table="currTable">
	  </tb-rows>
	</div>
</template>

<script type="text/javascript">

  import {get_rows} from '../lib/vueHelper' 
  import {get_columns} from '../lib/vueHelper'
	export default {
		name: "db-tables",
		props: {
			tables: Array,
		},
		data: function() {
			return {
				currTable: '',
				rows: [],
				totalRows: 0,
				columns: [],
			}
		},
		methods: {
			selectTable: function(table_name) {
		        if(this.currTable != table_name) {
			        this.currTable = table_name;
			        var data = {
			          params: {
			            "table": table_name,
			          } 
			        };
			        get_columns(this, data);
			        //get the first page of table rows
			        var data = {
			          params: {
			            "table": table_name,
			            "offset": 0,
			            "count": 100
			          } 
			        };
			        get_rows(this, data);		        	
		        }
			},
			rowEvent: function(event, params) {
				if(event == 'get_rows') {
			        var data = {
			          /*{
			            "table": table_name,
			            "offset": offset,
			            "count": count
			          } */
			          params:params
			        };
			        get_rows(this, data);					
				}

			}
		},
	}
</script>

<style type="text/css">
	
</style>