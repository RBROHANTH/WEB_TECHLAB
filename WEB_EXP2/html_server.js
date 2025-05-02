const http = require('http');
const fs = require('fs');
const PORT=8000

const server = http.createServer((req, res) => {
    res.writeHead(200,{'Content-type':'text/html'});
    fs.readFile('cow.html',(error,data)=>{
        if(error){
            res.writeHead(404)
            res.write('page not found')
        }else{
            res.write(data)
            res.end()
        }
    });
    
});
server.listen(PORT, (error) => {
    if(error){
        console.log(e);
    }else{
        console.log(`Server is running on port ${PORT}`);
    }
});