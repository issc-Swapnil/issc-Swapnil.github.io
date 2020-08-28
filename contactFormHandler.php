<?php
$name=$_POST['name'];
$email=$_POST['email'];
$subject=$_POST['subject'];
$message=$_POST['message'];

$to_email = 'patilswapnil8956@gmail.com';
		$subject = 'Contact Form';
		$headers ="";
		 
		$htmlTemplate = '<html>  
		<head>
		        <style>
		            table, th, td {
		                border: 1px solid black;
		                border-collapse: collapse;
		              }
		              th, td {
		                padding: 5px;
		                text-align: left;    
		              }
		        </style>
		    </head>
		<body>';

		$htmlTemplate.='<table>
		<thead>
		<th>Name</th>
		<th>Email</th>
		<th>Contact No</th>
		<th>Message</th>
		</thead>';

		$htmlTemplate.='
		<tbody>
		<tr><td>'.$name.'</td><td>'.$email.'</td><td>'.$subject.'</td></tr>
		</tbody>
		</table>
		<h3>Message : </h3>
		 <h4>  '.$message.'</h4>
		</body>
		</html>';

		$headers .= "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		//$headers .= 'From: contact@rdigs.com'; //optional


		mail($to_email,$subject,$htmlTemplate,$headers);

		echo "<script type='text/javascript'>";
		echo "alert('Your Information Succesfully Submited ');";
		echo "window.location.href='../index.html';";
		echo "</script>";
?>