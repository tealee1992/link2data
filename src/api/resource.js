import config from '../config'

var BACKEND_API = config.BACKEND_API_ROOT
var HDFS_BACKEND = config.HDFS_BACKEND

export default {
  // login: `${BACKEND_API}auth/login`,

  // islogin: `${BACKEND_API}auth/islogin`,

  list_dbs: `${BACKEND_API}list/databases`,
  list_db_infor: `${BACKEND_API}list/dbinfor`,
  list_tables: `${BACKEND_API}list/tables`,
  list_row_count: `${BACKEND_API}list/rowcount`,
  list_rows: `${BACKEND_API}list/rows`,
  list_columns: `${BACKEND_API}list/columns`,
  hdfs: `${HDFS_BACKEND}/hadoop/list/`,
}