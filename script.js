console.clear();
var _data = JSON.parse(`{
    "lyrics":[
    
    {"line":"","time":-1},
    
    {"line":"I remember when I first noticed that you liked me back","time":42000},
    
    {"line":"We were sitting down in a restaurant waiting for the check","time":52700},
    
    {"line":"We had made love earlier that day with no strings attached","time":63500},
    
    {"line":"But I could tell that something had changed how you looked at me then","time":73060},

    {"line":"Kristen come right back","time":83200},

    {"line":"I've been waiting for you to slip back in bed","time":89120},

    {"line":"When you light the candle","time":99380},

    {"line":"And on the Lower East Side you're dancing with me now","time":125320},

    {"line":"And I'm taking pictures of you with flowers on the wall","time":135660},

    {"line":"Think I like you best when you're dressed in black from head to toe","time":145900},

    {"line":"Think I like you best when you're just with me","time":156100},

    {"line":"And no one else...","time":160040},

    {"line":"Kristen come right back","time":165940},

    {"line":"I've been waiting for you to slip back in bed","time":171080},

    {"line":"When you light the candle","time":180136},

    {"line":"And I'm kissing you lying in my room","time":206340},

    {"line":"Holding you until you fall asleep","time":216800},

    {"line":"And it's just as good as I knew it would be","time":226580},

    {"line":"Stay with me I don't want you to leave...","time":238040},

    {"line":"Kristen come right back","time":267260},

    {"line":"I've been waiting for you to slip back in bed","time":272000},

    {"line":"When you light the candle","time":283680}

    ]}`);
var currentLine = "";

function align() {
    var a = $(".highlighted").height();
    var c = $(".content").height();
    var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
    var e = d + (a / 2) - (c / 2);
    $(".content").animate({ scrollTop: e + "px" }, { easing: "swing", duration: 250 });
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
    if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
        lyricHeight = $(".lyrics").height();
        align();
    }
});

$(document).ready(function() {
    $("video").on('timeupdate', function(e) {
        var time = this.currentTime * 1000;
        var past = _data["lyrics"].filter(function(item) {
            return item.time < time;
        });
        if (_data["lyrics"][past.length] != currentLine) {
            currentLine = _data["lyrics"][past.length];
            $(".lyrics div").removeClass("highlighted");
            $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
            align();
        }
    });
});

generate();

function generate() {
    var html = "";
    for (var i = 0; i < _data["lyrics"].length; i++) {
        html += "<div";
        if (i == 0) {
            html += ` class="highlighted"`;
            currentLine = 0;
        }
        if (_data["lyrics"][i]["note"]) {
            html += ` note="${_data["lyrics"][i]["note"]}"`;
        }
        html += ">";
        html += _data["lyrics"][i]["line"] == "" ? "K." : _data["lyrics"][i]["line"];
        html += "</div>"
    }
    $(".lyrics").html(html);
    align();
}
