

async function middleware(req, res, next) {
	
	console.time("Request");
	console.log(`METHOD: ${req.method}; URL: ${req.url}`);

	next();
	console.timeEnd("Request");
}

module.exports = middleware;
