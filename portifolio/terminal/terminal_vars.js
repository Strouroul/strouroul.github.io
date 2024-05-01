// Get the URL of the currently executing script
const scriptUrl = document.currentScript.src;

// Function to parse query parameters from the URL
function parseQueryString(url) {
    const queryString = url.split('?')[1];
    const params = new URLSearchParams(queryString);
    const user = params.get('user');
    return { user };
}

// Parse the query parameters
const queryParams = parseQueryString(scriptUrl);


// Access the 'user' parameter
let user = null;   //queryParams.user||'guest';


let iflix_user_str=readCookie('iflix_user') ;
let iflix_user_json=null;

console.log(`iflix_user_str : ${iflix_user_str}`)


if(iflix_user_str!=null){
    try{
        iflix_user_json=JSON.parse(iflix_user_str)
    }
    catch(err_JSON){
        iflix_user_json= (iflix_user_str)
    }
    user=iflix_user_json.displayName;
}
else{
    user=queryParams.user||'guest';
}


//const user = 'guest';
const server = 'iflix.ishopper.info';




const root = '~';
let cwd = root;


let stop = false;




const joke_url = 'https://v2.jokeapi.dev/joke/Programming';
const pop_movies_url = 'https://iflix.ishopper.info/data/tmdb/popular_1_movies.json';

