(function() {
    if (app.documents.length === 0) return;

    var doc = app.activeDocument;
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var rect = artboard.artboardRect;

    doc.pathItems.rectangle(
        rect[1],
        rect[0],
        rect[2] - rect[0],
        rect[1] - rect[3]
    );
})();
