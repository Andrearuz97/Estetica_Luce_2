document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. AGGIORNAMENTO AUTOMATICO ANNO COPYRIGHT
    // ==========================================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 2. GESTIONE MENU HAMBURGER (MOBILE)
    // ==========================================================================
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburgerToggle && navLinks) {
        // Apri / Chiudi menu al click sull'hamburger
        hamburgerToggle.addEventListener('click', () => {
            hamburgerToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Blocca lo scroll della pagina se il menu è aperto
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Chiude automaticamente il menu quando si clicca una voce (es. #contatti)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburgerToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================================================
    // 3. LOGICA FRECCIA SCROLL TOP (FIXED & BLINDATA)
    // ==========================================================================
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (scrollTopBtn) {
        // Rilevamento dello scroll cross-browser (reale e preciso)
        window.addEventListener('scroll', () => {
            // Prende il valore di scroll corretto sia su Desktop che su Mobile (Safari/Chrome)
            const scrolled = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrolled > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }, { passive: true }); // Ottimizza le performance dello scroll su mobile
        
        // Risalita forzata sia via window che via documentElement (evita blocchi CSS)
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Impedisce comportamenti strani del browser
            
            // Metodo standard fluido
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Fallback di sicurezza: se lo smooth scroll fallisce o è bloccato dal CSS,
            // interviene dopo 50ms senza interrompere l'animazione fluida sui browser moderni.
            setTimeout(() => {
                const scrolled = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled > 0) {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                }
            }, 50);
        });
    }

    console.log("Estetica Luce - Script unificato. UI pronta e reattiva.");
});