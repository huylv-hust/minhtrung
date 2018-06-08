$(function () {
    $(document).ready(function () {
        $('.summernote').summernote({
            height: 500,
            callbacks: {
                onImageUpload: function (files, editor, $editable) {
                    sendFile(files[0], editor, $editable);
                }
            }
        });

        function sendFile(file, editor, welEditable) {
            data = new FormData();
            data.append("file", file);
            data.append("_token", token);
            data.append("folder", folder);
            $.ajax({
                url: baseUrl + '/upload/summernote',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (url) {
                    $('.summernote').summernote("insertImage", url, 'filename');
                }
            });
        }
    });
});