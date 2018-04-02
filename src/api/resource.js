import config from '../config'

var BACKEND_API = config.BACKEND_API_ROOT

export default {
  login: `${BACKEND_API}auth/login`,

  islogin: `${BACKEND_API}auth/islogin`,

  list_dbs: `${BACKEND_API}list/databases`,
  list_tables: `${BACKEND_API}list/tables`,
  list_rows: `${BACKEND_API}list/rows`,

  // getCaptcha: `${API_ROOT}getCaptcha`,
  // searchJobs: `${API_ROOT}searchJobs`,
  // addStarJob: `${API_ROOT}addStarJob`,
  // addFollowComp: `${API_ROOT}addFollowComp`,
  // cancleStar: `${API_ROOT}cancleStar`,
  // getStarJob: `${API_ROOT}getStarJob`,
  // getChart: `${API_ROOT}getChartData`
}