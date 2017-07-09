// 一级菜单选择
$(document).on('click', '.menu-item', (e) => {
  e.preventDefault()
  let $el = $(e.target)

  if (!$el.is('.menu-item')) {
    $el = $el.parents('.menu-item')
  }
  
  $('.sub-menu-item').removeClass('active')
  $el.addClass('active').siblings('.menu-item').removeClass('active')

})


// 子菜单选择
$(document).on('click', '.sub-menu-item', (e) => {
  e.preventDefault()
  let $el = $(e.target)

  if (!$el.is('.sub-menu-item')) {
    $el = $el.parents('.sub-menu-item')
  }
  
  $('.menu-item').removeClass('active')
  $el.addClass('active').siblings('.sub-menu-item').removeClass('active')

})

// 子菜单折叠
$(document).on('click', '.sub-menu-tit', (e) => {
  e.preventDefault()
  let $el = $(e.target)

  if (!$el.is('.sub-menu-tit')) {
    $el = $el.parents('.sub-menu')
  }

  if ($el.hasClass('active')) {
    $('> ul', $el).slideUp(150)
    $el.removeClass('active')
  } else {
    $('> ul', $el).slideDown(150)
    $el.addClass('active')
  }
})