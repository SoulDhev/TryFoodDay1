json.(@recipe, :id, :title, :blog_url, :description, :total_time, :user_id, :created_at, :ingredients)
json.username(@recipe.user.username)
json.med_photo_url(@recipe.photo.url(:medium))
json.large_photo_url(@recipe.photo.url(:large))
json.categories(@recipe.categories, :id, :name)
json.favorites(@recipe.favorites, :id, :recipe_id, :user_id)