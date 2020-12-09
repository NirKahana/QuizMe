const { Router } = require('express');

const router = Router();

router.use('/quizzes', require('./quiz'));
// router.use('/labels', require('./label'));
router.use('/users', require('./user'));
// router.use('/submissions', require('./submission'));
// router.use('/questions', require('./question'));
// router.use('/fields', require('./field'));

module.exports = router;