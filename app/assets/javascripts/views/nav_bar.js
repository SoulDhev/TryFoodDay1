FoodgawkerApp.Views.NavBar = Backbone.View.extend({
  template: JST["nav_bar"],
  
  events: {
    "click button#sign-in-btn": "signIn",
    "click button#sign-out-btn": "signOut", 
    "mouseover #search-nav": "showSearchForm",
    "click button#guest-btn": "loginGuest"
  },
  
  initialize: function () {
    this.listenTo(FoodgawkerApp.Data.currentUser, "all", this.render);
  },
  
  loginGuest: function (event) {
    event.preventDefault();
    
    this.model = new FoodgawkerApp.Models.Session();
    var session = this.model
    var attrs = { 
      user: {
        username: "hungryhippo",
        password: "password"
      }
    }
    this.model.set(attrs);

    this.model.save({}, {
      success: function (response) {
        FoodgawkerApp.Data.session = session;
        delete response.attributes["user"];
        FoodgawkerApp.flash(
          ["Welcome " + response.attributes["username"] + "!"], 
          "success"
        )
        
        setTimeout(function () {
          FoodgawkerApp.Data.currentUser.set(response.attributes)          
        }, 1000);

      }
    });
  },
  
  showSearchForm: function (event) {
    _.debounce(function () {
      $("#search-form").slideDown('500').css('display', 'block');

      $("#search-view").mouseleave(function () {
        $("#search-form").slideUp('500');
      })
    }, 100)()
  },
  
  render: function () {
    var content = this.template();
    this.$el.html(content);
    
    this.appendSearchView();
    return this;
  },
  
  appendSearchView: function () {
    var view = new FoodgawkerApp.Views.Search();
    this.$("#search-view").html(view.render().$el);
  },
    
  signOut: function (event) {
    event.preventDefault();
    
    FoodgawkerApp.Data.session.destroy({
      success: function (resp) {
        FoodgawkerApp.Data.session = undefined;
        FoodgawkerApp.Data.currentUser.set("id", undefined);
        FoodgawkerApp.flash(
          ["Goodbye " + FoodgawkerApp.Data.currentUser.get("username") + "!"], 
          "info"
        )
        Backbone.history.navigate("", { trigger: true });
      }
    })
  }
})