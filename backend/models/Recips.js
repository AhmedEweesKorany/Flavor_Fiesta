const db = require("../config/db");

// adding and getting recipes frpm database
const Recipes = {
  getAll: (callback) => {
    db.query("SELECT * FROM `recipes`", (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },
  create: (userdata, callback) => {
    const {
      title,
      description,
      image,
      cookingTime,
      calories,
      ingredients,
      cookingInstructions,
      rate,
    } = userdata;

    db.query("INSERT INTO `recipes`(`recipes_title`, `recipes_description`, `recipes_image`, `recipes_cookingtime`, `recipes_calories`, `recipes_ingredients`, `recipes_cookingInstructions`, `recipes_rate`)  VALUES (?, ?, ?, ?, ?, ?, ?,?)",[      title,
        description,
        image,
        cookingTime,
        calories,
        ingredients,
        cookingInstructions,
        rate],(err,data)=>{
            if(err) return callback(err,null)
            return callback(null,err)
        })
  },
};

module.exports = Recipes;
