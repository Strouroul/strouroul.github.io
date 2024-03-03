let domain_name= 'https://strouroul.github.io'  ;//'https://strouroul.github.io'

// Function to fetch files and display them
async function fetchFiles() {
    try {
        //   const response = await fetch('./index.txt');
        //  const files = await response.json();

        const response = await fetch('/sitemaps_list.json');
        const txt = await response.text(); // Parse the JSON string
        if (!response.ok) {
            // If response is not ok, throw an error
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        // Remove line breaks from the string
        const stringWithoutLineBreaks = txt.replace(/(\r\n|\n|\r)/gm, "");

        //  console.log(`stringWithoutLineBreaks : ${stringWithoutLineBreaks}`);

        let this_str= JSON.parse(stringWithoutLineBreaks)
        //const json = await response.json(); // Parse the JSON string
        // const files = json; // Access the 'data' key which contains the array

        //   console.log(`this_str : ${stringWithoutLineBreaks}`)
        //  console.log(`this_str.length : ${this_str.length}`)


        let this_ARR_NOW=this_str.data;

        // Display each file in the list
        const list = document.getElementById('filesList');
        // Create a document fragment to hold the HTML content
        const fragment = document.createDocumentFragment();



        this_ARR_NOW.forEach(file_found => {
            //   console.log(`file_found : ${file_found}`)
            const listItem = document.createElement('li');
            let this_url_now=domain_name+ file_found.path;
            let this_TEXT_now= file_found.name ;
            let this_ICON_now= file_found.icon ;



            let link = document.createElement('a');
            link.href = this_url_now;
            link.innerHTML =this_ICON_now+ this_TEXT_now;
            //   console.log(`listItem.innerHTML : ${  link.href }`)
            listItem.appendChild(link);

            fragment.appendChild(listItem);
        });
        list.appendChild(fragment);

        return true;
    } catch (error) {
        console.error('Error fetching files:', error);
        return false;
    }
}



// Call fetchFiles when the page loads
fetchFiles().then(my_data=>{
    console.log(`my_data: ${my_data}`)
}).catch(err=>{
    console.log(`err: ${err}`)
});
/*   document.addEventListener('DOMContentLoaded', async function () {

   }) */