<?php

/*conexion base de datos mysql

$conexion = new mysql();*/

$conexion=mysql_connect('localhost:3306','fehensa1_hender','13011970');
mysql_select_db('fehensa1_cancion',$conexion); 
//mysql_set_charset( "utf8");

	if ($conexion->connect_error){
	
	   die("No hubo conexion: ".$conexion->connect_error);

	}




?>