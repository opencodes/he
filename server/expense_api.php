<?php
error_reporting(0);
$hostname = "phonegapdb.db.9319505.hostedresource.com";
$username = "phonegapdb";
$dbname = "phonegapdb";
$password = 'Server123#';
//These variable values need to be changed by you before deploying
$hostname = "localhost";
$username = "root";
$dbname = "monthly_expense";
$password = '';       
//Connecting to your database
mysql_connect($hostname, $username, $password) OR DIE ("Unable to connect to database! Please try again later.");
mysql_select_db($dbname);
$conn = mysql_connect('localhost','root','')or die(mysql_error());
$db = mysql_select_db('monthly_expense')or die(mysql_error());
//Server Request Params
$param = array();
if (isset($_POST['action'])) {
	$param = $_POST;
}
if (isset($_GET['action'])){
	$param = $_GET;
}
function listData($device_id,$subquery) {
	
	$sql = "SELECT *, DATE_FORMAT(date,'%b %d %Y') as fdate, DATE_FORMAT(NOW(),'%h:%i %p') as ftime  FROM expense WHERE device_id='".$device_id."' ";
	$sql .= $subquery ." ORDER BY date DESC";
	//echo $sql;
	$query = mysql_query($sql)or die(mysql_error());
	$data = array();
	while ($row = mysql_fetch_object($query)) {
		$data['expense'][] = $row;	
	}
	return $data;	
}
function addExpense($deviceId,$param) {
	//print_r($param);
	$sql = "INSERT INTO  `expense` (`id`, `amount`, `payment_mode`, `note`, `date`, `device_id`) 
			VALUES (NULL, '".$param[amount]."', '".$param[payment_method]."', '".$param[note]."', CURRENT_TIMESTAMP, '".$deviceId."');";
	//echo  $sql;
	if (mysql_query($sql)) {
		return true;
	}
	return  false;	
}

$deviceId = $param['device_id'];
switch ($param[action]) {
	case 'daily':
		$subQuery = "AND MONTH(`date`) = MONTH(NOW()) AND YEAR(`date`)= YEAR(NOW())";
		$data = listData($deviceId,$subQuery);
	break;
	case 'monthly':
		$subQuery = "AND YEAR(`date`)= YEAR(NOW())";
		$data = listData($deviceId,$subQuery);
	break;
	case 'yearly':
		$subQuery = "";
		$data = listData($deviceId,$subQuery);
	break;
	case 'all':
		$subQuery = "";
		$data = listData($deviceId,$subQuery);
	break;
	case 'add':
		addExpense($deviceId,$param);
		$subQuery = "AND MONTH(`date`) = MONTH(NOW()) AND YEAR(`date`)= YEAR(NOW())";
		$data = listData($deviceId,$subQuery);	
	default:
		$subQuery = "AND MONTH(`date`) = MONTH(NOW()) AND YEAR(`date`)= YEAR(NOW())";
		$data = listData($deviceId,$subQuery);
	break;
}
$encodeddata =  json_encode($data);
echo $_GET['callback'] . '(' . $encodeddata . ')';
