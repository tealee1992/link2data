<template>
  <div class="container-fluid">
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse">
          <ul class="nav navbar-nav navbar-left" >
<!--             <li title="Process list" rel="tooltip" data-placement="bottom" >
              <a href="#" ><span class="fa fa-gears"></span></a>
            </li>
            <li title="Server status graph" rel="tooltip" data-placement="bottom" >
              <a href="#" ><span class="fa fa-area-chart"></span></a>
            </li> -->
            <li style="color: white;padding-top:15px">MySQL数据库</li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle databaseDropdownToggle" data-toggle="dropdown" title="selectedDatabase"><b class="caret"></b>{{dbname}}</a>
              <ul class="dropdown-menu dropdownList">
                <li v-for="database in databases" :key="database.id" v-on:click="selectDatabase(database)">
                  <a href="#">{{database}}</a>
                </li>
              </ul>
            </li>
          </ul>
<!--           <ul class="nav navbar-nav navbar-right">
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
          </ul> -->
        </div>
      </div>
    </nav>
  
    <db-tables v-on:tableEvent="tableEvent"></db-tables>
    <tb-rows v-on:rowEvent="rowEvent"></tb-rows>
  </div>

</template>

<script>
  import dbtables from '@/components/tables'
  import rows from '@/components/rows'
  import store from '@/vuex/store'
  import {get_tables} from '../lib/vueHelper'  
  export default {
    name: 'mysql',
    components: { 'db-tables':dbtables, 'tb-rows': rows },
    data() {
      return {

      }
    },
    created () {
      var data = {
        params: {
          "db": this.dbname,
        } 
      };
      get_tables(this, data);
    },
    computed: {
      databases: function() {
        return this.$store.state.databases;
      },
      dbname: function() {
        return this.$store.state.database.name;
      }
    },
    methods: {
      selectDatabase : function(dbname) {
        store.commit('setDB',dbname);
        //clear rows
        store.commit('setRows',[]);
        // store.commit('setStruct',[]);
        store.commit('setColumns',[]);
        var data = {
          params: {
            "db": dbname,
          } 
        };
        get_tables(this, data);
      },
      //the management on tables like "create a new table" should go through database
      tableEvent : function() {

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