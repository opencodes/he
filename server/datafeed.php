<?php
//error_reporting(0);
$hostname = "phonegapdb.db.9319505.hostedresource.com";
$username = "phonegapdb";
$dbname = "phonegapdb";
$password = 'Server123#';
//These variable values need to be changed by you before deploying
//$hostname = "localhost";
//$username = "root";
//$dbname = "monthly_expense";
//$password = '';       
//Connecting to your database
mysql_connect($hostname, $username, $password) OR DIE ("Unable to connect to database! Please try again later.");
mysql_select_db($dbname);
$sql = "SELECT *,COUNT(*) as count  FROM expense  ";
    $sql .= $subquery ." GROUP BY device_id DESC";
	//echo $sql;
	$query = mysql_query($sql)or die(mysql_error());
	$data = array();
	$total = 0;
?>
<table border="2">
<tr>
<td>Device ID</td><td>Total Entry</td>
<tr/>
<?php
	while ($row = mysql_fetch_array($query)) {
		echo "<tr><td>".$row[device_id]." </td><td>".$row[count]."</td><tr/>";	
	}

?>
</table>