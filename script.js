const photos=[
["assets/images/celebration/photo-01.jpg","Celebrating Onam Together"],
["assets/images/celebration/photo-02.jpg","Onam Moments"],
["assets/images/celebration/photo-03.jpg","A Frame to Remember"],
["assets/images/celebration/photo-04.jpg","Team Onam Moments"],
["assets/images/celebration/photo-05.jpg","Onam Memories Together"],
["assets/images/celebration/photo-06.jpg","Our Onam Gathering"],
["assets/images/celebration/photo-07.jpg","Onam Moments"],
["assets/images/celebration/photo-08.jpg","Team Onam Moments"],
["assets/images/celebration/photo-09.jpg","Onam Moments"],
["assets/images/celebration/photo-10.jpg","One Team, Many Memories"]
];

const galleryGrid=document.getElementById("galleryGrid");
galleryGrid.innerHTML=photos.map((p,i)=>`<article class="card" data-index="${i}"><img src="${p[0]}" data-fallback="assets/images/celebration/photo-${String(i+1).padStart(2,"0")}-placeholder.svg" alt="${p[1]}" loading="${i<2?"eager":"lazy"}"><div class="shade"></div><div class="card-info"><b>${p[1]}</b></div></article>`).join("");

document.querySelectorAll(".card img").forEach(img=>img.addEventListener("error",()=>{img.onerror=null;img.src=img.dataset.fallback;}));
const heroImage=document.querySelector(".hero-art");
heroImage.addEventListener("error",()=>{heroImage.onerror=null;heroImage.src=heroImage.dataset.fallback;});

const menuButton=document.getElementById("menuButton"),mobileMenu=document.getElementById("mobileMenu"),menuClose=document.getElementById("menuClose");
function openMenu(){mobileMenu.classList.add("open");mobileMenu.setAttribute("aria-hidden","false");menuButton.setAttribute("aria-expanded","true");document.body.classList.add("menu-open");}
function closeMenu(){mobileMenu.classList.remove("open");mobileMenu.setAttribute("aria-hidden","true");menuButton.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");}
menuButton.addEventListener("click",openMenu);menuClose.addEventListener("click",closeMenu);
document.querySelectorAll(".mobile-link").forEach(link=>link.addEventListener("click",closeMenu));

document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();closeLightbox();}});

const lightbox=document.getElementById("lightbox"),lightImage=document.getElementById("lightImage"),lightTitle=document.getElementById("lightTitle"),lightCount=document.getElementById("lightCount"),lightClose=document.getElementById("lightClose"),prev=document.getElementById("prev"),next=document.getElementById("next");
let current=0;
function showPhoto(index){current=(index+photos.length)%photos.length;lightImage.onerror=()=>{lightImage.onerror=null;lightImage.src=`assets/images/celebration/photo-${String(current+1).padStart(2,"0")}-placeholder.svg`;};lightImage.src=photos[current][0];lightImage.alt=photos[current][1];lightTitle.textContent=photos[current][1];lightCount.textContent=`${current+1} / ${photos.length}`;}
function openLightbox(index){showPhoto(index);lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.classList.add("menu-open");}
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.classList.remove("menu-open");}
document.querySelectorAll(".card").forEach(card=>card.addEventListener("click",()=>openLightbox(Number(card.dataset.index))));
lightClose.addEventListener("click",closeLightbox);prev.addEventListener("click",()=>showPhoto(current-1));next.addEventListener("click",()=>showPhoto(current+1));lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
let touchStartX=0;lightbox.addEventListener("touchstart",e=>touchStartX=e.touches[0].clientX,{passive:true});lightbox.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-touchStartX;if(Math.abs(dx)>45)showPhoto(current+(dx<0?1:-1));},{passive:true});

window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("hide"),750));
