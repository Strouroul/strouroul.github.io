//    const originalSetItem = localStorage.setItem;

const originalSetItem = localStorage.setItem.bind(localStorage);
let prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// Optional: Listen for changes in system preference and update accordingly
prefersDarkScheme.addEventListener("change", (e) => {
    if (e.matches) {
      //  applyDarkMode(true); // If system switches to dark mode
        console.debug(`prefersDarkScheme scheme changed for ${e.matches}`);
    } else {
       // applyDarkMode(false); // If system switches to light mode
        console.debug(`prefersDarkScheme scheme changed for ${e.matches}`);
    }
});

/*
    localStorage.setItem = function(key, value) {
        console.log(`setItem ${key} : ${value}`);
        const event = new Event('itemInserted');
        event.value = value;
        event.key = key;
        document.dispatchEvent(event);
        originalSetItem.apply(this, arguments);
    };

    const localStorageSetHandler = function(e) {
        console.debug('localStorage.set("' + e.key + '", "' + e.value + '") was called');
    };

    document.addEventListener("itemInserted", localStorageSetHandler, false);

 */
function enableDarkMode() {

    console.debug(`prefersDarkScheme.matches : `,prefersDarkScheme.matches)
    document.body.classList.add('darkMode');
    localStorage.setItem('supportRus_darkMode','true');
    originalSetItem('supportRus_darkMode','true');
    console.log(`supportRus_darkMode : ${  localStorage.getItem('supportRus_darkMode')}`)
}

function disableDarkMode() {

    console.debug(`prefersDarkScheme.matches : `,prefersDarkScheme.matches)
    console.log(`supportRus_darkMode : ${  localStorage.getItem('supportRus_darkMode')}`)
    document.body.classList.remove('darkMode');
    localStorage.removeItem('supportRus_darkMode');
}


function toggleDarkMode(){
    if(document.body.classList.contains('darkMode')){
        disableDarkMode();
    }else{
        enableDarkMode();
    }
    console.log(`isDarkModeEnabled :  ${isDarkModeEnabled()}`)
}



function isDarkModeEnabled(){

   // console.debug(`document.body.classList : `,document.body.classList)
 //   console.debug(`document.documentElement.classList : `,document.documentElement.classList)
    if(document.body.classList.contains('darkMode')){
        return true;
    }

    else  if( localStorage.getItem('supportRus_darkMode')==='true'){
        return true;
    }else{
        return false;
    }
}



function set_page_darkMode(){
    console.debug(`localStorage.getItem('supportRus_darkMode') : `,localStorage.getItem('supportRus_darkMode'))
    if(localStorage.getItem('supportRus_darkMode')==='true'){
        enableDarkMode();
    }
}


/////////////////////////////////////////
//IMG LAZY LOADING


// Function to add loading="lazy" to an image
function addLazyLoadingToImage(img) {
    if (!img.hasAttribute('loading')) {
        console.debug(`ADD LAZY LOADING`)
        img.setAttribute('loading', 'lazy');
    }
}

// Set up a MutationObserver to watch for added images
function observeNewImages() {
    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                // Check if the added node is an <img> element
                if (node.nodeName === 'IMG') {
                    addLazyLoadingToImage(node);
                }

                // If the added node is a container, look for images inside it
                if (node.nodeType === 1) { // If it's an element (e.g., a div or section)
                    const images = node.querySelectorAll('img');
                    images.forEach(addLazyLoadingToImage);
                }
            });
        });
    });

    // Start observing the <body> for added nodes (like dynamically added images)
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
