<?php
require_once('db.php'); 

	$theme = (isset($_GET['data']))?$_GET['data']:'';

		$query = "SELECT categories.name FROM books, categories WHERE books.id_category = categories.id  GROUP BY  categories.name";
		if($theme!="")
			$query = "SELECT categories.name FROM books, themes, categories WHERE books.id_themes = themes.id AND books.id_category = categories.id AND themes.name LIKE '$theme' GROUP BY categories.name";
	$res = mysql_query($query);
	$cnt = mysql_num_rows($res);
		for ($i=0; $i <  $cnt; $i++) { 
			$a = mysql_fetch_assoc($res);
			$result .= $a['name'].",";
		}

	echo substr($result, 0, -1);

 ?>