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

var android_models = [
  '/models/android/duck.glb'
]

function createDiviOS(filename) {
  var tmpContent = document.getElementById("body_content");
  var newContent = document.createElement('div');
  
  var file = filename.replace('usdz','jpg');

  var img_tag = "<img class=\"image-model\" src=\"" + file + "\" alt =\"\">";
  var a_tag = "<a rel=\"ar\" href=\"" + filename + "\">";

  newContent.innerHTML = a_tag + img_tag;
  
  tmpContent.appendChild(newContent.firstChild);
  tmpContent.classList.add("card");  
}

function createDivAndroid(filename) {
  var tmpContent = document.getElementById("body_content");
  var newContent = document.createElement('div');
  
  var model_tag = "<a href=\"intent://arvr.google.com/scene-viewer/1.0?file="+filename+"?mode=ar_preferred&title=Duck&resizable=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://www.google.com;end;\">";
  var file = filename.replace('glb','jpg');
  var img_tag = "<img class=\"image-model\" src=\"" + file + "\" alt =\"\">";
  //var img_tag = "";
  newContent.innerHTML = model_tag + img_tag;
  
  tmpContent.appendChild(newContent.firstChild);
  tmpContent.classList.add("card");  
}

if(window.IS_IOS)
{
  ios_models.forEach(createDiviOS); 
  var tmp_title = document.getElementById("title");
  tmp_title.innerHTML = "<h3>iOS Models</h3>";

  document.getElementById("canvas").remove();
}
else if(window.IS_ANDROID)
{
  android_models.forEach(createDivAndroid); 
  var tmp_title = document.getElementById("title");
  tmp_title.innerHTML = "<h3>Android Models</h3>";

  document.getElementById("canvas").remove();
}
else
{
  var tmpContent = document.getElementById("body_content");
  var newContent = document.createElement('div');
  newContent.innerHTML = "<h3>Scan the QR code with your mobile device to access content.</h3>";
  tmpContent.appendChild(newContent.firstChild);
  tmpContent.classList.add("qrcode");
}