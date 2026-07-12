/*==================================================
                SELECT ELEMENTS
==================================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section");

const topBtn = document.getElementById("topBtn");


/*==================================================
                MOBILE MENU
==================================================*/

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}


/*==================================================
            CLOSE MENU AFTER CLICK
==================================================*/

navItems.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});


/*==================================================
            ACTIVE NAVIGATION
==================================================*/

window.addEventListener("scroll",()=>{

    let currentSection="";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+currentSection){

            link.classList.add("active");

        }

    });

});


/*==================================================
            SMOOTH SCROLL
==================================================*/

navItems.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});


/*==================================================
            BACK TO TOP BUTTON
==================================================*/

window.addEventListener("scroll",()=>{

    if(!topBtn) return;

    if(window.scrollY>400){

        topBtn.classList.add("show");

    }

    else{

        topBtn.classList.remove("show");

    }

});


if(topBtn){

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*==================================================
            SCROLL REVEAL
==================================================*/

const revealElements=document.querySelectorAll(

    ".stat-card,.model-card,.result-card,.about,.predict"

);

const revealObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

revealElements.forEach(element=>{

    element.classList.add("fade-up");

    revealObserver.observe(element);

});
/*==================================================
            ANIMATED COUNTERS
==================================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        const duration = 2000;

        const start = performance.now();

        function animate(time){

            const progress = Math.min((time - start) / duration,1);

            const value = progress * target;

            if(Number.isInteger(target)){

                counter.textContent = Math.floor(value);

            }

            else{

                counter.textContent = value.toFixed(2);

            }

            if(progress < 1){

                requestAnimationFrame(animate);

            }

            else{

                counter.textContent = Number.isInteger(target)
                    ? target
                    : target.toFixed(2);

            }

        }

        requestAnimationFrame(animate);

        counterObserver.unobserve(counter);

    });

},{
    threshold:0.4
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});


/*==================================================
            IRIS PREDICTION
==================================================*/

const form = document.getElementById("predictionForm");

const resultCard = document.getElementById("result");

const flowerName = document.getElementById("flowerName");

const confidence = document.getElementById("confidence");

if(form){

    form.addEventListener("submit", async function(e){

        e.preventDefault();

        const button = form.querySelector("button");

        const originalText = button.textContent;

        button.disabled = true;

        button.textContent = "Predicting...";

        try{

            const response = await fetch("/predict",{

                method:"POST",

                body:new FormData(form)

            });

            const data = await response.json();

            if(data.error){

                throw new Error(data.error);

            }

            flowerName.textContent = data.prediction;

            confidence.textContent =
                `Confidence : ${data.confidence}%`;

            resultCard.classList.add("show");

            resultCard.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

        }

        catch(error){

            flowerName.textContent = "Prediction Failed";

            confidence.textContent = error.message;

            resultCard.classList.add("show");

        }

        finally{

            button.disabled = false;

            button.textContent = originalText;

        }

    });

}


/*==================================================
            PAGE LOADED
==================================================*/

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

    console.log("Iris Flower Classification Ready");

});
/*==============================================
            GENERATE STARS
==============================================*/

const stars = document.querySelector(".stars");

if(stars){

    for(let i=0;i<300;i++){

        const star=document.createElement("div");

        star.className="star";

        const size=Math.random()*4+1;

        star.style.width=size+"px";
        star.style.height=size+"px";

        star.style.left=Math.random()*100+"%";
        star.style.top=Math.random()*100+"%";

        star.style.opacity=Math.random();

        star.style.animationDuration=
            (2+Math.random()*4)+"s";

        star.style.animationDelay=
            Math.random()*5+"s";

        stars.appendChild(star);

    }

}