const my_cmds = {
    /*customTypingAnimation(text, delay, stop) {
       return new Promise(resolve => {
           let i = 0;
           const typeNextChar = () => {
               if (stop) {
                   resolve(); // Resolve the promise if Ctrl+C was pressed
                   return;
               }
               if (i < text.length) {
                   this.echo(text[i++]);
                   setTimeout(typeNextChar, delay);
               } else {
                   resolve(); // Resolve the promise when typing animation is complete
               }
           };
           typeNextChar();
       });
   },*/


    cls() {
        this.clear(); // Clear the terminal screen
    },
    async joke() {
        const res = await fetch(joke_url);
        const data = await res.json();
        (async () => {
            if (data.type == 'twopart') {
                // we set clear the prompt to don't have any
                // flashing between animations
                const prompt = this.get_prompt();
                this.set_prompt('');
                // as said before in every function, passed directly
                // to terminal, you can use `this` object
                // to reference terminal instance
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
                // we restore the prompt
                this.set_prompt(prompt);
            } else if (data.type === 'single') {
                await this.echo(data.joke, {
                    delay: 50,
                    typing: true
                });
            }
        })();
    },
    async popular_movies() {
        stop = false; // Variable to track if Ctrl+C was pressed
        // Add event listener for keydown event on the document
        // Add event listener for keydown event on the document
      //  document.addEventListener('keydown', handleCtrlC);



        const res = await fetch(pop_movies_url);

        // Check if Ctrl+C was pressed after fetching the data
        if (stop) return;
        if(res.ok){
            const data = await res.json();
              (async () => {

                try {

                    let my_ARR_HTML = '';

                    let this_count = 0;
                    let quick_show_count=3;
                    let results_arr=[];
                    let to_SHOW_ARR=[];
                    try{
                        results_arr=JSON.parse(data.results)
                    }
                    catch(err_ARR){
                        results_arr= (data.results)
                    }
                    let my_START_IND=getRandomNumber((results_arr.length-1-3))
                    for (let xixi = my_START_IND; xixi < results_arr.length-1 ; xixi++) {
                        const this_result = results_arr[xixi]; // Access elements from results_arr instead of data.results

                        if(to_SHOW_ARR.length>=quick_show_count){                           break;}
                        else{
                            to_SHOW_ARR.push(this_result);
                          //  console.log(`to_SHOW_ARR : ${to_SHOW_ARR.length}`)
                            const posterUrl = this_result.poster_path !== null ? `https://image.tmdb.org/t/p/w500${this_result.poster_path}` : '';

                           // console.log(`${this_result.title}`)

                            if (to_SHOW_ARR.length  >= quick_show_count) { // Check both conditions for proper comma placement
                                my_ARR_HTML += `${this_result.title}`;
                            }else{
                                my_ARR_HTML += `${this_result.title} , `;

                            }
                          /*  if (xixi >= quick_show_count - 1) { // Stop after the 3rd item
                                break;
                            }*/

                        }



                    }
                    await this.echo(my_ARR_HTML, {
                        delay: 50,
                        typing: true
                    })


                } catch (err_POP_MOVIES) {
                    await this.echo("NO DATA FOUND (check URL)", {
                        delay: 50,
                        typing: true
                    });
                }

            })();
        }
        else{
            (async () => {
                await this.echo("NO DATA FOUND (check URL)", {
                    delay: 50,
                    typing: true
                });
            })();
        }


        /* if (res.ok) {
             const data = await res.json();
             try {
                 // If stop is true, do not start typing animation
                 if (!stop) {
                     // Start typing animation with custom delay and interruption support
                     await this.customTypingAnimation("Fetching popular movies", 50, stop);
                     await show_pop_movies_html(data, this);
                 }
             } catch (err_POP_MOVIES) {
                 // Handle any errors from show_pop_movies_html
             }
         }
         else {
             // Echo a message if no data is found
             await this.echo("NO DATA FOUND (check URL)");
         }*/
    },



    credits() {
        return [
            '',
            '<white>Used libraries:</white>',
            '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
            // '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
            // '* <a href="https://jokeapi.dev/">Joke API</a>',
            '',

            'Credits <a href="https://iflix.ishopper.info/" target="_blank">iFlix</a>',
            '',
        ].join('\n');
    },
    ls(dir = null) {
        if (dir) {
            if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            }
            else if (cwd === root) {
                if (dir in directories) {
                    //   this.echo(directories[dir].join('\n'));  //, { raw: true }

                    const isSkills = dir === 'skills';
                    this.echo(directories[dir].join('\n'));// , { raw: isSkills }
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_dirs();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
            print_dirs();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    },
    cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && Object.keys(directories).includes(dir.substring(2))) {
            cwd = dir;
        } else if (Object.keys(directories).includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    },
    "?"() {
        term.echo(`List of available commands: ${help}`);
    },
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    whoami(){
        return [
            //'',
            `<white>${user||"UNKNOWN USER"}</white>`,

            //'',
        ].join('\n');
    },
    echo(...args) {
        //  term.echo(args.join(' '));
        let output = args[0]; // Get the first argument
        let rawParams = {}; // Initialize rawParams
// Add event listener for keydown event on the document
        document.addEventListener('keydown', function(event) {
            // Check if Ctrl key and 'c' key were pressed simultaneously
            if (event.ctrlKey && event.key === 'c') {
                // Call a function to handle Ctrl+C action
                handleCtrlC();
            }
        });
        // Check if the last argument is an object and contains a 'raw' key
        if (args.length > 1 && typeof args[args.length - 1] === 'object' && args[args.length - 1].raw) {
            rawParams =args[1];// args.pop(); // Remove the last argument and store it in rawParams
            // If raw is true, directly echo the output without escaping
            if (rawParams.raw) {
                term.echo(output, { raw: true });
                return;
            }
        }



        // If raw parameter is not present or false, echo normally
        term.echo(output);
    }
};


const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
});
const command_list = Object.keys(my_cmds);
const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});
const help = formatter.format(command_list);



//let term = $('body').terminal(commands);
const greetings = `  ______                    _             __   ____             __  ____      ___     
 /_  __/__  _________ ___  (_)___  ____ _/ /  / __ \\____  _____/ /_/ __/___  / (_)___ 
  / / / _ \\/ ___/ __ \`__ \\/ / __ \\/ __ \`/ /  / /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\
 / / /  __/ /  / / / / / / / / / / /_/ / /  / ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /
/_/  \\___/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/  /_/    \\____/_/   \\__/_/  \\____/_/_/\\____/`


