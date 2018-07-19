var inquirer = require("inquirer");
var mysql = require("mysql");
var productsArray = [];
var chosenProduct;
var productQuantity;
var inStock;
var answerID;
// var results;
// command = 
var connection = mysql.createConnection( {
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
  console.log("connected!");
    // run the start function after the connection is made to prompt the user
    showProducts();
  });
  
function showProducts(){
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;

        for (var i = 0; i < results.length; i++) { 
            productsArray.push("id:" + results[i].item_id + " --> " + results[i].stock_quantity + " " + results[i].product_name + "(s) in stock for $" + results[i].price + " each.");
        }
        console.log(productsArray);
        productChoice();
        return productsArray;
        
  }) 
  
  
  
};

function productChoice(){
    inquirer
    .prompt({
      name: "purchase_id",
      type: "input",
      message: "What is the ID of the product you would like to purchase?"
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      console.log(answer.purchase_id);
      answerID = answer.purchase_id;
      if (answer.purchase_id == NaN) {
        tryAgain();
      }
      else {
        showChoice(answer.purchase_id);
      }
    });
};

function tryAgain(){
    console.log("please enter a valid product ID")
    productChoice()
};

function showChoice(id){
    connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: id
        },
        function(err, results) {
          if (err) throw err;
        //   console.log(results.stock_quantity);
        //   inStock = results.stock_quantity;
          console.log(results);
          chosenProduct = results;
        //   console.log(inStock);
          confirmProduct(chosenProduct);
        }
      );
};

function confirmProduct(chosenProduct){
    inquirer
    .prompt({
      name: "confirm_product",
      type: "confirm",
      message: "Continue with your purchase of this product?", 
      default: true
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.confirm_product == false) {
        console.log("You have chosen not to buy" + chosenProduct[0].product_name)
        showProducts();
      }
      else {
        quantityChoice(chosenProduct);
      }
    });
}
function quantityChoice(chosenProduct){
    inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?", 
      default: "1"
    })
    .then(function(answer) {
        inStock = parseInt(chosenProduct[0].stock_quantity);
        productQuantity = parseInt(answer.quantity);
        // console.log(productChoice);
        
        // console.log(productQuantity);
        // console.log(productChoice[0].stock_quantity);
        enough(productQuantity, inStock);


    })
}
function enough(productQuantity, inStock) {
    if(productQuantity<=inStock){
        console.log("Excellent choice. Now processing your order of a/an " + chosenProduct[0].product_name + ".")
        updateDatabase(productQuantity, inStock);
    }
    else{
        console.log("I'm sorry, but we don't have enough of your chosen product in stock right now");
        anotherOrder();
    }
}
function anotherOrder(){
    inquirer.prompt({
        name: "another_order",
        type: "confirm",
        message: "Would you like to order a different product or amount?"
        })
        .then(function(response) {
        if (response.another_order == false) {
            console.log("Thank you for shopping with us!");
        }
        else {
            reset();
        }
    });
}
function updateDatabase(productQuantity, inStock){
    newStock = inStock - productQuantity;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock
          },
          {
            item_id: answerID
          }
        ],
        function(error) {
          if (error) throw err;
          console.log("Stock updated successfully!");
          anotherOrder();
        }
      );
}
function reset(){
    id = 0;
    productsArray = [];
    chosenProduct = 0;
    productQuantity = 0;
    inStock = 0;
    answerID = 0;

    showProducts();
}