// Return 1 if a > b, -1 if a < b, 0 if a == b
var var_compare = function (a, b) {
	if (a === b) {
		return 0;
	} else if (a == null || a == "") {
		return -1;
	} else if (b == null || b == "") {
		return 1;
	}

	var a_components = a.split(".");
	var b_components = b.split(".");

	var len = Math.min(a_components.length, b_components.length);

	// loop while the components are equal
	for (var i = 0; i < len; i++) {
		// A bigger than B
		if (parseInt(a_components[i]) > parseInt(b_components[i])) {
			return 1;
		}

		// B bigger than A
		if (parseInt(a_components[i]) < parseInt(b_components[i])) {
			return -1;
		}
	}

	// If one's a prefix of the other, the longer one is greater.
	if (a_components.length > b_components.length) {
		return 1;
	}

	if (a_components.length < b_components.length) {
		return -1;
	}

	// Otherwise they are the same.
	return 0;
};
var utf8bytes = function (str) {
	var count = 0;
	for (var i = 0; i < str.length; ++i) {
		var cp = str.charCodeAt(i);
		if (cp <= 0x007F) {
			// U+0000 - U+007F
			count += 1;
		} else if (cp <= 0x07FF) {
			// U+0080 - U+07FF
			count += 2;
		} else if (cp <= 0xD7FF) {
			// U+0800 - U+D7FF
			count += 3;
		} else if (cp <= 0xDFFF) {
			// U+10000 - U+10FFFF
			//
			// 0xD800 - 0xDBFF (High Surrogates)
			// 0xDC00 - 0xDFFF (Low Surrogates)
			count += 2;
		} else if (cp <= 0xFFFF) {
			// U+E000 - U+FFFF
			count += 3;
		} else {
			// undefined code point in UTF-16
			// do nothing
		}
	}
	return count;
};
var sha256 = async function (text) {
	const uint8 = new TextEncoder().encode(text);
	const digest = await crypto.subtle.digest('SHA-256', uint8);
	return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('');
};
// https://cdnjs.cloudflare.com/ajax/libs/crc-32/1.2.2/crc32.min.js
var CRC32; !function (n) { "undefined" == typeof DO_NOT_EXPORT_CRC ? "object" == typeof exports ? n(exports) : "function" == typeof define && define.amd ? define(function () { var r = {}; return n(r), r }) : n(CRC32 = {}) : n(CRC32 = {}) }(function (r) { r.version = "1.2.2"; var u = function () { for (var r = 0, n = new Array(256), e = 0; 256 != e; ++e)n[r = e] = r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & (r = 1 & r ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1) ? -306674912 ^ r >>> 1 : r >>> 1; return "undefined" != typeof Int32Array ? new Int32Array(n) : n }(); var n = function (r) { for (var n = 0, e = 0, t = 0, f = new ("undefined" != typeof Int32Array ? Int32Array : Array)(4096), t = 0; 256 != t; ++t)f[t] = r[t]; for (t = 0; 256 != t; ++t)for (e = r[t], n = 256 + t; n < 4096; n += 256)e = f[n] = e >>> 8 ^ r[255 & e]; var o = []; for (t = 1; 16 != t; ++t)o[t - 1] = "undefined" != typeof Int32Array ? f.subarray(256 * t, 256 * t + 256) : f.slice(256 * t, 256 * t + 256); return o }(u), o = n[0], a = n[1], i = n[2], d = n[3], c = n[4], y = n[5], v = n[6], C = n[7], A = n[8], p = n[9], s = n[10], h = n[11], b = n[12], l = n[13], I = n[14]; r.table = u, r.bstr = function (r, n) { for (var e = -1 ^ n, t = 0, f = r.length; t < f;)e = e >>> 8 ^ u[255 & (e ^ r.charCodeAt(t++))]; return ~e }, r.buf = function (r, n) { for (var e = -1 ^ n, t = r.length - 15, f = 0; f < t;)e = I[r[f++] ^ 255 & e] ^ l[r[f++] ^ e >> 8 & 255] ^ b[r[f++] ^ e >> 16 & 255] ^ h[r[f++] ^ e >>> 24] ^ s[r[f++]] ^ p[r[f++]] ^ A[r[f++]] ^ C[r[f++]] ^ v[r[f++]] ^ y[r[f++]] ^ c[r[f++]] ^ d[r[f++]] ^ i[r[f++]] ^ a[r[f++]] ^ o[r[f++]] ^ u[r[f++]]; for (t += 15; f < t;)e = e >>> 8 ^ u[255 & (e ^ r[f++])]; return ~e }, r.str = function (r, n) { for (var e, t = -1 ^ n, f = 0, o = r.length, a = 0; f < o;)t = (a = r.charCodeAt(f++)) < 128 ? t >>> 8 ^ u[255 & (t ^ a)] : a < 2048 ? (t = t >>> 8 ^ u[255 & (t ^ (192 | a >> 6 & 31))]) >>> 8 ^ u[255 & (t ^ (128 | 63 & a))] : 55296 <= a && a < 57344 ? (a = 64 + (1023 & a), e = 1023 & r.charCodeAt(f++), (t = (t = (t = t >>> 8 ^ u[255 & (t ^ (240 | a >> 8 & 7))]) >>> 8 ^ u[255 & (t ^ (128 | a >> 2 & 63))]) >>> 8 ^ u[255 & (t ^ (128 | e >> 6 & 15 | (3 & a) << 4))]) >>> 8 ^ u[255 & (t ^ (128 | 63 & e))]) : (t = (t = t >>> 8 ^ u[255 & (t ^ (224 | a >> 12 & 15))]) >>> 8 ^ u[255 & (t ^ (128 | a >> 6 & 63))]) >>> 8 ^ u[255 & (t ^ (128 | 63 & a))]; return ~t } });
// 負数の剰余（JavaScriptのマイナスゼロの罠を考慮）
var mod = function (a, b) { return ((a % b + 0) + b) % b; };

