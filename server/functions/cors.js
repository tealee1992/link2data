var util = require('util')
//使用白名单解决跨域问题
const ALLOW_ORIGN = [
	'http://localhost:8000'
]
function isOriginAllowed (origin, allowedOrigin = ALLOW_ORIGN) {
		if(util.isArray(allowedOrigin)) {
			for(let i=0; i< allowedOrigin.length; i++) {
				if(isOriginAllowed(origin, allowedOrigin[i])) {
					return true;
				}
			}
			return true;
		}else if (util.isString(allowedOrigin)) {
			return origin === allowedOrigin;
		}else if (allowedOrigin instanceof RegExp) {
			return allowedOrigin.test(origin);
		}else {
			return !!allowedOrigin;
		}
}

exports.isOriginAllowed = isOriginAllowed;
