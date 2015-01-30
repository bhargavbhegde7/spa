var mongoose = require('mongoose');
var travelSchema = new mongoose.Schema({
    travelid: String,
    transportMode: String,
    travelDateFrom: String,
    travelDateTo: String,
    currencyAmount: Number,
    currencyType: String,
    phoneDetail: String,
    perDime: String,
    laundryAllowance: Boolean,
    foodAllowance: Boolean,
    mealType: String,
    managerEmail: String,
    userid: String,
    remarks: String,
    timestamp: String,
    userRole: String,
    status: String,
    agentComments:String,
    agentQuote:String
});

var travelData = mongoose.model('travelData', travelSchema, 'travelData');

exports.tData=travelData;

exports.newTravelRequest = function(req, res) {
    if (req.body.userRole === "Employee" || req.body.userRole === "Manager") {
        var data = new travelData({
            travelid: new Date().getTime(),
            transportMode: req.body.transportMode,
            travelDateFrom: req.body.travelDateFrom,
            travelDateTo: req.body.travelDateTo,
            currencyAmount: req.body.currencyAmount,
            currencyType: req.body.currencyType.value,
            phoneDetail: req.body.phoneDetail,
            perDime: req.body.perDime,
            laundryAllowance: req.body.laundryAllowance,
            foodAllowance: req.body.foodAllowance,
            mealType: req.body.mealType,
            managerEmail: req.body.managerEmail,
            userid: req.body.userid,
            remarks: req.body.remarks,
            timestamp: new Date(),
            userRole: req.body.userRole,
            status: 'pendingQuote'
        });

        data.save(function(err, data) {
            if (err) {
                console.log('Error : ' + err)
            }
            res.json(data);

            console.dir(data);
        });
    }
}

exports.getNotifications = function(req, res) {
	travelData.find().exec(function (err, data) {
		if (err) {
			console.log('Error : ',err)
		}
		res.json(data);
	});
}
exports.getRequest=function(req,res){
	if (req.body.userRole === "Employee" || req.body.userRole === "Manager") {
		var id=req.body.travelid;
		travelData.find({"travelid":id}).exec(function (err, data) {
		if (err) {
			console.log('Error : ',err)
		}
		res.json(data);
	});
	}
}
