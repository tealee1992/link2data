<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-3 main">
		<table class="table table-striped">
			<thead>
          <tr>
            <th v-for="column in columns">
              {{column}}
            </th>
          </tr>
      </thead>
      <tbody>
        
      </tbody>
            <tbody>
                <tr>
                  <td>1,001</td>
                  <td>Lorem</td>
                  <td>ipsum</td>
                  <td>dolor</td>
                  <td>sit</td>
                </tr>
                <tr>
                  <td>1,007</td>
                  <td>sagittis</td>
                  <td>ipsum</td>
                  <td>Praesent</td>
                  <td>mauris</td>
                </tr>
                <tr>
                  <td>1,008</td>
                  <td>Fusce</td>
                  <td>nec</td>
                  <td>tellus</td>
                  <td>sed</td>
                </tr>
              </tbody>
		</table>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "tb-rows",
    props: {
      rows: Array,
      totalRows: Number,
      columns: Array,
      table: String
    },
		data: function() {
			return {
				
			}
		},
	}
</script>

<style type="text/css">
	
</style>