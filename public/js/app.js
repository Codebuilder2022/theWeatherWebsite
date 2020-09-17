$(document).ready(function() {

    $(window).scroll(function(){
 
        if(this.scrollY > 10){
            $(".navbar").addClass("sticky");
            //$(".goTop").fadeIn();
            }else{
             $(".navbar").removeClass("sticky");
             // $(".goTop").fadeOut();
            }
   }); 

    $('.menu-toggler').click(function(){
    
        $(this).toggleClass("active");
        $(".navbar-menu").toggleClass("active");

    });

   

    const weatherForm = document.querySelector('form')
    const searchLocation = document.querySelector('input')
    const messageOne = document.querySelector('#messageOne')
    const tempMessage = document .querySelector('#tempMessage')
    const descripMessage = document.querySelector('#descripMessage')
    const timeMessage = document.querySelector('#timeMessage')

    

    weatherForm.addEventListener('submit', (e) =>{
        e.preventDefault()

        const location = searchLocation.value

        messageOne.textContent = 'Loading..'
        tempMessage.textContent = ''
        descripMessage.textContent = ''
        timeMessage.textContent = ''

        const monthName = ['January','February','March','April','May','June','July','August',
        'September','October','November','December'];
        


        fetch('/weather?address='+ location ).then((response) => {
            response.json().then((data) =>{
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.location
                    tempMessage.textContent = data.forecastTemp + String.fromCharCode(176);
                    descripMessage.textContent = data.forecastDescription
                    timeMessage.textContent = new Date().getDate()+" " + monthName[new Date().getMonth()].substring(0,3).toUpperCase();
                }
            })
        })
    })
});