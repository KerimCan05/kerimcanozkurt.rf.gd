 <?php
 header('Content-Type: application/json');
 header('Access-Control-Allow-Origin: https://kerimcanozkurt.rf.gd');

 try {
     require_once 'config.php';
     if (!defined('LASTFM_API_KEY')) {
         throw new Exception('API key not defined in config.php');
     }
     $apiKey = LASTFM_API_KEY;
 } catch (Exception $e) {
     error_log('Config Error: ' . $e->getMessage());
     http_response_code(500);
     echo json_encode(['error' => 'Server configuration error']);
     exit;
 }

 $username = 'necobey_';

 $cacheFile = 'lastfm-cache.json';
 $cacheTime = 30;
 if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTime) {
     echo file_get_contents($cacheFile);
     exit;
 }

 $url = "https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=$username&api_key=$apiKey&format=json&limit=1";

 $ch = curl_init();
 curl_setopt($ch, CURLOPT_URL, $url);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($ch, CURLOPT_HTTPHEADER, ['User-Agent: InfinityFreeLastFmApp/1.0']);
 $response = curl_exec($ch);
 $curlError = curl_error($ch);
 curl_close($ch);

 if ($response === false) {
     error_log('cURL Error: ' . $curlError);
     http_response_code(500);
     echo json_encode(['error' => 'Failed to fetch Last.fm data']);
 } else {
     file_put_contents($cacheFile, $response); // Cache response
     echo $response;
 }
 ?>