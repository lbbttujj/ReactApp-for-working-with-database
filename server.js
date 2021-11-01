const express    = require('express'),
      Author     = require('./dbFiles/Authors'),
      dbOperation = require('./dbFiles/dbOperation'),
      cors       = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded())
app.use(cors());

app.get('/all', async(req,res)=>{
    const result = await dbOperation.getAunthor()
    res.send(result)
})


app.post('/allBooks', async(req,res)=>{
    console.log(req);
    const result = await dbOperation.getAll(req.body)
    res.send(result.recordset)
})











app.post('/create', async(req,res)=>{
    await dbOperation.createAuthor(req.body);
    // const result = await dbOperation.getAll(req.body)
    res.send(true)
})
app.post('/createBook', async(req,res)=>{
    await dbOperation.createBook(req.body);
    // const result = await dbOperation.getAll(req.body)
    res.send(true)
})
app.post('/createContract', async(req,res)=>{
    await dbOperation.createContract(req.body);
    // const result = await dbOperation.getAll(req.body)
    res.send(true)
})
app.post('/createClient', async(req,res)=>{
    await dbOperation.createClient(req.body);
    // const result = await dbOperation.getAll(req.body)
    res.send(true)
})
app.post('/createSotr', async(req,res)=>{
    await dbOperation.createSotr(req.body);
    // const result = await dbOperation.getAll(req.body)
    res.send(true)
})
app.post('/createAppl', async(req,res)=>{
    await dbOperation.createAppl(req.body);
    // const result = await dbOperation.getAll(req.body)
    res.send(true)
})
app.post('/createApplBook', async(req,res)=>{
    await dbOperation.createApplBook(req.body);
    // const result = await dbOperation.getAll(req.body)
    res.send(true)
})




app.post('/delete', async(req,res)=>{
    await dbOperation.deleteRow(req.body);
    res.send(true)
})




app.post('/update', async(req,res)=>{
    await dbOperation.updateAll(req.body);
    // const result = await dbOperation.getAunthor()
    res.send(true)
})




let Mark = new Author ('Марков И.К.', '1976-11-11','89134568799','М','markov@mail.ru')
// console.log(Mark);


// dbOperation.createAuthor(Mark);




app.listen(API_PORT,()=> console.log(`listening on port ${API_PORT}`));