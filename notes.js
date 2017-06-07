const fs = require('fs');


var fetchNotes = () => {
	try {
		var noteString = fs.readFileSync('notes.json');
		return JSON.parse(noteString);
	} catch(e) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes.json', JSON.stringify(notes));
};

var addNotes = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title: title,
		body: body
	};
	var duplicateNotes = notes.filter((note) => note.title === title);

	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
	
	
};

var getAll = () => {
	return fetchNotes();
}; 

var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title === title);
	return filteredNotes[0];
};

var removeNotes = (title) => {
	var notes = fetchNotes();
	var newNotes = notes.filter((note) => note.title !== title);
	saveNotes(newNotes);
	return newNotes.length !== notes.length;
};
var logNote = (note) => {
	console.log('--');
	console.log(`Tile: ${ note.title}`);
	console.log(`Body: ${ note.body}`);
};

module.exports = {
	addNotes: addNotes,
	getAll: getAll,
	getNote: getNote,
	removeNotes: removeNotes,
	logNote: logNote
}