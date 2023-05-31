const  express = require('express');

const router = express.Router();

const Article = require('../models/article');

const multer = require('multer');

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


router.post('/ajout', upload.any('image') , (req , res)=>{

    let data = req.body;
    let article = new Article(data);
    article.date = new Date();
    article.image = filename;
    article.tags = data.tags.split(',');

    article.save()
    .then((saved) => {
      filename = '';
      // Sanitize the 'saved' variable before sending it in the response
      const sanitizedData = sanitize(saved); // Replace 'sanitize' with the appropriate function
      res.status(200).send(sanitizedData);
    })
    .catch(err => {
      res.status(400).send(sanitizeErrorMessage(err));
    });
});

/*router.get('/all', (req , res)=>{

    Article.find({})
        .then(
            (articles)=>{
                res.status(200).send(articles);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})*/

router.get('/all', (req, res) => {
    Article.find({})
      .then((articles) => {
        // Sanitize the 'articles' variable before sending it in the response
        const sanitizedData = sanitize(articles); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
  });
  

router.get('/getbyid/:id', (req , res)=>{
    
    let id = req.params.id

    Article.findOne({ _id: id })
      .then((article) => {
        // Sanitize the 'article' variable before sending it in the response
        const sanitizedData = sanitize(article); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
});


/*router.get('/getbyidauthor/:id', (req , res)=>{

        
    let id = req.params.id

    Article.find({ idAuthor: id })
    .then(
        (articles)=>{
            res.status(200).send(articles);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})*/

router.get('/getbyidauthor/:id', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let id = req.params.id;
  
    Article.find({ idAuthor: id })
      .then((articles) => {
        // Sanitize the 'articles' variable before sending it in the response
        const sanitizedData = sanitize(articles); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
  });
  

/*router.delete('/supprimer/:id', (req , res)=>{
    
    let id = req.params.id

    Article.findByIdAndDelete({_id: id})
        .then(
            (article)=>{
                res.status(200).send(article);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})*/

router.delete('/supprimer/:id', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let id = req.params.id;
  
    Article.findByIdAndDelete({ _id: id })
      .then((article) => {
        // Sanitize the 'article' variable before sending it in the response
        const sanitizedData = sanitize(article); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
  });
  

/*router.put('/update/:id', upload.any('image') , (req , res)=>{
    let id = req.params.id
    let data = req.body;
    data.tags = data.tags.split(',');

    if(filename.length > 0){
        data.image = filename;
    }
    Article.findByIdAndUpdate({ _id: id } , data )
        .then(
            (article)=>{
                filename = '';
                res.status(200).send(article);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})*/

router.put('/update/:id', upload.any('image'), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let id = req.params.id;
    let data = req.body;
    data.tags = data.tags.split(',');
  
    if (filename.length > 0) {
      data.image = filename;
    }
  
    Article.findByIdAndUpdate({ _id: id }, data)
      .then((article) => {
        filename = '';
        // Sanitize the 'article' variable before sending it in the response
        const sanitizedData = sanitize(article); // Replace 'sanitize' with the appropriate function
        res.status(200).send(sanitizedData);
      })
      .catch((err) => {
        res.status(400).send(sanitizeErrorMessage(err));
      });
  });
  



module.exports = router;
