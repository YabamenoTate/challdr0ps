<?php
	include_once $_SERVER['DOCUMENT_ROOT']."/define.php";
	header("Content-Type: application/json; charset=utf-8");

	if ($_SERVER["REQUEST_METHOD"] != "POST") {
		echo '{"error":404}';
		exit();
	}

	// POSTされたJSONデータを文字列として取得
	$body = file_get_contents('php://input');
	// JSONデータがない場合はエラーを返して終了
	if (is_null($body)) {
		echo '{"message":"エラーDL1 : 管理者に報告してください。","success":0}';
		exit();
	}

	// JSON文字列を連想配列に変換
	$json = json_decode($body, true);
	// JSONデータが不正な場合はエラーを返して終了
	if (is_null($json)) {
		echo '{"message":"エラーDL2 : 管理者に報告してください。","success":0}';
		exit();
	}

	// POSTされたデータを解析
	$testid = $json["testid"];
	$path = "data/".$testid.".json";

	if (is_file($path)) {
		// 元々解答が保存されていた場合それを出力する
		$answerkey = file_get_contents($path);
		$result = [
			"message" => "ドロップを受け取りしました！",
			"success" => 1,
			"answerkey" => $answerkey,
		];

		echo json_encode($result, JSON_UNESCAPED_UNICODE);
	} else {
		// 元々解答がなければエラーメッセージを出力する
		echo '{"message":"まだ誰もドロップしていません。","success":0}';
	}
