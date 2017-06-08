
import yargs from 'yargs';
import {noteApp} from './notes.js';

const notes = new noteApp();


(function(){
	const titleOption = {
		describe: 'Title of note',
		demand: true,
		alias: 't'
	};

	const argv = yargs
	    .command('Add', 'Add a note', {
	    	title: titleOption,
	    	body: {
	    		describe: 'Body of note',
				demand: true,
				alias: 'b'
	    	}
    	})
	    .command('List', 'List all notes')
	    .command('Read', 'Read a single note',{
	    	title: titleOption,
	    })
	    .command('Remove', 'Revome a note', {
	    	title: titleOption
	    })
	    .help()
	    .argv;

	const command = argv._[0];
	
	if(command === 'Add'){
		let note = notes.addNotes(argv.title, argv.body);
		if(note) {
			console.log('Note created');
			notes.logNote(note);
		} else {
			console.log('Note title taken');
		}
	} else if(command === 'List') {
		let allNotes = notes.getAll();
		console.log(`The number of Notes added is ${allNotes.length}`);
		allNotes.forEach((note) => notes.logNote(note));
	} else if(command === 'Read'){
		let note = notes.getNote(argv.title);
		if(note){
			console.log('Note found');
			notes.logNote(note);
		} else {
			console.log('Note not found');
		}
	} else if(command === 'Remove'){
		let removedNote = notes.removeNotes(argv.title);
		if(removedNote){
			console.log('Note removed');
		}else{
			console.log('No note with this title');
		}
	} else{
		console.log('Command not recognize');
	}
})()




