const middleware= (req, res, next) => { 
    console.log('Request received');
    next();
} 

module.exports=middleware;