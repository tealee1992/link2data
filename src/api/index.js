import Axios from 'axios'
import API from './resource'

Axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
export default {

  login (data) {
    return Axios.post(API.login, data)
  },

  islogin (data) {
  	return Axios.post(API.islogin, {access_token: data})
  },

  list_dbs (data) {
    return Axios.get(API.list_dbs, data)
  },
  list_db_infor (data) {
    return Axios.get(API.list_db_infor, data)
  },
  list_tables (data) {
    return Axios.get(API.list_tables, data)
  },
  list_row_count (data) {
    return Axios.get(API.list_row_count, data)
  },
  list_rows (data) {
    return Axios.get(API.list_rows, data)
  },
  list_columns (data) {
    return Axios.get(API.list_columns, data)
  },
  get_struct (data) {
    return Axios.get(API.get_struct, data)
  },
  hdfs (data) {
    return Axios.get(API.hdfs, data)
  }
}