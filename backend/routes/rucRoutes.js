const express = require('express')
const router = express.Router()
const {getRuc}= require('../controllers//rucController')


router.get('/:ruc',getRuc )

module.exports = router