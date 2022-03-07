const express = require('express');

const app = express();

app.use(logger);

// let para = "librarian"//

let para = "author"
let para1 = "libraian"


app.get('/books',(req,res)=>{
    res.send({route: req.path});
})

app.get('/libraries',checkPermission(para),(req,res)=>{
    res.send({route: req.path , permission: true});
})

app.get('/authors',checkPermission(para1),(req,res)=>{
    res.send({route: req.path , permission: true});
});

function logger(req,res,next){
    console.log(req.path);
    next();
}

function checkPermission(para) {
    if(para == "librarian" || para == "author"){
        return(
            function(req,res,next){
                if(req.path == "/libraries" && para == "librarian" || req.path == "/authors" && para == "author"){
                    next();
                }
                else{
                    res.send({route: req.path});
                }
            }
        )
    }
    else{
       return(
           function(req,res,next){
            res.send({route: req.path});
           }
       ) 
    }
}

app.listen(4500,()=>{
    console.log('Lisenting to port 4500');
})