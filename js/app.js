

(function(){

    var htmlContainer = $("#vip");

    checkReply = function(data) {
        if (typeof(data.status) != "undefined") {
           
            alert(data.message);
            return false;
        } else {
            return true;
        }
    };
    server = {
         url:"http://sbta.in/websites/service/",
            request: function(options) {
                return $.post(server.url+"index.php", options).promise();
            },
            debug: function(options) {
                return $.post(server.url+"debug.php", options).promise();
            }

       
       };
       
function loadScript(){
	
		    var top = $("#scripts");
            top.html(" <script src='./js/jQuery.2.1.js'></script> "+"<script src='./js/webflow.js'></script> "
            +"<script src='./js/ modernizr.js'></script> ");

}       
        
$usersession = {
	
	homes:function (){
		
		
		

		
		server.request({route:{app:"offer"}}).done(function(data){
	      
		    var source   = $("#indexpage").html();
   			var template = Handlebars.compile(source);
   			var html    = template( data );
  			htmlContainer.html(html); 
  			loadScript();
  			 console.log(data);

      
	     });
	
	},
	

	
	loadallfoods:function(data){
		
		
		
		if(data === parseInt(data, 10)){
			
  		    var source   = $("#showm").html();
   			var template = Handlebars.compile(source);
   			var html    = template(  );
  			$("#somemeal").html(html); 
  			
  			
  			server.request({route:{app:"getfood",id:data}}).done(function(data){				
		    var source   = $("#showfood").html();
   			var template = Handlebars.compile(source);
   			var html    = template( data );
  			$("#somefood").html(html); 
  			
  			 loadScript();
  			});
		
  			
  			
  			}else{
  				
            
  			
  			//alert(data.typef.length);
  		    var source   = $("#showm").html();
   			var template = Handlebars.compile(source);
   			var html    = template( data );
  			$("#somemeal").html(html); 
  			for(var i=0;i<data.typef.length;i++){
  			
  			server.request({route:{app:"getfood",id:data.typef[i].FtID}}).done(function(data){
  				if(data.foods[0]!=null){
  				
  									
		    var source   = $("#showfood").html();
   			var template = Handlebars.compile(source);
   			var html    = template( data );
  			$("#somefood").append(html); 
  			console.log(data);
  			loadScript();
  			 }
  				});
  				
  				
  			}
  				
  		   }
		
	},
	
	
	
};





	$("body").delegate("#Allmenu","click", function(){
		
		
			server.request({route:{app:"loadcata"}}).done(function(data){
				
			var source   = $("#allmenu").html();
   			var template = Handlebars.compile(source);
   			var html    = template(  );
  			htmlContainer.html(html); 
				
		    var source   = $("#navparM").html();
   			var template = Handlebars.compile(source);
   			var html    = template( data );
  			$("#PcSection").html(html); 
  			
  			var source   = $("#navparM").html();
   			var template = Handlebars.compile(source);
   			var html    = template( data );
  			$("#PhoneSection").html(html); 
  			
  			$usersession.loadallfoods(data);
  	
  			


               });
           });
           

     $usersession.homes();

           
	$("body").delegate("#home","click", function(){
				
 			$usersession.homes();
		  	var source   = $("#navparhome").html();
   			var template = Handlebars.compile(source);
   			var html    = template(  );
  			$("#PhoneSection").html(html); 
		
		    var source   = $("#navparhome").html();
   			var template = Handlebars.compile(source);
   			var html    = template(  );
  			$("#PcSection").html(html); 
  			
         


           });
           
           
           $("body").delegate("#showcata","click", function(){
           	
           	var cataid=$(this).data("val");
           
           	$usersession.loadallfoods(cataid);
           });



})();

