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
    res.json({ status: 0.3 })
})

const dns = require('dns').promises;

app.get('/debug-db', async (req, res) => {
  try {
    const result = await dns.lookup('tokaido.proxy.rlwy.net');

    res.json({
      success: true,
      result
    });
  } catch (error) {
    res.json({
      success: false,
      code: error.code,
      message: error.message
    });
  }
});

app.use('/auth', authRouter)
app.use('/user', subDomainRouter)
app.use('/opxXxolN7m6CU', adminRouter)

app.listen(PORT, () => {
    console.log(`Server running`);
})
