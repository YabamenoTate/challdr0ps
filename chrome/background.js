var remnull = (str) => { return (str == null || str == undefined) ? "" : str; };
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
	switch (message.func) {
		case "uploadlmsdata":
			var result = { func: message.func };
			try {
				var response = await fetch("https://challdr0ps.omg-vert.eu.org/uploadlms.php", {
					method: "POST",
					body: JSON.stringify({
						testid: (remnull(message.url.match(/course_[0-9]{7}_query_[0-9]{7}/)) + remnull(message.url.match(/course_[0-9]{7}_drill_[0-9]{7}/))),
						version: chrome.runtime.getManifest()["version"], // ここのバージョンは、答えのデータとしてのバージョンではなく、アップロードできるかを判定するためのバージョン
						answerkey: message.jsonString
					}),
					cache: "no-store"
				});
				result.status = response.status;
				result.body = await response.text();
			} catch (e) {
				result.err = e.message;
			}
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, result);
			});
			break;
		case "downloadlmsdata":
			var result = { func: message.func };
			try {
				var response = await fetch("https://challdr0ps.omg-vert.eu.org/downloadlms.php", {
					method: "POST",
					body: JSON.stringify({
						testid: (remnull(message.url.match(/course_[0-9]{7}_query_[0-9]{7}/)) + remnull(message.url.match(/course_[0-9]{7}_drill_[0-9]{7}/)))
					}),
					cache: "no-store"
				});
				result.status = response.status;
				result.body = await response.text();
			} catch (e) {
				result.err = e.message;
			}
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, result);
			});
			break;
		case "checkdr0pped":
			var result = { func: message.func };
			try {
				var response = await fetch("https://challdr0ps.omg-vert.eu.org/checkdr0pped.php?course=" + remnull(message.url.match(/course_[0-9]{7}/)), {
					method: "GET",
					cache: "no-store"
				});
				result.status = response.status;
				result.body = await response.text();
			} catch (e) {
				result.err = e.message;
			}
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, result);
			});
			break;
	}
});