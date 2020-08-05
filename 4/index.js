const express = require('express')
const path = require('path')

const app = express()
const app2 = express()

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})
app2.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/frame.html'))
})

app.get('/main.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/main.js'))
})
app2.get('/main.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/main.js'))
})

app2.listen(3002, () => {
    console.log('App 2 online...')

    app.listen(3001, () => {
        console.log('App 1 online...')
    })
})
