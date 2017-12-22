var faker = require('faker');

//function to be evaluated to obtain data
module.exports = function(done) {

  var data = [];

  for (let i = 0; i < 100; i++) {
    data.push(buildRecipe());
  }

  //remember to tell when your are done
  done(null, data);
};

buildRecipe = function() {

  let owner = (faker.random.number() % 50) + 1;
  let name = faker.random.words();

  let numFlavors = (faker.random.number() % 5) + 1;

  let flavors = [];
  let flavor_percents = [];
  for (let i = 0; i < numFlavors; i++) {
    flavors.push(faker.random.number() % 200);
    flavor_percents.push((faker.random.number() % 10) + 1);
  }

  let dilutant = faker.random.number() % 10;
  let steep_time = faker.random.number() % 30;
  let description = '<p>' + faker.lorem.lines() + '</p>';
  let image_url = faker.random.image();

  let categories = [
    'Tobacco',
    'Dessert',
    'Fruit',
    'Candy',
    'Food',
    'Beverage',
    'Other'
  ];

  let categoryNum = faker.random.number() % 7;
  let category = categories[categoryNum];

  return {
    "owner": owner,
    "name": name,
    "pg_percent": 50,
    "vg_percent": 50,
    "flavor_percents": flavor_percents,
    "flavors": flavors,
    "dilutant": dilutant,
    "steep_time": steep_time,
    "description": description,
    "tags": [],
    "image_url": image_url,
    "category": category
  }

}
