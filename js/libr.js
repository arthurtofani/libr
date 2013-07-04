var isPhonegap = function() {
  return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
}




LibrFileReader = {	
	filesystem:null,

    entries:[],

	reqFileSystem: null,

	init:function(){
		if(isPhonegap()){ 
			requestFileSystem(window.PERSISTENT, 1 * 1024 * 1024, this.onInitFs, this.fail);
		} else {
			webkitRequestFileSystem(window.PERSISTENT, 1 * 1024 * 1024, this.onInitFs, this.fail);
		}		
	},

	onInitFs:function(fs) {
		this.filesystem = fs;
		//this.readEntries(); // Start reading dirs.
	},

	fail: function (e) { console.log("Could not request File System", e); },

    readEntries:function() {
		var dirReader = this.filesystem.root.createReader();
		dirReader.readEntries (this.onEntriesResults, this.fail);
	},

	onEntriesResults:function(results){
		// entries.push (results) ?
		console.log(results)
	}

}

Libr = {		
	shelf : [],
	downloadPath : ".",
	shelfPath : "./shelf",
	fileReader : LibrFileReader
}





