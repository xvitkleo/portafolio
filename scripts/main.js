function watchForHover() {
    var hasHoverClass = false;
    var container = document.querySelector(".container");
    var lastTouchTime = 0;

    function enableHover() {
        // discard emulated mouseMove events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.classList.add('hasHover');
        hasHoverClass = true;
    }

    function disableHover() {
        if (!hasHoverClass) return;

        container.classList.remove('hasHover');
        hasHoverClass = false;
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}


let anadirTitulo = function(titulo, clase) {
    let span = document.createElement("span");
    titulo.forEach(function(a) {        
        let letra = document.createElement("h1");
        //if(a==titulo[0]) letra.style.color = "white";
        letra.textContent=a;
        span.appendChild(letra);
        span.style.display = "flex";        
    })
    document.querySelector(clase).appendChild(span);
}

watchForHover();
console.log(document.querySelector(".container").className);
if(document.querySelector(".container").className=="container hasHover") {
    anadirTitulo("Leonardo   Porras,".toUpperCase().split(""), ".home_tittle");
    anadirTitulo("Front   End   Developer.".toUpperCase().split(""), ".home_tittle");

    anadirTitulo("Academic".toUpperCase().split(""), ".academic_tittle");
    anadirTitulo("Skills".toUpperCase().split(""), ".skills_tittle");
}
else {
    anadirTitulo("Leonardo".toUpperCase().split(""), ".home_tittle");
    anadirTitulo("Porras,".toUpperCase().split(""), ".home_tittle");
    anadirTitulo("Front    End".toUpperCase().split(""), ".home_tittle");
    anadirTitulo("Developer.".toUpperCase().split(""), ".home_tittle");

    anadirTitulo("Academic".toUpperCase().split(""), ".academic_tittle");
    anadirTitulo("Skills".toUpperCase().split(""), ".skills_tittle");
}

let navs = document.querySelectorAll(".bar_nav_item");
let actual = navs[1];

let actualizarNavItem = function(nav) {
    actual.style.color = "white";
    actual.firstElementChild.firstElementChild.style.color = "white";
    actual.firstElementChild.lastElementChild.style.color = "white";
    actual.style.backgroundColor = "rgb(24,24,24)";
    nav.firstElementChild.firstElementChild.style.color = "rgb(255,88,81)";
    nav.firstElementChild.lastElementChild.style.color = "rgb(255,88,81)";    
    nav.style.filter = "grayscale(0%) opacity(1)";
    nav.style.backgroundColor = "rgb(19, 15, 15)";
    actual = nav;

    let scrollBar = document.querySelector(".scrollbar").firstElementChild;
    switch(nav.firstElementChild.lastElementChild.textContent) {
        case "HOME":
            scrollBar.style.height = "15vh";
            break;
        case "SKILLS":
            scrollBar.style.height = "30vh";
            break;
        case "ACADEMIC":
            scrollBar.style.height = "45vh";
            break;
        case "CONTACT":
            scrollBar.style.height = "60vh";
            break;
    }

}

navs.forEach(nav => nav.addEventListener('click', function(){
    actualizarNavItem(nav);
    console.log(".".concat(nav.textContent.toLowerCase()));
    document.querySelector(".".concat(nav.firstElementChild.lastElementChild.textContent.toLowerCase())).scrollIntoView({
        behavior: 'smooth' 
    })
}));


let navsName = [".home", ".skills", ".academic", ".contact"];
let navActual = 0;
window.addEventListener("wheel", function(e){
    if(e.deltaY>0) {
        if(navActual+1<=3) navActual+=1; 
        nav = document.querySelector(navsName[navActual]);   
        nav.scrollIntoView({
            behavior: 'smooth' 
        })
    }
    else 
    {
        if(navActual-1>=0) navActual-=1;
        nav = document.querySelector(navsName[navActual]);  
        nav.scrollIntoView({ 
            behavior: 'smooth' 
        })
    }
    actualizarNavItem(navs[navActual+1]);
});

let classFaces = ["show-front", "show-right", "show-back", "show-left", "show-top", "show-bottom"]
let instituciones = [["Universidad de Lima", "rgb(243,114,36)"], ["Carmelitas", "rgb(94,34,0)"], ["PachaQtec", "gray"], ["CIIS", "white"], ["Microsoft", "rgb(131,185,78)"], ["WorkUSE", "rgb(238,172,12)"]];
var cube = document.querySelector('.cube');
let cont = 0;

cube.addEventListener("click", function(){
    if(cube.className.includes("random")) 
    {
        returnRotate();
        cube.classList.remove( "random");   
    }
    else {       
        cube.classList.remove( classFaces[cont] );
        cont++;
        if(cont>5) cont = 0;
        cube.classList.add( classFaces[cont] );  
        let academicInfo = document.querySelector(".academic_info");
        academicInfo.firstElementChild.firstElementChild.remove();
        academicInfo.firstElementChild.lastElementChild.remove();
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        p.innerText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptate dicta doloribus earum tempora? Numquam nisi veniam dicta necessitatibus, deserunt, minus similique vel ducimus architecto molestiae, quae deleniti hic obcaecati.";
        h2.textContent=instituciones[cont][0].toUpperCase();
        //h2.style.color = instituciones[cont][1];
        academicInfo.firstElementChild.appendChild(h2);
        academicInfo.firstElementChild.appendChild(p);
        let academic = academicInfo.parentElement;
        academicInfo.remove();
        academic.appendChild(academicInfo);


    }
    
});


function returnRotate() {
    var rotDeg = parseInt(getRotationDegrees(cube));
    console.log(rotDeg);
    var id = setInterval(frame, 10);
    function frame() {
        if (rotDeg == 0) {
        clearInterval(id);
        cube.style = "initial";
        } else {
        if(rotDeg<0) rotDeg++; 
        else rotDeg--;
        console.log(rotDeg);
        cube.style.transform = `translateZ(-100px) rotateX( ${rotDeg}deg)`;
        cube.style.transform = `translateZ(-100px) rotateY( ${rotDeg}deg)`;
        
        }
    }    
}

function getRotationDegrees(element) {
    // get the computed style object for the element
    var style = window.getComputedStyle(element);
    // this string will be in the form 'matrix(a, b, c, d, tx, ty)'
    var transformString = style['-webkit-transform']
                        || style['-moz-transform']
                        || style['transform'] ;
    if (!transformString || transformString == 'none')
        return 0;
    var splits = transformString.split(',');
    // parse the string to get a and b
    var parenLoc = splits[0].indexOf('(');
    var a = parseFloat(splits[0].substr(parenLoc+1));
    var b = parseFloat(splits[1]);
    // doing atan2 on b, a will give you the angle in radians
    var rad = Math.atan2(b, a);
    var deg = 180 * rad / Math.PI;
    // instead of having values from -180 to 180, get 0 to 360
    if (deg < 0) deg += 360;
    return deg;
}


