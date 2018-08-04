var express = require('express'),
    mdb = require('../models'),
    router = express.Router();

router.get("/", function (req, res) {

})

//**Online code sample for login**/
// app.route('/login')
//     .get(sessionChecker, (req, res) => {
//         res.sendFile(__dirname + '/public/login.html');
//     })
//     .post((req, res) => {
//         var username = req.body.username,
//             password = req.body.password;

//         User.findOne({ where: { username: username } }).then(function (user) {
//             if (!user) {
//                 res.redirect('/login');
//             } else if (!user.validPassword(password)) {
//                 res.redirect('/login');
//             } else {
//                 req.session.user = user.dataValues;
//                 res.redirect('/dashboard');
//             }
//         });
//     });

// **code from Burger App - Sequelize**

// router.get("/", function (req, res) {
//     mdb.Users.findAll({
//             include: mdb.Eaters,
//             order: [
//                 ["email", "password"]
//             ]
//         })
//         .then(function (results) {
//             var handObj = {
//                 Users: results
//             };
//             res.render('index', handObj);
//         });
// });


router.put("/api/burgers/:id", function (req, res) {
    mdb.Burgers.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then((results) => {
        if (results.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


router.delete("/api/eaters/:id", function (req, res) {
    mdb.Eaters.destroy({
        where: {
            burgerId: req.params.id
        }
    }).then((results) => {
        if (results.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

router.post("/api/burgers", function (req, res) {
    mdb.Burgers.create({
        burger_name: req.body.burgerName,
    }).then((results) => {
        res.json({
            id: results.insertId
        });
    });
});

router.post("/api/eaters/:id", function (req, res) {
    mdb.Eaters.create({
        burgerId: req.params.id,
        eater_name: req.body.eater_name
    }).then((results) => {
        if (results.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

module.exports = router;