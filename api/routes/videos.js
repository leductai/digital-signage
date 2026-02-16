const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/', (req, res) => {
  const uploadsDir = path.join(__dirname, '../../uploads')
  
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err)
      return res.status(500).json({ error: 'Error reading video directory' })
    }
    
    const videoFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.mp4', '.webm', '.ogg'].includes(ext)
    })
    
    const videos = videoFiles.map(filename => ({ filename }))
    
    res.json(videos)
  })
})

router.get('/test', (req, res) => {
  res.json({ message: 'Videos route is working' })
})

module.exports = router
