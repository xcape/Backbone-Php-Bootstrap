<?php
	require ('config.php');
	require 'Slim/Slim.php';
	require('Vendor/PDOWrapper/PDOWrapper.php');
	
	\Slim\Slim::registerAutoloader();

	// Instanciamos nuestra aplicación
	$app = new \Slim\Slim();

	// Asociamos una URL a una función
	
	$app->get('/libros/', function () {
		// Todos los libros;
		$pdo = PDOWrapper::instance();
		$pdo->configMaster(_BDHOST, _BD, _BDUSER, _BDPSWD, 3306);
		$result = $pdo->select('libros');
		echo json_encode($result);
	});

	$app->delete('/libros/:id', function ($id) {
    	// Borra un libro;
		$pdo = PDOWrapper::instance();
		//$pdo->configMaster('127.0.0.1', 'bb_example', 'root', '79513', 3306);
		$pdo->configMaster(_BDHOST, _BD, _BDUSER, _BDPSWD, 3306);
		$sql="DELETE FROM `libros` WHERE ((`id` = '$id'))";
		$pdo->execute($sql);
		echo "ok";
	});
	
	$app->post('/libros/',function() use ($app){
		// Agregar un libro;
		$data=(array)json_decode($app->request->getBody());
		$pdo = PDOWrapper::instance();
		$pdo->configMaster(_BDHOST, _BD, _BDUSER, _BDPSWD, 3306);
		$res=$pdo->insert('libros',$data);
		echo '{"id":'.$res.'}';
	});

	$app->put('/libros/:id',function($id) use ($app){
		// Actualizar los datos de un libro
		$w=array("id"=>$id);
		$data=(array)json_decode($app->request->getBody());
		$pdo = PDOWrapper::instance();
		$pdo->configMaster(_BDHOST, _BD, _BDUSER, _BDPSWD, 3306);
		$res=$pdo->update('libros',$data,$w);
	});
	// Ponemos en marcha el router
	$app->run();
?>