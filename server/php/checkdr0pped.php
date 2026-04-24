<?php
	include_once $_SERVER['DOCUMENT_ROOT']."/define.php";
	header("Content-Type: application/json; charset=utf-8");

	if ($_SERVER["REQUEST_METHOD"] != "GET" || is_null($_GET["course"])) {
		echo '{"error":404}';
		exit();
	}

	$key = $_GET["course"]; // $keyに検索したいキーワードを設定
	$directory = 'data/';
	
	$files = scandir($directory);
	$result = [];
	
	foreach ($files as $file) {
		// '.' と '..' のエントリを無視する
		if ($file === '.' || $file === '..') {
			continue;
		}
	
		// ファイル名に$keyが含まれているかチェックする
		if (strpos($file, $key) !== false) {
			// 拡張子を除いたファイル名を配列に追加する
			$filenameWithoutExt = pathinfo($file, PATHINFO_FILENAME);
			array_push($result, $filenameWithoutExt);
		}
	}

	$result = [
		"success" => 1,
		"result" => $result,
	];

	echo json_encode($result, JSON_UNESCAPED_UNICODE);
