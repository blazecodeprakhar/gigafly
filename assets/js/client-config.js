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
document.addEventListener("DOMContentLoaded", () => {
    // 1. Update Title and Meta Tags
    document.title = CLIENT_CONTENT.site_title;

    // 2. Inject content into [data-client-key] elements
    Object.keys(CLIENT_CONTENT).forEach(key => {
        const elements = document.querySelectorAll(`[data-client-key="${key}"]`);
        elements.forEach(el => {
            // Respect the original innerHTML if it has formatting
            if (el.dataset.clientType === "html") {
                el.innerHTML = CLIENT_CONTENT[key];
            } else {
                el.textContent = CLIENT_CONTENT[key];
            }
        });
    });

    console.log("Client Content Injected successfully.");
});
