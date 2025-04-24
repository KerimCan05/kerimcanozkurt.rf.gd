document.getElementById("search").onmouseover = function() {search()};
document.getElementById("devs").onmouseover = function() {devs()};
document.getElementById("celer").onmouseover = function() {celer()};
document.getElementById("arus").onmouseover = function() {arus()};
document.getElementById("search").onmouseout = function() {clear()};
document.getElementById("devs").onmouseout = function() {clear()};
document.getElementById("celer").onmouseout = function() {clear()};
document.getElementById("arus").onmouseout = function() {clear()};

function search() {
    document.getElementById("artado").innerHTML = "Açık kaynak kodlu, özelleştirilebilir ve mahremiyetinize önem veren arama motoru.";
}
function devs() {
    document.getElementById("artado").innerHTML = "Artado tarafından sağlanan içerik mağazası. Uygulama, oyun, tema ve eklenti geliştiricilerinin buluşma noktası.";
}
function celer() {
    document.getElementById("artado").innerHTML = "Sade ve mahremiyetinize saygı duyan tarayıcı.";
}
function arus() {
    document.getElementById("artado").innerHTML = "LFS'i temel alan, sadeliğie odaklanmış işletim sistemi.";

}
function clear() {
    document.getElementById("artado").innerHTML = "";
}