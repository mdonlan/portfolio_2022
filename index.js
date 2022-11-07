window.onload = () => {
    // const rand = Math.floor(Math.random() * (2));
    
    // let script_name;
    // if (rand == 0) {
    //     script_name = "particles.js";
    // } else {
    //     script_name = "new_boids.js";
    // }

    // const script_name = "newest_boids.js";

    // const script = document.createElement('script');
    // script.src = script_name;
    // document.head.appendChild(script);
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