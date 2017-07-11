let form   = $('#add-form'),
    submit = $('#btn-submit')

submit.on('click', (e) => {
  e.preventDefault()
  
  form.validate({
    rules: {
      userName: {
        required: true
      },
      companyName: {
        required: true
      },
      companyCode: {
        required: true
      },
      companyAlias: {
        required: true
      },
      contacts: {
        required: true
      },
      mobile: {
        required: true
      },
      businessLicense: {
        required: true
      },
      settlement: {
        required: true
      },
      remark: {
        required: true
      }
    }
  })
})
