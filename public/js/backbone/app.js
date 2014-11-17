var app = app || {};
	
	$(function(){
		Backbone.history.start();
		new app.Libreria();
		$("#guardar").css("display", "none");
		$("#cancelar").css("display", "none");
		$("#formId").css("display", "none");
	});