const directories = {
    education: [
        '',
        '<white>education</white>',

        '* <a href="https://en.wikipedia.org/wiki/University_of_Ottawa" target="_blank">University Of Ottawa</a> <img src="https://flagcdn.com/16x12/ca.png"> Canada <green>"Computer Science"</green> 1999-2003',
        '* <a href="https://en.wikipedia.org/wiki/MSA_University" target="_blank">MSA University (October University for Modern Sciences and Arts)</a> <img src="https://flagcdn.com/16x12/eg.png"> Egypt <yellow>"Computer Science"</yellow>  1998-1999',
        // '* Electronic <a href="https://en.wikipedia.org/wiki/Technikum_(Polish_education)">Technikum</a> with major <yellow>"RTV"</yellow> 1995-2000',
        ''
    ],
    projects: [
        '',
        '<white>Projects</white>',
        [
            ['iFlix',
                'https://iflix.ishopper.info',
                'Watch Movies or Series from anywhere using iFlix'
            ],
            ['iRide',
                'https://iride.ishopper.info',
                'Get Rides or Deliveries quick and safely in Cairo, Egypt'
            ],
            ['iShopper',
                'https://ishopper.info:9898',
                'Video Chat , Trading Bots, and a few more things'
            ],
            ['Video_Chat',
                'https://ishopper.info:9898',
                'Video Chat , Trading Bots, and a few more things'
            ],
        ].map(([name, url, description = '']) => {
            return `* <a href="${url}" target="_blank">${name}</a> &mdash; <white>${description}</white>`;
        }),
        ''
    ].flat(),
    skills:

      [
            '',
            '<white>languages</white>',

            [


                'Node.js <i class="iconify" data-icon="logos:nodejs" data-toggle="tooltip" data-html="true"  data-placement="top" title="Find a Movie"></i>',
                'JavaScript',
                'Java',
                'Perl',
                '.NET',
                'C#',
                'VB .NET',

                'SQL',
                'PHP',
                'Power Shell',
                'Bash'
            ] .map(lang => `* <green>${lang}</green>`),


            '',
            '<white>libraries</white>',
            [
                'React.js',
                //   'Redux',
                //    'Jest',
            ].map(lib => `* <yellow>${lib}</yellow>`),
            '',
            '<white>tools</white>',
            [



                'Docker',
                'git',
                'github',
                'GNU/Linux'
            ].map(lib => `* <blue>${lib}</blue>`),
            '',



            '<white>OS</white>',
            [

                'Windows',
                'Linux',
                'macOS',

            ].map(lib => `* <silver>${lib}</silver>`),
            ''
        ]  .flat()

};

//////////////////////////////////////////////////////
const font = 'Slant';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);


// for the DIV     #div_terminal
let term =  $('body').terminal(my_cmds, {
    greetings: false,
    checkArity: false,
    //completion: true,


    completion(string) {
        // in every function we can use `this` to reference term object
        const cmd = this.get_command();
        // we process the command to extract the command name
        // at the rest of the command (the arguments as one string)
        const { name, rest } = $.terminal.parse_command(cmd);
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return Object.keys(directories).map(dir => `~/${dir}`);
            }
            if (cwd === root) {
                return Object.keys(directories);
            }
        }
        return Object.keys(my_cmds);
    },
    prompt });
term.pause();

start_event_handlers();



////////////////////////////////////////////////////////////////////


function ready() {
    // term.echo(greetings);
    //   term.echo(render('Terminal Portfolio'));

    //   term.echo(() => render('Terminal Portfolio'));


    /* term.echo(() => {
         const ascii = render('Terminal Portfolio');
         return `${ascii}\nWelcome to my Terminal Portfolio\n`;
     });*/

    /*term.echo(() => {
        const ascii = rainbow(render('Terminal Portfolio'));
        return `${ascii}\nWelcome to my Terminal Portfolio\n`;
    }).resume();*/

    $.terminal.xml_formatter.tags.green = (attrs) => {
        return `[[;#44D544;]`;
    };

    const seed = rand(256);
    term.echo(() => rainbow(render('Mr Strouroul'), seed))
        .echo(['Welcome to my Terminal Portfolio',
            '<i class="iconify" data-icon="logos:nodejs" data-toggle="tooltip" data-html="true"  data-placement="top" title="Find a Movie"></i>\n'], { raw: true })

        .echo('Type help or ? for help\n')
        .echo('(eg : ls skills , cd projects , help , ...)\n')
        .resume();


    term.on('click', '.command', function() {
        const command = $(this).text();
        term.exec(command);
    });


    term.on('click', '.directory', function() {
        const dir = $(this).text();
        term.exec(`cd ~/${dir}`);
    });




}
