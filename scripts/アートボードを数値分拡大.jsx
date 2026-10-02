(function() {
    if (app.documents.length === 0) {
        alert("ドキュメントが開かれていません。");
        return;
    }

    var doc = app.activeDocument;
    var unitName;
    var pointsPerUnit;

    switch (doc.rulerUnits) {
        case RulerUnits.Inches:
            unitName = "インチ";
            pointsPerUnit = 72;
            break;
        case RulerUnits.Centimeters:
            unitName = "センチメートル";
            pointsPerUnit = 72 / 2.54;
            break;
        case RulerUnits.Millimeters:
            unitName = "ミリメートル";
            pointsPerUnit = 72 / 25.4;
            break;
        case RulerUnits.Picas:
            unitName = "パイカ";
            pointsPerUnit = 12;
            break;
        case RulerUnits.Qs:
            unitName = "Q";
            pointsPerUnit = 72 / (25.4 * 4);
            break;
        case RulerUnits.Pixels:
            unitName = "ピクセル";
            pointsPerUnit = 1;
            break;
        case RulerUnits.Points:
            unitName = "ポイント";
            pointsPerUnit = 1;
            break;
        default:
            alert("ドキュメントの単位を判別できません。");
            return;
    }

    var input = prompt("アートボードの各辺から拡大する数値を入力してください（" + unitName + "）", "10");

    if (input === null) {
        alert("処理をキャンセルしました。");
        return;
    }

    var value = input.replace(/^\s+|\s+$/g, "");
    var amount = Number(value);

    if (value === "" || !isFinite(amount) || amount < 0 || !isFinite(amount * pointsPerUnit)) {
        alert("0以上の数値を入力してください。");
        return;
    }

    var amountInPoints = amount * pointsPerUnit;
    var statusWindow = new Window("palette", "処理状況");
    var statusText = statusWindow.add("statictext", undefined, "アートボードを拡大しています...");
    var progressBar = statusWindow.add("progressbar", undefined, 0, 1);
    progressBar.preferredSize = [240, 12];
    statusWindow.show();
    statusWindow.update();

    try {
        var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        var rect = artboard.artboardRect;

        artboard.artboardRect = [
            rect[0] - amountInPoints,
            rect[1] + amountInPoints,
            rect[2] + amountInPoints,
            rect[3] - amountInPoints
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

    alert("アートボードを" + amount + unitName + "拡大しました。");
})();
