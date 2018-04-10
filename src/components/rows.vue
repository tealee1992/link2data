<template>
  <div class="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">
<!--     <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="数据" name="first"> -->
        <el-table ref="table_data" :data="rows" height="89%" border :cell-style="cellStyle">
          <el-table-column v-for="(column,index) in columns" :fixed="fixed(index)" :key="column.id" :prop="column" :label="column">
          </el-table-column>
        </el-table>
        <div v-if="count">
            <el-pagination 
              @current-change="newRows"
              @size-change="newSize"
              background
              layout="total, sizes,prev, pager, next" 
              :total="count" 
              :page-size="size"
              :page-sizes="[20,50,100]"
            >
            </el-pagination>
        </div>
<!--       </el-tab-pane> -->
<!--       <el-tab-pane label="结构" name="second" @click="reconstruct(name)">
        <div>
          <el-table ref="table_struct" :data="structure.data"  border :cell-style="cellStyle">
            <el-table-column v-for="col in structure.columns" :key="col.id" :prop="col" :label="col">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs> -->
    <nav class="navbar navbar-default navbar-fixed-bottom"></nav>
  </div>
</template>

<script type="text/javascript">
  import {get_rows} from '../lib/vueHelper'
  import store from '@/vuex/store'
	export default {
		name: "tb-rows",
		data: function() {
			return {
        size:50,
			}
		},
    computed: {
      columns: function() {
        return this.$store.state.table.columns;
      },
      rows: function() {
        return this.$store.state.table.rows;
      },
      count: function() {
        return this.$store.state.table.row_count;
      }
      // structure: function() {
      //   var raw = this.$store.state.table.structure;
      //   var keys = [];
      //   if (raw[0]) {
      //     keys = Object.keys(raw[0]);         
      //   }

      //   return {
      //     data:raw,
      //     columns:keys,
      //   }
      // }
    },
    methods: {
      newRows: function(page) {
        var offset=(page-1)*this.size;
        console.log("sss"+offset);
        var dbname = this.$store.state.database.name;
        var table_name = this.$store.state.table.name;
        var data = {
          params: {
            "db": dbname,
            "table": table_name,
            "offset": offset,
            "count": this.size,
          } 
        };
        get_rows(this, data);         
      },
      newSize: function(size) {
        this.size = size;
        this.newRows(1);
      },
      cellStyle: function() {
        return {  
          "white-space": "nowrap",
          "overflow": "hidden !importent",
          "text-overflow": "ellipsis !importent",
        };
      },
      fixed: function(index) {
        if (index==0) {
          return true;
        }else {
          return false;
        }
      },
      // dolayout: function() {
      //   this.$refs.table_data.doLayout();
      //   // this.$refs.table_struct.doLayout();  
      // },
      // reconstruct: function(name) {
      //   if(name=="first") {
      //     console.log(name)
      //     this.$refs.table_data.doLayout();
      //   }else {
      //     console.log(name)
      //     this.$refs.table_struct.doLayout();
      //   }
      // }
    },
	}
</script>

<style type="text/css">
</style>