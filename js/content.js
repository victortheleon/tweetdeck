/**
 * Created by kumanish on 7/1/17.
 */

// Clear Dash Board from tweetdeck
function clearDashBoard() {
    while($(".js-action-header-button.column-header-link.column-settings-link").length) {
        $(".js-action-header-button.column-header-link.column-settings-link").trigger("click");
        $(".icon.icon-close").trigger("click");
    }
}

function searchUsername(username) {
    $(".js-app-search-input.app-search-input.search-input").val(username);
    $(".icon.icon-search").trigger("click");
}

function pressEscape() {
    $("#open-modal").trigger("click");
}

function openTweets() {
    $(document).arrive(".fullname.link-complex-target", function() {
        $(this).get(0).click();
        $(document).unbindArrive(".fullname.link-complex-target");
    });
    $(document).arrive(".js-item-launch", function() {
        $(".js-item-launch ").get(0).click();
        $(document).unbindArrive(".js-item-launch");
    });
}

function likeTweets(limit) {
    if($(".tweet-context").length) {
    }
    $(document).arrive(".tweet-context", function() {
        $(".js-right-column").find(".js-icon-favorite.icon.icon-favorite-toggle.txt-center").slice(0, limit).not(".icon-heart-filled").click();
        // $(document).unbindArrive(".tweet-context");
        pressEscape();
        retweet(limit);
    });
}

function retweet(limit) {
    if($(".js-right-column").find(".js-icon-retweet.icon.icon-retweet-toggle.txt-center").slice(0, limit).not(".icon-retweet-filled").length) {
        $(".js-right-column").find(".js-icon-retweet.icon.icon-retweet-toggle.txt-center").slice(0, limit).not(".icon-retweet-filled").get(0).click();
        $(".acc-twitter.js-account-item.js-show-tip").click();
        $(".js-action-button.js-retweet-button.btn").click();
        pressEscape();
    }
}

var username = "TinaEdw28458050";
clearDashBoard();
searchUsername(username);
openTweets();
pressEscape();

