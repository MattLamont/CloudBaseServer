var faker = require('faker');

//function to be evaluated to obtain data
module.exports = function(done) {

  var data = [
    {
        "username": "CloudBase Admin",
        "email": "admin@cloudbase.com",
        "password": "admin1234",
        "isAdmin": true,
        "isDeleted": false,
        "image_url": "",
        "biography": ""
    }
  ];


  for (let i = 0; i < 50; i++) {
    data.push(buildUser());
  }

  //remember to tell when your are done
  done(null, data);
};

buildUser = function() {

  let username = faker.internet.userName();
  let email = faker.internet.email();
  let image_url = faker.image.avatar();
  let biography = '<p>' + faker.lorem.lines() + '</p>';



  let numLikes = (faker.random.number() % 50);
  let liked_recipes = [];

  for (let i = 0; i < numLikes; i++) {
    liked_recipes.push((faker.random.number() % 50) + 1);
  }

  let numDislikes = (faker.random.number() % 50);
  let disliked_recipes = [];

  for (let i = 0; i < numDislikes; i++) {
    disliked_recipes.push((faker.random.number() % 50) + 1);
  }

  let numSaved = (faker.random.number() % 50);
  let saved_recipes = [];

  for (let i = 0; i < numSaved; i++) {
    saved_recipes.push((faker.random.number() % 50) + 1);
  }

  let numFollowers = (faker.random.number() % 50);
  let followers = [];

  for (let i = 0; i < numFollowers; i++) {
    followers.push((faker.random.number() % 50) + 1);
  }

  let numFollowing = (faker.random.number() % 50);
  let following = [];

  for (let i = 0; i < numFollowing; i++) {
    following.push((faker.random.number() % 50) + 1);
  }

  return {
    "username": username,
    "email": email,
    "password": "user1234",
    "isAdmin": false,
    "isDeleted": false,
    "image_url": image_url,
    "biography": biography,
    "liked_recipes": liked_recipes,
    "disliked_recipes": disliked_recipes,
    "saved_recipes": saved_recipes,
    "followers": followers,
    "following": following
  }

}
