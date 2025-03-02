
import 'dotenv/config';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

 let teadata  = [];

 let nextId = 1;

 app.post('/teas', (req,res)=>{
    const {name,price} = req.body
    const newTea = {id: nextId++,name,price}
    teadata.push(newTea)
    res.status(201).send(newTea)
 })
//get tea
 app.get('/teas',(req,res)=>{
    res.status(200).send(teadata)
    
 })
// get by id
 app.get('/teas/:id',(req,res)=>{
   const tea =  teadata.find(t=>t.id=== parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('not found')
    }
    res.status(200).send(tea)
 })

 app.get('/id',(req,res)=>{
  res.send("hello tea")
 })

 //update

 app.put('/teas/:id', (req, res) => {
    
    const tea = teadata.find(t => t.id === parseInt(req.params.id));
  
    if (!tea) {
      return res.status(404).send('not found');
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
  
    res.send(teadata);
  });

// delete
  app.delete('/teas/:id',(req,res)=>{
   const index =  teadata.findIndex(t => t.id === parseInt(req.params.id));
   if (index === -1) {
    return  res.status(404).send('notfound')
    
   }
   teadata.splice(index,1)
   
   return res.status(200).send('deleted')
  })

  
app.listen(port,()=>{
    console.log(`Server is listening at localhost:${port}....`);
})
export default app; 
