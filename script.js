/*==================================================
            VARIABLES
==================================================*/

let currentScreen = 1;

/*==================================================
            NEXT SCREEN
==================================================*/

function nextScreen(next) {

    const current = document.getElementById("screen" + currentScreen);
    const target = document.getElementById("screen" + next);

    if (!target) return;

    if (current) {

        current.classList.remove("active");
        current.style.display = "none";

    }

    target.style.display = "flex";

    setTimeout(() => {

        target.classList.add("active");

    }, 50);

    currentScreen = next;

}

/*==================================================
            TURN ON LIGHTS
==================================================*/

function turnOnLights() {

    const fairy = document.getElementById("fairyLights");

    fairy.innerHTML = "";

    for (let i = 0; i < 25; i++) {

        const bulb = document.createElement("div");

        bulb.className = "light";

        bulb.style.animationDelay =
            (Math.random() * 2) + "s";

        fairy.appendChild(bulb);

    }

    setTimeout(() => {

        nextScreen(6);

    }, 1200);

}

/*==================================================
            FLOATING HEARTS
==================================================*/

function createHeart() {

    const container = document.getElementById("hearts");

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 30) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 5) + "s";

    heart.style.opacity =
        (0.3 + Math.random() * 0.7);

    container.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

/*==================================================
            HEART LOOP
==================================================*/

setInterval(() => {

    createHeart();

}, 500);

/*==================================================
            START WEBSITE
==================================================*/

window.onload = () => {

    document.querySelectorAll(".screen").forEach((screen) => {

        screen.style.display = "none";

        screen.classList.remove("active");

    });

    const first = document.getElementById("screen1");

    first.style.display = "flex";

    first.classList.add("active");

};






/*=========================================
            PLAY MUSIC
=========================================*/

function playMusic(){

    const music = document.getElementById("birthdayMusic");

    if(music){

        music.play().catch(()=>{});

    }

    setTimeout(()=>{

        nextScreen(7);

    },800);

}

/*=========================================
            BALLOONS
=========================================*/

function flyBalloons(){

    const container = document.getElementById("balloons");

    container.innerHTML = "";

    const colors = [

        "#ff4d6d",
        "#4dabff",
        "#ffd43b",
        "#69db7c",
        "#da77f2",
        "#ff922b",
        "#ffffff"

    ];

    for(let i=0;i<35;i++){

        const balloon = document.createElement("div");

        balloon.className = "balloon";

        balloon.style.left = Math.random()*100 + "%";

        balloon.style.background =
        colors[Math.floor(Math.random()*colors.length)];

        balloon.style.animationDuration =
        (6 + Math.random()*5) + "s";

        balloon.style.animationDelay =
        Math.random()*2 + "s";

        balloon.style.width =
        (50 + Math.random()*25) + "px";

        balloon.style.height =
        (70 + Math.random()*35) + "px";

        container.appendChild(balloon);

    }

    setTimeout(()=>{

        nextScreen(8);

    },5000);

}

/*=========================================
            CONFETTI
=========================================*/

function createConfetti(){

    const container =
    document.getElementById("confetti");

    const colors=[

        "#ff4d6d",
        "#ffd43b",
        "#4dabff",
        "#69db7c",
        "#ffffff",
        "#da77f2"

    ];

    for(let i=0;i<180;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"%";

        piece.style.top="-20px";

        piece.style.background=
        colors[Math.floor(Math.random()*colors.length)];

        piece.style.animationDuration=
        (3+Math.random()*3)+"s";

        piece.style.animationDelay=
        Math.random()*2+"s";

        piece.style.transform=
        "rotate("+Math.random()*360+"deg)";

        container.appendChild(piece);

    }

    setTimeout(()=>{

        container.innerHTML="";

    },7000);

}

/*=========================================
            SHOW GALLERY
=========================================*/

function showGallery(){

    createConfetti();

    document.getElementById("screen9")
    .style.display="none";

    const gallery =
    document.getElementById("gallerySection");

    gallery.style.display="block";

    gallery.scrollIntoView({

        behavior:"smooth"

    });

}

/*=========================================
            OPTIONAL
=========================================*/

window.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        const music =
        document.getElementById("birthdayMusic");

        if(music.paused){

            music.play().catch(()=>{});

        }

    }

});









/*==================================================
            LETTER TYPING EFFECT
==================================================*/

function startLetterAnimation() {

    return;

}


/*==================================================
            GALLERY ANIMATION
==================================================*/

function animateGallery() {

    const photos = document.querySelectorAll(".photo");

    photos.forEach((photo, index) => {

        photo.style.opacity = "0";

        photo.style.transform = "translateY(40px)";

        setTimeout(() => {

            photo.style.transition = ".8s";

            photo.style.opacity = "1";

            photo.style.transform = "translateY(0)";

        }, index * 150);

    });

}

/*==================================================
            IMAGE LIGHTBOX
==================================================*/

document.addEventListener("click", function (e) {

    if (!e.target.matches(".photo img")) return;

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,.9)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    const img = document.createElement("img");

    img.src = e.target.src;

    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "20px";
    img.style.boxShadow = "0 0 50px rgba(255,80,80,.5)";

    overlay.appendChild(img);

    overlay.onclick = () => overlay.remove();

    document.body.appendChild(overlay);

});

/*==================================================
            IMPROVED SHOW GALLERY
==================================================*/

const oldShowGallery = showGallery;

showGallery = function () {

    oldShowGallery();

    setTimeout(() => {

        animateGallery();

    }, 300);

}

/*==================================================
            SCREEN OBSERVER
==================================================*/

// const observer = new MutationObserver(() => {

//     if (currentScreen === 9) {

//         startLetterAnimation();

//     }

// });

// observer.observe(document.body, {

//     childList: true,
//     subtree: true

// });

/*==================================================
            PRELOAD IMAGES
==================================================*/

window.addEventListener("load", () => {

    for (let i = 1; i <= 9; i++) {

        const img = new Image();

        img.src = "images/" + i + ".jpg";

    }

});

/*==================================================
            MOBILE TOUCH EFFECT
==================================================*/

document.querySelectorAll(".glowBtn").forEach(btn => {

    btn.addEventListener("touchstart", () => {

        btn.style.transform = "scale(.95)";

    });

    btn.addEventListener("touchend", () => {

        btn.style.transform = "";

    });

});

/*==================================================
            THE END
==================================================*/

console.log("🎂 Birthday Website Loaded Successfully ❤️");