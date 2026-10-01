(function() {
    if (app.documents.length === 0) return;

    var input = prompt("アートボードの各辺から拡大する数値を入力してください（ポイント）", "10");

    if (input === null) return;

    var amount = parseFloat(input);

    if (isNaN(amount) || amount < 0) {
        alert("0以上の数値を入力してください。");
        return;
    }

    var doc = app.activeDocument;
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var rect = artboard.artboardRect;

    artboard.artboardRect = [
        rect[0] - amount,
        rect[1] + amount,
        rect[2] + amount,
        rect[3] - amount
    ];

    alert("アートボードを" + amount + "ポイント拡大しました。");
})();
