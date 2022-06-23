import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios'
dotenv.config();

const app: Express = express();
//const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.get('/api/_v1/_ping-callback', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/api/_v1/_books/search', async(req: Request, res: Response) => {
let q = req.query._q;
  let f = req.query.filter;
  let sort = req.query.sort;
  let proj = req.query.projection;
  if(!q) return res.json({status:404,message: "Query Error"})
  let d = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
  let p = d.data
  if(f){
    let ft = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&filter=${f}`)
    res.json({
      status:200,
      sortType: sort || "Not Found",
      filterType: f,
      projection: proj ||"Not Found",
      message: ft.data
    })
  }
  if(sort){
    let s = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&orderBy=${sort}`)
    res.json({
      status:200,
      sortType: sort,
      filterType: f || "Not Found",
      projection: proj ||"Not Found",
      message: s.data
    })
  }
  if(proj){
    let prj = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&projection=${proj}`)
    res.json({
      status:200,
      sortType: sort || "Not Found",
      filterType: f || "Not Found",
      projection: proj,
      message: prj.data
    })
  }
  res.json({status:200,sortType: "Not Found", filterType: "Not Found",projection:"Not Found",message: p})

});

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:3000`);
});