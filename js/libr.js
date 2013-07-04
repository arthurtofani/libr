var isPhonegap = function() {
  return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
}




LibrFileReader = {	
	filesystem:null,
	currentFolder:"",
	nextFileName:"", // filename to be used when importing a new book
    entries:[],

	reqFileSystem: null,
	callback:null,	

	init:function(cbk){
		LibrFileReader.callback = cbk;
		if(LibrFileReader.filesystem){
			if(LibrFileReader.callback!=null) LibrFileReader.callback();
			return;
		}

		if(isPhonegap()){ 
			requestFileSystem(window.TEMPORARY, 3 * 1024 * 1024, this.onInitFs, this.fail);
		} else {
			webkitRequestFileSystem(window.TEMPORARY, 3 * 1024 * 1024, this.onInitFs, this.fail);
		}
		
	},

	onInitFs:function(fs) {
		LibrFileReader.filesystem = fs;
		if(LibrFileReader.callback!=null) LibrFileReader.callback();
		//this.readEntries(); // Start reading dirs.
	},
	

	fail: function (e) { 
		console.log("Could not request File System", e); 
	},


	createFolder : function(folder) {
		LibrFileReader.filesystem.root.getDirectory(folder, {
			create : true,
			exclusive : false
		}, this.onFolderReady, this.fail);
	},

	openFolder : function(folder) {
		LibrFileReader.filesystem.root.getDirectory(folder, {
			create : false,
			exclusive : false
		}, this.onFolderReady, this.fail);
	},
 
	onFolderReady : function(entry) {
		LibrFileReader.currentFolder = entry;
		console.log(entry);
		LibrFileReader.readEntries(entry);
	},

  	createFile : function(){
		LibrFileReader.filesystem.root.getFile('log.txt', {create: true, exclusive: true}, this.onFileCreated, this.fail);
	},

	onFileCreated : function(fileEntry){
		console.log("conseguiu", fileEntry);
	},

    	readEntries : function(entry) {
		var dirReader = entry.createReader();
		dirReader.readEntries (this.onEntriesResults, this.fail);
	},

	onEntriesResults:function(results){
		LibrFileReader.entries.push (results) ;
		console.log(results);
	},
	
	importFile : function(f){
		var reader = new FileReader();
		reader.onload = this.onImportLoad;
		reader.onloadend = this.onImportLoadEnd;
		reader.readAsBinaryString(f);
	},

	onImportLoad : function(q){
		console.log(q);
	},

	// quando importa o epub
	onImportLoadEnd : function(q){
		LibrFileReader.unzipEbook(q.srcElement.result);
	},

	unzipEbook : function(file){
		console.log("descompactando...");
		var unzipper = new JSUnzip(file);
		var isItOk = unzipper.isZipFile();
		if(isItOk){
			unzipper.readEntries();
			unzipper.entries;  
		} else {
			//TODO: deal with it...
		}
		console.log("ok!");
		console.log(unzipper.entries);
	}
		
}




window.Libr = {		
	shelf : [],
	downloadPath : ".",
	shelfPath : "./shelf",
	fileReader : LibrFileReader
}





