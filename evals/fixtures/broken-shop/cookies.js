// Cookie bar
document.addEventListener("DOMContentLoaded", function () {
  var bar = document.getElementById("cookie-bar");
  if (document.cookie.indexOf("cookies_ok=") === -1) bar.style.display = "block";
  document.getElementById("cookie-accept").onclick = function () {
    document.cookie = "cookies_ok=1; Max-Age=315360000; Path=/";
    bar.style.display = "none";
  };
  document.getElementById("cookie-more").onclick = function () {
    document.getElementById("cookie-settings").style.display = "block";
  };
  document.getElementById("cookie-save").onclick = function () {
    document.cookie = "cookies_ok=1; Max-Age=315360000; Path=/";
    bar.style.display = "none";
  };
});
