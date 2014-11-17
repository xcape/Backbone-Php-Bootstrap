var app = app || {};
app.rutas= Backbone.Router.extend({

	routes:{
		'': 'book',
		'libros/:id': 'detalle',				
	},
	
	book:function(){
		window.stade="libro";
	},
	
	detalle:function(id){
		window.libroID=id;
		window.stade="detalle";
	}
});

app.route=new app.rutas();
