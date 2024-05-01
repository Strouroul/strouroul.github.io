
function start_event_handlers(){
    // Variable to track if Ctrl+C was pressed
      stop = false;

    /*
    // Handle Ctrl+C event
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'c') {
            stop = true;
            // Echo to show that Ctrl+C was pressed (optional)
            term.echo('^C');
        }
    });*/


    // Add event listener for keydown event on the document
    document.addEventListener('keydown', function(event) {
        // Check if Ctrl key and 'c' key were pressed simultaneously
        if (event.ctrlKey && event.key === 'c') {
            // Call a function to handle Ctrl+C action
            handleCtrlC();
        }
    });








}

// Function to handle Ctrl+C action
function handleCtrlC() {
    // Do something when Ctrl+C is pressed
    // For example, break typing, writing, etc.
    if(term!=null){
        try{
            // Handle Ctrl+C event
            term.pause();
            term.push(() => {
                  stop = true;
                  term.echo('^C'); // Echo to show that Ctrl+C was pressed
                  term.resume();
              });
            term.abort();
        }
        catch(err_ABORT){
            console.log(`err_ABORT : ${err_ABORT}`)
        }
    }

    // You can add more actions here as needed
}
function refresh_tooltips(){
    /* try {
           // Destroy existing tooltips to prevent duplicates and memory leaks
           $('[data-toggle="tooltip"]').tooltip('dispose');
           // Reinitialize tooltips on all elements
           $('[data-toggle="tooltip"]').tooltip();
       } catch (e_LISTER) {
           console.log(`Error initializing tooltips: ${e_LISTER}`);
       }*/

   /* try{
        $(document).ready(function(){

            $('[data-toggle="tooltip"]').tooltip('destroy').tooltip(); // Clean up and reapply tooltips
            $('[data-toggle="tooltip"]').tooltip();



        });
    }
    catch(e_LISTER){
        console.log(`e_LISTER : ${e_LISTER}`)
    }
    try {

        $('[data-toggle="tooltip"]').tooltip('destroy').tooltip(); // Clean up and reapply tooltips
    } catch (e_LISTER) {
        console.log(`Error initializing tooltips: ${e_LISTER}`);
    }*/


    $('document').ready(function() {
        $('document').tooltip({
            selector: '[data-toggle="tooltip"]'
        });
    });
}


function getRandomNumber(x) {
    return Math.floor(Math.random() * x) + 1;
}


function render(text) {
    const cols = term.cols();
  /*  return figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    });*/
    return trim(
        figlet.textSync(text, {
                    font: font,
                    width: cols,
                    whitespaceBreak: true
                 }
             )
    );
}
function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}

///////////////////////////////////////////////////////////////
function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}


function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

/*
function rainbow(string) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string).join('\n');
}
*/

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}
/////////////////////////////////////////////////////////////////


function print_dirs() {
    term.echo(Object.keys(directories).map(dir => {
        return `<blue class="directory">${dir}</blue>`;
    }).join('\n'));
}






function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}




/*
function ready() {
    const seed = rand(256);
    term.echo(() => rainbow(render('Terminal Portfolio'), seed))
        .echo('Welcome to my Terminal Portfolio\n').resume();
}*/


/*term =  $('body').terminal(commands, {
      greetings
  });*/
