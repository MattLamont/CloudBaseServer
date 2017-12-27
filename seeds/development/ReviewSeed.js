var faker = require('faker');

//function to be evaluated to obtain data
module.exports = function(done) {

  var data = [];

  for (let i = 0; i < 200; i++) {
    data.push(buildReview());
  }

  //remember to tell when your are done
  done(null, data);
};

buildReview = function() {

  let owner = (faker.random.number() % 50) + 1;
  let recipe = (faker.random.number() % 100) + 1;
  let title = faker.random.words();
  let rating = (faker.random.number() % 5) + 1;
  let description = '<p>' + faker.lorem.lines() + '</p>';

  return {
    "owner": owner,
    "recipe": recipe,
    "rating": rating,
    "title": title,
    "description": description
  }

}
