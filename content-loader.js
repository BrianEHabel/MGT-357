/**
 * Content Loader for EBM Dashboard
 * Loads content from external .txt files into the dashboard
 */

// Content file mappings
const contentFiles = {
    'scientific-sources': 'content/evidence-scientific-sources.txt',
    'scientific-methods': 'content/evidence-scientific-methods.txt',
    'scientific-appraisal': 'content/evidence-scientific-appraisal.txt',
    'practitioner-sources': 'content/evidence-practitioner-sources.txt',
    'practitioner-methods': 'content/evidence-practitioner-methods.txt',
    'practitioner-appraisal': 'content/evidence-practitioner-appraisal.txt',
    'organizational-sources': 'content/evidence-organizational-sources.txt',
    'organizational-methods': 'content/evidence-organizational-methods.txt',
    'organizational-appraisal': 'content/evidence-organizational-appraisal.txt',
    'stakeholder-sources': 'content/evidence-stakeholder-sources.txt',
    'stakeholder-methods': 'content/evidence-stakeholder-methods.txt',
    'stakeholder-appraisal': 'content/evidence-stakeholder-appraisal.txt',
    'synthesis-integration': 'content/synthesis-integration.txt'
};

/**
 * Load content from a file and insert it into the specified element
 */
async function loadContent(contentKey, elementId) {
    const filePath = contentFiles[contentKey];
    if (!filePath) {
        console.error(`No file mapping found for content key: ${contentKey}`);
        return;
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        console.log(`Successfully fetched ${filePath}, length: ${text.length} chars`);
        
        const element = document.getElementById(elementId);
        if (element) {
            console.log(`Found element ${elementId}, inserting content`);
            
            // Simple text display with basic formatting
            // Replace markdown headers with styled divs
            let htmlContent = text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/^# (.+)$/gm, '<h1 style="color: #1e3a5f; margin: 1.5rem 0 1rem 0; font-size: 1.5rem;">$1</h1>')
                .replace(/^## (.+)$/gm, '<h2 style="color: #2563eb; margin: 1.25rem 0 0.75rem 0; font-size: 1.25rem;">$1</h2>')
                .replace(/^### (.+)$/gm, '<h3 style="color: #374151; margin: 1rem 0 0.5rem 0; font-size: 1.1rem;">$1</h3>')
                .replace(/^#### (.+)$/gm, '<h4 style="color: #4b5563; margin: 0.75rem 0 0.5rem 0; font-size: 1rem;">$1</h4>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/^- (.+)$/gm, '• $1<br>')
                .replace(/\n\n/g, '<br><br>')
                .replace(/\n/g, '<br>');
            
            element.innerHTML = htmlContent;
            console.log(`Content inserted, innerHTML length: ${element.innerHTML.length}`);
        } else {
            console.error(`Element not found: ${elementId}`);
        }
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `Error loading content from ${filePath}`;
        }
    }
}

/**
 * Load all content when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Content loader initialized');
    
    // Load all content files
    Object.keys(contentFiles).forEach(contentKey => {
        const elementId = `content-${contentKey}`;
        console.log(`Attempting to load: ${contentKey} into ${elementId}`);
        loadContent(contentKey, elementId);
    });
});