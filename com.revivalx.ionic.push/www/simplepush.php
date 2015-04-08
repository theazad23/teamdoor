<?php
//enable it
//$deviceType = 'ios';
//$deviceType = 'android';
 
//operation begin
if($deviceType == 'ios'){
 
$deviceToken = 'APA91bG90GjhfrvqARWKLrMbEGO-LBHqrUsAAlgvl1o8yYVD_73BR_kXGU-b1T6HJM67Hvb96LC6eZUpAT23nTKGWANbHjju3Ti7gkf1GWkAnxDzJlUZnKe2I2GgNhE6IMVAmcfIUOzEokIlV4rQ87o6qjU3eU2imgFE7vRR5';
// Put your device token here (without spaces):
 
// Put your private key's passphrase here:
$passphrase = 'AIzaSyAStXnFcwbYRUZQ1DrqxngfsgJGjP4KHy8';
 
// Put your alert message here:
$message = 'Technovault is awesome!!!';
 
////////////////////////////////////////////////////////////////////////////////
 
$ctx = stream_context_create();
stream_context_set_option($ctx, 'ssl', 'local_cert', 'ck.pem');
stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);
 
// Open a connection to the APNS server
$fp = stream_socket_client(
    'ssl://gateway.sandbox.push.apple.com:2195', $err,
    $errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);
 
if (!$fp)
    exit("Failed to connect: $err $errstr" . PHP_EOL);
 
echo 'Connected to APNS' . PHP_EOL;
 
// Create the payload body
$body['aps'] = array(
    'alert' => $message,
    'sound' => 'default',
    'badge' => 1
    );
 
// Encode the payload as JSON
$payload = json_encode($body);
 
// Build the binary notification
$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;
 
// Send it to the server
$result = fwrite($fp, $msg, strlen($msg));
 
if (!$result)
    echo 'Message not delivered' . PHP_EOL;
else
    echo 'Message successfully delivered' . PHP_EOL;
 
// Close the connection to the server
fclose($fp);
}
else if($deviceType == 'android'){
 
$deviceToken = 'xxxxx';
 
$registrationIds = array($deviceToken);
 
// prep the bundle
$msg = array
(
    'message'       => 'Technovault is awesome!!!',
    'title'         => '[Warning]',
    'subtitle'      => 'This is a subtitle. subtitle',
    'tickerText'    => 'Ticker text here...Ticker text here...Ticker text here',
    'vibrate'   => 1,
    'sound'     => 1
);
 
$fields = array
(
    'APA91bG90GjhfrvqARWKLrMbEGO-LBHqrUsAAlgvl1o8yYVD_73BR_kXGU-b1T6HJM67Hvb96LC6eZUpAT23nTKGWANbHjju3Ti7gkf1GWkAnxDzJlUZnKe2I2GgNhE6IMVAmcfIUOzEokIlV4rQ87o6qjU3eU2imgFE7vRR5'  => $registrationIds,
    'data'              => $msg
);
 
$headers = array
(
    'Authorization: key=' . 'AIzaSyAStXnFcwbYRUZQ1DrqxngfsgJGjP4KHy8',
    'Content-Type: application/json'
);
 
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );
 
echo $result;
}
else {
    echo "Error";
}