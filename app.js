const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config/config')
const app = express()

app.use(express.json())

app.use(cors())
app.use(helmet())

const PORT = config.PORT
const authRouter = require('./routes/auth')
const subDomainRouter = require('./routes/sub_domain')
const adminRouter = require('./routes/admin')

app.get('/', (req, res) => {
    res.json({ status: 0.1 })
})

app.use('/auth', authRouter)
app.use('/user', subDomainRouter)
app.use('/opxXxolN7m6CU', adminRouter)

app.listen(PORT, () => {
    console.log(`Server running`);
})
