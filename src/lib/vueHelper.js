import api from '../api/index'
import router from '../router'
import store from '@/vuex/store'
import Promise from 'promise-polyfill'

// 显示提示框
export const showMsg = (that, close, msg, type) => {
  that.$message({
    showClose: close,
    message: msg,
    type: type
  })
}

// doLogin
export const doLogin = (that, data) => {
  const authUser = {}
  api.login(data)
  .then(res => {
    if (res.data.msg === 'success') {
      authUser.data = res.data.result;
      authUser.token = res.data.token;
      store.commit('showlogin')
      window.localStorage.setItem('user', JSON.stringify(authUser))
      showMsg(that, true, '登录成功', 'success')
      router.push('/')
    } else {
      showMsg(that, true, '登录失败，账号或密码错误', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const get_dbs = (that, data) => {
  return new Promise(function(resolve, reject) {
    api.list_dbs(data)
    .then(res => {
      if (res.data.msg === 'success') {
        var db_list = res.data.result;
        store.commit('setDBs',db_list);
        resolve();
      } else {
        showMsg(that, true, '数据获取错误<database>', 'error')
        reject();
      }
    })
    .catch(err => {
      console.log(err)
    })    
  })
}
export const get_db_infor = (that, data) => {
  return new Promise(function(resolve, reject) {
    api.list_db_infor(data).then(res => {
      if (res.data.msg === 'success') {
        var db = res.data.result;
        store.commit('setDbInf',res.data.result);
        resolve();
      } else {
        showMsg(that, true, '数据获取错误<dbinfor>', 'error')
        reject();
      }    
    })    
  })

}
export const get_tables = (that, data) => {
  api.list_tables(data)
  .then(res => {
    if (res.data.msg === 'success') {
      // that.tables = res.data.result;
      store.commit('setTBs',res.data.result)
    } else {
      showMsg(that, true, '数据获取错误<table>', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const get_columns = (that, data) => {
  api.list_columns(data)
  .then(res => {
    if (res.data.msg === 'success') {
      // that.columns = res.data.result;
      store.commit('setColumns',res.data.result);
    } else {
      showMsg(that, true, '数据获取错误<column>', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const get_row_count = (that, data) => {
  api.list_row_count(data)
  .then(res => {
    if (res.data.msg === 'success') {
      var count = parseInt(res.data.result);
      store.commit('setRowCount',count);
    } else {
      showMsg(that, true, '数据获取错误<column>', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const get_rows = (that, data) => {
  api.list_rows(data)
  .then(res => {
    if (res.data.msg === 'success') {
      store.commit('setRows',res.data.result);
    } else {
      showMsg(that, true, '数据获取错误<row>', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const get_struct = (that, data) => {
  api.get_struct(data)
  .then(res => {
    if (res.data.msg === 'success') {
      store.commit('setStruct',res.data.result);
    } else {
      showMsg(that, true, '数据获取错误<struct>', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const getHadoop = (that, data) => {
  api.hdfs(data)
  .then(res => {
    that.hdfs.count = res.data.count;
    that.hdfs.size = res.data.space;
    // store.commit('setRows',res.data.result);
    // if (res.data.msg === 'success') {
    //   store.commit('setRows',res.data.result);
    // } else {
    //   showMsg(that, true, '数据获取错误<row>', 'error')
    // }
  })
  .catch(err => {
    console.log(err)
  })
}

export const Create =(that, data) => {
  console.log("vuehelper:"+data.userid)

  return new Promise(function (resolve,reject) {
    api.create(data)
    .then(res => {
        if (res.data.code === 'success') {
            showMsg(that, true,'创建成功！', 'success')
            console.log("helper:"+res.data.data)
            store.commit('setlaburl', res.data.data)
            resolve();
        }else {
            showMsg(that, true,'创建失败！', 'error')
            reject();
        }    
    })
  })
}
