<?php
error_reporting(0);
$hostname = "phonegapdb.db.9319505.hostedresource.com";
$username = "phonegapdb";
$dbname = "phonegapdb";
$password = 'Server123#';
//These variable values need to be changed by you before deploying
/*if ($_SERVER['HTTP_HOST']='localhost') {
	$hostname = "localhost";
	$username = "root";
	$dbname = "monthly_expense";
	$password = ''; 
}*/

      
//Connecting to your database
mysql_connect($hostname, $username, $password) OR DIE ("Unable to connect to database! Please try again later.");
mysql_select_db($dbname);
//Server Request Params
$param = array();
if (isset($_POST['action'])) {
    $param = $_POST;
}
if (isset($_GET['action'])){
	$param = $_GET;
}
$date = date_create($param[date]);
$day = date_format($date, 'd');
$month = date_format($date, 'm');
$year = date_format($date, 'Y');
$data = array();
function listData($device_id,$subquery,$param) {
	
	$sql = "SELECT *,DATE(`date`) as fdate,DATE_FORMAT(date,'%d') as fday,DATE_FORMAT(date,'%b') as fmonth,DATE_FORMAT(date,'%Y') as fyear, DATE_FORMAT(date,'%h:%i %p') as ftime  FROM expense WHERE device_id='".$device_id."' ";
	if ($param['filter']!='') {
		$sql .=" AND payment_mode='$param[filter]' ";
	}
	
	$sql .= $subquery ." ORDER BY date DESC";
	//$data['query'] = $sql;
	$query = mysql_query($sql)or die(mysql_error());
	
	$total = 0;
	while ($row = mysql_fetch_object($query)) {
		$data['expense'][] = $row;	
	}
	return $data;	
}
function addExpense($deviceId,$param) {
	//print_r($param);
	if ($param[id]!='') {
		$sql = "UPDATE  `expense`  SET `amount` = '".$param[amount]."', `payment_mode`='".$param[payment_method]."', `note`='".$param[note]."', `date`='".$param[date]."' WHERE id='$param[id]' and device_id='$deviceId'"; 
	}else{	
	    $sql = "INSERT INTO  `expense` (`id`, `amount`, `payment_mode`, `note`, `date`, `device_id`) 
			VALUES (NULL, '".$param[amount]."', '".$param[payment_method]."', '".$param[note]."', '".$param[date]."', '".$deviceId."');";
	}
	//echo  $sql;
	if (mysql_query($sql)) {
		return true;
	}
	return  false;	
}
function remove($deviceid,$id) {
	$sql = "DELETE FROM  `expense` WHERE id IN($id) and device_id='$deviceid'";
	$data['query'] = $sql;
	if(mysql_query($sql)){
		return true;
	}
	return false;
}
function update($param) {
	//echo  $sql;
	if (mysql_query($sql)) {
		return true;
	}
	return  false;
}

function createLog($text) {
	$sql = "INSERT INTO  `log` (`id`, `text`) VALUES (NULL, '$text');";
			mysql_query($sql);
}
$deviceId = $param['device_id'];
$data['device_id'] = $deviceId;
switch ($param[action]) {
	case 'daily':
		$subQuery = " AND MONTH(`date`) =".$month." AND DAY(`date`) = ".$day." AND YEAR(`date`)= ".$year;
		$data = listData($deviceId,$subQuery,$param);
	break;
	case 'monthly':
		$subQuery = " AND MONTH(`date`) = ".$month." AND YEAR(`date`)= ".$year."";
		$data = listData($deviceId,$subQuery,$param);
	break;
	case 'yearly':
		$subQuery = " AND YEAR(`date`)= ".$year;
		$data = listData($deviceId,$subQuery,$param);
	break;
	case 'all':
		$subQuery = "";
		$data = listData($deviceId,$subQuery,$param);
	break;
	case 'add':
		addExpense($deviceId,$param);
		$subQuery = " AND MONTH(`date`) =".$month." AND DAY(`date`) = ".$day." AND YEAR(`date`)= ".$year;
		$data = listData($deviceId,$subQuery);	
	break;
	case 'delete':
		remove($deviceId,$param[items]);	
	break;	
	default:
		$subQuery = " AND MONTH(`date`) =".$month." AND DAY(`date`) = ".$day." AND YEAR(`date`)= ".$year;
		$data = listData($deviceId,$subQuery);
	break;
}
$encodeddata =  json_encode($data);
echo $param['jsonp_callback'] . '(' . $encodeddata . ')';