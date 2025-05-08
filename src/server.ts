import express, { Request, Response } from 'express';

const app = express()

app.get('/', async (req: Request, res: Response): Promise<any> => {
    try{
        res.send('Hello World Riyas')
    }catch(err: any){
        console.log(err)
    }
})

app.listen(5000, () => console.log("SERVER STARTED http://localhost:5000"))

