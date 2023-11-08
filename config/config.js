const oracledb = require('oracledb');
db={
    user:'23_24_DAM2_CUCOTUCSI',
    password:'cucorulo',
    connectString:'oracle.ilerna.com:1521'
    //connectString:'192.168.3.26:1521'
}
async function open(sql, binds, autoCommit){
    let con = await oracledb.getConnection(db);
    let result = await con.execute(sql,binds, {autoCommit});
    
    con.release();
    return result;
    
}

exports.Open = open;