module.exports = {
    addFollowing: function (req, res , callback ) {

      sails.models['user_following__user_followers'].findOne( {
        user_following: req.params.parentid ,
        user_followers: req.params.id
      })
      .then( function( userFollowing ){
        if( userFollowing ){
          throw new Error('error');
          return;
        }

        User.findOne({id: req.params.id})
          .then(function(user) {
            if (user) return User.update({id: req.params.id} , {followers_count: user.followers_count += 1});
          })
          .then( function( updatedUser ){
            return User.findOne({id: req.params.parentid});
          })
          .then( function( user ){
            if (user) return User.update({id: req.params.parentid} , {following_count: user.following_count += 1});
            else throw new Error('error');
          })
          .then( function( updatedUser ){
            if( updatedUser ) callback( updatedUser );
            else throw new Error('error');
          });
      })
      .catch( error => {
        callback( null );
      });
    },

    removeFollowing: function (req, res , callback ) {

      sails.models['user_following__user_followers'].findOne( {
        user_following: req.params.parentid ,
        user_followers: req.params.id
      })
      .then( function( userFollowing ){
        if( !userFollowing ){
          throw new Error('error');
          return;
        }

        User.findOne({id: req.params.id})
          .then(function(user) {
            if (user) return User.update({id: req.params.id} , {followers_count: user.followers_count -= 1});
          })
          .then( function( updatedUser ){
            return User.findOne({id: req.params.parentid});
          })
          .then( function( user ){
            if (user) return User.update({id: req.params.parentid} , {following_count: user.following_count -= 1});
            else throw new Error('error');
          })
          .then( function( updatedUser ){
            if( updatedUser ) callback( updatedUser );
            else throw new Error('error');
          });
      })
      .catch( error => {
        callback( null );
      });
    },

    addLikedRecipe: function (req, res , callback ) {

      sails.models['recipe_likes__user_liked_recipes'].findOne( {
        user_liked_recipes: req.params.parentid ,
        recipe_likes: req.params.id
      })
      .then( function( recipeLike ){
        if( recipeLike ){
          throw new Error('error');
          return;
        }

        Recipe.findOne({id: req.params.id})
          .then(function(recipe) {
            if (recipe) return Recipe.update({id: req.params.id} , {likes_count: recipe.likes_count += 1});
          })
          .then( function( updatedRecipe ){
            if( updatedRecipe ) callback( updatedRecipe );
            else throw new Error('error');
          });
      })
      .catch( error => {
        callback( null );
      });
    },

    removeLikedRecipe: function (req, res , callback ) {

      sails.models['recipe_likes__user_liked_recipes'].findOne( {
        user_liked_recipes: req.params.parentid ,
        recipe_likes: req.params.id
      })
      .then( function( recipeLike ){
        if( !recipeLike ){
          throw new Error('error');
          return;
        }

        Recipe.findOne({id: req.params.id})
          .then(function(recipe) {
            if (recipe) return Recipe.update({id: req.params.id} , {likes_count: recipe.likes_count -= 1});
          })
          .then( function( updatedRecipe ){
            if( updatedRecipe ) callback( updatedRecipe );
            else throw new Error('error');
          });
      })
      .catch( error => {
        callback( null );
      });
    },

    addSavedRecipe: function (req, res , callback ) {

      sails.models['recipe_saves__user_saved_recipes'].findOne( {
        user_saved_recipes: req.params.parentid ,
        recipe_saves: req.params.id
      })
      .then( function( recipeSave ){
        if( recipeSave ){
          throw new Error('error');
          return;
        }

        Recipe.findOne({id: req.params.id})
          .then(function(recipe) {
            if (recipe) return Recipe.update({id: req.params.id} , {saves_count: recipe.saves_count += 1});
          })
          .then( function( updatedRecipe ){
            if( updatedRecipe ) callback( updatedRecipe );
            else throw new Error('error');
          });
      })
      .catch( error => {
        callback( null );
      });
    },

    removeSavedRecipe: function (req, res , callback ) {

      sails.models['recipe_saves__user_saved_recipes'].findOne( {
        user_saved_recipes: req.params.parentid ,
        recipe_saves: req.params.id
      })
      .then( function( recipeSave ){
        if( !recipeSave ){
          throw new Error('error');
          return;
        }

        Recipe.findOne({id: req.params.id})
          .then(function(recipe) {
            if (recipe) return Recipe.update({id: req.params.id} , {saves_count: recipe.saves_count -= 1});
          })
          .then( function( updatedRecipe ){
            if( updatedRecipe ) callback( updatedRecipe );
            else throw new Error('error');
          });
      })
      .catch( error => {
        callback( null );
      });
    },

    addRecipe: function (userid , callback ) {

      User.findOne({id: userid})
      .then( function( user ){
        if( !user ){
          throw new Error('error');
          return;
        }

        return User.update({id: userid} , {recipe_count: user.recipe_count += 1});
      })
      .then( function( updatedUser ){
        if( updatedUser ) callback( updatedUser );
        else throw new Error('error');
      })
      .catch( error => {
        callback( null );
      });
    },

    removeRecipe: function (userid , callback ) {

      User.findOne({id: userid})
      .then( function( user ){
        if( !user ){
          throw new Error('error');
          return;
        }

        return User.update({id: userid} , {recipe_count: user.recipe_count -= 1});
      })
      .then( function( updatedUser ){
        if( updatedUser ) callback( updatedUser );
        else throw new Error('error');
      })
      .catch( error => {
        callback( null );
      });
    },

};
