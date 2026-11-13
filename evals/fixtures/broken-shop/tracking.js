// Marketing + analytics bootstrap (loaded in <head> on every page)
(function () {
  var s = document.createElement("script");
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-BREWBARN9"; s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag("js", new Date()); gtag("config", "G-BREWBARN9");
  document.cookie = "_ga=GA1.1." + Math.floor(Math.random()*1e9) + "." + Math.floor(Date.now()/1000) + "; Max-Age=63072000; Path=/";

  var f = document.createElement("script");
  f.src = "https://connect.facebook.net/en_US/fbevents.js"; f.async = true;
  document.head.appendChild(f);
  document.cookie = "_fbp=fb.1." + Date.now() + "." + Math.floor(Math.random()*1e9) + "; Max-Age=7776000; Path=/";

  var h = document.createElement("script");
  h.src = "https://static.hotjar.com/c/hotjar-3141592.js?sv=6"; h.async = true;
  document.head.appendChild(h);
  try { localStorage.setItem("_hjSessionUser_3141592", JSON.stringify({ id: Math.random().toString(36).slice(2), created: Date.now() })); } catch (e) {}

  // wait for personalization before first paint
  var until = Date.now() + 2500; while (Date.now() < until) {}
})();
