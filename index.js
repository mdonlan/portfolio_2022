window.onload = () => {
    const rand = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    
    let script_name;
    if (rand == 0) {
        script_name = "particles.js";
    } else {
        script_name = "boids.js";
    }

    const script = document.createElement('script');
    script.src = script_name;
    document.head.appendChild(script);
}

function handle_nav_click(e) {
    // e.scrollIntoView();
    if (e.classList.contains("projects_btn")) {
        document.querySelector(".projects").scrollIntoView({behavior:"smooth"});
    } else if (e.classList.contains("about_btn")) {
        document.querySelector(".about").scrollIntoView({behavior:"smooth"});
    } else if (e.classList.contains("contact_btn")) {
        document.querySelector(".contact").scrollIntoView({behavior:"smooth"});
    }  
    
}