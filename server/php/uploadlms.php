<?php
	include_once $_SERVER['DOCUMENT_ROOT']."/define.php";
	include_once $_SERVER['DOCUMENT_ROOT']."/multiarray_diff_concat.php";
	header("Content-Type: application/json; charset=utf-8");

	if ($_SERVER["REQUEST_METHOD"] != "POST") {
		echo '{"error":404}';
		exit();
	}

	// POSTされたJSONデータを文字列として取得
	$body = file_get_contents('php://input');
	// JSONデータがない場合はエラーを返して終了
	if (is_null($body)) {
		echo '{"message":"エラーUP1 : 管理者に報告してください。","success":0}';
		exit();
	}

	// JSON文字列を連想配列に変換
	$json = json_decode($body, true);
	// JSONデータが不正な場合はエラーを返して終了
	if (is_null($json)) {
		echo '{"message":"エラーUP2 : 管理者に報告してください。","success":0}';
		exit();
	}

	// POSTされたデータを解析
	$version = $json["version"];
	if (is_null($version) || version_compare($version, '1.0', '<')) {
		echo '{"message":"ﾁｬﾙDr0ps のバージョンが古いので、更新してください。","success":0}';
		exit();
	}

	$testid = $json["testid"];
	$path = "data/".$testid.".json";

	if (is_file($path)) {
		// 元々解答が保存されていた場合、データを結合する
		$answerkey = file_get_contents($path);
		$answerkey = json_decode($answerkey, true);
		$newAnswerkey = json_decode($json["answerkey"], true);

		foreach($newAnswerkey as $key => $value) {
			// POSTされたデータでループ
			if ($key != "version" && array_key_exists($key, $answerkey)) {
				$answerkey[$key] = multiarray_diff_concat($answerkey[$key], $value);
			} else {
				// データを追加
				$answerkey[$key] = $value;
			}
		}
	} else {
		$answerkey = json_decode($json["answerkey"], true);
		//file_put_contents("log.txt", json_encode($answerkey, JSON_UNESCAPED_UNICODE));
	}

	// ファイルを保存
	$json = json_encode($answerkey, JSON_UNESCAPED_UNICODE);
	file_put_contents($path, $json);

	// 正常に処理が終了したことを返す
	echo '{"message":"ドロップしました！","success":1}';
	exit();
