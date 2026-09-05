const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config/config')
const app = express()

// Explicit CORS configuration for cross-origin requests from Vercel & custom subdomains
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Security headers without blocking cross-origin requests
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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