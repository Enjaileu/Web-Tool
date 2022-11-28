const yargs = require('yargs')

yargs.command('remove', 'remove a note', {}, ()=>{console.log("Remove a note")}) //command, documentation, javascript object, function to execute
yargs.command('read', 'read a note', {}, ()=>{console.log("Read a note")}) //command, documentation, javascript object, function to execute
yargs.command('list', 'list notes', {}, ()=>{console.log("List notes")}) //command, documentation, javascript object, function to execute

yargs.command('add', 'add a note',
            {
                title: {describe : 'Note title', demandOption: true, type:'string'},
                body : {describe : 'Note body', demandOption: true, type:'string'}
            },
            (argv)=>{console.log("Title : ", argv.title)
                    console.log("Body : ", argv.body)}
);

yargs.parse()

