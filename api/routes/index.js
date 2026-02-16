const express = require('express')
const router = express.Router()

const videos = require('./videos')  // Đảm bảo đường dẫn này chính xác
// ... other imports

router.use('/slide', require('./slide'))
router.use('/slideshow', require('./slideshow'))
router.use('/display', require('./display'))
router.use('/user', require('./user'))
router.use('/widgets', require('./widgets'))

router.get('/test', (req, res) => {
  res.json({ message: 'Test route works!' })
})

router.use('/videos', videos)  // Thêm dòng này nếu chưa có
console.log('Registered route: /api/v1/videos')

module.exports = router
