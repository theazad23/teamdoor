var LocationView = function () {
	
	this.initialize = function() {
		// Define a div wwrapper for the view.  This div wrapper is used to attach events.
		this.el = $('<div/>');
	};

	this.render = function() {
        //$('body').html(this.homeTpl());
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
        this.el.html(LocationView.template());
    	return this;
    };

    this.initialize(); 
}

LocationView.template = Handlebars.compile($("#abt-tpl").html());