// 多次元配列の展開
var flatten = function (array, index) {
	// [[“2”, “4”, “6”], [“1”, “3”, “5”, “7”], [“2”, “4”], [“1”, “3”, “5”], [“d”, “b”, “e”, “g”, “h”]]
	// のインデックス3（4番目）を展開すると
	// [["2", "4", "6"], ["1", "3", "5", "7"], ["2", "4"],"1", "3", "5", ["d", "b", "e", "g", "h"]]

	// 新しい配列を作る
	let newArray = [];
	// 元の配列の要素を順に処理する
	for (let i = 0; i < array.length; i++) {
		// インデックスが一致する場合
		if (i === index) {
			// その要素が配列であるかどうかチェックする
			if (Array.isArray(array[i])) {
				// 配列であれば、その要素を展開して新しい配列に追加する
				for (let j = 0; j < array[i].length; j++) {
					newArray.push(array[i][j]);
				}
			} else {
				// 配列でなければ、そのまま新しい配列に追加する
				newArray.push(array[i]);
			}
		} else {
			// インデックスが一致しない場合、そのまま新しい配列に追加する
			newArray.push(array[i]);
		}
	}
	// 新しい配列を返す
	return newArray;
};

// LIタグの記号や番号を取得
var getLiMarkerText = function (liMarkerType, index) {
	switch (liMarkerType) {
		case "lower-alpha":
			liMarkerText = String.fromCharCode(97 + (index % 26)) + ".";
			break;
		case "upper-alpha":
			liMarkerText = String.fromCharCode(65 + (index % 26)) + ".";
			break;
		case "disc":
			liMarkerText = "•";
			break;
		case "circle":
			liMarkerText = "○";
			break;
		case "square":
			liMarkerText = "■";
			break;
		case "decimal":
			liMarkerText = (index + 1) + ".";
			break;
		case "decimal-leading-zero":
			liMarkerText = (index + 1).toString().padStart(2, "0") + ".";
			break;
		case "disclosure-open":
			liMarkerText = "▼";
			break;
		case "disclosure-closed":
			liMarkerText = "▶";
			break;
		case "none":
			liMarkerText = "";
			break;
		case "lower-greek":
			liMarkerText = String.fromCharCode(945 + (index % 24)) + ".";
			break;
		case "armenian":
			liMarkerText = String.fromCharCode(1377 + (index % 38)) + ".";
			break;
		case "georgian":
			liMarkerText = String.fromCharCode(4304 + (index % 33)) + ".";
			break;
		case "lower-armenian":
			liMarkerText = String.fromCharCode(1377 + (index % 38)) + ".";
			break;
		case "upper-armenian":
			liMarkerText = String.fromCharCode(1329 + (index % 38)) + ".";
			break;
		case "hebrew":
			liMarkerText = String.fromCharCode(1488 + (index % 27)) + ".";
			break;
		// 他のタイプも必要に応じて追加
		default:
			liMarkerText = "";
	}
	return liMarkerText;
};

