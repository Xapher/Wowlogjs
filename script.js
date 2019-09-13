function createXHR() 
{
    var request = false;
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (err3) {
				try {
					request = new XMLHttpRequest();
				}
				catch (err1) 
				{
					request = false;
				}
            }
        }
    return request;
}


function assignImages(fileResponse) 
{
	//do stuff

   	return fileResponse;   
} 

function loadHTML(url, fun, storage, param)
{
	var xhr = createXHR();
	xhr.onreadystatechange=function()
	{ 
		if(xhr.readyState == 4)
		{
			assignImages(xhr.responseText);
		} 
	}; 
	xhr.open("GET", url , true);
	xhr.send(null); 
} 

function processHTML(temp, target)
{
	target.innerHTML = temp.innerHTML;
}

function loadWholePage(path)
{
	var y = document.getElementById("storage");
	var x = document.getElementById("images");
	loadHTML(path, processHTML, x, y);
}


var report;
var fight;
var url;
function loadImageGallery() {
	var dropdowns = document.getElementById("filter-target-and-ability-selection");
	url = window.location.pathname.split("/");
	report = url[2];
	console.log(window.location.href);
	fight = window.location.href.substring(window.location.href.indexOf("fight="),window.location.href.indexOf("fight=") + 7);
	iframe = "<iframe id=\"frame\" src=\"https://www.warcraftlogs.com/reports/" + report + "/\">";
	var select = "<select id=\"abilityChange\"><option value=\"299255\">Stand Alone</option><option value=\"299254\">Stand Together</option><option value=\"299249\">Soak Orb</option><option value=\"298781\">Don't soak</option></select>";
	dropdowns.innerHTML = dropdowns.innerHTML + "<p>Compare with:</p> <button onclick=updateComparison()>Compare</button>" + select + iframe;
	document.getElementById("frame").style.display = "none";
}
var iframe;
var namesA;
var namesB
//hidden iframe, use that to get names
function updateComparison() {
	namesA = "";
	namesB = "";
	//var debuffA = GetURLParameter('ability');
	var debuffB = document.getElementById("abilityChange").value;
	namesA = document.getElementsByClassName("main-table-name"); //.innerText
	var frame = document.getElementById("frame");
	frame.src = ("https://www.warcraftlogs.com/reports/" + report + "#" + fight[0] + "&type=auras&spells=debuffs&ability=" + debuffB);
	namesB = frame.contentWindow.document.getElementsByClassName("main-table-name");
	console.log(namesB);
	console.log(namesA);
	for (var i = 0; i < namesA.length; i++) {
		document.getElementsByClassName("main-table-name")[i].childNodes[3].className = "";
		document.getElementsByClassName("main-table-name")[i].childNodes[3].style.color = "red";
		for (var x = 0; x < namesB.length; x++) {
			if(namesA[i].innerText.trim() === namesB[x].innerText.trim()) {
				console.log("Equal" + namesA[i].innerText.trim());
				document.getElementsByClassName("main-table-name")[i].childNodes[3].className = "";
				document.getElementsByClassName("main-table-name")[i].childNodes[3].style.color = "green";
			}
		}
	}
	
} 
loadImageGallery();