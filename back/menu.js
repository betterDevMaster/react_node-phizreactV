var wsDomain = '';
if(!wsDomain){
    wsDomain = document.domain;
}
wsPort = 8080;
wsProtocol = 'ws';
wsPath = '';

var themes = {
    
};

var examples = {
    
};

var forceHttpsDirs = [];
var baseurl='https://tushubjj.com/demos/';
var navTpl = '<div id="sidebar">\
          <ul>\
          <li><a href="'+baseurl+'private_group/">Group Chat Private</a></li>\
              <li><a href="'+baseurl+'invite/">Group Chat Invitaion</a></li>\
            </ul>\
        </div>\
		<nav class="navbar navbar-default" role="navigation"> \
                <div class="container-fluid"> \
                    <div class="navbar-header"> \
                        <a class="navbar-brand" href="#"><img src="'+baseurl+'logo.png"></a> \
                    </div> \
                    </div> \
            </nav>';

$(document).ready(function(){
    //check https
    var loc = window.location.pathname;
    var dir = loc.substring(loc.lastIndexOf('/') + 1);
    if(!dir){
        loc = loc.substring(0, loc.length - 1);
        dir = loc.substring(loc.lastIndexOf('/') + 1);
    }
    var forceHttps = forceHttpsDirs.indexOf(dir) > -1;
    if (forceHttps && window.location.protocol != "https:"){
        window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);   
    }
    //https traffic
    if(window.location.protocol == "https:"){
        wsProtocol = 'wss';
        wsPort = (window.location.port)? window.location.port: '443';
        wsPath = '/wss/';
    }
    wsUrlDefault = wsProtocol + '://' + wsDomain + ':' + wsPort + wsPath;
    var $menu = $(navTpl);
    $menu.find('a.navbar-brand').html($('h1').html());    
    $(".container").prepend($menu);
    $('h1').remove();
    //render themes
    var themesHtml = '';
    var defaultTheme = localStorage.exampleTheme;
	//alert(defaultTheme)
    for(var theme in themes){
        if(!defaultTheme){
            defaultTheme = theme;
        }
        themesHtml += '<li><a href="' + themes[theme] + '" data-theme="' + theme + '">' + theme +'</a></li>';
    }
    $menu.find('#themes').html(themesHtml);
    $menu.find('#themes li a').click(function(){
        localStorage.exampleTheme = $(this).data('theme');
        $('#themeCss').attr('href',$(this).attr('href'));
        return false;
    });
    //apend css
    $('head').append('<link rel="stylesheet" id="themeCss" type="text/css" href="' + themes[defaultTheme] + '">');
    
    //render examples
    var examplesHtml = '';
    var target = '_self';
    var exLink = '';
    for(var example in examples){
        target = '_self';
        exLink = './../' + examples[example];
        if(examples[example].indexOf('http') == 0){
            target = '_blank';
            exLink = examples[example]; 
        }
        examplesHtml += '<li><a href="' + exLink + '" target="' + target + '">' + example +'</a></li>';
    }
    $menu.find('#examples').html(examplesHtml);   
});