var app = app || {};

app.Libreria = Backbone.View.extend({
	el: '#app',
	/*habilitamos los botones usados, para alta y modificacion de un libro*/
	events: {							
		'click #crear': 'crearLibro',			
		'click #cancelar': 'cancelarLibro',
		'click #guardar': 'guardarLibro'
	},

	initialize: function() {
		/*Escuchamos los "eventos" de la collección libros*/
		this.listenTo(app.libros, 'add', this.mostrarLibro);
		this.listenTo(app.libros, 'remove', this.actualizar);
		this.listenTo(app.libros, 'change', this.actualizar);
		/*Cargamos los libros*/
		app.libros.fetch();
	
	},

	mostrarLibro: function(modelo) {
		/*Trazamos en el DOM el libro generado*/
		var vista = new app.MostrarLibroView({
			model: modelo
		});
		$('.libros').append(vista.render().$el);
	},

	crearLibro: function() {
		/*Este metodo se llamara cuando se click en el boton crear libro*/
		app.libros.create({
			"titulo": $('#inputTitulo').val(),
			"autor": $('#inputAutor').val(),
			"categoria": $('#inputCategoria').val()
		},{
			success: function(){
				//console.log("exito");
			},
			error: function(){
				//console.log("error");
			},
			complete: function(xhr, status) { 
				//console.log(xhr,status); 
			}
		});
	},
	resetLibro: function() {
		/*Limpiamos la zona de los libros*/
		this.$('.libros').html('');
		app.libros.each(this.mostrarLibro, this);
		this.cancelarLibro();
	},

	cancelarLibro:function(){
		/*Reseteamos el formulario*/
		$('#inputTitulo').val("");
		$('#inputAutor').val("");
		$('#inputCategoria').val("");
		$("#formId").css("display", "none");
		$("#formTitulo").html("<b>Registrar Nuevo Libro</b>");
		$("#crear").css("display", "block");
		$("#guardar").css("display", "none");
		$("#cancelar").css("display", "none");

	},
	guardarLibro: function(){
		/*Este metodo se llama cuando "Modificamos un libro"*/
		ids=$('#inputId').val();
		var model = app.libros.get(ids);
		model.set({
			"titulo": $('#inputTitulo').val(),
			"autor": $('#inputAutor').val(),
			"categoria": $('#inputCategoria').val()
		});
		model.save();
	},
	actualizar : function(){
		/*Limpiamos la zona de los libros y volvemos a dibujar el listado*/
		this.$('.libros').html('');
		app.libros.each(this.mostrarLibro, this);
		this.cancelarLibro();
	}

});

app.MostrarLibroView = Backbone.View.extend({
	template: _.template($('#tplMostrarLibro').html()),
	tagName: 'li',
	className: 'list-group-item',
	/*Esuchamos los eventos de cada boton de libro*/
	events: {
		'click #detalle': 'mostrarDetalle',
		'click #eliminar': 'eliminarLibro',
		'click #editar' : 'editarLibro',
	},

	initialize: function() {
		var self = this;
		app.route.on('route:book', function() {
			self.render();
		});
		app.route.on('route:detalle', function() {
			self.render();
		});
	},

	render: function() {
		var self = this;
		if (window.stade === "libro") {
			$('.detalle').hide();
			$('#myModal').modal('hide');
			this.$el.html(this.template(this.model.toJSON()));
		} else if (window.stade === "detalle") {
			$('.detalle').show();
			if (this.model.get('id') === window.libroID) {
				new app.DetalleLibroView({
					model: this.model
				});
			}
		}
		return this;
	},

	mostrarDetalle: function() {
		/*
		Backbone.history.navigate('libros/' + this.model.get('id'), {
			trigger: true
		});
		*/
		alert("Mostrar Detalle libro: "+this.model.get("titulo"));
	},

	eliminarLibro: function() {
		this.model.destroy();
	},

	editarLibro:function(){

		var m = this.model;

		$('#inputId').val(m.get("id"));
		$('#inputTitulo').val(m.get("titulo"));
		$('#inputAutor').val(m.get("autor"));
		$('#inputCategoria').val(m.get("categoria"));

		$("#formId").css("display", "block");
		$("#formTitulo").html("<b>Editando Nuevo Libro</b>");
		$("#crear").css("display", "none");
		$("#guardar").css("display", "block");
		$("#cancelar").css("display", "block");
	
	},

});

app.DetalleLibroView = Backbone.View.extend({
	el: '.detalle',
	template: _.template($('#tplDetalleLibro').html()),
	events: {
		'click .atrasLibros': 'atrasLibros'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		$('#myModal').modal();
	},

	atrasLibros: function() {
		Backbone.history.navigate('', {
			trigger: true
		});
	}
}); 
