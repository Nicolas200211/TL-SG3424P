document.addEventListener('DOMContentLoaded', function() {
    // Cargar el navbar
    fetch('./components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initializeNavbar();
            initializeMobileMenu();
            initializeSearchModal();
            addDynamicStyles();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

function initializeNavbar() {
    // Menú hamburguesa (versión simplificada que será reemplazada por initializeMobileMenu)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        const icon = mobileMenuButton.querySelector('i');
        mobileMenuButton.addEventListener('click', function() {
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.remove('hidden');
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Cambiar ícono
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Cambiar ícono
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

function initializeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('search-button');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchContainer = document.getElementById('search-container');
    const quickSearchContainer = document.getElementById('quick-search-container');

    // Función para abrir el menú de búsqueda rápido o el modal completo
    function openSearchModal(e) {
        e.preventDefault();
        
        // Si es pantalla grande (escritorio) y es el botón de búsqueda normal (no el móvil)
        if (window.innerWidth >= 1024 && e.currentTarget === searchButton) {
            // Alternar visibilidad del menú de búsqueda rápido
            if (quickSearchContainer) {
                const isQuickSearchVisible = !quickSearchContainer.classList.contains('hidden');
                quickSearchContainer.classList.toggle('hidden');
                
                // Si se está mostrando, enfocar el input
                if (!isQuickSearchVisible) {
                    const quickSearchInput = quickSearchContainer.querySelector('input[type="text"]');
                    if (quickSearchInput) {
                        setTimeout(() => {
                            quickSearchInput.focus();
                        }, 50);
                    }
                }
                return;
            }
        }
        
        // Para móviles o si no hay menú rápido, mostrar el modal completo
        if (searchModal) {
            // Ocultar el menú de búsqueda rápido si está visible
            if (quickSearchContainer) {
                quickSearchContainer.classList.add('hidden');
            }
            
            // Mostrar el modal
            searchModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Forzar reflow para activar la transición
            void searchModal.offsetWidth;
            
            // Animar el fondo y el contenedor
            if (searchBackdrop) {
                searchBackdrop.style.opacity = '1';
            }
            
            if (searchContainer) {
                searchContainer.style.opacity = '1';
                searchContainer.style.transform = 'scale(1)';
            }
            
            // Enfocar el input después de un pequeño retraso
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            }
        }
    }

    // Función para cerrar el modal
    function closeSearchModal() {
        if (searchModal) {
            // Animar la salida
            if (searchBackdrop) {
                searchBackdrop.style.opacity = '0';
            }
            
            if (searchContainer) {
                searchContainer.style.opacity = '0';
                searchContainer.style.transform = 'scale(0.95)';
            }
            
            // Ocultar el modal después de la animación
            setTimeout(() => {
                searchModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 200);
        }
    }

    // Event listeners
    if (searchButton) searchButton.addEventListener('click', openSearchModal);
    if (mobileSearchButton) mobileSearchButton.addEventListener('click', openSearchModal);
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);
    
    // Cerrar menú de búsqueda rápido al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        const isClickInsideSearch = searchButton.contains(e.target) || 
                                 (quickSearchContainer && quickSearchContainer.contains(e.target));
        
        if (quickSearchContainer && !isClickInsideSearch && !quickSearchContainer.classList.contains('hidden')) {
            quickSearchContainer.classList.add('hidden');
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
            closeSearchModal();
        }
    });

    // Cerrar al hacer clic fuera del modal
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal || e.target === searchBackdrop) {
                closeSearchModal();
            }
        });
    }
}

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        
        .anim {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .none {
            display: none;
        }
        
        /* Estilos para el menú móvil */
        .-translate-x-full {
            transform: translateX(-100%);
        }
        
        #mobile-menu {
            transition: transform 0.3s ease-in-out;
        }
        
        #menu-overlay {
            background-color: rgba(0, 0, 0, 0.5);
        }
    `;
    document.head.appendChild(style);
}