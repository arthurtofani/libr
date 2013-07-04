function EpubFileReader(){
	var gotFileSystem = false;
	var callback = null;
}

EpubFileReader.prototype.requestFileSystem = function(filename, clbk) {
	callback = clbk;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

EpubFileReader.prototype.onFileSystemSuccess = function(fileSystem) {
	gotFileSystem = true;
}


EpubFileReader.prototype.read = function(filename, clbk) {
	if(gotFileSystem){
		callback = clbk;
	    var reader = new FileReader();
    	reader.onloadend = function(evt) {
        console.log("read success" evt);
    };
    reader.readAsText(file);
		
	} else {
		console.log ("erro, não leu sistema de arquivos")
	}
}




