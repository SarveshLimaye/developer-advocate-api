var cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(port , console.log(`Server started at port ${port}`))