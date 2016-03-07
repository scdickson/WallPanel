function replaceCommon(text)
{
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&quot;/g, "\"");
    text = text.replace(/\"/g, "");
    return text;
}

function parseGithub(data)
{
    var temp = [];
    var index = 0;

    var i = 1;
    var lines = data.content.split("<h3 class=\"repo-list-name\">");

    for(i; i < lines.length; i++)
    {
      var repos = lines[i].split("\n");
      for(var j = 1; j < repos.length; j++)
      {
        if(j == 1)
        {
          temp[index] = repos[j].substring(14, repos[j].indexOf("\">"));
        }
        else
        {
          if(repos[j].indexOf("<p class=\"repo-list-description\">") > 0)
          {
            j+=1;
            temp[index] += " : " + repos[j];
          }
        }
      }

      if(temp[index].indexOf("<a") < 0)
      {
        temp[index] = replaceCommon(temp[index]);
        index++;
      }
    }

    return temp;
}

function parseGoogleNews(data)
{
  var temp = [];
  var index = 0;

  var lines = data.content.split("<title>");
  for(var i = 3; i < lines.length; i++)
  {
    temp[index] = lines[i].substring(0, lines[i].indexOf("</title>"));
    temp[index] = temp[index].substring(0, temp[index].indexOf("-")-1);
    index++;
  }

  return temp;
}

function parseVergeNews(data)
{
  var temp = [];
  var index = 0;

  var lines = data.content.split("<title>");
  for(var i = 2; i < lines.length; i++)
  {
    temp[index++] = lines[i].substring(0, lines[i].indexOf("</title>"));
  }

  return temp;
}

function parseTwitter(data)
{
  var temp = [];
  var index = 0;

  var lines = data.content.split("<li title=");
  for(var i = 1; i < lines.length; i++)
  {
    temp[index] = replaceCommon(lines[i].substring(0, lines[i].indexOf(">")));
    if(temp[index][0] != '#')
    {
      var tmp = temp[index];
      temp[index] = "#" + tmp;
    }
    index++;
  }

  return temp;
}

function parseRedditGamerNews(data)
{
  var temp = [];
  var index = 0;

  var lines = data.content.split("title=");
  for(var i = 1; i < lines.length; i++)
  {
    temp[index] = replaceCommon(lines[i].substring(0, lines[i].indexOf("/&gt;")));
    index++;
  }

  return temp;
}

function parseRedditTopPosts(data)
{
  var temp = [];
  var index = 0;

  var lines = data.content.split("title=");
  for(var i = 1; i < lines.length; i++)
  {
    temp[index] = replaceCommon(lines[i].substring(0, lines[i].indexOf("/&gt;")));
    index++;
  }

  return temp;
}
