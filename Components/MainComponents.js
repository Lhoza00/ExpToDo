class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.pathSegments = window.location.pathname.split('/');
        this.filename = this.pathSegments[this.pathSegments.length - 1] || 'Index';
        this.pageName = this.filename.split('.')[0];
        this.DNS = this.pathSegments[1]; 
        this.innerHTML = 
        
        `
        <header class="header">
            <div class="container">
                <a href="Index.html" class="Logo">Linkspam</a> 
                <nav class="navbar">
                    <a href="Profile.html">Profile</a>
                </nav> 
            </div>
        </header>
        `
    }
}
class SpecialHead extends HTMLElement {
    connectedCallback() {
        this.pathSegments = window.location.pathname.split('/');
        this.filename = this.pathSegments[this.pathSegments.length - 1] || 'Index';
        this.pageName = this.filename.split('.')[0];
        this.DNS = this.pathSegments[1];
        this.innerHTML = 
        `
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ToDO</title>
            <link rel="stylesheet" href="styles/global.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        </head>
        `
    }
}
class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.pathSegments = window.location.pathname.split('/');
        this.filename = this.pathSegments[this.pathSegments.length - 1] || 'Index';
        this.pageName = this.filename.split('.')[0];
        this.DNS = this.pathSegments[1]; 
        this.innerHTML =
        `
        <footer>
            <div class="container">
                <div class="topfooter">
                    <a href="Home.php" class="Logo">Linkspam</a> 
                    <div class="socials">
                        <i href="#" class="fab fa-facebook-f"></i>
                        <i class="fab fa-youtube"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
                <hr/>
                <div class="footlinks">
                    <div id="copyright">
                        <p>&copy 2025 Linkspam</p>
                    </div>
                    <div id="T_C">
                        <a href="About.htl">About</a>
                        <a href="About.html #sectionAboutContact">Help</a>
        
                    </div>
                </div>
            </div>
        </footer>
        `
    }
}
customElements.define(`special-head`, SpecialHead)
customElements.define(`special-header`, SpecialHeader)
customElements.define(`special-footer`, SpecialFooter)