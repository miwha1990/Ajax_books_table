<?php
	header("content-type:text/xml");
	require_once('db.php');
	$category = (isset($_GET['category']))?$_GET['category']:'';
	$theme = (isset($_GET['theme']))?$_GET['theme']:'';
	$price = (isset($_GET['price']))?$_GET['price']:'';


	preg_match_all('([0-9]+[0-9]+)', $price, $return);
	$price_array = $return[0];
/*	$theme = 'Программирование';
	$category = 'Delphi';
	$price_array= array(10,2000);*/
	$query = "SELECT books.name, themes.name AS theme, categories.name AS category, books.price FROM books, themes, categories WHERE books.id_themes = themes.id AND books.id_category = categories.id AND books.price > $price_array[0] AND books.price < $price_array[1]  ORDER BY books.price DESC";
	if ($category!='') {
		$query = "SELECT books.name, themes.name AS theme, categories.name AS category, books.price FROM books, themes, categories WHERE books.id_themes = themes.id AND books.id_category = categories.id AND books.price > $price_array[0] AND books.price < $price_array[1] AND categories.name LIKE '$category' ORDER BY books.price DESC";
	}
	if ($theme!='') {
		$query = "SELECT books.name, themes.name AS theme, categories.name AS category, books.price FROM books, themes, categories WHERE books.id_themes = themes.id AND books.id_category = categories.id AND books.price > $price_array[0] AND books.price < $price_array[1] AND themes.name LIKE '$theme' ORDER BY books.price DESC";
	}
	if ($theme!='' && $category!='') {
		$query = "SELECT books.name, themes.name AS theme, categories.name AS category, books.price FROM books, themes, categories WHERE books.id_themes = themes.id AND books.id_category = categories.id AND books.price > $price_array[0] AND books.price < $price_array[1] AND categories.name LIKE '$category' AND themes.name LIKE '$theme' ORDER BY books.price DESC";
	}
	

	$res = mysql_query($query);
	$cnt = mysql_num_rows($res);
?>
	


<?php 
	echo "<books>";
		for ($i=0; $i <  $cnt; $i++) { 
			$a = mysql_fetch_assoc($res);
		?>
		<book>
			<name>
				<?php echo $a['name']; ?>
			</name>
			<category>
				<?php echo $a['category']; ?>
			</category>
			<theme>
				<?php echo $a['theme']; ?>
			</theme>
			<price>
				<?php echo $a['price']; ?>
			</price>
		</book>
		<?php 
		}
	echo "</books>";



?>
