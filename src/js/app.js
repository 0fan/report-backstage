$(document).on('click', '.menu-item', (e) => {
  let $el = $(e.target)

  if (!$el.is('.menu-item')) {
    $el = $el.parents('.menu-item')
  }

  $el.addClass('active').siblings('.menu-item').removeClass('active')

})

$(document).on('click', '.sub-menu-item', (e) => {
  let $el = $(e.target)

  if (!$el.is('.sub-menu-item')) {
    $el = $el.parents('.sub-menu-item')
  }

  $el.addClass('active').siblings('.sub-menu-item').removeClass('active')

})

$(document).on('click', '.sub-menu-tit', (e) => {
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


$('#data-table').bootstrapTable({
  columns: [{
        field: 'id',
        title: 'Item ID'
    }, {
        field: 'name',
        title: 'Item Name'
    }, {
        field: 'price',
        title: 'Item Price'
    }],
    data: [{
        id: 1,
        name: 'Item 1',
        price: '$1'
    }, {
        id: 2,
        name: 'Item 2',
        price: '$2'
    }]
})