import Widget from './widget'

class Modal extends Widget {
  
  constructor(cfg) {
    super(cfg)

    this.cfg = $.extend({}, {
      target        : document.body,
      full          : false,
      title         : '',
      info          : '',
      status        : '',
      action        : [],
      mask          : true,
      clickMaskHide : false,
      during        : 300 // 动画的时长，用于调用回调
    }, cfg)
    
    this.render()

  }

  render() { // 生成
    this.renderUI()
    this.syncUI()
    this.bindUI()

    $(document.body).addClass('with-modal')

    this.boundingBox
      .appendTo(this.cfg.target)
      .show()
      .scrollTop(0)

    this.boundingBox[0].offsetWidth

    let $dialog = this.boundingBox.find('.esp-modal-dialog')

    this.boundingBox.addClass('in')

    $dialog.one('espTransitionEnd', (e) => {
      this.fire('open')
    }).emulateTransitionEnd(this.cfg.during)

  }

  renderUI() {

    let _modal,
        _close,
        _dialog,
        _header,
        _body,
        _footer,
        _mask

    _modal  = '<div class=esp-modal>'
    _dialog = '<div class=esp-modal-dialog>'
    _close = '<button class=esp-modal-close>×</button>'
    _header = '<div class="esp-modal-header">' + this.cfg.title + '</div>'
    _body   = '<div class=esp-modal-body>' + this.cfg.info + '</div>'
    _footer = ''
    _mask   = this.cfg.mask ? '<div class=esp-modal-mask></div>' : ''

    if (this.cfg.action && this.cfg.action.length) {
      _footer = '<div class=esp-modal-footer>'

      for (let i = 0, len = this.cfg.action.length; i < len; i++) {
        _footer += '<button class="btn btn-default">' + this.cfg.action[i].text + '</button>'
      }

      _footer += '</div>'
    }

    _dialog += _close
    _dialog += _header
    _dialog += _body
    _dialog += _footer
    _dialog += '</div>'
    _modal  += _dialog
    _modal  += _mask
    _modal  += '</div>'

    this.boundingBox = $(_modal)

  }

  syncUI() {

    if (this.cfg.full) {
      $('.esp-modal-dialog', this.boundingBox).css('top', 0)
    }

    if (this.cfg.status) {
      this.boundingBox.addClass('has' + this.cfg.status.substr(0,1).toUpperCase() + this.cfg.status.substr(1).toLowerCase())
    }

  }

  bindUI() {
    
    if (this.cfg.mask && this.cfg.clickMaskHide) {
      this.boundingBox.on('click', '.esp-modal-mask', (e) => {
        this.destory()
      })
    }

    for (let i = 0, len = this.cfg.action.length; i < len; i++) {
      this.boundingBox.on('click', '.btn:nth-child(' + (i + 1) + ')', (e) => {
        this.cfg.action[i].onClick && this.cfg.action[i].onClick()
      })
    }

    this.boundingBox.on('click', '.esp-modal-close', (e) => {
      this.destory()
    })
    
  }

  destory() {
    
    $(document.body).removeClass('with-modal')

    this.boundingBox.off()

    let $dialog = this.boundingBox.find('.esp-modal-dialog')

    this.boundingBox.removeClass('in')

    $dialog.one('espTransitionEnd', (e) => {
      this.fire('close')

      this.boundingBox.remove() 
      this.boundingBox = null
    }).emulateTransitionEnd(this.cfg.during)

  }

}

function getModal(cfg) {
  if (!(this instanceof Modal)) {
    return new Modal(cfg)
  }
}

export default getModal