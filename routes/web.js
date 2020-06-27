
/** Including contants file */
require("./../config/global_constant");

/** Including common function */
require(WEBSITE_ROOT_PATH + "utility");

module.exports = {
	configure: function(router,mongo) {
		
		mongodb		= mongo;
		db			= mongodb.getDb();
		ObjectId	= require("mongodb").ObjectID;
		app 		= router;
		/** Before Filter **/
		app.use(function(req, res, next) {
			/** Rendering options to set views and layouts */
			req.rendering = {};
			/** Set default views folder path **/
			app.set("views", __dirname + "/views");


			/** Configure success flash message **/
			res.locals.success_flash_message	= "";
			res.locals.success_status			= "";

			/** Configure error flash message **/
			res.locals.error_flash_message	= "";
			res.locals.error_status			= "";

			if(typeof req.session.flash !== "undefined") {
				if(typeof req.session.flash.success !== "undefined") {
					res.locals.success_status			=	'success';
					res.locals.success_flash_message 	=	req.session.flash.success;
				}
				if(typeof req.session.flash.error !== "undefined") {
					res.locals.error_status			=	'error';
					res.locals.error_flash_message 	=	req.session.flash.error;
				}
			}

			next();
		});
		app.get('/',function(req,res){
			res.render("index",{
				site_title	:	WEBSITE_TITLE,
			});
		});

		/** Include Products Module **/
		require(WEBSITE_MODULES_PATH+"products/routes");
		
	}
};
