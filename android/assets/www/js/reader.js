var bookshelf = [];
var books[];
var booksPath = "";
var fileReader =  = new FileReader();
var workPath = "";
var currentBook = null;
var navLinks = [];
var navStructure = {};

function onDeviceReady() {
	fileReader.requestFileSystem();
}

function getBookList(){	
	books = [];
	return books;
}

function searchBooks(){
	//default location;	
}

function addNewBook(bookName){	
	unpack_path  = createNewBookFolder(bookName); 
	unpackBook(bookName, unpack_path);	
}
function createNewBookFolder(bookName){
	return workPath + "/" + bookName;
}


// descompacta o livro em uma pasta
function unpackBook(bookName, unpack_path){
	var bookSource = booksPath + "/" + bookName;
}



var fail = function(evt) {
    console.log(error.code);
};

entry.file(win, fail);

function runBook(book_id){
	
}