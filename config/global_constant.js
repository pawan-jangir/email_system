


/** Website Title */
WEBSITE_TITLE			= 	process.env.WEBSITE_TITLE;

/** Website/Socket Url for local*/
WEBSITE_URL			=	process.env.URL+":"+process.env.PORT+"/";
/** Front end folder name */
FRONT_END_FOLDER_NAME   = "frontend";
WEBSITE_LAYOUT_PATH				= 	WEBSITE_ROOT_PATH + "modules/"+FRONT_END_FOLDER_NAME+"/layouts/";
WEBSITE_MODULES_PATH		= 	WEBSITE_ROOT_PATH + "modules/";

NOT_DELETED = 0;
ACTIVE = 1;
DEACTIVE = 0;

/** Website upload directory root path */
WEBSITE_UPLOADS_ROOT_PATH		= 	WEBSITE_ROOT_PATH + "public/"+"/uploads/";