var copylmsdata_timeId = null;
var copylmsdata = function () {
	if (!chrome.runtime?.id) {
		alert(STR_UPDATED_RELOAD);
		return;
	}

	Array.from(document.getElementsByTagName("select")).forEach(
		elem => {
			elem.outerHTML = elem.outerHTML.replace(/<select/g, "<selecta").replace(/<\/select>/g, "</selecta>");
		});
	Array.from(document.getElementsByTagName("selecta")).forEach(
		elem => {
			Array.from(elem.getElementsByTagName("option")).forEach(
				elem2 => {
					elem2.outerHTML = elem2.outerHTML.replace(/<option/g, "<optiona").replace(/<\/option>/g, "</optiona><br>");
				});
		});
	document.querySelectorAll("input[type=text]").forEach(
		elem => {
			elem.insertAdjacentHTML('afterend', "<span class='charutbtemp'>_____</span>");
		});
	document.querySelectorAll("input[type=number]").forEach(
		elem => {
			elem.insertAdjacentHTML('afterend', "<span class='charutbtemp'>_____</span>");
		});
	document.querySelectorAll("input[type=password]").forEach(
		elem => {
			elem.insertAdjacentHTML('afterend', "<span class='charutbtemp'>_____</span>");
		});
	document.querySelectorAll("textarea").forEach(
		elem => {
			elem.insertAdjacentHTML('afterend', "<span class='charutbtemp'>_____</span>");
		});
	document.querySelectorAll("div.permutation-response").forEach(
		elem => {
			elem.outerHTML = "<span class='charutbtemp'>（並び替え問題）</span><script class='charutbtemp'>" + elem.outerHTML + "</script>";
		});


	{
		// 問題番号が消えるのを防ぐため、liのmarkerを反映させる
		var liElements = document.getElementsByTagName("li");
		// 現在の親要素を追跡する変数
		var currentParent = liElements[0].parentNode;
		// インデックスをリセットするための変数
		var index = 0;
		// li要素の数だけループ
		for (let i = 0; i < liElements.length; i++) {
			// 現在のli要素の親要素が前のli要素の親要素と異なる場合、インデックスをリセット
			if (liElements[i].parentNode !== currentParent) {
				currentParent = liElements[i].parentNode;
				index = 0;
			}

			// 以下のコードは同じまま...
			// li要素のstyleを取得
			var liStyle = window.getComputedStyle(liElements[i], "::marker");
			// li要素のmarkerのタイプを取得
			var liMarkerType = liStyle.listStyleType;
			// markerのタイプに応じて、markerの文字列を決定
			let liMarkerText = getLiMarkerText(liMarkerType, index);
			// li要素の先頭に一時的なspan要素を挿入
			var tempSpan = document.createElement("span");
			tempSpan.innerText = liMarkerText;
			tempSpan.classList.add("charutbtemp");
			liElements[i].insertBefore(tempSpan, liElements[i].firstChild);

			// インデックスをインクリメント
			index++;
		}
	}

	var copytxt_tmp = undefined, copytxt = document.getElementsByClassName("querypaper")[0].innerText
		.replace(/\(入力必須\)/g, "").replace(/\(選択必須\)/g, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n \n/g, "\n\n").replace(/\n\u00A0\n/g, "\n\n").trim();
	while (copytxt_tmp != copytxt) {
		copytxt_tmp = copytxt;
		copytxt = copytxt.replace(/\n\n\n/g, "\n\n");
	}

	// JSON出力命令を追加
	copytxt = "Solve these questions and output a JSON array of strings with only the answers as elements. The answers should be considered as a one-dimensional array, basically an ordered sequence from the first to the last, regardless of whether it is a major or minor question. Never create a multidimensional array by dividing the answers by each major gate. However, if there are multiple answers to the same question (the same sub-question), i. e. , multiple choice questions, use an array instead of a string. Arrays are also used for sorting questions. At that time, multiple data must not be enclosed in one quotation mark, so it becomes a multidimensional array. In other words, if there are multiple answers to a single question, only that part of the question will be a multidimensional array, but never a multidimensional array except in special cases such as multiple-choice questions. Also, do not add hyphens or other symbols that are not included in those questions, just because it makes it easier to read. You have to output JSON only. You must not output anything other than JSON. Example: [\"ans1\",[\"a\",\"b\",\"c\"],[1,2,3]]\n\n" + copytxt;
	navigator.clipboard.writeText(copytxt);

	Array.from(document.getElementsByTagName("selecta")).forEach(
		elem => {
			Array.from(elem.getElementsByTagName("optiona")).forEach(
				elem2 => {
					elem2.outerHTML = elem2.outerHTML.replace(/<optiona/g, "<option").replace(/<\/optiona><br>/g, "</option>");
				});
		});
	Array.from(document.getElementsByTagName("selecta")).forEach(
		elem => {
			elem.outerHTML = elem.outerHTML.replace(/<selecta/g, "<select").replace(/<\/selecta>/g, "</select>");
		});
	document.querySelectorAll("script.charutbtemp").forEach(
		elem => {
			elem.outerHTML = elem.innerHTML;
		});
	document.querySelectorAll(".charutbtemp").forEach(
		elem => {
			elem.remove();
		});

	var copylmsdata_txt = document.getElementById("copylmsdata_txt");
	copylmsdata_txt.innerText = "コピーしました！";
	if (copylmsdata_timeId !== null) clearTimeout(copylmsdata_timeId);
	copylmsdata_timeId = window.setTimeout(function () { copylmsdata_txt.innerText = STR_COPY; }, 2000);
};
var pastelmsdata_timeId = null;
var pastelmsdata = async function () {
	var pastelmsdata_txt = document.getElementById("pastelmsdata_txt");
	var str = await navigator.clipboard.readText();
	{
		var i = str.indexOf("["), j = str.lastIndexOf("]");
		if (i < 0 || j < 0 || i >= j) {
			pastelmsdata_txt.innerText = "JSONがコピーされていません。";
			if (pastelmsdata_timeId !== null) clearTimeout(pastelmsdata_timeId);
			pastelmsdata_timeId = window.setTimeout(function () { pastelmsdata_txt.innerText = STR_PASTE; }, 2000);
			return;
		}
		str = str.substring(i, j + 1);
	}
	// JSONの文字列をオブジェクトに変換する
	var data;
	try {
		data = JSON.parse(str.replace(/“/g, "\"").replace(/”/g, "\""));
		for (let i = 0; i < data.length; i++) {
			if (Array.isArray(data[i])) for (let j = 0; j < data[i].length; j++) {
				if (!Array.isArray(data[i][j]) && data[i][j] instanceof String) data[i][j] = data[i][j].replace(/’/g, "'");
			}
			else if (data[i] instanceof String) data[i] = data[i].replace(/’/g, "'");
		}
	} catch {
		pastelmsdata_txt.innerText = "JSONがコピーされていません。";
		if (pastelmsdata_timeId !== null) clearTimeout(pastelmsdata_timeId);
		pastelmsdata_timeId = window.setTimeout(function () { pastelmsdata_txt.innerText = STR_PASTE; }, 2000);
		return;
	}
	try {
		var data_idx = 0;
		var querypaper = document.getElementsByClassName("querypaper")[0];

		// 現在の親要素を追跡する変数
		var currentParent;
		// インデックスをリセットするための変数
		var index = 0;
		// li要素の数だけループ
		var elem = querypaper.childNodes[0], elem2, first = true;
		// querypaperの最初や最後に到達するまで繰り返す
		while (elem !== querypaper) {
			// 下方向に移動する
			elem2 = elem;
			if (first) first = false;
			else elem = elem.nextSibling;
			if (elem) {
				var inner = elem.innerText;
				if (inner != undefined) inner = inner.replace(/’/g, "'");
				LABEL1: switch (elem.tagName) {
					case "LI":
						if (elem.tagName == "LI") {
							// 現在のli要素の親要素が前のli要素の親要素と異なる場合、インデックスをリセット
							if (elem.parentNode !== currentParent) {
								currentParent = elem.parentNode;
								index = 0;
							}
							// li要素のstyleを取得
							var liStyle = window.getComputedStyle(elem, "::marker");
							// li要素のmarkerのタイプを取得
							var liMarkerType = liStyle.listStyleType;
							// li要素のmarkerの文字列を初期化
							let liMarkerText = getLiMarkerText(liMarkerType, index);
							inner = liMarkerText + inner;
							// インデックスをインクリメント
							index++;
						}
						if (Array.isArray(data[data_idx])) {
							// 配列が見つかった場合
							if (elem.querySelector("input[type='checkbox']") == null) {
								// 単一選択（１つの選択肢内に配列内の文字列が順番に全て出た場合選択する）
								var idxof = -1, flag = true;
								data[data_idx].forEach(d => {
									if (flag && inner.indexOf(d) > idxof) {
										idxof = inner.indexOf(d);
									} else flag = false;
								});
								if (flag) {
									var ch = elem.getElementsByTagName("INPUT")[0];
									ch.checked = true;
									ch.dispatchEvent(new Event("change"));
								}
							} else {
								// 複数選択（配列内の全ての選択肢を選択する）
								// 貼り付ける選択肢が数値のみの場合、文字列の選択肢内の番号で判別するため、startsWithにする（3. sin^2\theta という選択肢に「2」という文字列がマッチするのを防ぐ）
								data[data_idx].forEach(d => {
									if ((typeof d === "number" || d.match(/^[0-9]+$/)) ? inner.startsWith(d) : inner.includes(d)) {
										var ch = elem.getElementsByTagName("INPUT")[0];
										ch.checked = true;
										ch.dispatchEvent(new Event("change"));
									}
								});
							}
						} else {
							// 配列でなかった場合（単一選択 or 複数選択）
							// 貼り付ける選択肢が数値のみの場合、文字列の選択肢内の番号で判別するため、startsWithにする（3. sin^2\theta という選択肢に「2」という文字列がマッチするのを防ぐ）
							if ((typeof data[data_idx] === "number" || data[data_idx].match(/^[0-9]+$/)) ? inner.startsWith(data[data_idx]) : inner.includes(data[data_idx])) {
								var ch = elem.getElementsByTagName("INPUT")[0];
								ch.checked = true;
								ch.dispatchEvent(new Event("change"));
							}
						}
						break;
					case "SELECT":
						if (Array.isArray(data[data_idx]))
							// SELECTは単一選択であるため、配列になっている場合は展開
							data = flatten(data, data_idx);

						elem.selectedIndex = Array.from(elem.options).findIndex(e => e.textContent.includes(data[data_idx]));
						elem.dispatchEvent(new Event("change"));
						data_idx++;
						break;
					case "INPUT":
						switch (elem.getAttribute("TYPE").toUpperCase()) {
							case "TEXT":
							case "NUMBER":
								break;
							default:
								break LABEL1;
						}
					case "TEXTAREA":
						if (Array.isArray(data[data_idx]))
							// テキストボックスは単一であるため、配列になっている場合は展開
							data = flatten(data, data_idx);

						elem.value = data[data_idx];
						elem.dispatchEvent(new Event("change"));
						data_idx++;
						break;
					case "DIV":
						if (elem.classList.contains("permutation-choice")) {
							// 並び替え問題
							data[data_idx].forEach(permValue => {
								var toClick = null;
								index = 0;
								Array.from(elem.getElementsByTagName("li")).forEach(lab => {
									var labcontent = lab.textContent;
									// li要素のstyleを取得
									var liStyle = window.getComputedStyle(elem, "::marker");
									// li要素のmarkerのタイプを取得
									var liMarkerType = liStyle.listStyleType;
									// li要素のmarkerの文字列を初期化
									let liMarkerText = getLiMarkerText(liMarkerType, index);
									labcontent = liMarkerText + labcontent;
									// インデックスをインクリメント
									index++;
									// ラベルを探し出し、並び替えの順番ならクリック
									// AIに解かせる際に、選択肢の番号も含めて判定できるため、label単位ではなく、それらを囲むliタグ全体を判定する。
									if (labcontent.includes(permValue)) {
										if (lab.closest(".permutation-chosen") == null && (toClick == null || toClick.textContent.length > lab.textContent.length))
											toClick = lab;
									}
								});
								if (toClick != null) {
									// toClick.click();
									toClick.closest("[onclick]").dispatchEvent(new Event("click"));
								}
							});
							data_idx++;
						}
						break;
				}
				if (elem.childNodes.length > 0 &&
					elem.getElementsByTagName("INPUT").length + elem.getElementsByTagName("SELECT").length > 0) {
					elem = elem.childNodes[0];
					first = true;
				}
			} else {
				elem = elem2.parentElement;
				if (elem.tagName == "OL" && elem.getElementsByTagName("INPUT").length > 0) data_idx++;
			}
		}
		pastelmsdata_txt.innerText = "貼り付け完了！";
		if (pastelmsdata_timeId !== null) clearTimeout(pastelmsdata_timeId);
		pastelmsdata_timeId = window.setTimeout(function () { pastelmsdata_txt.innerText = STR_PASTE; }, 1000);
	} catch (err) {
		pastelmsdata_txt.innerText = "貼り付けに失敗しました。";
		if (pastelmsdata_timeId !== null) clearTimeout(pastelmsdata_timeId);
		pastelmsdata_timeId = window.setTimeout(function () { pastelmsdata_txt.innerText = STR_PASTE; }, 2000);
	}
};
var importlmsdata;
if (window.showOpenFilePicker == undefined)
	importlmsdata = async function () {
		if (!chrome.runtime?.id) {
			alert(STR_UPDATED_RELOAD);
			return;
		}

		try {
			filePicker = document.getElementById("yabameno-tate-charu-file-picker");
			if (filePicker == null) {
				document.body.insertAdjacentHTML('beforeend', '<input type="file" id="yabameno-tate-charu-file-picker" accept=".json" hidden>');
				filePicker = document.getElementById("yabameno-tate-charu-file-picker");
			}
			filePicker.click(); // ファイル選択ダイアログを開く
			filePicker.onchange = async function () {
				const file = filePicker.files[0]; // 選択されたファイルを取得する
				importlmsdata_open(await file.text());
			};
		} catch (err) {
			console.error(err.name, err.message);
		}
	};
