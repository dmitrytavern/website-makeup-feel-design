const path = require('path')
const express = require('express')
const app = express()
const port = 3001

app.use(express.static('dist'))

app.get('/:page.html', (req, res) => {
	res.sendFile(path.resolve(`dist/${req.params.page}.html`) )
})

app.get('/:res.json', (req, res) => {
	res.sendFile(path.resolve(`dist/${req.params.res}.json`) )
})

app.listen(port, () => {
	console.log(`Server at http://localhost:${port}`)
})