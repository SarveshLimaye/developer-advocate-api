var cors = require('cors');
const express = require('express');
const app = express();
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.listen(port , console.log(`Server started at port ${port}`))