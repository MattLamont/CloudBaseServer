

module.exports = {

    createRecipeResOverride: function( req , res ){
    	var override = {};
    	override.serverError = res.serverError;
    	override.notFound = res.notFound;
    	override.ok = function(data) {

    		if (Array.isArray(data)) {
    			// Normally an array is fetched from the blueprint routes
    			async.map(data, function(record, cb) {

    				populateCounts( record , function( err , record ){
    					cb( null , record );
    				});

    			}, function(err, result) {
    				if (err) return res.error(err);
    				return res.ok(result);
    			});
    		} else if (data) {

    			// blueprint `find/:id` will only return one record (not an array)
    			populateCounts( data , function( err , data ){
    				return res.ok(data);
    			});

    		} else {
    			// Oh no - no results!
    			return res.notFound();
    		}
    	};

    	return override;
    }

};

function populateCounts( record , callback ){

  sails.models.recipe_likes__user_liked_recipes.count( {recipe_likes: record.id} ).exec( function( err , data ){

    record.likes_count = data;

    sails.models.recipe_dislikes__user_disliked_recipes.count( {recipe_dislikes: record.id} ).exec( function( err , data ){

      record.dislikes_count = data;

      sails.models.recipe_saves__user_saved_recipes.count( {recipe_saves: record.id} ).exec( function( err , data ){

        record.saves_count = data;
        callback( null , record );
      });

    });

  });

}
