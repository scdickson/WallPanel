/*Format:
	Weight
	Color for display
	URL of feed
	[split string, end of title indicator]
	Position to begin looking for items (removes title of news site and other information at the top of the page)
	Max number of items to fetch
*/
var MIN_NUM_NEWS_ITEMS = 15;
var CATEGORIES = [
	[0.50, 'red', "https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&output=rss", ["<title>", "</title>"], 3, 20],
	[0.20, 'green', "http://www.theverge.com/rss/index.xml", ["<title>", "</title>"], 2, 10],
	[0.10, 'cyan', "http://trends24.in/united-states/", ["<li title=", ">"], 1, 10],
	[0.20, 'yellow', "https://www.reddit.com/r/gamernews/new/.rss", ["title=", "/&gt;"], 1, 10]
];
var category_index = 0;

var allNews = [];
var allNewsIndex = 0;

function nextCategory()
{
	if(category_index < CATEGORIES.length)
	{
		//console.log("GET " + category_index);
		return CATEGORIES[category_index++];
	}

	return null;
}

function fetchDataFromSource(category)
{
	if(!category)
	{
		aggregateSources();
		return false;
	}

	xReader(category[2], function(data) 
	{ 
		if(data.content)
		{
			var split = category[3][0];
			var end = category[3][1];
			var lines = data.content.split(split);
			var temp = [];
			var index = 0;

	    	for(var i = category[4]; i < lines.length && i < (category[5] + category[4]); i++)
	    	{
	    		temp[index] = lines[i].substring(0, lines[i].indexOf(end));
	    		temp[index] = temp[index].replace(/\"/g, "");
	    		temp[index] = temp[index].replace(/amp;/g, "&");
	    		index++;
	    	}

	    	var required_num_items = Math.ceil(category[0] * MIN_NUM_NEWS_ITEMS);
	    	if(temp.length <= required_num_items)
	    	{
	    		for(var i = 0; i < temp.length; i++)
	    		{
	    			//console.log("ADD (" + i + "/" + required_num_items + ") " + temp[i]);
	    			allNews[allNewsIndex++] = "<font color=\"" + category[1] + "\">" + temp[i] + "</font>&nbsp;\u2022&nbsp;";
	    		}
	    	}
	    	else
	    	{
	    		for(var i = 0; i < required_num_items; i++)
		    	{
		    		var random = Math.floor((Math.random() * temp.length) + 0);

		    		while(containsNewsItem(temp[random]))
		    		{
		    			random = Math.floor((Math.random() * temp.length) + 0);
		    		}

		    		//console.log("ADD (" + i + "/" + required_num_items + ") " + temp[random]);
		    		allNews[allNewsIndex++] = "<font color=\"" + category[1] + "\">" + temp[random] + "</font>&nbsp;\u2022&nbsp;";
		    	}
	    	}
		}
		else
		{
			console.log("FAILED TO GET " + category[2]);
		}

		fetchDataFromSource(nextCategory());
	})	
}

function containsNewsItem(item)
{
	for(var i = 0; i < allNews.length; i++)
	{
		if(allNews[i] == item)
		{
			return true;
		}
	}

	return false;
}

function getAggregateNews()
{
	fetchDataFromSource(nextCategory());
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function aggregateSources()
{
	console.log("DONE AGGREGATING NEWS");
	shuffle(allNews);
	var news = "<h2>";
	for(var i = 0; i < allNews.length; i++)
	{
		news += allNews[i];
	}
	news += "</h2>";
	//console.log(news);
	document.getElementById('news-content').innerHTML = news;
	$('.marquee').marquee();
}