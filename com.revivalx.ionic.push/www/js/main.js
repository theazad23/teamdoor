var app = {
    
    registerEvents: function() {
        var self = this;
        $(window).on('hashchange', $.proxy(this.route, this));
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
        // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
        // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    },

    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }
        switch(hash) {
            case '#home':
                self.slidePage(this.homePage);
                break;
            case '#login':
                //self.slidePage(new LoginView().render());
                window.location = "http://192.168.0.226:3000/"
                break;
            case '#functions':
                self.slidePage(new FunctionsView().render());
                break;
            case '#about':
                self.slidePage(new AboutView().render()); 
                break;
            default:
                break;
        }
    },    
    

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    slidePage: function(page) {
 
        var currentPageDest,
        self = this;
 
        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }
 
        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();
 
        if (page === app.homePage) {
        // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
        // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }
 
        $('body').append(page.el);
 
        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
        // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
        // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });
 
    },

    initialize: function() {
        var self = this;
        this.registerEvents();
        self.route();
    }

};

app.initialize();