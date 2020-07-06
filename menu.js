function handleFileSelect (e) {
    var files = e.target.files;
    if (files.length < 1) {
        return;
    }
    var file = files[0];

    // The URL API is vendor prefixed in Chrome
    window.URL = window.URL || window.webkitURL;
    // Create a data URL from the image file
    var imageURL = window.URL.createObjectURL(file);
    var image = new Image();

    image.onload = function(){
        let canv = document.getElementById("myCanvas");
        let ctx = canv.getContext("2d"); 
        ctx.drawImage(image, 10, 10);           
    }

    image.src = imageURL;
}

$('#loadImage').click(function(e) {
    $('#file-input').click()});

$('#file-input').change(handleFileSelect);
