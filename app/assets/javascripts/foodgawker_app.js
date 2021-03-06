window.FoodgawkerApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Data: {},
  initialize: function() {
    FoodgawkerApp.Data.categories =     
      JSON.parse($("#bootstrapped-categories").html());
    
    var currUser = JSON.parse($("#bootstrapped-current-user").html().trim());
    FoodgawkerApp.Data.currentUser = new FoodgawkerApp.Models.User();
    
    var navView = new FoodgawkerApp.Views.NavBar();
    $("#nav-section").html(navView.render().$el);
    if(typeof currUser === "object") {
      FoodgawkerApp.Data.currentUser.set(currUser);
      FoodgawkerApp.Data.session = new FoodgawkerApp.Models.Session({ id: 1 });
      
      this.flash(
        ["Welcome " + FoodgawkerApp.Data.currentUser.get("username")], 
        "success"
      )
    }
    this.addSignInModal();
    this.addSignUpModal();
    
    FoodgawkerApp.Data.recipes = new FoodgawkerApp.Collections.Recipes();
    FoodgawkerApp.Data.recipes.fetch({
      data: { page: 1 },
      success: function () {
        new FoodgawkerApp.Routers.RecipeRouter({ 
          recipes: FoodgawkerApp.Data.recipes,
          $rootEl: $(".container")
        });
        Backbone.history.start();
      }
    })
  },
  
  addSignInModal: function () {
   FoodgawkerApp.Data.session = new FoodgawkerApp.Models.Session();
    var view = new FoodgawkerApp.Views.SignIn({
      model: FoodgawkerApp.Data.session
    });

    $("#modal-sign-in-section").html(view.render().$el);
  },
  
  addSignUpModal: function () {
    var newUser = new FoodgawkerApp.Models.User();
    var view = new FoodgawkerApp.Views.SignUp({
      model: newUser
    });
    $("#modal-sign-up-section").html(view.render().$el);
  },
  
  emptyFlash: function () {
    $("#alerts-section").empty();
    $("#alerts-section").removeAttr("style")
  },
  
  flash: function (messages, type) {
    this.emptyFlash();
    var alertClasses = "alert alert-" + type;
    
    messages.forEach(function (message) {
      var $newAlert = $("<div>").addClass(alertClasses);
      $newAlert.text(message);
      
      $("#alerts-section").append($newAlert)
    })
    
    $("#alerts-section").fadeOut(5500, this.emptyFlash.bind(this));
  }

};

$(document).ready(function(){
  FoodgawkerApp.initialize();
});
