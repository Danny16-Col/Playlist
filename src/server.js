import 'dotenv/config';
import app from './app.js'
import dbconnection from './config/db.js'

const PORT = process.env.PORT || 4000;

dbconnection();

app.listen(PORT, ()=>{

    console.log(`servidor escuchado http://localhost:${PORT}`);
    
})