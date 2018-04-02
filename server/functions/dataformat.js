/*this module includes data formats used in the app*/
var dataFormat = {
	respFormat : function(msg, result) {
		return {
			"msg": msg,
			"result": result,
		}
	}
}


module.exports = dataFormat;