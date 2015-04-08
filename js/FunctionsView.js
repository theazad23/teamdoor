var FunctionsView = function () {
	
	this.initialize = function() {
		// Define a div wwrapper for the view.  This div wrapper is used to attach events.
		this.el = $('<div/>');
	};

	this.render = function() {
        //$('body').html(this.homeTpl());
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
        this.el.html(FunctionsView.template());
    	return this;
    };

    this.initialize(); 
}

FunctionsView.template = Handlebars.compile($("#func-tpl").html());