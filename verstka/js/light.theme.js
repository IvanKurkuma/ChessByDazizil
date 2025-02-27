const light_theme =document.getElementById("light")




light_theme.addEventListener("click", function(){
    document.body.classList.toggle("light_theme")

    const theme = localStorage.getItem("theme")
    
    if (theme ==="light_theme"){
        localStorage.setItem("theme","")
    } else{

        localStorage.setItem("theme", "light_theme")
    }
})