else
	importlmsdata = async function () {
		if (!chrome.runtime?.id) {
			alert(STR_UPDATED_RELOAD);
			return;
		}

		try {
			const [handle] = await window.showOpenFilePicker({
				types: [
					{
						accept: {
							'application/json': [
								'.json'
							]
						}
					}
				]
			});
			const file = await handle.getFile();
			importlmsdata_open(await file.text());
		} catch (err) {
			if (err.name !== 'AbortError')
				console.error(err.name, err.message);
		}
	};
var importlmsdata_open = async function (text) {
	try {
		// JSONの文字列をオブジェクトに変換する
		const data = JSON.parse(text);
		if (var_compare(data["version"], chrome.runtime.getManifest()["version"]) > 0) {
			alert("ﾁｬﾙDr0Ps のバージョンが古いので、最新のバージョンをインストールしてください。");
			return;
		}

		var querypaper = document.getElementsByClassName("querypaper")[0];
		if (data["radio"] !== undefined) {
			//for (var d = 0; d < data["radio"].length; d++) { var tmp = data["radio"][d];
			data["radio"].forEach(async tmp => {
				var radios = querypaper.querySelectorAll("input[type='radio']");
				for (var i = 0; i < radios.length; i++) {
					// ラジオボタンに対応するラベルを取得
					var label = querypaper.querySelector("label[for='" + radios[i].id + "']");
					// ラジオボタンの前の文字列を取得
					var prevText = getSiblingText(radios[i], 1, querypaper);
					// ラジオボタンの後の文字列を取得
					var nextText = getSiblingText(radios[i], 2, querypaper);
					if (label.textContent === tmp["label"] && (prevText.endsWith(tmp["prev"]) || (await sha256(prevText)) == tmp["prev_H"]) && (nextText.startsWith(tmp["next"]) || (await sha256(nextText)) == tmp["next_H"])) {
						radios[i].checked = true;
						radios[i].dispatchEvent(new Event("change"));
					}
				}
			});
			//}
		}
		if (data["checkbox"] !== undefined) {
			data["checkbox"].forEach(async tmp => {
				var checkboxs = querypaper.querySelectorAll("input[type='checkbox']");
				for (var i = 0; i < checkboxs.length; i++) {
					// チェックボックスに対応するラベルを取得
					var label = querypaper.querySelector("label[for='" + checkboxs[i].id + "']");
					// チェックボックスの前の文字列を取得
					var prevText = getSiblingText(checkboxs[i], 1, querypaper);
					// チェックボックスの後の文字列を取得
					var nextText = getSiblingText(checkboxs[i], 2, querypaper);
					if (label.textContent === tmp["label"] && (prevText.endsWith(tmp["prev"]) || (await sha256(prevText)) == tmp["prev_H"]) && (nextText.startsWith(tmp["next"]) || (await sha256(nextText)) == tmp["next_H"])) {
						checkboxs[i].checked = true;
						checkboxs[i].dispatchEvent(new Event("change"));
					}
				}
			});
		}
		if (data["text"] !== undefined) {
			data["text"].forEach(async tmp => {
				var texts = querypaper.querySelectorAll("input[type='text']");
				for (var i = 0; i < texts.length; i++) {
					// テキストボックスの前の文字列を取得
					var prevText = getSiblingText(texts[i], 1, querypaper);
					// テキストボックスの後の文字列を取得
					var nextText = getSiblingText(texts[i], 2, querypaper);
					if ((prevText.endsWith(tmp["prev"]) || (await sha256(prevText)) == tmp["prev_H"]) && (nextText.startsWith(tmp["next"]) || (await sha256(nextText)) == tmp["next_H"])) {
						texts[i].value = tmp["text"];
						texts[i].dispatchEvent(new Event("change"));
					}
				}
			});
		}
		if (data["number"] !== undefined) {
			data["number"].forEach(async tmp => {
				var numbers = querypaper.querySelectorAll("input[type='number']");
				for (var i = 0; i < numbers.length; i++) {
					// テキストボックスの前の文字列を取得
					var prevText = getSiblingText(numbers[i], 1, querypaper);
					// テキストボックスの後の文字列を取得
					var nextText = getSiblingText(numbers[i], 2, querypaper);
					if ((prevText.endsWith(tmp["prev"]) || (await sha256(prevText)) == tmp["prev_H"]) && (nextText.startsWith(tmp["next"]) || (await sha256(nextText)) == tmp["next_H"])) {
						numbers[i].value = tmp["text"];
						numbers[i].dispatchEvent(new Event("change"));
					}
				}
			});
		}
		if (data["select"] !== undefined) {
			data["select"].forEach(async tmp => {
				var selects = querypaper.querySelectorAll("select");
				for (var i = 0; i < selects.length; i++) {
					// セレクトボックスの前の文字列を取得
					var prevText = getSiblingText(selects[i], 1, querypaper);
					// セレクトボックスの後の文字列を取得
					var nextText = getSiblingText(selects[i], 2, querypaper);
					if ((prevText.endsWith(tmp["prev"]) || (await sha256(prevText)) == tmp["prev_H"]) && (nextText.startsWith(tmp["next"]) || (await sha256(nextText)) == tmp["next_H"])) {
						selects[i].selectedIndex = Array.from(selects[i].options).findIndex(e => e.innerText === tmp["text"]);
						selects[i].dispatchEvent(new Event("change"));
					}
				}
			});
		}
		if (data["permutation"] !== undefined) {
			data["permutation"].forEach(async tmp => {
				var permutations = querypaper.querySelectorAll(".permutation-choice");
				for (var i = 0; i < permutations.length; i++) {
					// 並び替え問題の前の文字列を取得
					var prevText = getSiblingText(permutations[i], 1, querypaper);
					// 並び替え問題の後の文字列を取得
					var nextText = getSiblingText(permutations[i], 2, querypaper);
					if ((prevText.endsWith(tmp["prev"]) || (await sha256(prevText)) == tmp["prev_H"]) && (nextText.startsWith(tmp["next"]) || (await sha256(nextText)) == tmp["next_H"])) {
						tmp["permValues"].forEach(permValue => {
							// 「permValues」が並び替え文字列の配列で、並び替え順にループ
							var toClick = null;
							Array.from(permutations[i].getElementsByTagName("label")).forEach(lab => {
								// ラベルを探し出し、並び替えの順番ならクリック
								// 選択肢の順番は人によって変わることがあるが、LMSの仕様で選択肢の番号と選択肢は別の要素にあるため、labelの文字列が完全一致かどうかで判定できる。
								if (lab.textContent === permValue) {
									if (lab.closest(".permutation-chosen") == null && (toClick == null || toClick.textContent.length > lab.textContent.length))
										toClick = lab;
								}
							});
							if (toClick != null) {
								// toClick.click();
								toClick.closest("[onclick]").dispatchEvent(new Event("click"));
							}
						});
					}
				}
			});
		}
	} catch (err) {
		alert("ファイルの読み込みに失敗しました。選択されたファイルがJSON形式であるかを確認してください。");
	}
};
// inputの前後の文字列を取得する関数を定義
var getSiblingText = function (elem, direction, querypaper) {
	// 文字列を格納する変数を作成
	var text = "";
	var elem2;
	var TBCount = 0;
	// querypaperの最初や最後に到達するか、hrタグに到達するかまで繰り返す
	while (elem !== querypaper && elem.tagName !== "HR") {
		// 指定された方向に移動する
		elem2 = elem;
		elem = direction == 1 ? elem.previousSibling : elem.nextSibling;
		if (elem) {
			// 要素がinputやlabelなら、スキップする
			if (elem.tagName === "INPUT") {
				switch (elem.getAttribute("type")) {
					case "text":
					case "number":
					case "password":
						TBCount++;
				}
			} else while (elem.tagName !== "LABEL" && elem.tagName !== "TEXTAREA" && elem.tagName !== "SELECT" && elem.tagName !== "SCRIPT" &&
				elem.nodeType != 8 && // コメントノード
				(elem.classList === undefined ||
					(
						!elem.classList.contains("permutation-choice") &&
						!elem.classList.contains("permutation-response") &&
						!elem.classList.contains("pointform") &&
						!elem.classList.contains("manaba-explanation") &&
						!elem.classList.contains("answer")))) {
				if (elem.childNodes.length > 0) {
					elem = elem.childNodes[direction == 1 ? elem.childNodes.length - 1 : 0];
					continue;
				}
				var addstr = elem.textContent.trim();
				if (addstr !== "(選択必須)") {
					// 要素のテキストコンテンツを文字列に追加する
					if (direction == 1)
						text = addstr + text;
					else
						text += addstr;
				}
				break;
			}
		} else {
			elem = elem2.parentElement;
		}
	}
	// type=text 等の場合、テキストボックス同士が並ぶことがあるので、指定した要素の前に出現するテキストボックスの個数を追加
	if (direction == 1) text += ",TBCount=" + TBCount;
	// 文字列を返す
	return text;
};
var json_version = chrome.runtime.getManifest()["version"]; // "0.2023.1130.5"
var create_json_from_lmsdata = async function (hashFlag) {
	// 正解のデータを取得
	var data = { version: json_version };

	// querypaperクラスの最初の要素を取得
	var querypaper = document.getElementsByClassName("querypaper")[0];
	// 選択されたラジオボタンを取得
	var radios = querypaper.querySelectorAll("input[type='radio']:checked");
	// ラジオボタンの数だけ繰り返す
	for (var i = 0; i < radios.length; i++) {
		// ラジオボタンに対応するラベルを取得
		var label = querypaper.querySelector("label[for='" + radios[i].id + "']");
		// ラジオボタンの前の文字列を取得
		var prevText = getSiblingText(radios[i], 1, querypaper);
		// ラジオボタンの後の文字列を取得
		var nextText = getSiblingText(radios[i], 2, querypaper);
		// ラベルの文字列と、ラジオボタンの前後の文字列を結果に追加する
		if (data["radio"] === undefined) data["radio"] = [];
		var push = { label: label.textContent };
		if (hashFlag != true || utf8bytes(prevText) < 70) push["prev"] = prevText; else push["prev_H"] = await sha256(prevText);
		if (hashFlag != true || utf8bytes(nextText) < 70) push["next"] = nextText; else push["next_H"] = await sha256(nextText);
		data["radio"].push(push);
	}

	// 選択されたチェックボックスを取得
	var checkboxs = querypaper.querySelectorAll("input[type='checkbox']:checked");
	// チェックボックスの数だけ繰り返す
	for (var i = 0; i < checkboxs.length; i++) {
		// チェックボックスに対応するラベルを取得
		var label = querypaper.querySelector("label[for='" + checkboxs[i].id + "']");
		// チェックボックスの前の文字列を取得
		var prevText = getSiblingText(checkboxs[i], 1, querypaper);
		// チェックボックスの後の文字列を取得
		var nextText = getSiblingText(checkboxs[i], 2, querypaper);
		// ラベルの文字列と、チェックボックスの前後の文字列を結果に追加する
		if (data["checkbox"] === undefined) data["checkbox"] = [];
		var push = { label: label.textContent };
		if (hashFlag != true || utf8bytes(prevText) < 70) push["prev"] = prevText; else push["prev_H"] = await sha256(prevText);
		if (hashFlag != true || utf8bytes(nextText) < 70) push["next"] = nextText; else push["next_H"] = await sha256(nextText);
		data["checkbox"].push(push);
	}

	// テキストボックスを取得
	var texts = querypaper.querySelectorAll("input[type='text']:not(.point)");
	// テキストボックスの数だけ繰り返す
	for (var i = 0; i < texts.length; i++) {
		// テキストボックスの前の文字列を取得
		var prevText = getSiblingText(texts[i], 1, querypaper);
		// テキストボックスの後の文字列を取得
		var nextText = getSiblingText(texts[i], 2, querypaper);
		// 入力文字列と、テキストボックスの前後の文字列を結果に追加する
		if (data["text"] === undefined) data["text"] = [];
		// 正解が複数あってセミコロンで区切られている場合、ハッシュ値を基に何番目の値を用いるか決める
		var ans = texts[i].value.split(";").filter(function (x) { return x.trim() !== ""; });
		var push = { text: ans[mod(CRC32.str(texts[i].value), ans.length)].trim() };
		if (hashFlag != true || utf8bytes(prevText) < 70) push["prev"] = prevText; else push["prev_H"] = await sha256(prevText);
		if (hashFlag != true || utf8bytes(nextText) < 70) push["next"] = nextText; else push["next_H"] = await sha256(nextText);
		data["text"].push(push);
	}

	// テキストボックスを取得
	var numbers = querypaper.querySelectorAll("input[type='number']:not(.point)");
	// テキストボックスの数だけ繰り返す
	for (var i = 0; i < numbers.length; i++) {
		// テキストボックスの前の文字列を取得
		var prevText = getSiblingText(numbers[i], 1, querypaper);
		// テキストボックスの後の文字列を取得
		var nextText = getSiblingText(numbers[i], 2, querypaper);
		// 入力文字列と、テキストボックスの前後の文字列を結果に追加する
		if (data["number"] === undefined) data["number"] = [];
		// 正解が複数あってセミコロンで区切られている場合、ハッシュ値を基に何番目の値を用いるか決める
		var ans = numbers[i].value.split(";").filter(function (x) { return x.trim() !== ""; });
		var push = { text: ans[mod(CRC32.str(numbers[i].value), ans.length)].trim() };
		if (hashFlag != true || utf8bytes(prevText) < 70) push["prev"] = prevText; else push["prev_H"] = await sha256(prevText);
		if (hashFlag != true || utf8bytes(nextText) < 70) push["next"] = nextText; else push["next_H"] = await sha256(nextText);
		data["number"].push(push);
	}

	// セレクトボックスを取得
	var selects = querypaper.querySelectorAll("select");
	// セレクトボックスの数だけ繰り返す
	for (var i = 0; i < selects.length; i++) {
		// セレクトボックスの前の文字列を取得
		var prevText = getSiblingText(selects[i], 1, querypaper);
		// セレクトボックスの後の文字列を取得
		var nextText = getSiblingText(selects[i], 2, querypaper);
		// 選択文字列と、セレクトボックスの前後の文字列を結果に追加する
		if (data["select"] === undefined) data["select"] = [];
		var push = { text: selects[i].options[selects[i].selectedIndex].text };
		if (hashFlag != true || utf8bytes(prevText) < 70) push["prev"] = prevText; else push["prev_H"] = await sha256(prevText);
		if (hashFlag != true || utf8bytes(nextText) < 70) push["next"] = nextText; else push["next_H"] = await sha256(nextText);
		data["select"].push(push);
	}

	// 並び替え問題を取得
	var permutations = querypaper.querySelectorAll(".permutation-response");
	// 並び替え問題の数だけ繰り返す
	for (var i = 0; i < permutations.length; i++) {
		var permValues = Array.from(permutations[i].getElementsByClassName("permutation-response-field")).map(e => e.textContent);
		// 並び替え問題の前の文字列を取得
		var prevText = getSiblingText(permutations[i], 1, querypaper);
		// 並び替え問題の後の文字列を取得
		var nextText = getSiblingText(permutations[i], 2, querypaper);
		// 選択文字列の配列と、並び替え問題の前後の文字列を結果に追加する
		if (data["permutation"] === undefined) data["permutation"] = [];
		var push = { permValues: permValues };
		if (hashFlag != true || utf8bytes(prevText) < 70) push["prev"] = prevText; else push["prev_H"] = await sha256(prevText);
		if (hashFlag != true || utf8bytes(nextText) < 70) push["next"] = nextText; else push["next_H"] = await sha256(nextText);
		data["permutation"].push(push);
	}

	// textarea は、長文問題が多いのでエクスポートしない

	return JSON.stringify(data);
};
var exportlmsdata = async function () {
	if (!chrome.runtime?.id) {
		alert(STR_UPDATED_RELOAD);
		return;
	}

	jsonString = await create_json_from_lmsdata(false);

	if (jsonString.length < "{\"version\":\"\"}".length + json_version.length + 1) {
		alert("取得できるデータがありません。");
		return;
	}

	// ファイルに出力
	var coursename = document.getElementById("coursename").innerText.trim();
	if (coursename.includes("（")) coursename = coursename.substring(0, coursename.indexOf("（"));
	var testname = (new URL(location.href).searchParams.get("answer") || location.href.includes("drill")) > 0 ?
		document.getElementsByClassName("queryframe")[0].getElementsByClassName("title")[0].innerText.replace(/正解はこちら/g, "").trim() :
		(document.getElementsByClassName("gradetitle").length > 0 ? document.getElementsByClassName("gradetitle")[0].textContent.trim() : document.getElementsByClassName("stdlist ")[0].getElementsByClassName("title")[0].innerText.trim());
	if (testname.includes("（")) testname = testname.substring(0, testname.indexOf("（"));
	var filename = coursename + "_" + testname + ".json";

	const blob = new Blob([jsonString], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename; // iOSでは動作しない
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
var ajax_running = false;
var ajax_running_img = chrome.runtime.getURL("common/icon/loading.svg");
var tmp = {};
var uploadlmsdata = async function () {
	if (!chrome.runtime?.id) {
		alert(STR_UPDATED_RELOAD);
		return;
	}

	if (ajax_running) return;
	ajax_running = true;

	jsonString = await create_json_from_lmsdata(true);

	if (jsonString.length < "{\"version\":\"\"}".length + json_version.length + 1) {
		alert("取得できるデータがありません。");
		ajax_running = false;
		return;
	}

	tmp["thisbtn"] = document.getElementById("uploadlmsdata");
	tmp["iconElem"] = tmp["thisbtn"].getElementsByTagName("img")[0];
	tmp["iconElem_img"] = tmp["iconElem"].getAttribute("src");
	tmp["iconElem"].setAttribute("src", ajax_running_img);
	tmp["thisbtn"].classList.add("yabameno-tate-charu-running");
	if (uploadlmsdata_timeId !== null) clearTimeout(uploadlmsdata_timeId);
	tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = "ﾁｬﾙDr0ps に解答をシェアしています...";

	chrome.runtime.sendMessage({ func: "uploadlmsdata", url: location.href, jsonString: jsonString });
};
var downloadlmsdata = function () {
	if (!chrome.runtime?.id) {
		alert(STR_UPDATED_RELOAD);
		return;
	}

	if (ajax_running) return;
	ajax_running = true;

	tmp["thisbtn"] = document.getElementById("downloadlmsdata");
	tmp["iconElem"] = tmp["thisbtn"].getElementsByTagName("img")[0];
	tmp["iconElem_img"] = tmp["iconElem"].getAttribute("src");
	tmp["iconElem"].setAttribute("src", ajax_running_img);
	tmp["thisbtn"].classList.add("yabameno-tate-charu-running");
	if (downloadlmsdata_timeId !== null) clearTimeout(downloadlmsdata_timeId);
	tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = "ﾁｬﾙDr0ps から解答を取得しています...";

	chrome.runtime.sendMessage({ func: "downloadlmsdata", url: location.href });
};
var uploadlmsdata_timeId = null, downloadlmsdata_timeId = null;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	switch (message.func) {
		case "uploadlmsdata":
			if (message.body == null) {
				if (message.err == null || message.err == "Failed to fetch")
					alert("ﾁｬﾙDr0ps のサーバとの通信に失敗しました。インターネットの接続を確認してください。");
				else
					alert(message.err);
				tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = STR_UPLOAD;
			}
			else if (message.status >= 300) {
				alert("ﾁｬﾙDr0ps のサーバエラーです。サーバ管理者に報告してください。");
				tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = STR_UPLOAD;
			} else {
				data = JSON.parse(message.body);
				tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = data["message"];
				uploadlmsdata_timeId = window.setTimeout(function () { tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = STR_UPLOAD; }, 2000);
			}
			tmp["iconElem"].setAttribute("src", tmp["iconElem_img"]);
			tmp["thisbtn"].classList.remove("yabameno-tate-charu-running");
			ajax_running = false;
			break;
		case "downloadlmsdata":
			if (message.body == null) {
				if (message.err == null || message.err == "Failed to fetch")
					alert("ﾁｬﾙDr0ps のサーバとの通信に失敗しました。インターネットの接続を確認してください。");
				else
					alert(message.err);
				tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = STR_DOWNLOAD;
			}
			else if (message.status >= 300) {
				alert("ﾁｬﾙDr0ps のサーバエラーです。サーバ管理者に報告してください。");
				tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = STR_DOWNLOAD;
			} else {
				data = JSON.parse(message.body);
				if (data["success"] > 0)
					importlmsdata_open(data["answerkey"]);
				tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = data["message"];
				downloadlmsdata_timeId = window.setTimeout(function () { tmp["thisbtn"].getElementsByTagName("span")[0].innerHTML = STR_DOWNLOAD; }, 2000);
			}
			tmp["iconElem"].setAttribute("src", tmp["iconElem_img"]);
			tmp["thisbtn"].classList.remove("yabameno-tate-charu-running");
			ajax_running = false;
			break;
		case "checkdr0pped":
			if (message.body != null) {
				data = JSON.parse(message.body);
				if (data["success"] > 0) {
					Array.from(document.getElementsByClassName("stdlist")[0].getElementsByTagName("tr")).forEach((tr) => {
						if (tr.querySelector("img[src*='icon-deadline-on']") != null) { // 課題を提出できる状態なら
							data["result"].forEach((key) => { // ドロップ一覧の結果でループ
								if (tr.querySelector("a[href*='" + key + "']") != null) { // リンク先のIDがドロップ一覧に含まれていたら
									Array.from(tr.getElementsByTagName("td")).forEach((elem) => {
										if (elem.textContent.includes("受付中")) {
											elem.insertAdjacentHTML('beforeend', "<br><span style='color:darkorange;'>★Dr0pあり！</span>");
										}
									});
									return;
								}
							});
						}
					});
				}
			}
			Array.from(document.getElementsByClassName("yabameno-tate-charu-syncing")).forEach((elem) => elem.remove());
			break;
	}
});
const STR_COPY = "自然言語処理用JSON出力命令をコピー",
	STR_PASTE = "AI の回答を貼り付け",
	STR_IMPORT = "解答をインポート（クリック or ドラッグ）",
	STR_EXPORT = "解答をファイルにエクスポート",
	STR_UPLOAD = "解答を ﾁｬﾙDr0ps でみんなにシェア！",
	STR_DOWNLOAD = "ﾁｬﾙDr0ps でパッと解答を出す！",
	STR_UPDATED_RELOAD = "ﾁｬﾙDr0Psが更新されたので、ページを再読み込みしてください。";
