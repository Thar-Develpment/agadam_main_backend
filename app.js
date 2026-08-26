const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config/config')
const app = express()

app.use(express.json())

const PORT = config.PORT
const subDomainRouter = require('./routes/sub_domain')

app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
    res.json({ status: 0.1 })
})

app.use('/image', subDomainRouter)

app.listen(PORT, () => {
    console.log(`Server running`);
})