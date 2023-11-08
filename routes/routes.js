
const {Router} = require('express');
const router = Router();
const DB = require('../config/config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

router.post('/login', async (req, res) => {
    const { EMAIL, PASSWORD } = req.body;
    const sql = "SELECT * FROM USUARIO WHERE EMAIL = :EMAIL"; // Busca al usuario por email
    const binds = {
        EMAIL
    };
    
    try {
        const result = await DB.Open(sql, binds, false);
        
        if (result.rows.length === 1) {
            const user = result.rows[0];
            const storedPasswordHash = user[3]; // Supongo que la contraseña está hasheada en la posición 3

            // Hashea la contraseña proporcionada y compárala con la almacenada
            const providedPasswordHash = hashPassword(PASSWORD);
            
            if (storedPasswordHash === providedPasswordHash) {
                // Las contraseñas coinciden, el inicio de sesión es exitoso
                res.json({ user: user });
            } else {
                // Las contraseñas no coinciden
                res.status(401).json({ message: 'Contraseña incorrecta', user: user });
            }
        } else {
            // No se encontró ningún usuario con el correo electrónico proporcionado
            res.status(404).json({ message: 'Usuario no encontrado', user: user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la operación de login' });
    }
});



router.post('/usuarios/inside', async (req, res) => {
    const { NAME, EMAIL, PASSWORD, DNII, SURNAME } = req.body;
    const sql = `
        INSERT INTO USUARIO (NAME, EMAIL, PASSWORD, DNII, SURNAME)
        VALUES (:NAME, :EMAIL, :PASSWORD, :DNII, :SURNAME)`;
    const binds = {
        NAME,
        EMAIL,
        PASSWORD,
        DNII,
        SURNAME
    };

    let result;
    try {
        result = await DB.Open(sql, binds, true);
        res.json({ message: 'Usuario insertado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar el usuario' });
    }
});
router.post('/apartamentos', async (req, res) => {
    const { ID } = req.body;
    const apartamentos = [];
    const sql = "SELECT * FROM APARTMENT WHERE ID_OWNER = :ID"; // Utiliza :ID como marcador de posición
    const binds = {
        ID
    };

    try {
        const result = await DB.Open(sql, binds, true);
        const apartmentList = result.rows.map(apartamento => {
            return {
                "ID": apartamento[0],  
                "IMAGE": apartamento[1],
                "NAME": apartamento[2], 
                "PRICE": apartamento[3],
                "PLACE": apartamento[4],  
                "AVALIABLE": apartamento[5],
                "CITY": apartamento[6],
                "ID_OWNER": apartamento[7]
            };
        });

        res.json({ apartments: apartmentList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar apartamentos' });
    }
});


router.post('/apartamentos/inside', async (req, res) => {
    const { ID_OWNER,IMAGE, NAME, PRICE, PLACE, AVALIABLE, CITY } = req.body;
    const sql = `
        INSERT INTO APARTMENT (ID_OWNER, IMAGE, NAME, PRICE, PLACE, AVALIABLE, CITY)
        VALUES ( :ID_OWNER, :IMAGE, :NAME, :PRICE, :PLACE, :AVALIABLE, :CITY)
    `;
    const binds = {
        ID_OWNER,
        IMAGE,
        NAME,
        PRICE,
        PLACE,
        AVALIABLE,
        CITY
    };

    try {
        const result = await DB.Open(sql, binds, true);
        res.json({ message: 'Apartamento insertado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar el apartamento' });
    }
});

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    const hashedPassword = hash.update(password, 'utf8').digest('hex');
    return hashedPassword;
}







module.exports= router;