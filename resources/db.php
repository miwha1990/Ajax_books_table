<?php 
	$host = "localhost";
	$user = "root";
	$password = "";
	$dbname = "books2";
	mysql_connect($host, $user, $password) or die('Ошибка подключения к СУБД'.mysql_errno().': '.mysql_error());
	mysql_select_db($dbname) or die('Ошибка подключения к Базе данных'.mysql_errno().': '.mysql_error());
 	mysql_query("SET NAMES 'UTF8'");
 ?>