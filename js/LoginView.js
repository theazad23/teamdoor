var LoginView = function () {
	
	this.initialize = function() {
		// Define a div wwrapper for the view.  This div wrapper is used to attach events.
		this.el = $('<div/>');
	};

	this.render = function() {
        //$('body').html(this.homeTpl());
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
        this.el.html(LoginView.template());
    	return this;
    };

    this.initialize(); 
}

LoginView.template = Handlebars.compile($("#login-tpl").html());