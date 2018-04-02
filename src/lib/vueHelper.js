import api from '../api/index'
import router from '../router'
import store from '../vuex/store'
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
  api.list_dbs(data)
  .then(res => {
    if (res.data.msg === 'success') {
      that.databases = res.data.result;
    } else {
      showMsg(that, true, '数据获取错误<database>', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const get_tables = (that, data) => {
  api.list_tables(data)
  .then(res => {
    if (res.data.msg === 'success') {
      that.tables = res.data.result;
    } else {
      showMsg(that, true, '数据获取错误<table>', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const Init_student = (that,data) => {
  console.log("init_student:"+data.userid)
  return new Promise(function (resolve,reject) {
    api.init_student(data)
    .then(res => {
        if (res.data.code === 'success') {

            console.log("status:"+res.data.data.status)
            var status = res.data.data.status
            var url = res.data.data.url
            store.commit('setconStatus', status)
            store.commit('setlaburl', url)
            resolve();
        }else {

            reject();
        }    
    })
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

export const Save =(that, data) => {
  console.log("vuehelper:"+data.userid)

  return new Promise(function (resolve,reject) {
    api.save(data)
    .then(res => {
        if (res.data.code === 'success') {
            showMsg(that, true,'保存成功！', 'success')
            console.log("helper:"+res.data.data)
            resolve();
        }else {
            showMsg(that, true,'保存失败！', 'error')
            reject();
        }    
    })
  })
}

export const Delete =(that, data) => {
  console.log("vuehelper:"+data.userid)

  return new Promise(function (resolve,reject) {
    api.delete(data)
    .then(res => {
        if (res.data.code === 'success') {
            showMsg(that, true,'销毁成功！', 'success')
            console.log("helper:"+res.data.data)
            resolve();
        }else {
            showMsg(that, true,'销毁失败！', 'error')
            reject();
        }    
    })
  })
}

export const Reload =(that, data) => {
  console.log("vuehelper:"+data.userid)

  return new Promise(function (resolve,reject) {
    api.reload(data)
    .then(res => {
        if (res.data.code === 'success') {
            showMsg(that, true,'恢复成功！', 'success')
            console.log("helper:"+res.data.data)
            resolve();
        }else {
            showMsg(that, true,'恢复失败！', 'error')
            reject();
        }    
    })
  })
}