import config from '../config'

var BACKEND_API = config.BACKEND_API_ROOT

export default {
  // login: `${BACKEND_API}auth/login`,

  // islogin: `${BACKEND_API}auth/islogin`,

  list_dbs: `${BACKEND_API}list/databases`,
  list_db_infor: `${BACKEND_API}list/dbinfor`,
  list_tables: `${BACKEND_API}list/tables`,
  list_rows: `${BACKEND_API}list/rows`,
  list_columns: `${BACKEND_API}list/columns`,

}