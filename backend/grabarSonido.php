<?php
header('Content-Type: text/html; charset=utf-8'); 
$opcion=$_REQUEST['boton'];

if ($opcion==null) {
	$opcion="";
}

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

function utf8_converter($array){
    array_walk_recursive($array, function(&$item, $key){
        if(!mb_detect_encoding($item, 'utf-8', true)){
            $item = utf8_encode($item);
        }
    });
    return $array;
}

if (trim($opcion)=='ConsultarFechas'){
     $variable1 = $_REQUEST['email'];
	if (strlen(trim($variable1))>0){
	    include('conexion_db.php'); /* abrir base de datos */
		$datos="";
		$paso=0;
		$cl=0;
		$i=0;
		$fechasevo = array();
		$select="select * from sonidos where email='$variable1' ;";
		$rs=mysql_query($select);

	    try {	
		    while ($fila = mysql_fetch_array($rs)){$cl++;
        		$codigo = $fila['0'];
        		$pista = $fila['2'];
        		$fecha = $fila['3'];
                $fechasevo[] = array("variable1"=> $codigo, "variable2"=> $pista, "variable3"=> $fecha);
    		    array_push($fechasevo);        		
        		
                //echo json_encode($datos); 
                $i=1;
    	    }
	    } catch (SQLException $e) {
    		// TODO Bloque catch generado autom?icamente
	    	$e.printStackTrace();
	    }
	    if ($i!=0){
	        echo json_encode($fechasevo);
	    }
	    include('cerrar_conexion.php'); /* cerrar base de datos */	
	}
}	

if (trim($opcion)=='Consultar'){
     $variable1 = $_REQUEST['email'];
	if (strlen(trim($variable1))>0){
	    include('conexion_db.php'); /* abrir base de datos */
		$datos="";
		$paso=0;
		$cl=0;
		$select="select * from sonidos where id='$variable1' ;";
		$rs=mysql_query($select);

	    try {	
		    while ($fila = mysql_fetch_array($rs)){$cl++;
		            		
        		$datos['variable4'] = trim($fila['2']);
        		$datos['variable1'] = trim($fila['4']);
        		$datos['variable2'] = trim($fila['5']);
        		$datos['variable3'] = trim($fila['6']);
        // 		if (strlen($file['4'])>0){
        //     		$datos['variable1'] = $fila['3'];
        // 		}
        		 echo(json_encode(utf8_converter($datos),JSON_UNESCAPED_UNICODE));
                //echo json_encode($datos); 
                $i=1;
    	    }
	    } catch (SQLException $e) {
    		// TODO Bloque catch generado autom?icamente
	    	$e.printStackTrace();
	    }
	    include('cerrar_conexion.php'); /* cerrar base de datos */	
	}
}	

if (trim($opcion)=='Guardar'){
    $variable1 = $_REQUEST['email'];
	if (strlen(trim($variable1))>0){
        $variable2 =  $_REQUEST["audi1"];
        $variable3 =  $_REQUEST["audi2"];
        $variable4 =  $_REQUEST["audi3"];
        $variable5 =  $_REQUEST["pista"];
	    include('conexion_db.php'); /* abrir base de datos */
		$datos="";
		$paso=0;
		$hora=time();
		$fecha1=date("d-m-Y His", $hora);
		$fecha=date("d-m-Y ");
		$idsonido=$variable1.$fecha1;
		$fecha3=$fecha.'-'.$hora;
    	$select="insert into sonidos (email, audio1, audio2, audio3, pista, fecha) values ('$variable1', '$variable2', '$variable3', '$variable4', '$variable5', '$fecha1');";
		$paso=mysql_query($select);

    	if ($paso!=0){
    	    $datos['variable1'] = true;
    	     //$datos['variable2'] = $idsonido;
            echo json_encode($datos); 
    	}else{
    	    $datos['variable1'] = false;
            echo json_encode($datos);
    	}		
		
		include('cerrar_conexion.php'); /* cerrar base de datos */	
	}
}

if (trim($opcion)=='Eliminar'){
    $variable1 = $_REQUEST['email'];
	if (strlen(trim($variable1))>0){
	    include('conexion_db.php'); /* abrir base de datos */
		$datos="";
		$paso=0;
    	$select4 = "delete from sonidos where id = '$variable1';";
		$paso=mysql_query($select4);

    	if ($paso!=0){
    	    $datos['variable1'] = true;
            echo json_encode($datos); 
    	}else{
    	    $datos['variable1'] = false;
            echo json_encode($datos);
    	}		
		
		include('cerrar_conexion.php'); /* cerrar base de datos */	
	}


}	


?>