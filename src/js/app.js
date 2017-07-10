import './menu'
import store from './vendor/store.everything.min'
import url from './data/url'
import request from './data/request'
import modal from './widget/modal'

const user = store.get('user')

if (!user) {
  window.location = '/login.html'
}

// 渲染数据
$('.user-info .role span').text(user.roles["0"].roleName)

// 获取渠道商数据
const baseURL          = url.baseURL,
      getChannelList   = request.getChannelList

$.ajax({
  url: baseURL + getChannelList,
  type: 'POST',
  data: {
    currentPage: 1,
    pageSize: 20
  },
})
.done(function(d) {
  console.log("success")
  console.log(d)
})
.fail(function(d) {
  console.log("error")
  console.log(d)
})
.always(function() {
  console.log("complete")
})
