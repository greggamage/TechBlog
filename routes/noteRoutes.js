const router = require('express').Router()
const { Post, User, Note } = require('../models')
const passport = require('passport')

// GET all comments
router.get('/notes', passport.authenticate('jwt'), async function (req, res) {
  const notes = await Note.findAll({ include: [User, Post] })
  res.json(notes)
})

// POST one comment
router.post('/notes', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.create({
    body: req.body.body,
    pid: req.body.pid,
    uid: req.user.id
  })
  res.json(note)
})

// DELETE one comment
router.delete('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  await Note.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

router.get('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.findAll({ where: { pid: req.params.id }, include: [User] })
  res.json(note)
})

module.exports = router