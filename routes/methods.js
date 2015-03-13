
/*
 * GET Methods listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM methods',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('methods',{page_title:"Payment Methods - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_method',{page_title:"Add Payment Methods - Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM methods WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_method',{page_title:"Edit Payment Methods - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the methods*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            paymentapi    : input.paymentapi,
            key : input.key
            
        };
        
        var query = connection.query("INSERT INTO methods set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/methods');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            paymentapi    : input.paymentapi,
            key : input.key
        
        };
        
        connection.query("UPDATE methods set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/methods');
          
        });
    
    });
};


exports.delete_method = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM methods  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/methods');
             
        });
        
     });
};

exports.paypal = function(req, res){
  res.render('paypal',{page_title:"Paypal Payment Process- Node.js"});
};

exports.braintree = function(req, res){
  res.render('braintree',{page_title:"Braintree Payment Process - Node.js"});
};


var braintree = require('braintree');


/// Setting up braintree
 

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '85fz3yznbb99v33n',
  publicKey: '9b35y8kpfxqtg7fz',
  privateKey: '31a31d64716f99afd9616f659997bcbf'
})


exports.create_transaction_braintree = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
  
	gateway.transaction.sale({
		  amount: req.body.price,
		  creditCard: {
			number: req.body.number,
			expirationMonth: req.body.month,
			expirationYear: req.body.year
		  }
		}, function (err, result) {
		  if (err) throw err;

		  if (result.success) {
			console.log('Transaction ID: ' + result.transaction.id);
			//res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
			
			req.getConnection(function (err, connection) {
        
			var data = {
				card_holder_name: req.body.customer,
				price: req.body.price,
				currency: req.body.currency,
				card_holder_name: req.body.card_holder_name,
				card_CCV: req.body.cvv,
				response: result.transaction,
				card_number: req.body.number,
				card_expiration: req.body.month+'/'+req.body.year,
				price: req.body.price,
			
			};
			
			var query = connection.query("INSERT INTO order_details set ? ",data, function(err, rows)
			{
	  
			  if (err)
				  console.log("Error inserting : %s ",err );
			 
			  res.redirect('/');
			  
			});
		 
			
		});
			 
		  } else {
			console.log(result.message);
			res.send("<h1>Error:  " + result.message + "</h1>");
		  }
		});
		 
};
 
exports.create_transaction_paypal = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
};