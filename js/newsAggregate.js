/*Format:
	Weight
	Color for display
	URL of feed
	Function in newsParsers.js to handle parsing raw rss
*/
var MIN_NUM_NEWS_ITEMS = 15;
var CATEGORIES = [
	[0.40, 'LightCoral', "http://news.google.com/news?cf=all&hl=en&pz=1&ned=us&output=rss", function(data){return parseGoogleNews(data)}],
	[0.20, 'MediumSeaGreen', "http://www.theverge.com/rss/index.xml", function(data){return parseVergeNews(data)}],
	[0.10, 'MediumTurquoise', "http://trends24.in/united-states/", function(data){return parseTwitter(data)}],
	[0.10, 'Khaki', "http://www.reddit.com/r/gamernews/new/.rss", function(data){return parseRedditGamerNews(data)}],
	[0.10, 'MediumPurple', "https://www.reddit.com/r/all/.rss", function(data){return parseRedditTopPosts(data)}],
	[0.10, 'WhiteSmoke', "http://github.com/trending", function(data){return parseGithub(data)}]
];
var category_index = 0;

var allNews = [];
var allNewsIndex = 0;

function nextCategory()
{
	if(category_index < CATEGORIES.length)
	{
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
			var temp = category[3](data);
	    	var required_num_items = Math.ceil(category[0] * MIN_NUM_NEWS_ITEMS);
	    	if(temp.length <= required_num_items)
	    	{
	    		for(var i = 0; i < temp.length; i++)
	    		{
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
	for(var i = 0; i < Math.floor((Math.random() * 5) + 1); i++)
	{
		shuffle(allNews);
	}

	var news = "<h2>";
	for(var i = 0; i < allNews.length; i++)
	{
		news += allNews[i];
	}
	news += "</h2>";
	//console.log(news);

	$('.marquee').marquee('destroy');
	$('.marquee').bind('finished', scrollMarquee(news));
}

function scrollMarquee(news)
{
	$('.marquee').html(news);
	$('.marquee').marquee();
}
