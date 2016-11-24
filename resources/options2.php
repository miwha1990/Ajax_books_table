<?php 
require_once('db.php'); 
	$category = (isset($_GET['data']))?$_GET['data']:'';
		$query = "SELECT themes.name FROM books, themes WHERE books.id_themes = themes.id AND  themes.name IS NOT NULL GROUP BY themes.name";
		if($category!="")
			$query = "SELECT themes.name FROM books, themes, categories WHERE books.id_themes = themes.id AND books.id_category = categories.id   AND categories.name LIKE '$category' GROUP BY  themes.name";
	$res = mysql_query($query);
	$cnt = mysql_num_rows($res);
		for ($i=0; $i <  $cnt; $i++) { 
			$a = mysql_fetch_assoc($res);
			$result .= $a['name'].",";
		}
		
	echo substr($result, 0, -1);

?>