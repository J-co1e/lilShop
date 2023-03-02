const joi = require('@hapi/joi')
const avatar = joi.string().dataUri().required

exports.updateShopSchema = {
  body: {
    avatar
  }
}