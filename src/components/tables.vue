<template>
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
</template>

<script type="text/javascript">
	export default {
		name: "db-tables",
		props: {
			tables: Array,
		},
		data: function() {
			return {
				
			}
		},
		methods: {
			selectTable: function(table_name) {

			}
		},
	}
</script>

<style type="text/css">
	
</style>