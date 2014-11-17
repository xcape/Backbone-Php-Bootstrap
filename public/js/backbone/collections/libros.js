var app = app || {};

app.LibrosCollection = Backbone.Collection.extend({
	model:app.Libro,
	url:"../api/libros/"
});

app.libros = new app.LibrosCollection();
