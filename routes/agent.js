var mongoose = require('mongoose');
var travelData = require('./travel.js');
var nodemailer = require('nodemailer');
exports.getNotifications=function(req,res){
    var st = "pendingQuote";
    var sta = "pendingApproval"
    travelData.tData.find({ $or:[{"status":st},{"status":sta}]}).exec(function (err, data) {
        if (err) {
            console.log('Error : ',err)
        }
        res.json(data);
    });
}

exports.getRequest=function(req,res){
    if (req.body.userRole === "Agent") {
        var id=req.body.travelid;
        travelData.tData.find({"travelid":id}).exec(function (err, data) {
        if (err) {
            console.log('Error : ',err)
        }
        res.json(data[0]);
    });
    }
}

exports.submitQuote=function(req,res){
        console.dir(req.body.travelid);
        travelData.tData.findOne({ travelid: req.body.travelid },function(err, data) {
            if (err) {
                console.log('Error : ' + err)
            }
            console.dir(data);
            var t = data;
            t.agentComments = req.body.agentComments;
            t.agentQuote = req.body.agentQuote;
            t.status='pendingApproval';
            console.dir(t);    
            t.save(function(err,datar) {
              if (err)
                console.log('error');
              else
                res.json(datar);
            });
           
         
        });
}

exports.uploadRequest=function(req,res){
    console.log("dipesh="+ req.body.travelid)
   travelData.tData.findOne({ travelid: req.body.travelid },function(err, data) {
    var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'dipgupta1986@gmail.com',
                pass: 'password'
            }
        });

       var mailOptions = {
            from: 'Dipesh Gupta✔ <dipgupta1986@gmail.com>', // sender address
            to: data.managerEmail, // list of receivers
            subject: "Travel Request Quotation for request Id:"+data.travelid, // Subject line
            //text: 'Hello world ✔', // plaintext body
            html: createHtmlBody(data) // html body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });

    });   
   function createHtmlBody(trequest){
        var mailHtml="";
             mailHtml='<html><head><title>Travel Request</title></head><body><table>'+
            '<thead>'+
            '<tr>'+
             '   <td>Mode of transport:</td>'+
                '<td>'+trequest.transportMode+'</td>'+
            '</tr>'+
            '<tr>'+
             '   <td>Travel date from:</td>'+
              '  <td>'+trequest.travelDateFrom+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Travel date to:</td>'+
                '<td>'+trequest.travelDateTo+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Currency Type:</td>'+
                '<td>'+trequest.currencyType+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Currency Amount:</td>'+
                '<td>'+trequest.currencyAmount+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Phone Details:</td>'+
                '<td>'+trequest.phoneDetail+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Per Dime Details:</td>'+
                '<td>'+trequest.perDime+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Laundry Allowance Needed:</td>'+
                '<td>'+trequest.laundryAllowance+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Food Allowance Needed:</td>'+
                '<td>'+trequest.foodAllowance+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Meal Pref:</td>'+
                '<td>'+trequest.mealType+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Remarks:</td>'+
                '<td>'+trequest.remarks+'</td>'+
            '</tr>'+

            '<tr>'+
                '<td>Manager Email Id:</td>'+
                '<td>'+trequest.managerEmail+'</td>'+
            '</tr>'+

            '<tr>'+
                '<td>trequester Role:</td>'+
                '<td>'+trequest.userRole+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Current Status:</td>'+
                '<td>'+trequest.status+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Travel Quote:</td>'+
                '<td>'+trequest.agentQuote+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Comment:</td>'+
                '<td>'+trequest.agentComments+'</td>'+
            '</tr>'+
            
        '</thead>'+
    '</table>'+
    '<body>'+
    '<html>';
    return mailHtml;
   }
}