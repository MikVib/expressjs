import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
const port = process.env.PORT || 4001
mongoose
    .set('strictQuery', false)
    .connect(process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('DB SUCCESS'))
    .catch((err) => console.log(err))

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/todos', todoRoutes)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Express Success')
})

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('SERVER OK')
})

