const path = require('path');

module.exports = function(app){


   
    app.get('/', (req, res)=>{

       res.sendFile(path.join(__dirname,'views/index.html'));
    });
  
    app.get('/chat', (req, res)=>{
       res.sendFile(path.join(__dirname,'views/chat.html'));
    }); 



}