 import fs from 'fs';


export class noteApp{
	constructor(){

	}

	fetchNotes() {
		try {
			let noteString = fs.readFileSync('notes.json');
			return JSON.parse(noteString);
		} catch(e) {
			return [];
		}
	}

	saveNotes(notes) {
	    fs.writeFileSync('notes.json', JSON.stringify(notes));
	}

	addNotes(title, body) {
		let notes = this.fetchNotes();
		let note = {
			title: title,
			body: body
		};
		let duplicateNotes = notes.filter((note) => note.title === title);

		if(duplicateNotes.length === 0){
			notes.push(note);
			this.saveNotes(notes);
			return note;
		}	
	}

	getAll() {
		return this.fetchNotes();
	}

	getNote(title) {
		let notes = this.fetchNotes();
		let filteredNotes = notes.filter((note) => note.title === title);
		return filteredNotes[0];
	}

	removeNotes(title) {
		let notes = this.fetchNotes();
		let newNotes = notes.filter((note) => note.title !== title);
		this.saveNotes(newNotes);
		return newNotes.length !== notes.length;
	}
	
	logNote(note) {
		console.log('--');
		console.log(`Tile: ${ note.title}`);
		console.log(`Body: ${ note.body}`);
	};
}

