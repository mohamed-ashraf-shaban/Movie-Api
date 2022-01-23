
//============================================satrt jquery===========================================
$(document).ready(function(){
    let menuBoxWidth = $(".side-bar .left-sidebar").outerWidth();
    $(".side-bar").animate({left: `-${menuBoxWidth}`},0);
})

let menuBoxWidth = $(".side-bar .left-sidebar").outerWidth();
$(".side-bar").animate({left: `-${menuBoxWidth}`},0);
  
$("#openBtn").click(function(){
  
      $(".side-bar").animate({left : `0px`} , 1000,()=>{
        $("#links li").eq(0).animate({margin : '0px'} , 1000);
        $("#links li").eq(1).animate({margin : '0px'} , 1000);
        $("#links li").eq(2).animate({margin : '0px'} , 1000);
        $("#links li").eq(3).animate({margin : '0px'} , 1000);
        $("#links li").eq(4).animate({margin : '0px'} , 1000)
      });
      $("#openBtn").addClass("d-none");
      $("#closeBtn").removeClass("d-none");
     
    });

    $("#closeBtn").click(function(){
        $("#links li").eq(0).animate({marginTop : '500px'} , 1000)
        $("#links li").eq(1).animate({marginTop : '250px'} , 1000)
        $("#links li").eq(2).animate({marginTop : '250px'} , 1000)
        $("#links li").eq(3).animate({marginTop : '250px'} , 1000)
        $("#links li").eq(4).animate({marginTop : '250px'} , 1000)
        $(".side-bar").animate({left: `-${menuBoxWidth}`} , 1000);
        $("#closeBtn").addClass("d-none");
        $("#openBtn").removeClass("d-none");
    
    });

// =======================================end jquery==============================================

// ===============================================javascript===============================================

let nowPlayingLink = document.getElementById('nowPlaying')
let pop = document.getElementById("pop")
let topRatedLink = document.getElementById ("topRated")
let trandingLink = document.getElementById('tranding')
let upcomingLink = document.getElementById('upcoming')

let nowPlaying = [];
let topRated = [];
let trending = [] ;
let upcoming = [];
let allMovies = [];
let totalMovies=[]; 

async function getMovies() {
    let x = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k')
    nowPlaying= (await x.json()).results;
    displayMovies(nowPlaying);

}

async function gettopRated(){
    let x = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=18237d7fd58ff3b5638a399d30df53e8&language=en-US&page=1')
    topRated = (await x.json()).results;
    displayMovies (topRated)
}

async function gettrending(){
    let x = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=18237d7fd58ff3b5638a399d30df53e8')
    trending = (await x.json()).results;
    displayMovies (trending)
}

async function getUpcoming(){
    let x = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=18237d7fd58ff3b5638a399d30df53e8&language=en-US&page=1')
    upcoming = (await x.json()).results;
    displayMovies (upcoming)
}

