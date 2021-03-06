FoodgawkerApp.Models.Recipe = Backbone.Model.extend({
  urlRoot: "/api/recipes",
  
  parse: function (data) {
    if(data.favorites) {
      data.favorites = 
        new FoodgawkerApp.Collections.Favorites(data.favorites);
    }
    
    return data;
  },
  
  toJSON: function () {
    var attributes = _.clone(this.attributes);
    attributes.recipe_categories_attributes = attributes.recipe_categories;
    delete attributes["recipe_categories"]
    
    return attributes;
  }
})