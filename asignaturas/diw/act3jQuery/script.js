$(document).ready(function () {
    $("form").countCharacters();
});

$.fn.countCharacters = function () {

    var form = $(this);

    var textAreas = form.find("textarea");

    let textAreasData = [];

    textAreas.each(function () {
        var textArea = $(this);

        var nCaracteres = textArea.val().length;

        let data = {
            "caracteres": nCaracteres,
        }

        textAreasData.push(data);

    });

    form.data("textareas", textAreasData);

    let formData = $("form").data("textareas");

    $.each(textAreas, function (index, textArea) {
        let span = $("<span></span>");

        $(span).text(formData[index].caracteres + " caracteres");

        $(textArea).after(span);

        
    });

};


