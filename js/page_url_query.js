let page_url_params={};

// Get the full URL
const url = window.location.href;

// Create a URL object
const urlObj = new URL(url);

// Use URLSearchParams to access query parameters
const params = new URLSearchParams(urlObj.search);

// Example: Get a specific query parameter by name
//   const value = params.get('key'); // Replace 'key' with your parameter name
//  console.log(value);

// Example: Loop through all query parameters
params.forEach((value, key) => {
    // console.log(`${key}: ${value}`);
    page_url_params[key]=value;
});


console.log(`page_url_params : ${JSON.stringify(page_url_params)}`);