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
            <li style="color: white;padding-top:15px">HDFS</li>
          </ul>
        </div>
      </div>
    </nav>
	<div>
		<div style="position:relative">
			<iframe v-bind:src="hdfs" style="position:relative;width:100%;height:820px"></iframe>
		</div>
	</div>
    <nav class="navbar navbar-default navbar-fixed-bottom"></nav>
   </div>	
</template>

<script>
	import config from '../config'
	export default {
		name: 'hdfs',
		data() {
			return {
				hdfs: config.HDFS_BACKEND+"hadoop/list",
			}
		},
	}
</script>