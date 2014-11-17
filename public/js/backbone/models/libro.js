var app = app || {};

app.Libro	=	Backbone.Model.extend({

	urlRoot:'../api/libros',

	defaults:{
		autor:'Desconocido',
		categoria:'Desconocida'
	},

	initialize: function(){
			//console.log("Se ha creado una instancial del modelo Libro");
		this.on('change',function(){
			//console.log("El modelo libro ha cambiado");
		});
	},

	validate: function(attr){
		if(!attr.titulo){
			return "debe tener un titulo";
		}
	},
	
});

