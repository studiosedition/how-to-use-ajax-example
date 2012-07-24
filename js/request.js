function makeRequest(url) 
{
	if(window.XMLHttpRequest)
	{
		request = new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		request = new ActiveXObject("MSXML2.XMLHTTP");
	}
	
	sendRequest(url);
}

function sendRequest(url)
{
	request.onreadystatechange = onResponse;
	request.open("GET", url, true);
	request.send(null);
}

function checkReadyState(obj)
{
	if(obj.readyState == 0) { document.getElementById('copy').innerHTML = "Sending Request..."; }
	if(obj.readyState == 1) { document.getElementById('copy').innerHTML = "Loading Response..."; }
	if(obj.readyState == 2) { document.getElementById('copy').innerHTML = "Response Loaded..."; }
	if(obj.readyState == 3) { document.getElementById('copy').innerHTML = "Response Ready..."; }
	if(obj.readyState == 4)
	{
		if(obj.status == 200)
		{
			return true;
		}
		else if(obj.status == 404)
		{
			// Add a custom message or redirect the user to another page
			document.getElementById('copy').innerHTML = "File not found";
		}
		else
		{
			document.getElementById('copy').innerHTML = "There was a problem retrieving the XML.";
		}
	}
}

function onResponse() 
{
	if(checkReadyState(request))
	{
		//alert(request.responseXML);
		//alert(request.responseText);
		var response = request.responseXML.documentElement;
		var header = response.getElementsByTagName('header')[0].firstChild.data;
		var description = response.getElementsByTagName('description')[0].firstChild.data;
		var sourceUrl = response.getElementsByTagName('sourceUrl')[0].firstChild.data;
		document.getElementById('copy').innerHTML = "<b>" + header + "</b><br/>"
													 + description + "<br/><br/>"
													 + "<a href='" + sourceUrl + "'>Download the source files</a>"
													 + "<br/><br/>";
	}
}