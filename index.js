require('dotenv').config();
var cors = require('cors');
const express = require('express');
const app = express();

//middleware
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

//db
const connectDB = require('./db/connect')

//routes
const advocatesRouter = require('./routes/advocate')
const companiesRouter = require('./routes/company')

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.use('/advocates', advocatesRouter)
app.use('/companies', companiesRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try{
       await connectDB(process.env.MONGODB_URI)
      app.listen(port , console.log(`Server started at port ${port}`))
    } catch(err) {
        console.log(err)
    }
}

start();