var Blog_model=require("../models/blog_model.js");
var moment=require("moment");

exports.index_logined=function(req,res,next){
    // Blog_model.sel_all(function(err,data){
	// 	console.log(data);
	// 	res.render("index_logined",{
	// 		'blogs':data,
	// 		'sess':req.session,
	// 	})
	// });
	var uid=req.session.USER_ID;
	Blog_model.sel_uid_by_data(uid,function(err,data){
		// console.log(data);
		res.render("index_logined",{
			'blogs':data,
			'sess':req.session,
		})
	});
}

exports.newblog=function(req,res,next){
	var uid=req.session.USER_ID;
	Blog_model.sel_catalogs_by_id(uid,function(err,data){
		// console.log(data);
		res.render("newBlog",{
			'catalogs':data,
			'sess':req.session,
		})
	});
}

exports.do_newblog=function(req,res,next){
	var title=req.body.title;
	var content=req.body.content;
	var date=moment().format();
	var cid=req.body.catalog;
	var uid=req.session.USER_ID;
	// console.log(cid);
	Blog_model.ins_blog_by_data(title,content,date,cid,uid,function(err,data){
		if(data.affectedRows>0){
			Blog_model.upd_catalog_by_count(cid,function(err,data){
				res.redirect("/index_logined");
			})	
        }
    })
}

exports.updateBlog=function(req,res,next){
	var bid=req.query.bid;
	Blog_model.updateBlog(bid,function(err,data){
		if(data.length>0){
			res.render("updateBlog",{
				"sess":req.session,
				"blog":data[0],
			});
		}
	})
}

exports.do_updateBlog=function(req,res,next){
	var title=req.body.title;
	var content=req.body.content;
	var hid=req.body.hid;
	Blog_model.upd_updateBlog_by_title(title,content,hid,function(err,data){
		if(data.affectedRows>0){
			//console.log(data);
			res.redirect("/index_logined");
		}
	})
}

exports.deleteBlog=function(req,res,next){
	var bid=req.query.bid;
	Blog_model.deleteBlog(bid,function(err,data){
		if(data.affectedRows>0){
			res.redirect("/index_logined");
		}
	})
}

exports.viewPost_logined=function(req,res,next){
	var bid=req.query.bid;
	Blog_model.update_hits_by_bid(bid,function(err,data){
		if(data.affectedRows>0){
			Blog_model.updateBlog(bid,function(err,data){
				if(data.length>0){
					var blog_data_one=data[0];
					//console.log(blog_data_one);
					Blog_model.get_up_by_one(bid,function(err,data){
						if(data.length>0){
							var up_data=data[0];
						}else{
							var up_data="";
						}
						//console.log(up_data);
						Blog_model.get_down_by_one(bid,function(err,data){
							if(data.length>0){
								var down_data=data[0];
							}else{
								var down_data="";
							}
							//console.log(down_data);
							res.render("viewPost_logined",{
								'sess':req.session,
								'maindata':blog_data_one,
								'predata':up_data,
								'nextdata':down_data,
							});
						});
					});
				}
			})
		}
	});	
}

exports.inbox=function(req,res,next){
	res.render("inbox.ejs");
}

exports.profile=function(req,res,next){
	var uid=req.session.USER_ID;
	Blog_model.sel_uid_by_data(uid,function(err,data){
		// console.log(data);
		res.render("profile.ejs",{
			'information':data,
			'sess':req.session,
		})
	});
}
exports.do_profile=function(req,res,next){
	var name=req.body.name;
	var signature=req.body.signature;
	var uid=req.session.USER_ID;
	Blog_model.upd_updateUser_by_name(name,signature,uid,function(err,data){ 
		// console.log(data);
		if(data.changedRows>0){
			res.redirect("/index_logined"); 
		}
	})
}

exports.chpwd=function(req,res,next){
	res.render("chpwd.ejs");
}

exports.userSettings=function(req,res,next){
	var uid=req.session.USER_ID;
	Blog_model.sel_uid_by_data(uid,function(err,data){
		// console.log(data);
		res.render("userSettings.ejs",{
			'userSettings':data,
			'sess':req.session,
		})
	});
}
exports.do_userSettings=function(req,res,next){
	var mood=req.body.mood;
	var uid=req.session.USER_ID;
	Blog_model.upd_updateUser_by_mood(mood,uid,function(err,data){ 
		// console.log(data);
		if(data.changedRows>0){
			res.redirect("/index_logined"); 
		}
	})
}

exports.blogCatalogs=function(req,res,next){
	var uid=req.session.USER_ID;
	Blog_model.sel_catalogs_by_id(uid,function(err,data){
		// console.log(data);
		res.render("blogCatalogs",{
			'blogCatalogs':data,
			'sess':req.session,
		})
	});
}

exports.addBlogCatalog=function(req,res,next){
	var name=req.body.name;
	var uid=req.session.USER_ID;
	// console.log(cid);
	Blog_model.addBlogCatalog(name,uid,function(err,data){
		if(data.affectedRows>0){
			res.redirect("/blogCatalogs");
        }
    })
}

exports.blogs=function(req,res,next){
	var uid=req.session.USER_ID;
	Blog_model.sel_uid_by_data(uid,function(err,data){
		// console.log(data);
		res.render("blogs.ejs",{
			'blogs':data,
			'sess':req.session,
		})
	});
}

exports.blogComments=function(req,res,next){
	res.render("blogComments.ejs");
} 

exports.do_chpwd=function(req,res,next){
	var pwd=req.body.pwd;
	// res.redirect("/index_logined");
	User_model.sel_pwd_by_pwd(pwd,function(err,data){
		if(data.length>0){
			//设置cookie session
			req.session=data[0];
			res.redirect("/index_logined");
		}else{
			res.redirect("/chpwd");
		}
	})
}