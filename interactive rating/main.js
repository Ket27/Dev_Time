const stars = document.querySelectorAll('.rating');
const submit = document.querySelector('.btn');
const pagetwo = document.querySelector('.thanking');
const rating = document.querySelector('.num');
const pageone = document.querySelector('.firstcontainer')


stars.forEach(function(rate){
    rate.addEventListener("click",() =>{
        console.log(rate.style.color);
        rating.innerHTML = rate.innerHTML;
        console.log(rating.innerHTML);
        if(rating.innerHTML >= 1 && rating.innerHTML<=5){
            submit.addEventListener('click', function(){
                pagetwo.classList.remove('hidden');
                pageone.style.display = "none";
            })
        }
    })
})