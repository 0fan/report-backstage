import '../js/vendor/jquery-1.9.1.min.js'
import store from '../js/vendor/store.everything.min.js'
import url from './data/url'
import request from './data/request'

const baseURL = url.baseURL,
      login   = request.login

$(() => {

  let ipt_user         = $('#user'),
      ipt_pwd          = $('#password'),
      btn_submit       = $('#submit'),
      btn_submit_wait  = $('#submit-wait'),
      val_user         = '',
      val_pwd          = ''

  btn_submit.on('click', (e) => {
    
    // 清除提示
    ipt_user.parents('.form-group').removeClass('hasError')
    ipt_pwd.parents('.form-group').removeClass('hasError')
    
    if (!(validUser() && validPassword())) {
      return
    }
    
    // 本地验证成功，继续远程验证
    btn_submit.hide()
    btn_submit_wait.show()

    $.ajax({
      url: baseURL + login,
      type: 'POST',
      data: {
        "userName": val_user,
        "password": val_pwd
      },
    })
    .done(function(d) {
      console.log('success')
      console.log(d)
      // 存储信息
      store.remove('user')
      store.set('user', d)

      // 跳转
      window.location = './role/administrator/channelManage'
    })
    .fail(function(d) {
      console.log('error')
      console.log(d)
      
      ipt_user.parents('.form-group').addClass('hasError').find('.tip').text(d.responseText || '用户名或密码错误')
      ipt_user.focus()

    })
    .always(function() {
      btn_submit.show()
      btn_submit_wait.hide()
    })

  })
  
  // 本地验证帐号
  function validUser() {
    // 获取输入的值
    val_user = $.trim(ipt_user.val())

    // 用户名空验证
    if (!val_user) {
      ipt_user.parents('.form-group').addClass('hasError').find('.tip').text('用户名不能为空')
      ipt_user.focus()
      return
    }

    // 用户名格式验证
    if (!/^\w+$/.test(val_user)) {
      ipt_user.parents('.form-group').addClass('hasError').find('.tip').text('只能输入数字、字母、下划线')
      ipt_user.focus()
      return
    }

    return true
  }
  
  // 本地验证密码
  function validPassword() {
    val_pwd  = $.trim(ipt_pwd.val())
    
    // 密码空验证
    if (!val_pwd) {
      ipt_pwd.parents('.form-group').addClass('hasError').find('.tip').text('密码不能为空')
      ipt_pwd.focus()
      return
    }

    // 密码格式验证
    if (!/^\w+$/.test(val_pwd)) {
      ipt_pwd.parents('.form-group').addClass('hasError').find('.tip').text('只能输入数字、字母、下划线')
      ipt_pwd.focus()
      return
    }

    return true
  }
  
  ipt_user.on('change input', (e) => {
    if (validUser()) {
      $(e.target).parents('.form-group').removeClass('hasError')
    }
  })
  
  ipt_pwd.on('change input', (e) => {
    if (validPassword()) {
      $(e.target).parents('.form-group').removeClass('hasError')
    }
  })

})
