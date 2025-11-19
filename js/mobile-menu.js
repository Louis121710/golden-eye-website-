// SIMPLE MOBILE MENU - This will definitely work
(function() {
  'use strict';
  
  // Define functions immediately
  window.toggleMobileMenu = function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    var nav = document.querySelector('.nav-links');
    var toggle = document.querySelector('.mobile-menu-toggle');
    var body = document.body;
    
    if (!nav || !toggle) {
      console.error('Menu elements not found');
      return false;
    }
    
    var isActive = nav.classList.contains('active');
    
    if (isActive) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      if (body) {
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
    } else {
      toggle.classList.add('active');
      nav.classList.add('active');
      if (body) {
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
      }
    }
    
    return false;
  };
  
  window.closeMobileMenu = function() {
    var nav = document.querySelector('.nav-links');
    var toggle = document.querySelector('.mobile-menu-toggle');
    var body = document.body;
    
    if (nav) nav.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
    if (body) {
      body.classList.remove('menu-open');
      body.style.overflow = '';
    }
  };
  
  // Initialize when DOM is ready
  function init() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('.nav-links');
    
    if (!toggle || !nav) {
      setTimeout(init, 100);
      return;
    }
    
    // Force button to be clickable
    toggle.style.pointerEvents = 'auto';
    toggle.style.cursor = 'pointer';
    toggle.style.zIndex = '99999';
    
    // Make all links clickable
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].style.pointerEvents = 'auto';
      links[i].style.cursor = 'pointer';
      links[i].style.zIndex = '10002';
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.classList.contains('active')) return;
      
      // Don't close if clicking on link or button
      if (e.target.closest('a') && nav.contains(e.target.closest('a'))) return;
      if (toggle.contains(e.target)) return;
      
      // Close if clicking outside
      if (!nav.contains(e.target)) {
        window.closeMobileMenu();
      }
    });
    
    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        window.closeMobileMenu();
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

