// Clear Dash Board from tweetdeck
function clearDashBoard() {
    $(".js-action-header-button.column-header-link.column-settings-link").trigger("click");
    $(".icon.icon-close").trigger("click");
}

function searchUsername(username) {
    $(".js-app-search-input.app-search-input.search-input").val(username);
    $(".icon.icon-search").trigger("click");
}

function pressEscape() {
    $("#open-modal").trigger("click");
}

function openTweets() {
    $(".js-item-launch ").get(0).click();
}

function likeTweets(limit) {
    $(document).arrive(".tweet-context", function () {
        $(".js-right-column").find(".js-icon-favorite.icon.icon-favorite-toggle.txt-center").slice(0, limit).not(".icon-heart-filled").click();
        $(document).unbindArrive(".tweet-context");
    });
}

function retweet(limit) {
    $(".js-right-column").find(".js-icon-retweet.icon.icon-retweet-toggle.txt-center").slice(0, limit).not(".icon-retweet-filled").get(0).click();
    $(".acc-twitter.js-account-item.js-show-tip").click();
    $(".js-action-button.js-retweet-button.btn").click();
}

var username = "";
var stepdelay = undefined;
var app_state = undefined;
var topretweets = 0;
var index = 0;
var liked = false;

function retweetThis() {
    setTimeout(function () {
        var divs = document.querySelectorAll('div.js-column-holder.column-holder');
        var divToAct = divs[0].getElementsByTagName('div')[0];
        divToAct.innerHTML = getClicker(username) + divToAct.innerHTML;
        divToAct.getElementsByTagName('a')[0].click();
        setTimeout(function () {
            openTweets();
            if(!liked) {
                setTimeout(function () {
                    likeTweets(topretweets);
                    liked = true;
                }, 500);
            }
            setTimeout(function () {
                var tweetButtons = $(".js-right-column").find(".js-icon-retweet.icon.icon-retweet-toggle.txt-center").slice(0, topretweets).not(".icon-retweet-filled");
                if(tweetButtons.get(index)) {
                    tweetButtons.get(index).click();
                    console.log(index);
                    console.log(topretweets);
                    setTimeout(function () {
                        $(".acc-twitter.js-account-item.js-show-tip").click();
                        $(".js-action-button.js-retweet-button.btn").click();
                        $("#the-parker-elem-1111").remove();
                        index++;
                        if(index < topretweets) {
                            retweetThis();
                        } else {
                            liked = false;
                            index = 0;
                            setTimeout(function () {
                                retweetThis();
                            }, stepdelay * 60 * 1000);
                        }
                    }, 1000);
                } else {
                    liked = false;
                    index = 0;
                    setTimeout(function () {
                        retweetThis();
                    }, stepdelay * 60 * 1000);
                }
            }, 2000);
        }, 3000);
    }, 4000);
}

chrome.storage.local.get(["username", "stepdelay", "topretweets", "app_state"], function (result) {
    username = result.username;
    stepdelay = result.stepdelay;
    topretweets = result.topretweets;
    app_state = result.app_state;
    if (username && stepdelay && topretweets && app_state) {
        index = 0;
        retweetThis(username);
    }
});

function getClicker(uname) {
    return '<a id="the-parker-elem-1111" class="account-link link-complex block" href="https://twitter.com/julietsnider941" data-user-name="' +
        uname +
        '" rel="user" target="_blank"> <span class="account-inline  txt-ellipsis "> <b class="fullname inline-block link-complex-target    position-rel">Sample User </b>  <span class="username txt-mute">@' +
        uname + '</span>   </span>   </a>';
}