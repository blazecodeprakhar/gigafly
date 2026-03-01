/**
 * CLIENT CONFIGURATION
 * Use this file to change text content globally.
 * These keys map to [data-client-key] attributes in the HTML.
 */

const CLIENT_CONTENT = {
    "site_title": "Giga Fly",
    "hero_headline": "We are movement",
    "hero_subheadline": "Your freedom to enjoy life",
    "about_title": "Fly the Legacy",
    "about_text": "Giga Fly® is a private aviation operator with over 5,000 missions completed across 150+ countries.",
    "footer_company_name": "Giga Fly",
    "contact_email": "info@gigafly.com",
    "contact_phone": "+971 50 000 0000",
    "location_dubai": "Dubai, UAE"
};

/**
 * AUTO-INJECTOR ENGINE
 * This script runs on page load and replaces placeholders
 */
function injectClientContent() {
    // 1. Update Title and Meta Tags
    try {
        document.title = CLIENT_CONTENT.site_title;
    } catch (e) {
        /* ignore */
    }

    // 2. Inject content into [data-client-key] elements
    Object.keys(CLIENT_CONTENT).forEach(key => {
        const elements = document.querySelectorAll(`[data-client-key="${key}"]`);
        elements.forEach(el => {
            // Avoid re-injecting the same element repeatedly
            if (el.dataset.clientInjected === "true") return;

            // Respect the original innerHTML if it has formatting
            if (el.dataset.clientType === "html") {
                el.innerHTML = CLIENT_CONTENT[key];
            } else {
                el.textContent = CLIENT_CONTENT[key];
            }
            el.dataset.clientInjected = "true";
        });
    });

    console.log("Client Content Injected successfully.");
}

// Run on initial load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectClientContent);
} else {
    injectClientContent();
}

// If Barba (or any AJAX navigation) swaps page content, re-run the injector.
// Prefer Barba hooks when available, fallback to a MutationObserver.
if (window.barba && window.barba.hooks) {
    try {
        if (typeof window.barba.hooks.afterEnter === 'function') {
            window.barba.hooks.afterEnter(injectClientContent);
        } else if (typeof window.barba.hooks.do === 'function') {
            // older internal API: listen to afterEnter via generic hooks
            window.barba.hooks.do('afterEnter', injectClientContent);
        }
    } catch (e) {
        // ignore and fallback to observer below
    }
}

// Fallback: Observe DOM mutations and inject when new nodes appear
const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) {
            // If any added node contains a data-client-key, run injector.
            for (const node of m.addedNodes) {
                if (node.nodeType === 1) {
                    if (node.querySelector && node.querySelector('[data-client-key]')) {
                        injectClientContent();
                        return;
                    }
                    if (node.hasAttribute && node.hasAttribute('data-client-key')) {
                        injectClientContent();
                        return;
                    }
                }
            }
        }
    }
});
observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

// ========== BARBA CONFIGURATION ==========
// Ensure Barba is initialized and properly configured for smooth transitions
if (window.barba && window.barba.prefetch) {
    try {
        // Enable prefetching for all navigation links
        window.barba.prefetch();
    } catch (e) {
        console.log('Barba prefetch init:', e.message);
    }
}

// Barba hooks for debugging and ensure smooth transitions
if (window.barba) {
    try {
        // Hook: Link is prevented from default behavior (Barba is handling it)
        if (typeof window.barba.hooks?.before === 'function') {
            window.barba.hooks.before((data) => {
                // console.log('Barba before:', data.next.url);
            });
        }
    } catch (e) {
        // ignore
    }
}

// ========== NAVIGATION LINK INTERCEPTION ==========
// Ensure all navigation links are properly configured for Barba
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//')) {
        return;  // Let default handler process external/anchor links
    }
    
    // For local page links, ensure Barba will handle them
    if (window.barba && (href.includes('.html') || !href.includes('.'))) {
        // Remove data-barba-prevent if present (ensures Barba intercepts)
        if (link.hasAttribute('data-barba-prevent')) {
            link.removeAttribute('data-barba-prevent');
        }
    }
}, true);
