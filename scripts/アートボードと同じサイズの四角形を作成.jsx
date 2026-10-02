(function() {
    if (app.documents.length === 0) {
        alert("ドキュメントが開かれていません。");
        return;
    }

    var statusWindow = new Window("palette", "処理状況");
    var statusText = statusWindow.add("statictext", undefined, "四角形を作成しています...");
    var progressBar = statusWindow.add("progressbar", undefined, 0, 1);
    progressBar.preferredSize = [240, 12];
    statusWindow.show();
    statusWindow.update();

    try {
        var doc = app.activeDocument;
        var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        var rect = artboard.artboardRect;

        doc.pathItems.rectangle(
            rect[1],
            rect[0],
            rect[2] - rect[0],
            rect[1] - rect[3]
        );
        progressBar.value = 1;
        statusText.text = "処理が完了しました。";
        statusWindow.update();
    } catch (error) {
        alert("処理中にエラーが発生しました。\n" + error);
        return;
    } finally {
        statusWindow.close();
    }

    alert("アートボードと同じサイズの四角形を作成しました。");
})();
