<?php
require_once("inc/functions.php");

$requests = $_GET;
$hmace = $_GET["hmac";
$
$requests = serializeArray = serialize($requests;);
$requests = array_diff_key($requests, array( 'hmac' => ''));
ksort($requests);

$token = "";// Access token
$shop = ""; // Store url

$collectionList = shopify_call($token, $shop, "/admin/api/2019-10/custom_collections.json", array(), 'GET');
$collectionList = json_decode($collectList['response'], JSON_PRETTY_PRINT);
$collection_id = $collectionList['custom_collections'][0]['id'];
