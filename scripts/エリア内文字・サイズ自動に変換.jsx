(function() {
    if (app.documents.length === 0) {
        alert("ドキュメントが開かれていません。");
        return;
    }

    var doc = app.activeDocument;
    var sel = doc.selection;

    if (!sel || sel.length === 0) {
        alert("オブジェクトが選択されていません。");
        return;
    }

    var count = 0;

    var statusWindow = new Window("palette", "処理状況");
    var statusText = statusWindow.add("statictext", undefined, "ポイント文字を確認しています...");
    var progressBar = statusWindow.add("progressbar", undefined, 0, sel.length);
    progressBar.preferredSize = [240, 12];
    statusWindow.show();
    statusWindow.update();

    var originalAutoSize;
    try {
        // 現在の「自動サイズ調整」のIllustrator環境設定を一時保存
        originalAutoSize = app.preferences.getBooleanPreference("text/autoSizing");

        // 新しくエリア文字に変換する際、強制的に「自動サイズ調整（下枠ダブルクリック状態）」をONにする
        app.preferences.setBooleanPreference("text/autoSizing", true);

        // 選択されたオブジェクトを1つずつチェック
        for (var i = 0; i < sel.length; i++) {
            statusText.text = "選択項目を処理しています... (" + (i + 1) + "/" + sel.length + ")";
            progressBar.value = i;
            statusWindow.update();

            var item = sel[i];

            // 選択されたオブジェクトが「ポイント文字」の場合のみ処理を実行
            if (item.typename === "TextFrame" && item.kind === TextType.POINTTEXT) {
                // エリア内文字に変換（このとき自動サイズ調整が自動で付与されます）
                item.convertPointObjectToAreaObject();
                count++;
            }
            progressBar.value = i + 1;
            statusWindow.update();
        }
    } catch (error) {
        alert("処理中にエラーが発生しました。\n" + error);
        return;
    } finally {
        if (originalAutoSize !== undefined) {
            app.preferences.setBooleanPreference("text/autoSizing", originalAutoSize);
        }
        statusWindow.close();
    }

    // 実行結果のお知らせ
    if (count > 0) {
        alert(count + " 個のテキストを「自動サイズ調整つきのエリア内文字」に一括変換しました！");
    } else {
        alert("選択範囲内に変換対象の「ポイント文字」が見つかりませんでした。\n（すでにエリア内文字になっている可能性があります）");
    }
})();
