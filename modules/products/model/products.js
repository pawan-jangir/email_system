const async		= 	require("async");
function Product() {
	/**
	 * This function is used for course listing page
	 * 
	 */
	this.getProductList = (req, res, next)=>{
		const collection	= 	db.collection('products');
		let commonConditions = {
			is_deleted 	: NOT_DELETED,
			status 		: ACTIVE,
		}
		collection.find(commonConditions).toArray((err,result)=>{
			res.render("list",{
				result	:	result,
			});
		});
	};//End getProductList()

	/**
	 * This function is used for purchase course
	 * 
	 */
	this.purchaseCourse = (req, res, next)=>{
		const collection	= 	db.collection('products');
		let courseSlug = req.params.slug ? req.params.slug : "";
		if(courseSlug != ""){
			let commonFindConditions = {
				is_deleted 	: NOT_DELETED,
				status 		: ACTIVE,
				slug 		: courseSlug,
			}
			collection.findOne(commonFindConditions,function(err,record){
				if(!err && record){
					
					let email 		= record.buyer_email;
					let FullName 	= record.buyer_name;
					let image = '<img src="https://scontent.fjai1-2.fna.fbcdn.net/v/t1.0-9/s960x960/69998766_1103085719888281_6317010011734147072_o.jpg?_nc_cat=103&_nc_sid=110474&_nc_oc=AQnWdeGzHR24htkPB-j75iCk9WJOhk6dCOUYX9-vPKN9TxqQ1cSobhnUrTqh8gNAqS3mTmn-eSdppYWGW3gkwyJj&_nc_ht=scontent.fjai1-2.fna&_nc_tp=7&oh=9764ddd09f77c949cec4cb44a4f0cf46&oe=5F1AC875" style="height:100px;width100px" height="100px" width="100px">';
					let receiptNo = Math. floor(Math. random() * 90000) + 10000;;
					let receiptDate = new Date().toLocaleDateString();
					let allocateNumber = Math. floor(Math. random() * 90000) + 10000;
					let account = Math. floor(Math. random() * 90000) + 10000;
					let currency = "INR";
					let amount =record.price;
					var converter = require('number-to-words');
					let amountInWords = converter.toWords(amount);
					let itemDetail = "";
					itemDetail += '<table style="width:100%;border-spacing:0;padding:0 10px;">\
										<tbody>\
											<tr  style="text-align:left">\
												<td style="width:100px;text-align:center;padding:15px 5px;font-size:14px;font-weight:600;border-bottom:1px solid #eaeaea;">Sr No</td>\
												<td style="width:100px;text-align:center;padding:15px 5px;font-size:14px;font-weight:600;border-bottom:1px solid #eaeaea;">Product Name</td>\
												<td style="width:100px;text-align:center;padding:15px 5px;font-size:14px;font-weight:600;border-bottom:1px solid #eaeaea;">Buyer Name</td>\
												<td style="width:100px;text-align:center;padding:15px 5px;font-size:14px;font-weight:600;border-bottom:1px solid #eaeaea;">Total Amount</td>\
											</tr>';
					
					itemDetail += '<tr style="text-align:left">\
						<td style="width:100px;text-align:center;padding:15px 5px;border-bottom:1px solid #eaeaea;color:#8c8c8c;">1</td>\
						<td style="width:100px;text-align:center;padding:15px 5px;border-bottom:1px solid #eaeaea;color:#8c8c8c;">'+ record.title + '</td>\
						<td style="width:100px;text-align:center;padding:15px 5px;border-bottom:1px solid #eaeaea;color:#8c8c8c;">'+ record.buyer_name + '</td>\
						<td style="width:100px;text-align:center;padding:15px 5px;border-bottom:1px solid #eaeaea;color:#8c8c8c;color:#8c8c8c;">'+ record.price +  '</td>\
					</tr></tbody></table>';
					/** Set options for send email **/
					let emailOptions = {
						to 			:	email,
						action 		:	"purchase_course",
						rep_array 	:	[receiptNo,image,receiptDate,allocateNumber,account,currency,amount,amountInWords,itemDetail]
					};
					/** Send Mail*/
					sendMail(req,res,emailOptions);
					req.flash("success",'You have purchased this course and email has been sent to your email.');
					res.redirect(WEBSITE_URL+'products');
				}else{
					res.redirect(WEBSITE_URL+'products');
				}
			})
		}else{
			res.redirect(WEBSITE_URL+'products');
		}
		
	};//End purchaseCourse()

}

module.exports = new Product();
