var HomeView = function(store) {

	this.initialize = function() {
		// Define a div wwrapper for the view.  This div wrapper is used to attach events.
		this.el = $('<div/>');
		this.el.on('keyup', '.search-key', this.findByName);
	};

	this.render = function() {
        //$('body').html(this.homeTpl());
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
        this.el.html(HomeView.template());
    	return this;
    };

    this.findByName = function() {
        /*var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        }); */
		store.findByName($('.search-key').val(), function(employees) {
        $('.employee-list').html(HomeView.liTemplate(employees));
    	});
    };

	this.initialize(); 
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());