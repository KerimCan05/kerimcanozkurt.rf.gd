function welcomeButton() {
    if (confirm("You serious?") === true) {
        window.location.href = "home.html";
    }
    else{
        document.getElementById("unwelcome").textContent = "What, scared? OK, chicken.";
    }
}