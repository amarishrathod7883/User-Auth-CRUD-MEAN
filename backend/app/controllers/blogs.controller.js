const express = require('express');
var router = express.Router();

const Blogs = require('../models/blogs.model');
const Category = require('../Category.json');

router.get('/getAllCategory', function(req, res)
{
  res.status(200).send({ data: Category})
});

router.post('/getAllBlogs', function(req, res)
{
  var searchCondition = {};
  const resultperpage = parseInt(req.body.pageSize)
  const pageNumber = req.body.pages > 0 ? ((req.body.pages-1) * resultperpage) : 0;
  const sortBy = req.body.sortBy;
  
  if(!!req.body.title)
  {
    var regexTitle = new RegExp(req.body.title, "i");
    searchCondition.title = regexTitle;
  }

  if(req.body.author != undefined)
  {
    searchCondition.author = req.body.author;
  }


  Blogs
  .countDocuments(searchCondition)
  .then(fetchedBlogsCount => 
  {
    Blogs
    .find(searchCondition)
    .skip(pageNumber)
    .limit(resultperpage)
    .populate('author')
    .sort([[sortBy.field, sortBy.order]])
    .lean()
    .then(fetchedBlogs => 
    {
      res.status(200).send({ data: fetchedBlogs, fetchedBlogsCount: fetchedBlogsCount})
    })
    .catch(error =>
    {
      res.status(500).send({ message: error})
      return;
    })
  })
  .catch(error =>
  {
    res.status(500).send({ message: error})
    return;
  })
})

router.get('/getSingleBlog/:_id', function (req, res) 
{
  Blogs
  .findById(req.params._id)
  .then(fetchedBlog => 
  {
    res.status(200).send({ data: fetchedBlog, message: "Blog fetched successfully!" });
  })
  .catch(error => 
  {
    res.status(500).send({ message: error });
    return;
  });
});

router.put('/createUpdateBlog/:_id', function (req, res) 
{
  var category = typeof(req.body.category) == 'object' ? JSON.stringify(req.body.category) : req.body.category;
  if(req.params._id == 'new')
  {
    var blogDataObj = {
      title: req.body.title,
      description: req.body.description,
      modify_date: req.body.modify_date,
      status: req.body.status,
      category: category,
      author: req.body.author,
    };
  
    new Blogs(blogDataObj)
    .save()
    .then(savedBlog => 
    {
      res.send({ data: savedBlog, message: "Blog was updated successfully!" });
    })
    .catch(error => {
      res.status(500).send({ message: error });
      return;
    });
  }
  else
  {
    var blogDataObj1 = {
      title: req.body.title,
      description: req.body.description,
      modify_date: req.body.modify_date,
      status: req.body.status,
      category: category,
      author: req.body.author,
    };
  
    Blogs
    .findOneAndUpdate({'_id': req.params._id}, blogDataObj1)
    .then(updatedBlog => 
    {
      res.send({ data: updatedBlog, message: "Blog was updated successfully!" });
    })
    .catch(error => {
      res.status(500).send({ message: error });
      return;
    });
  }
});

router.get('/removeBlog/:_id', function (req, res) 
{
  Blogs
  .findOneAndRemove({'_id': req.params._id})
  .then(fetchedBlog => {
    res.status(200).send({ data: fetchedBlog, message: "Blog deleted successfully!" });
  })
  .catch(error => {
    res.status(500).send({ message: error });
    return;
  });
});


module.exports = router;