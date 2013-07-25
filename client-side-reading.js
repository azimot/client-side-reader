function padHex(char)
  {
  	if (char.length < 2)
  		return "0" + char;
 	return char; 
  }

  function outputHex(result)
  {
  	var width = 16;
  	hexString = "";

  	for(i=0; i<result.length;i++)
  	{
  		hexString = hexString + padHex(result[i].charCodeAt(0).toString(16).toUpperCase()) + " ";
  		if (!(hexString.length % width))
  			hexString = hexString + '\r\n';
  	}

  	return hexString;
  }

  function readBlob(opt_startByte, opt_stopByte) 
  {
    var files = document.getElementById('files').files;
    if (!files.length) 
    {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) 
    {
      if (evt.target.readyState == FileReader.DONE) 	// DONE == 2
      { 
      	res = evt.target.result;

        document.getElementById('byte_content').textContent = res;
        document.getElementById('hash_content').textContent = CryptoJS.SHA1(res); 
        document.getElementById('hex_content').textContent = outputHex(res);

        document.getElementById('byte_range').textContent = 
            ['Read bytes: ', start + 1, ' - ', stop + 1,
             ' of ', file.size, ' byte file'].join('');
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  }
  
  document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') 
    {
      var startByte = evt.target.getAttribute('data-startbyte');
      var endByte = evt.target.getAttribute('data-endbyte');
      readBlob(startByte, endByte);
    }
  }, false);