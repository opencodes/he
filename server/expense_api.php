<?php
$conn = mysql_connect('localhost','root','')or die(mysql_error());
$db = mysql_select_db('monthly_expense')or die(mysql_error());
$sql = "SELECT * FROM expense";
$query = mysql_query($sql)or die(mysql_error());
$data = array();
while ($row = mysql_fetch_object($query)) {
	$data['expense'][] = $row;	
}
echo json_encode($data);