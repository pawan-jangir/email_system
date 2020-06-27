
/**
 * Function to send Email
 *
 * @param to		As Recipient Email Address
 * @param repArray  As Response Array
 * @param action  	As Email Action
 *
 * @return array
 */
sendMail = (req,res,options)=>{
	const ejs = require("ejs");

	try{
		let to				=	(options && options.to)			?	options.to			:"";
		let repArray		=	(options && options.rep_array)	?	options.rep_array	:"";
		let action			=	(options && options.action)		?	options.action		:"";
		let subject			=	(options && options.subject)	?	options.subject		:"";
		let emailLayout		=	(options && options.layout)		?	options.layout		:"email_invoice.html";

		let emailUserName	=	'acoountdeveloper@gmail.com';
		const nodemailer	=	require("nodemailer");

		const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'acoountdeveloper@gmail.com',
              pass: 'System@123'
            }
        });

		const email_templates	=	db.collection('email_templates');
		const email_actions		= 	db.collection('email_actions');

		/** Get Email template*/
		email_templates.findOne({
			action : action
		},{projection:{_id:1,name:1,subject:1,body:1}},(err, result)=>{
			if(!err && result){
				let emailTemplateResult	= result;
				email_actions.findOne({
					action : action
				},
				{projection:{_id:1,options:1}},(emailErr, emailResult)=>{
					
					if(!emailErr && emailResult){
						
						let actionData 		= emailResult;
						let actionOptions 	= actionData.options.toString().split(",");

						let body			= emailTemplateResult.body;
						subject				= (subject) ? subject : emailTemplateResult.subject;
						actionOptions.forEach((value,key)=>{
							body = body.replace(RegExp('{'+value+'}','g'),repArray[key]);
						});
                       
						/** get email layout*/
						ejs.renderFile(WEBSITE_LAYOUT_PATH +emailLayout,{settings:{}},'',(err, html)=>{
                            html 		= html.replace(RegExp('{{MESSAGE_BODY}}','g'),body);
                            
							let mailOptions = {
								from	: 	emailUserName,
								to		: 	to,
								subject	: 	subject,
								html	: 	html
							};
							let randomNo = Math. floor(Math. random() * 90000) + 10000;
							var pdf = require('html-pdf');
							let fileName = 'invoice_file_'+randomNo+'.pdf'
							let filepath = './public/uploads/'+fileName;
							pdf.create(html).toFile(filepath,function(err, res){
								if(res.filename){
									/** Send  attachment **/
									let attachments = res.filename;
									if(attachments){
										mailOptions["attachments"]	=	{
											path :	attachments,
											filename : fileName
										};
										/**Send email*/
										transporter.sendMail(mailOptions,(error, info)=>{
											if(error){
												console.error('error');
												return console.error(error);
											}
										});
									}

								}
							});
						});
					}else{
						return console.error('Error in email action');
					}
				})
			}else{
				return console.error('Error in email template');
			}
		})
	}catch(e){
		console.error("email error in sendMail function")
		console.error(e)
	}
}//end sendMail();