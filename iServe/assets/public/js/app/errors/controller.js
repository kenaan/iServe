(function() {
	var HTTP_STATUS_CODES = {
		'forbidden': 403,
		'notFound': 404,
		'internalServerError': 500
	};

	var errors = function(err, options) {
		options = options || {};

		err.statusCode = err.statusCode || options.statusCode || 500;
		err.statusMessage = err.statusMessage || options.statusMessage || HTTP_STATUS_CODES[err.statusCode];

		var fn = errors[err.statusMessage] || errors.all;

		fn(err);
	};

	errors.notFound = function(err) {

	};
	errors.forbidden = function(err) {

	};
	errors.all = function(err) {
		var view = new app.views.ErrorView({ error: err });
		
		app.content.render(view.render());
		app.header.clear();
	};

	errors.resource = function(model, response) {
		var message = (response.responseJSON && response.responseJSON.message) || response.responseText;
		var err = new Error(message + ' (' + response.status + ' ' + response.statusText + ')');

		errors(err, { statusCode: response.status });
	};

	app.controllers.errors = errors;
}());
