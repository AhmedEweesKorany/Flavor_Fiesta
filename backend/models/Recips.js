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

    db.query(
      "INSERT INTO `recipes`(`recipes_title`, `recipes_description`, `recipes_image`, `recipes_cookingtime`, `recipes_calories`, `recipes_ingredients`, `recipes_cookingInstructions`, `recipes_rate`)  VALUES (?, ?, ?, ?, ?, ?, ?,?)",
      [
        title,
        description,
        image,
        cookingTime,
        calories,
        ingredients,
        cookingInstructions,
        rate,
      ],
      (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      }
    );
  },
  getOneRecipe: (id, callback) => {
    db.query(
      "SELECT * FROM `recipes` WHERE recipes_id = ?",
      [id],
      (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      }
    );
  },
  getLimitedRecipes: (callback) => {
    db.query(
      "SELECT * FROM `recipes` ORDER BY recipes_id DESC LIMIT 8",
      (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      }
    );
  },
};

module.exports = Recipes;
