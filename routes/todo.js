var router = require('express').Router();
var pg = require('pg');
var config ={
    database:'rho'
};


var pool = new pg.Pool(config);

router.post('/', function(req, res){
    console.log(req.body);

var complete = false;
    pool.connect(function(err, client, done){
        if(err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

    client.query('INSERT INTO todo2 (task,complete) VALUES ($1, $2) returning *;', [req.body.task,complete],  function(err, result){
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


router.get('/', function(req, res){

    pool.connect(function(err, client, done){
        if(err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM todo2', function(err, result){
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


        pool.connect(function(err, client, done){
            try{  //try block and finally useful way to clean up system resources
            if(err){
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);

                return; //stops execution of the function
            }
            //Update database
            client.query('UPDATE todo2 SET task=$1 WHERE id=$2 RETURNING *;',
                        [task,id], function(err, result){
                            if(err){
                                console.log('Error querying database',err);
                                res.sendStatus(500);

                            } else {

                            res.send(result.rows);
                             //very important to call done everytime
                         }
                        });
                    } finally {
                        done();
                    }
        });


    });

router.delete('/:id', function(req, res){
      var id = req.params.id;

      pool.connect(function(err, client, done){
          try{

              if(err){
                  console.log('Error in connection to the database', err);
                  res.sendStatus(500);
                  return;
              }

              client.query('DELETE FROM todo2 where id=$1',[id], function(err){
                  if(err){
                      console.log('Error querying the DB',err);
                      res.sendStatus(500);
                      return;
                  }
                      res.sendStatus(204); //status code

              });


          }finally{
              done();
          }

      });

  });


module.exports=router
