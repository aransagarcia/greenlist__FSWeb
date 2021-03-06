const express = require('express');
const router = express.Router();
const multer = require('multer');

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const creatorsQueries = require('../queries/creatorsQueries')


/* FILE UPLOAD */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/creators');
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    }
});
  
const fileFilter = (req, file, cb) => {
  if ((file.mimetype).slice(0, 6) === 'image/') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


// getAllCreators
router.get('/', async (req, res, next) => {
    try {
        let allCreators = await creatorsQueries.getAllCreators();
        res.json({
            status: "success",
            message: "all creators retrieved",
            payload: allCreators
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


// getCreatorById
router.get('/:id', async (req, res, next) => {
    try {
        const id = processInput(req.params.id, "idNum", "creator id");
        let creator = await creatorsQueries.getCreatorById(id)
        res.json({
            status: "success",
            message: "Retrieved specific creator",
            payload: creator
        })
    } catch (err) {
        handleError(err, req, res, next);
    }
});

// getCreatorByLogin
router.post('/auth', async (req, res, next) => {
    try {
        const username = processInput(req.body.username, "hardVarchar25", "username");
        const password = processInput(req.body.password, "hardVarchar50", "password");
        let response = await creatorsQueries.getCreatorByLogin(username);
        if (response.password === password) {
            const { id, username, avatar_url } = response;
            res.json({
                status: "success",
                message: `creator ${username} has logged in`,
                payload: {
                    id, username, avatar_url
                }
            });
        } else {
            res.json({
                status: "fail",
                message: "unable to authorize user",
                payload: null
            });
        }
    } catch (err) {
        res.json({
            status: "fail",
            message: "unable to authorize user",
            payload: err.message
        });
    }
});

// POSSIBLY NOW UNUSED?
// router.post('/', async (req, res, next) => {
//     try {
//         const username = processInput(req.body.username, "hardVarchar25", "username");
//         const password = processInput(req.body.password, 'hardVarchar25', 'password')
//         let creator = await creatorsQueries.getActiveCreator(username, password)
//         res.json({
//             status: "success",
//             message: "Retrieved specific creator",
//             payload: creator
//         })
//     } catch (err) {
//         handleError(err, req, res, next);
//     }
// });



router.post("/add", upload.single('avatarFile'), async (req, res, next) => {
    try {
        const username = processInput(req.body.username, "hardVarchar25", "username");
        const firstname = processInput(req.body.firstname, "hardVarchar25", "firstname");
        const lastname = processInput(req.body.lastname, "hardVarchar25", "lastname");
        const password = processInput(req.body.password, "hardVarchar50", "password");
        const email = processInput(req.body.email, "hardVarchar50", "email");
        const about = processInput(req.body.about, "softText", "about");
        const phone_number = processInput(req.body.phone_number, "softVarchar25", "phone number");
        const website_url = processInput(req.body.website_url, "softText", "website url");
        const address = processInput(req.body.address, "softVarchar150", "address");
        const avatar_url = processInput(req, "creatorPhotoUrl", "avatar url");

        const response = await creatorsQueries.addCreator({
          username,
          firstname,
          lastname,
          password,
          email,
          about,
          phone_number,
          website_url,
          address,
          avatar_url
        });
        res.status(201);
        res.json({
            status: "success",
            message: `new creator '${username}' added`,
            payload: response
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: "fail",
            message: "unable to create user",
            payload: err.message
        });
    }
});


router.patch("/edit/:id", upload.single("creator"), async (req, res, next) => {
    try {
        const id =  processInput(req.params.id, "idNum", "id");
        const username = processInput(req.body.username, "hardVarchar25", "username");
        const firstname = processInput(req.body.firstname, "hardVarchar25", "firstname");
        const lastname = processInput(req.body.lastname, "hardVarchar25", "lastname");
        const password = processInput(req.body.password, "hardVarchar50", "password");
        const email = processInput(req.body.email, "hardVarchar50", "email");
        const about = processInput(req.body.about, "softText", "about");
        const phone_number = processInput(req.body.phone_number, "softVarchar25", "phone number");
        const website_url = processInput(req.body.website_url, "softText", "website url");
        const address = processInput(req.body.address, "softVarchar150", "address");
        const avatar_url = processInput(req, "creatorPhotoUrl", "avatar url");

        const response = await creatorsQueries.updateCreator({ username, firstname, lastname, password, about, avatar_url, phone_number, email, website_url, address, id });
        res.status(201);
        res.json({
            status: "success",
            message: `creator '${username}' edited`,
            payload: response
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


module.exports = router;
