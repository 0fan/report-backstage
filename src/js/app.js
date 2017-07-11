import store from 'store'
import './menu'
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
  // type: 'POST',
  data: {
    currentPage: 1,
    pageSize: 20
  },
})
.done(function(d) {
  console.log("success")
  console.log(d)

  renderTableDate(d.elements)
})
.fail(function(d) {
  console.log("error")
  console.log(d)
})
.always(function() {
  console.log("complete")
})

function renderTableDate(data) {

  for (let i = 0, len = data.length; i < len; i++) {
    data[i].action = '<div class="btn-group" role="group">\
                        <button type="button" class="btn btn-default">修改</button>\
                        <button type="button" class="btn btn-default">停用</button>\
                        <button type="button" class="btn btn-default">详情</button>\
                      </div>'
  }


  $('#data-table').bootstrapTable({
    resizable: true, // 可拖曳宽度
    showColumns: true,
    showRefresh: true,
    showToggle: true,
    showToolbar: true,
    showPaginationSwitch: true,
    showExport: true,
    toolbar: "#toolbar",
    clickToSelect: true,
    exportDataType: 'selected', // 导出选择的项目
    columns: [{
        field: 'companyName',
        title: '企业名称',
        sortable: true
      }, {
        field: 'userName',
        title: '用户名',
        sortable: true
      }, {
        field: 'companyAlias',
        title: '企业简称',
        sortable: true
      }, {
        field: 'contacts',
        title: '联系人',
        sortable: true
      }, {
        field: 'mobile',
        title: '手机号码',
        sortable: true
      }, {
        field: 'state',
        title: '状态',
        formatter: (index, row) => {
          console.log(index)
          switch (index) {
            case 0:
              return '正常'
            case 1:
              return '停用'
            case 2:
              return '禁用'
          }
        },
        sortable: true
      }, {
        field: 'action',
        title: '操作',
        width: '240px',
        align: 'center'
      }
    ],
    data: data
  });
}