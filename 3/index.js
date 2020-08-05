const express = require('express')

const app = express()
const PORT = 3333

app.use(express.static('public'))
app.use((req, res, next) => {
    console.log(req.url)

    next()
})

app.get('/req1', (req, res) => {
    setTimeout(() => {
        res.send('Data from: ' + req.url)
    }, 2000)
})

app.get('/req2', (req, res) => {
    res.send('Data from: ' + req.url)
})

app.listen(PORT, () => {
    console.log(`App on port ${PORT}...`)
})