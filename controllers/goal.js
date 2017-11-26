const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

const reasons = ["Love", "Pioneer", "Money", "Truth", "Curiosity", "Pleasure", "Compassion", "Develop", "Support", "Magical", "Tradition", "Courage", "Sacred", "Gratitude", "Passion", "Health", "Education", "Religion", "Personal", "Connection", "Freedom", "Strength", "Stamina"];

/**
 * GET goals/ideas
 * Ideas page.
 */
exports.getIdeas = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('goals/ideas', {
    title: 'Ideas'
  });
};

/**
 * GET goals/ideas-mapper
 * Ideas mapperpage.
 */
exports.getIdeasMapper = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('goals/idea-mapper', {
    title: 'Idea mapper'
  });
};

/**
 * GET /goals/new
 * New goal page
 */
exports.newGoal = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('goals/new', {
    title: 'New goal'
  });
};

/**
 * GET /goals/why
 * List reasons why this is your goal
 */
exports.why = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('goals/why', {
    title: 'Why do you want to achieve this goal?',
    reasons: reasons
  });
};

/**
 * GET /goals/when
 * List reasons why this is your goal
 */
exports.when = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('goals/when', {
    title: 'When do you want to achieve this goal?',
    reasons: reasons
  });
};

/**
 * GET /goals/complete
 * Completed
 */
exports.complete = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('goals/complete', {
    title: 'Congratulations',
    goal: req.query.goal
  });
};

/**
 * GET /goals/check-in
 * Completed
 */
exports.checkIn = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('check-in/view', {
    title: 'Daily check in'
  });
};

/**
 * GET /goal/view/:id
 * view goal
 */
exports.view = (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  User.findById(req.user.id, (err, user) => {

    res.render('goals/view', {
      title: user.goals[req.params.id].name,
      index: req.params.id,
      goal: user.goals[req.params.id]
    });

  });

};

/**
 * POST /goals/add
 * Goal adding.
 */
exports.addGoal = (req, res, next) => {
  console.log(req.body.goal)
  if (req.body.goal != '') {
    User.findById(req.user.id, (err, user) => {
      console.log(user.goals)
      var tempGoals = {};
      tempGoals.name = req.body.goal;
      user.goals.push(tempGoals);
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // req.flash('success', { msg: 'Added '+ req.body.goal + ' goal.' });
        res.redirect('/goals/why?goal='+(user.goals.length-1));
      });
      console.log(user.goals);
    });
  }
};

/**
 * POST /goals/edit
 * Goal adding.
 */
exports.editGoal = (req, res, next) => {
  if(req.body.goal === undefined) {
    req.flash('errors', 'Goal id missing');
    return res.redirect('/');
  }
  if (req.body.reasons != undefined) {
    User.findById(req.user.id, (err, user) => {
      console.log(req.body.goal)
      console.log(user.goals)
      console.log(user.goals[req.body.goal])
      user.goals[req.body.goal].why = req.body.reasons;
      user.save((err) => {
        if (err) {
          return next(err);
        }
      });
    });
  }

  if (req.body.endDate != undefined) {
    User.findById(req.user.id, (err, user) => {
      console.log(user.goals[req.body.goal])
      user.goals[req.body.goal].endDate = req.body.endDate;
      user.save((err) => {
        if (err) {
          return next(err);
        }
      });
    });
  }

  if (req.body.redirect != null) {
    res.redirect(req.body.redirect);
  } else {
    res.redirect('/');
  }

};
