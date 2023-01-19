const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000

const { getData, addItem, findOne } = require('./notion')

app.use(cors())

app.use(express.json()); //For JSON requests, application/json 분석해서 가져올수 있도록
app.use(express.urlencoded({extended: true}));//application/x-www-form-urlencoded 분석해서 가져올수 있도록

app.get('/', async(req, res) => {
    let data = await getData()
    console.log(data)
    res.send('hello')
})

app.post('/register', async(req, res) => {
    const {name, pw} = req.body
    
    const find = await findOne(name)
    if (find.results.length === 0){
        const reg = await addItem(name, pw)
        res.status(200).json({success: true})
    }
    else{
        res.json({success: false})
    }
})

app.post('/login', async(req, res) => {
    const {name, pw} = req.body

    const find = await findOne(name)
    if (find.results.length !== 0){
        if (find.results[0].properties.이름.title[0].text.content === name && find.results[0].properties.텍스트.rich_text[0].text.content === pw)
            res.status(200).json({success: true})
        else
            res.json({success: false})
    }
    else
        res.json({success: false})
    
})

app.listen(port, () => console.log(`port ${port} 실행`))