
const {Router} = require('express');
const router = Router();
const DB = require('../config/config');


router.get('/', (req, res)=> {
    res.status(200).json({
        message: 'Welcome to the API'
    })


});



router.get('/usuarios',async (req, res)=> {
    const personas=[];
    sql = "select * from USUARIO";

    let result = await DB.Open(sql,[],false);
    console.log(result.rows);
    console.log(personas);
     result.rows.map(person=>{
        
        let userSchema ={
            "ID" : person[0],  
          "NAME" : person[1],
          "EMAIL" : person[2], 
          "PASSWORD" : person[3],
          "COINS" : person[4],  
          "DNII" : person[5],
          "SURNAME" : person[6],
          "ADRESS" : person[7],
          "ACTIVE" : person[8],
          "IMAGE" : person[9],    
        }
        personas.push(userSchema);
    }) 
    res.json({personas});


});















module.exports= router;