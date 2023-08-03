// Create web server

// Import modules
const express = require('express');
const { check, validationResult } = require('express-validator');
const { Comment } = require('../models');
const { asyncHandler, authenticateUser } = require('../middleware');

// Construct a router instance.
const router = express.Router();

// Route that returns a list of comments
router.get('/comments', asyncHandler(async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
}));

// Route that returns a comment by ID
router.get('/comments/:id', asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Comment not found." });
  }
}));

// Route that creates a new comment
router.post('/comments', authenticateUser, [
  check('message')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "message"'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);
    // Return the validation errors to the client.
    res.status(400).json({ errors: errorMessages });
  } else {
    // Get the user from the request body.
    const comment = await Comment.create(req.body);
    // Set the status to 201 Created and end the response.
    res.status(201).json(comment);
  }
}));

// Route that updates a comment
router.put('/comments/:id', authenticateUser, [
  check('message')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "message"'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);
    // Return the validation errors to the client.
    res.status(400).json({ errors: errorMessages });
  } else {
    //