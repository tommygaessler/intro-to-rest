var express = require('express');
var router = express.Router();

const cage = [
  {
    id: 1,
    name: 'Wes',
    sex: 'M',
    breed: 'Chaweeny',
    aggressive: true,
  },
  {
    id: 2,
    name: 'Michael',
    sex: 'M',
    breed: 'Golden Retriever',
    aggressive: false,
  }
];

/* GET ALL PUPPIES */
router.get('/', function(req, res, next) {
  res.send({
    message: 'All puppies',
    data: cage
  });
});

/* GET A PUPPY */
router.get('/:id', function(req, res, next) {

  const puppyID = parseInt(req.params.id);

  const singlePuppy = cage.filter(function(puppy) {
    return puppy.id === puppyID;
  });

  if (singlePuppy.length) {
    res.status(200).send({
      message: 'single puppy',
      data: singlePuppy[0]
    });
  }
  else {
    res.status(422).send({
      message: 'Puppy doesnt exist',
      data: null
    });
  }

});

/*

baseurl: http://localhost:3000/api/v1/puppies
endpoint: /
method: POST
payload: {
  name: PUPPY_NAME
  sex: PUPPY_SEX
  breed: PUPPY_BREED
  aggressive: AGGRESSIVE
}
return: {
  message: 'single puppy',
  data: {
    name: PUPPY_NAME
    sex: PUPPY_SEX
    breed: PUPPY_BREED
    aggressive: AGGRESSIVE
  }
}

*/

/* CREATE A PUPPY */
router.post('/', function(req, res, next) {

  // get id

  const newPup = req.body;
  const indexOfLast = cage.length - 1;
  const newID = cage[indexOfLast].id + 1;
  newPup.id = newID;

  console.log(req.body);

  cage.push(req.body);

  res.send({
    message: 'Created a pup',
    data: req.body
  });
});

/*

baseurl: http://localhost:3000/api/v1/puppies
endpoint: /:id
method: PUT
payload: {
  name: PUPPY_NAME
  sex: PUPPY_SEX
  breed: PUPPY_BREED
  aggressive: AGGRESSIVE
}
return: {
  message: 'single puppy updated',
  data: {
    name: PUPPY_NAME
    sex: PUPPY_SEX
    breed: PUPPY_BREED
    aggressive: AGGRESSIVE
  }
}

*/


/* UPDATE A PUPPY */
router.put('/:id', function(req, res, next) {

  const fixedPup = req.body;
  const puppyID = parseInt(req.params.id);

  const singlePuppy = cage.filter(function(puppy) {
    return puppy.id === puppyID;
  })
  if (!singlePuppy.length) {
    res.status(422).send({
      message: 'does not exist',
      data: null
    });
  } else {
    fixedPup.id = puppyID;
    const index = cage.indexOf(singlePuppy[0]);
    cage.splice(index, 1);

    cage.push(fixedPup);
    res.send({
      message: 'single puppy updated',
      data: fixedPup

    });
  }
});

/*

baseurl: http://localhost:3000/api/v1/puppies
endpoint: /:id
method: DELETEs
return: {
  message: 'NAME is gone',
  data: {
    name: PUPPY_NAME
    sex: PUPPY_SEX
    breed: PUPPY_BREED
    aggressive: AGGRESSIVE
  }
}

*/

/* DELETE A PUPPY */
router.delete('/:id', function(req, res, next) {

  const puppyID = parseInt(req.params.id);

  const singlePuppy = cage.filter(function(puppy) {
    return puppy.id === puppyID;
  })
  if (!singlePuppy.length) {
    res.status(422).send({
      message: 'does not exist',
      data: null
    });
  } else {
    const index = cage.indexOf(singlePuppy);
    cage.splice(index, 1);
    res.send({
      message: singlePuppy[0].name + ' is gone',
      data: singlePuppy[0]
    });
  }





  res.send('DELETE A PUPPY');
});

module.exports = router;
