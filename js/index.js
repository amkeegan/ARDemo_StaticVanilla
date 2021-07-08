var QRCode = require('qrcode')

function is_iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function is_android() {
  return navigator.userAgent.toLowerCase().indexOf("android") > -1;
}

window.IS_IOS = is_iOS();
window.IS_ANDROID = is_android();

if(window.IS_IOS == false && window.IS_ANDROID == false)
{
  var canvas = document.getElementById("canvas");
  QRCode.toCanvas(canvas, window.location.href, function(error){
    if(error) {console.error(error);}
    console.log('success!');
  })
}

var ios_models = [
  '/models/apple/toy_biplane.usdz'
];

function createDiv(filename) {
  var tmpContent = document.getElementById("body_content");
  var newContent = document.createElement('div');
  
  var file = filename.replace('usdz','jpg');

  var img_tag = "<img class=\"image-model\" src=\"" + file + "\" alt =\"\">";
  var a_tag = "<a rel=\"ar\" href=\"" + filename + "\">";

  newContent.innerHTML = a_tag + img_tag;
  
  tmpContent.appendChild(newContent.firstChild);
  tmpContent.classList.add("card");  
}

if(window.IS_IOS)
{
  ios_models.forEach(createDiv); 
  var tmp_title = document.getElementById("title");
  tmp_title.innerHTML = "<h3>iOS Models</h3>";

  document.getElementById("canvas").remove();
}
else if(window.IS_ANDROID)
{
  var tmpContent = document.getElementById("body_content");
  tmpContent.innerHTML = "";

  var tmp_title = document.getElementById("title");
  tmp_title.innerHTML = "<h3>Android Models</h3>";
}
else
{
  var tmpContent = document.getElementById("body_content");
  var newContent = document.createElement('div');
  newContent.innerHTML = "<h3>Scan the QR code with your Apple mobile device to access content.</h3>";
  tmpContent.appendChild(newContent.firstChild);
  tmpContent.classList.add("qrcode");
}