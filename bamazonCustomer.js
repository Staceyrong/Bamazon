var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

var total = 0;
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  
  });


  function afterConnection() {
    connection.query("SELECT * FROM Products", function(err, res){
      if (err) throw err;
      console.log("-------------------------------------------");
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')
      }

      inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "What is the item ID of the product you want to purchase?",
          validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;
            } else{
              return false;
            }
          }
        },

    {
        type: "input",
        name: "qty",
        message: "How much would you like to purchase?",
        validate: function(value){
          if(isNaN(value)){
            return false;
          } else{
            return true;
          }
        }
      }
      ]).then(function(answer){
        var whatID = (answer.id)-1;
        var quantity = parseInt(answer.qty);
        total += parseFloat(((res[whatID].price)*quantity).toFixed(2));

        if(res[whatID].stock_quantity >= quantity){
            //after purchase, updates quantity in Products
            connection.query("UPDATE Products SET ? WHERE ?", [
            {stock_quantity: (res[whatID].stock_quantity - quantity)},
            {item_id: answer.id}
            ], function(err, result){
                if(err) throw err;
                reprompt();
                
            });
        }
        else {
        console.log("Sorry, there's not enough in stock!");
        reprompt();
        }
        
    })
})
}
function reprompt(){
    inquirer.prompt([{
      name: "reply",
      message: "Would you like to purchase another item?",
      validate: function(value){
        if(value == "yes" || value == "no"){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(answer){
      if(answer.reply == "yes"){
        afterConnection();
      } else{
        console.log("Congratulation! Your total price is $" + total.toFixed(2) + ". Your item(s) will be shipped ASAP.");
        console.log("See you soon!");
        connection.end();
      }
    });
  }

