
let con = require('./connector')
let data = require('./data');

con.query('CREATE TABLE orders(_id varchar(200),title varchar(100),description varchar(1000) )');

for(let i=0;i<data.length;i++) {
    con.query(`INSERT into orders values("${data[i]._id}","${data[i].title}","${data[i].description}")`,(err,response)=>{
        if(err) {
            console.log("not insert due to ",err);
        }else{
            console.log("insertion successfully")
        }
    });
}


