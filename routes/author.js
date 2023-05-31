const express = require('express');

const router = express.Router();


const Author = require('../models/author');

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

filename = '';
const mystorage = multer.diskStorage({

    destination: './uploads',
    filename: (req , file , redirect)=>{
        let date = Date.now();

        let fl = date + '.' + file.mimetype.split('/')[1];
        //786876876786.png
        redirect(null , fl);
        filename = fl;
    }

})

const upload = multer({storage: mystorage})


/*router.post('/register' , upload.any('image') , (req, res)=>{

    data = req.body;
    author = new Author(data);

    author.image = filename;

    salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password , salt);


    author.save()
        .then(
            (savedAuthor)=>{
                filename = "";
                res.status(200).send(savedAuthor);
            }
        )
        .catch(
            err=>{
                res.send(err)
            }
        )
})*/

router.post('/register', upload.any('image'), (req, res) => {
    let data = req.body;
    let author = new Author(data);
  
    author.image = filename;
  
    let salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password, salt);
  
    author.save()
      .then((savedAuthor) => {
        filename = '';
        // Sanitize the 'savedAuthor' variable before sending it in the response
        const sanitizedData = sanitize(savedAuthor); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.send(sanitizeErrorMessage(err));
      });
  });
  


/*router.post('/login' , (req, res)=>{
    
    let data = req.body;

    Author.findOne({email: data.email})
        .then(
            (author)=>{
                let valid = bcrypt.compareSync(data.password , author.password);
                if(!valid){
                    res.send('email or password invalid');
                }else{

                    let payload = {
                        _id: author._id,
                        email: author.email,
                        fullname: author.name + ' ' + author.lastname
                    }

                    let token = jwt.sign(payload , '123456789');

                    res.send({ myToken: token })

                }

            }
        )
        .catch(
            err=>{
                res.send(err);
            }
        )
})*/

router.post('/login', (req, res) => {
    let data = req.body;
  
    Author.findOne({ email: data.email })
      .then((author) => {
        if (!author) {
          res.send('email or password invalid');
        } else {
          let valid = bcrypt.compareSync(data.password, author.password);
          if (!valid) {
            res.send('email or password invalid');
          } else {
            let payload = {
              _id: author._id,
              email: author.email,
              fullname: author.name + ' ' + author.lastname,
            };
  
            let token = jwt.sign(payload, '123456789');
  
            // Sanitize the 'token' variable before sending it in the response
            const sanitizedToken = sanitize(token); // Replace 'sanitize' with the appropriate function
            res.send({ myToken: sanitizedToken });
          }
        }
      })
      .catch((err) => {
        res.send(sanitizeErrorMessage(err));
      });
  });
  


/*router.get('/all' , (req, res)=>{
    
    Author.find({})
    .then(
        (authors)=>{
            res.status(200).send(authors);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})*/

router.get('/all', (req, res) => {
    Author.find({})
      .then((authors) => {
        // Sanitize the 'authors' variable before sending it in the response
        const sanitizedData = sanitize(authors); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
  });
  

/*router.get('/getbyid/:id' , (req, res)=>{
    let id = req.params.id

    Author.findOne({ _id: id })
    .then(
        (author)=>{
            res.status(200).send(author);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})*/

router.get('/getbyid/:id', (req, res) => {
    let id = req.params.id;
  
    Author.findOne({ _id: id })
      .then((author) => {
        // Sanitize the 'author' variable before sending it in the response
        const sanitizedData = sanitize(author); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
  });
  

/*router.delete('/supprimer/:id' , (req, res)=>{
    let id = req.params.id

    Author.findByIdAndDelete({_id: id})
        .then(
            (author)=>{
                res.status(200).send(author);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})*/

router.delete('/supprimer/:id', (req, res) => {
    let id = req.params.id;
  
    Author.findByIdAndDelete({ _id: id })
      .then((author) => {
        // Sanitize the 'author' variable before sending it in the response
        const sanitizedData = sanitize(author); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
  });
  




module.exports = router;