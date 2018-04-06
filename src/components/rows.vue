<template>
  <div class="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main ">

    <el-pagination background layout="total, prev, pager, next" 
    @current-change="newRows"
    :total="pages" 
    :page-size="50">
    </el-pagination>

    <el-table :data="rows" height="770" border>
      <el-table-column v-for="column in columns" :key="column.id" :prop="column" :label="column">
      </el-table-column>
    </el-table>
<!--     <el-pagination background layout="total, prev, pager, next" 
    :total="pages" 
    :page-size="50"
    @current-change="newRows">
    </el-pagination> -->
<!--     <nav aria-label="Page navigation" class="">
      <ul class="pagination">
        <li href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </li>
        <li v-for="page in 10000" v-if="page <= pages">
          <a href="#">{{page}}</a>
        </li>
        <li href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </li>
      </ul>
    </nav> -->
    <nav class="navbar navbar-default navbar-fixed-bottom"></nav>
  </div>
<!-- 	<div class="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main ">
      <div style=" overflow-y:auto; overflow-x:auto; height:100%;">
    		<table class="table table-striped table-bordered table-hover table-condensed table-responsive">
    			<thead>
              <tr>
                <th v-for="column in columns">
                  {{column}}
                </th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows">
              <td v-for="column in columns">
                {{row[column]}}
              </td>
            </tr>
          </tbody>
    		</table>
        <nav aria-label="Page navigation" class="">
          <ul class="pagination">
            <li href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </li>
            <li v-for="page in 10000" v-if="page <= pages">
              <a href="#">{{page}}</a>
            </li>
            <li href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>
      <nav class="navbar navbar-default navbar-fixed-bottom"></nav>
	</div> -->
</template>

<script type="text/javascript">
  import {get_rows} from '../lib/vueHelper'
  import store from '@/vuex/store'
	export default {
		name: "tb-rows",
    // props: {
    //   rows: Array,
    //   totalRows: Number,
    //   columns: Array,
    //   table: String
    // },
		data: function() {
			return {
			}
		},
    computed: {
      columns: function() {
        return this.$store.state.table.columns;
      },
      rows: function() {
        return this.$store.state.table.rows;
      },
      pages: function() {
        var count = this.$store.state.table.row_count;
        return count;
      },
    },
    methods: {
      newRows: function(page) {
        var offset=(page-1)*50;
        console.log("sss"+offset);
        var dbname = this.$store.state.database.name;
        var table_name = this.$store.state.table.name;
        var data = {
          params: {
            "db": dbname,
            "table": table_name,
            "offset": offset,
            "count": 50
          } 
        };
        get_rows(this, data);         
      },
    },
	}
</script>

<style type="text/css">
	.main {
    padding-right: 2px;
    padding-left: 10px; 
  }
</style>