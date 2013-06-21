<?php
error_reporting(0);
$conn = mysql_connect('localhost','root','')or die(mysql_error());
$db = mysql_select_db('monthly_expense')or die(mysql_error());
//Server Request Params
$params = "";$param = array();
if (isset($_POST)) {
	$params = $_POST['param'];
}elseif (isset($_GET)){
	$params = $_GET['param'];
}
$p1 = explode('&',$params);
foreach ($p1 as $p2){
	$p3 = explode('=',$p2);
	$param[$p3[0]] = $p3[1];
}
function listData() {
	$sql = "SELECT * FROM expense";
	$query = mysql_query($sql)or die(mysql_error());
	$data = array();
	while ($row = mysql_fetch_object($query)) {
		$data['expense'][] = $row;	
	}
	return $data;	
}
function addExpense($param) {
	$sql = "INSERT INTO  `expense` (`id`, `amount`, `payment_mode`, `note`, `date`, `device_id`) 
			VALUES (NULL, '".$param[amount]."', '".$param[payment_method]."', '".$param[note]."', CURRENT_TIMESTAMP, '1221dqwe12e1');";
	if (mysql_query($sql)) {
		return true;
	}
	return  false;	
}

switch ($param[action]) {
	case 'list':
		$data = listData();
	break;
	case 'add':
		$data = addExpense($param);
	
	default:
		$data = listData();
	break;
}
echo json_encode($data);

