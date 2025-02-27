const open_asideg=document.getElementById("hamburger");
const aside = document.getElementById('aside');
const overlay = document.getElementById('overlay');


open_asideg.addEventListener("click", function(){
    aside.classList.toggle("open_aside");
    overlay.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
}
)