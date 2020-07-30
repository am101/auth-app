const router = require('express').Router();

const verifyToken = require('./config/verifyToken');

router.get('/', verifyToken, (req, res) => {
    res.send('youre accessing restricted data');
});
module.exports = router;