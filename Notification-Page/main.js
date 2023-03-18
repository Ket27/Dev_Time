const number = document.getElementById("number");
const markAll = document.getElementById("readnot");
const unreadMessages = document.querySelectorAll(".unread");
number.innerHTML = unreadMessages.length;

markAll.addEventListener("click", ()=>{
    unreadMessages.forEach((message) => {
        message.classList.remove("unread");
    })
    number.innerHTML = 0;
})

unreadMessages.forEach((message) => {
    message.addEventListener("click", () => {
        message.classList.remove("unread");
        const newUnreadMessages = document.querySelectorAll(".unread");
        number.innerHTML = newUnreadMessages.length;
    })
})

