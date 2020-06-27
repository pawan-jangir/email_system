/** Model file path for current plugin **/
var modelPath   =	__dirname+"/model/products";
var modulePath	=	"/products/";
/** Set current view folder **/
app.use(modulePath,(req, res, next) => {
    //req.rendering = {};
    req.rendering.views	=	__dirname + "/views";
    next();
});

/** Routing is used to get courses list **/
app.all(modulePath,(req, res, next) => {
    var product = require(modelPath);
    product.getProductList(req, res, next);
});
/** Routing is used to get courses list **/
app.all(modulePath+'purchase_course/:slug',(req, res, next) => {
    var product = require(modelPath);
    product.purchaseCourse(req, res, next);
});