$(document).on('click', '.close', function(){
    var parent = $(this).closest('.image_parent');
    parent.find('.image-preview').popover('hide');
    // Hover befor close the preview
    parent.hover(
        function () {
            parent.find('.image-preview').popover('show');
        },
        function () {
            parent.find('.image-preview').popover('hide');
        }
    );
});

$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function(){
        var parent = $(this).closest('.image-preview');
        parent.attr("data-content","").popover('hide');
        parent.find('.image-preview-filename').val("");
        parent.find('.image-preview-clear').hide();
        parent.find('.image-preview-input input:file').val("");
        parent.find(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function (){
        var parent = $(this).closest('.image-preview');
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            parent.find(".image-preview-input-title").text("Change");
            parent.find(".image-preview-clear").show();
            parent.find(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            parent.attr("data-content",$(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});