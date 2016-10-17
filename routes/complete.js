var router = require('express').Router();
var pg = require('pg');
var config ={
    database:'rho'
};


var pool = new pg.Pool(config);


router.get('/', function(req, res){

    pool.connect(function(err, client, done){
        if(err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM todo2 where complete = true', function(err, result){
            done();
            if(err){
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);

                return;
            }

        console.log('Got rows from the DB:',result.rows);
        res.send(result.rows);

        });

    });
});


router.put('/:id', function(req, res){

    var id = req.params.id;
    var task=req.body.task;
    var complete =req.body.complete;

    pool.connect(function(err, client, done){
        try{  //try block and finally useful way to clean up system resources
            if(err){
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);

                return; //stops execution of the function
            }
            //Update database
            client.query('UPDATE todo2 SET task=$1, complete=$2 WHERE id=$3 RETURNING *;',
                        [task, complete, id], function(err, result){
                if(err){
                    console.log('Error querying database',err);
                    res.sendStatus(500);

                } else {
                    res.send(result.rows);

                }
            });

        } finally {
            done();
        }

    });


});


module.exports=router
