<?php
// 配列の要素を再帰的にキーでソートする関数を定義する
function sort_by_key_recursive($array) {
  // 配列でない場合はそのまま返す
  if (!is_array($array)) {
    return $array;
  }
  // 配列のキーを自然順にソートする
  ksort($array);
  // 配列の値をループする
  foreach ($array as $key => $value) {
    // 値が配列の場合は再帰的にソートする
    if (is_array($value)) {
      $array[$key] = sort_by_key_recursive($value);
    }
  }
  // ソートした配列を返す
  return $array;
}

// arr1にarr2を結合する関数を定義する
function multiarray_diff_concat($arr1, $arr2) {
  // arr1の要素をコピーする
  $result = $arr1;
  // arr2の要素をループする
  foreach ($arr2 as $item) {
    // arr1に同じ要素が含まれているかチェックする
    $found = false;
    foreach ($arr1 as $elem) {
      // 配列の要素を再帰的にキーでソートする
      $item_sorted = sort_by_key_recursive($item);
      $elem_sorted = sort_by_key_recursive($elem);
      // serialize関数で配列の要素を文字列に変換する
      $item_str = serialize($item_sorted);
      $elem_str = serialize($elem_sorted);
      // 文字列が一致するかどうかを比較する
      if ($item_str == $elem_str) {
        $found = true;
        break;
      }
    }
    // arr1に同じ要素が含まれていない場合は末尾に追加する
    if (!$found) {
      $result[] = $item;
    }
  }
  // 結果を返す
  return $result;
}

// ＜使い方＞

// // arr1とarr2を定義する
// $arr1 = [
//   ["label" => "a", "prev" => "b", "next" => "c"],
//   ["label" => "d", "prev" => "e", "next" => "f"],
//   ["label" => "g", "prev" => "h", "next" => ["label" => "i"]],
//   ["label" => "j", "prev" => "k", "next" => "l"]
// ];
// $arr2 = [
//   ["label" => "a", "prev" => "b", "next" => "j"],
//   ["prev" => "e", "label" => "d", "next" => "f"],
//   ["prev" => "h", "label" => "g", "next" => ["label" => "i"]]
// ];
// // 関数を呼び出して結果を表示する
// $result = multiarray_diff_concat($arr1, $arr2);
// print_r($result);
// // Array (
// //   [0] => Array ( [label] => a [prev] => b [next] => c )
// //   [1] => Array ( [label] => d [prev] => e [next] => f )
// //   [2] => Array ( [label] => g [prev] => h [next] => Array ( [label] => i ) )
// //   [3] => Array ( [label] => j [prev] => k [next] => l )
// //   [4] => Array ( [label] => a [prev] => b [next] => j )
// // )
?>