window.onload = function () {
	//(function () {
	var lochref = new URL(location.href);
	var dir = lochref.pathname, answerparam = lochref.searchParams.get("answer");

	if (dir.match(/\/ct\/course_[0-9]{7}_query$/)) {
		// 小テスト一覧画面
		var elem = document.getElementsByClassName("stdlist");
		if (elem.length > 0 && elem[0].querySelector("img[src*='icon-deadline-on']") != null) { // 課題を提出できる状態なら
			document.getElementsByTagName("h1")[0].insertAdjacentHTML('beforeend', "<span class='yabameno-tate-charu-syncing' style='font-weight: normal;margin-left:10px;'><img style='margin-right:5px;height:14px;' src='" + ajax_running_img + "'>ﾁｬﾙDr0psに問い合わせ中...</span>");
			chrome.runtime.sendMessage({ func: "checkdr0pped", url: location.href });
		}
		return;
	}

	var querypaper = document.getElementsByClassName("querypaper");
	if (querypaper === undefined) return;
	querypaper = querypaper[0];
	if (querypaper === undefined) return;

	if (dir.match(/\/ct\/course_[0-9]{7}_query_[0-9]{7}_1p1/) || dir.match(/\/ct\/course_[0-9]{7}_drill_[0-9]{7}_queryshow/)) {
		// 小テストページ
		querypaper.insertAdjacentHTML('afterend',
			"<div id='copylmsdata' class='form yabameno-tate-charu-button'><img src='" + chrome.runtime.getURL("common/icon/copy.webp") + "'><span id='copylmsdata_txt'>" + STR_COPY + "</span></div>" +
			"<div id='pastelmsdata' class='form yabameno-tate-charu-button'><img src='" + chrome.runtime.getURL("common/icon/paste.webp") + "'><span id='pastelmsdata_txt'>" + STR_PASTE + "</span></div>" +
			"<p>授業資料をAIに添付すると高得点が狙えます<br>※ 画像・動画は<a target='_blank' href='https://www.cardscanner.co/ja/image-to-text'>画像の文字起こし</a>等を活用。</p>" +
			"<div id='downloadlmsdata' class='form yabameno-tate-charu-button'><img src='" + chrome.runtime.getURL("common/icon/challdr0ps_256.webp") + "'><span>" + STR_DOWNLOAD + "</span></div>" +
			"<div id='importlmsdata' class='form yabameno-tate-charu-button'><img src='" + chrome.runtime.getURL("common/icon/import.webp") + "'>" + STR_IMPORT + "</div>" +
			"<p><a target='_blank' href='https://omg-vert.eu.org/challdr0ps'>ﾁｬﾙDr0ps</a> Ver. " + chrome.runtime.getManifest()["version"] + "</p>");
		document.getElementById("copylmsdata").addEventListener("click", copylmsdata);
		document.getElementById("pastelmsdata").addEventListener("click", pastelmsdata);
		document.getElementById("downloadlmsdata").addEventListener("click", downloadlmsdata);
		var fileArea = document.getElementById("importlmsdata");
		fileArea.addEventListener("click", importlmsdata);
		fileArea.addEventListener('dragover', function (e) {
			e.preventDefault();
			fileArea.classList.add('charu_dragover');
		});
		fileArea.addEventListener('dragleave', function (e) {
			e.preventDefault();
			fileArea.classList.remove('charu_dragover');
		});
		fileArea.addEventListener('drop', async function (e) {
			e.preventDefault();
			fileArea.classList.remove('charu_dragover');
			// ドロップしたファイルの取得
			var files = e.dataTransfer.files;
			if (typeof files[0] !== 'undefined') {
				importlmsdata_open(await files[0].text());
			}
		});
	} else if (dir.match(/\/ct\/course_[0-9]{7}_drill_[0-9]{7}_answerlog_[0-9]{7}/) ||
		(dir.match(/\/ct\/course_[0-9]{7}_query_[0-9]{7}/) && (answerparam > 0 || (!location.href.includes("confirm") && document.getElementsByClassName("correct").length > 0 && document.querySelector(".answer.incorrect") === null))) ||
		((dir.match(/\/ct\/course_[0-9]{7}_drill_[0-9]{7}_queryconfirm/) || dir.match(/\/ct\/course_[0-9]{7}_drill_[0-9]{7}_submitlog_[0-9]{7}/)) && document.getElementsByClassName("correct").length > 0 && document.querySelector(".answer.incorrect") === null)) {
		// 小テスト解答ページ or 全問正解ページ
		querypaper.insertAdjacentHTML('afterend',
			"<div id='uploadlmsdata' class='form yabameno-tate-charu-button'><img src='" + chrome.runtime.getURL("common/icon/challdr0ps_256.webp") + "'><span>" + STR_UPLOAD + "</span></div>" +
			"<div id='exportlmsdata' class='form yabameno-tate-charu-button'><img src='" + chrome.runtime.getURL("common/icon/export.webp") + "'>" + STR_EXPORT + "</div>" +
			"<p>※ ﾁｬﾙDr0ps では、セキュリティ対策として、長文問題やパスワードは出力されません。<br><a target='_blank' href='https://omg-vert.eu.org/challdr0ps'>ﾁｬﾙDr0ps</a> Ver. " + chrome.runtime.getManifest()["version"] + "<br><br></p>");
		document.getElementById("uploadlmsdata").addEventListener("click", uploadlmsdata);
		document.getElementById("exportlmsdata").addEventListener("click", exportlmsdata);
	}
	//})();
};
