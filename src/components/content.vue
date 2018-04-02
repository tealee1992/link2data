<template>
  <div>
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="nav navbar-nav navbar-left" >
          <li title="Process list" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-gears"></span></a>
          </li>
          <li title="Server status graph" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-area-chart"></span></a>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle databaseDropdownToggle" data-toggle="dropdown" title="selectedDatabase"><b class="caret"></b> selectedDatabase</a>
            <ul class="dropdown-menu dropdownList">
              <li v-for="database in databases" v-on:click="selectDatabase(database)">
                <a href="#">{{database}}</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li title="Rows" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-align-justify"></span></a>
          </li>
          <li title="Structure" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-table"></span></a>
          </li>
          <li title="Information" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-info"></span></a>
          </li>

          <li title="Relation" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-share-alt"></span></a>
          </li>
          <li title="Procedures/Functions" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-play"></span></a>
          </li>
          <li title="ER diagram" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-desktop"></span></a>
          </li>
          <li title="Query" rel="tooltip" data-placement="bottom" >
            <a href="#" ><span class="fa fa-edit"></span></a>
          </li>
          <li rel="tooltip" data-placement="bottom" title="Configure">
            <a href="#" ><span class="glyphicon glyphicon-cog"></span></a>
          </li>
          <li rel="tooltip" data-placement="bottom" title="Logout">
            <a href="#" ><span class="glyphicon glyphicon-off"></span></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <db-tables v-on:tableevent="tableevent" :tables="tables"></db-tables>

  <tb-rows></tb-rows>

</div>

</template>>

<script>
  import dbtables from '@/components/tables'
  import rows from '@/components/rows'
  import {get_dbs} from '../lib/vueHelper'
  import {get_tables} from '../lib/vueHelper'  
  export default {
    name: 'content',
    components: { 'db-tables':dbtables, 'tb-rows': rows },
    data() {
      return {
        databases: [],
        tables: [],
      }
    },
    created () {
      var data = {};
      get_dbs(this, data);

    },
    computed: {

    },
    methods: {
      selectDatabase : function(dbname) {
        var data = {
          params: {
            "db": dbname,
          } 
        };
        get_tables(this, data);
      },
      //the management on tables like "create a new table" should go through database
      tableevent : function() {

      }
    },
  }
</script>

<style type="text/css">
  
</style>