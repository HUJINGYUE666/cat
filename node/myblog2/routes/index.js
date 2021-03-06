var express = require('express');
var router = express.Router();
var User=require("../controllers/user.js");
var Blog=require("../controllers/blog.js");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/',User.exit); //首页

router.get('/reg',User.reg); //注册
router.post('/reg',User.do_reg);
router.post('/checkname',User.checkname);

router.get('/login',User.login); //登录
router.post('/login',User.do_login);

router.get('/index_logined',Blog.index_logined); //博客
router.get('/newblog',Blog.newblog); //发表博客
router.post('/newblog',Blog.do_newblog);  
router.get("/updateBlog",Blog.updateBlog); //修改博客
router.post("/updateBlog",Blog.do_updateBlog); 
router.get("/deleteBlog",Blog.deleteBlog); //删除博客
router.get("/viewPost_logined",Blog.viewPost_logined); //阅读全文

router.get('/blogCatalogs',Blog.blogCatalogs); //博客分类 
router.post('/blogCatalogs',Blog.addBlogCatalog); //添加博客分类

router.get('/blogs',Blog.blogs); //文章管理

router.get('/inbox',Blog.inbox);  
router.get('/profile',Blog.profile); //编辑个人资料
router.post("/profile",Blog.do_profile);   

router.get('/chpwd',Blog.chpwd); //修改登录密码
// router.post('/chpwd',Blog.do_chpwd); 

router.get('/userSettings',Blog.userSettings); //网页个性设置 
router.post('/userSettings',Blog.do_userSettings);

router.get('/blogComments',Blog.blogComments);  

module.exports = router;