getMovies();
async function getAllPopular() {
    for(let w =1 ; w<=500 ; w++)
    {
        let xx = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=18237d7fd58ff3b5638a399d30df53e8&language=en-US&page=${w}`)
        allMovies= (await xx.json()).results;
        totalMovies.push(allMovies)
    }
    
}

getAllPopular()
nowPlayingLink.addEventListener("click", async function(){
        await getMovies() ;
})

pop.addEventListener ("click", async function (){
   await getAllPopular()
   displayMovies(totalMovies[1])
    
})

topRatedLink.addEventListener ("click", async function (){
    await gettopRated(); 
 })

 trandingLink.addEventListener ("click", async function (){
    await gettrending(); 
 })

 upcomingLink.addEventListener ("click", async function (){
    await getUpcoming(); 
 })

function displayMovies(x) {
    let cartona = ``
    for (let i = 0; i <x.length&& i<20 ; i++) {
        cartona += `
               <div class="col-md-4 mb-4">
                <div class="pic-box">
                <img class="w-100 rounded" src="https://image.tmdb.org/t/p/w500${x[i].poster_path}" />
                  <div class="overlay-pic rounded">
                       <div class="description">
                       <h1>${x[i].title}</h1>
                       <p>${x[i].overview}</p>
                          <span>${x[i].vote_average}</span>
                          <span>${x[i].release_date}</span>
                       </div>
                   </div>
                 
            </div>  
          </div>
        
          `;
    }
    movieContainer.innerHTML = cartona;
}

getMovies();

let searcharr = [];

let searchHome = document.getElementById('searchHome');

searchHome.addEventListener( 'keyup', function () {
    searcharr = []
    if (searchHome.value == '') {
        getMovies()
    }
    for (let d = 0; d < nowPlaying.length; ++d) {

        if ((nowPlaying[d].title.toLowerCase().includes(searchHome.value.toLowerCase())) == true) {
            searcharr.push(nowPlaying[d])
        }
    }
    
    displayMovies(searcharr)

})

let searchAll = document.getElementById('searchAll')

searchAll.addEventListener( 'keyup', function () {
    searcharr=[]
    if (searchAll.value == '') {
        getMovies()
    }
    for (let i=0 ; i<totalMovies.length;i++)
    {
        for (let d = 0; d < 20; d++) {

            if ((totalMovies[i][d].title.toLowerCase().includes(searchAll.value.toLowerCase())) == true) {
                searcharr.push(totalMovies[i][d])
            }
        }

    }
   
    displayMovies(searcharr)

})

// ============================================== validitions inputs ===============================

let btnSubmit =  document.getElementById("submit");

console.log(btnSubmit)

let userInput = document.getElementById("userInput");

userInput.addEventListener('keyup',function(){
    validateName ()
})

userInput.addEventListener('keyup',function(){
    ckeckBtn ();
})

function validateName ()
{
    var regex = /^[A-Z]{1}[a-z]{3,8}$/;
    if(regex.test(userInput.value)==true)
    {
        document.getElementById("erorUser").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById("erorUser").innerHTML= "name must start with UpperCase";
        document.getElementById("submit").setAttribute('disabled','disabled');
    }
    
}

let phoneInput = document.getElementById("phoneInput")

phoneInput.addEventListener('keyup',function(){
    validatePhone ()
})

phoneInput.addEventListener('keyup',function(){
    ckeckBtn ();
})

function validatePhone ()
{
    var regex = /^01[0125]{1}[12456789]{1}[0-9]{7}$/;
    if(regex.test(phoneInput.value)==true)
    {
        document.getElementById("erorPhone").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById("erorPhone").innerHTML= "Phone must consist of 11 number";
        document.getElementById("submit").setAttribute('disabled','disabled');
    }
    
}

let passInput = document.getElementById("passInput");

passInput.addEventListener('keyup',function(){
    validatePassword ()
})

passInput.addEventListener('keyup',function(){
    ckeckBtn ();
})

function validatePassword ()
{
    var regex = /^[a-z A-Z 0-9 ]{8}$/;
    if(regex.test(passInput.value)==true)
    {
        document.getElementById("erorPass").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById("erorPass").innerHTML= "Password must consist of 8 digit";
        document.getElementById("submit").setAttribute('disabled','disabled');
    }
   
}

let emailInput = document.getElementById("emailInput")

emailInput.addEventListener('keyup',function(){
    validateEmail ()
})

emailInput.addEventListener('keyup',function(){
    ckeckBtn ();
})

function validateEmail ()
{
    var regex = /^\w{1,30}@(gmail|yahoo|outlook|msn){1}.com$/;
    if(regex.test(emailInput.value)==true)
    {
        document.getElementById("erorEmail").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById("erorEmail").innerHTML= "invalid Email";
        document.getElementById("submit").setAttribute('disabled','disabled');
    }
    
}

let ageInput = document.getElementById("ageInput");

ageInput.addEventListener('keyup',function(){
    validateAge ()
})

ageInput.addEventListener('keyup',function(){
    ckeckBtn ();
})

function validateAge ()
{
    var regex = /^([1-7][0-9]|80)/;
    if(regex.test(ageInput.value)==true)
    {
        document.getElementById("erorAge").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById("erorAge").innerHTML= "age range from 10-80";
        document.getElementById("submit").setAttribute('disabled','disabled');
    }
    
}

let reEnterInput = document.getElementById("password1Input");

reEnterInput.addEventListener('keyup',function(){
    validateRenter ()
})

reEnterInput.addEventListener('keyup',function(){
    ckeckBtn ();
})

function  validateRenter ()
{
    if(reEnterInput.value==passInput.value)
    {
        document.getElementById("erorPass").innerHTML= "";
        return true ;
    } 
    else
    {
        document.getElementById("erorPass").innerHTML= "Password Dis-match";
        document.getElementById("submit").setAttribute('disabled','disabled');
    }
    
}

function ckeckBtn ()
{
    if ((validateName ()&& validatePhone () && validatePassword ()&&validateEmail () &&validateAge () && validateRenter () ) == true)
    {
        document.getElementById("submit").removeAttribute('disabled');
        document.getElementById("submit").classList.replace ("btn-outline-danger","btn-danger") ;

        return true ;
       
    }
}















