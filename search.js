"use strict";
$(function () {
    $("#searchBtn").off("click").on("click", () => {

        const searchInputValue = $("#searchInput").val();

        if (searchInputValue === "" || searchInputValue === " ") {
            alert("Failed: You must enter symbol name to search.");
            return;
        }
        
        
        navBarActiveClass(this);
        getBackground();
        let foundCoin = false;
        $("#contentDiv").html(`<img id="gif" src="/assets/gif/giphy.gif">`);
        // Gets all coins.
        getInfoFromAjaxCall().then(allCoins => {
            // Run through all coins.
            allCoins.forEach(coin => {
                if (coin.symbol === searchInputValue) {
                    foundCoin = true;
                    $("#contentDiv").empty();

                    const coinHTML = createCard(coin.id, coin.symbol, coin.name);
                    $("#contentDiv").empty();
                    $("#contentDiv").append(coinHTML);
                    $("#searchInput").val("");
                    return;
                }

            })
            if (!foundCoin) {
                $("#contentDiv").empty();
                alert("Failed: There is no such a coin!");
                $.getScript("/main.js");
                
            }
        })

    })
})



