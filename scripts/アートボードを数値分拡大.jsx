(function() {
    if (app.documents.length === 0) {
        alert("ドキュメントが開かれていません。");
        return;
    }

    var input = prompt("アートボードの各辺から拡大する数値を入力してください（ポイント）", "10");

    if (input === null) {
        alert("処理をキャンセルしました。");
        return;
    }

    var amount = parseFloat(input);

    if (isNaN(amount) || amount < 0) {
        alert("0以上の数値を入力してください。");
        return;
    }

    var statusWindow = new Window("palette", "処理状況");
    var statusText = statusWindow.add("statictext", undefined, "アートボードを拡大しています...");
    var progressBar = statusWindow.add("progressbar", undefined, 0, 1);
    progressBar.preferredSize = [240, 12];
    statusWindow.show();
    statusWindow.update();

    try {
        var doc = app.activeDocument;
        var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        var rect = artboard.artboardRect;

        artboard.artboardRect = [
            rect[0] - amount,
            rect[1] + amount,
            rect[2] + amount,
            rect[3] - amount
        ];
        progressBar.value = 1;
        statusText.text = "処理が完了しました。";
        statusWindow.update();
    } catch (error) {
        alert("処理中にエラーが発生しました。\n" + error);
        return;
    } finally {
        statusWindow.close();
    }

    alert("アートボードを" + amount + "ポイント拡大しました。");
})();
