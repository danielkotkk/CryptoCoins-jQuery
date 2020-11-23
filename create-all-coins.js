"use strict";
// Function that creates cards of crypto coins.
$(function () {
    window.createAllCoins = () => {
        $("#contentDiv").empty();
        $("#contentDiv").html(`<img id="gif" src="/assets/gif/giphy.gif">`);
        $("#contentDiv").addClass("justify-content-center");
        getInfoFromAjaxCall().then(allCoins => {
            let allCardsHTML = ``;
            const title = "<h1 class='col-12 mainTitle'> Crypto coins investing site </h1>";

            for (let i = 0; i < allCoins.length; i++) {
                // Gets the card information that built in the function.
                const coin = createCard(allCoins[i].id, allCoins[i].symbol, allCoins[i].name);

                // The first half of the page
                if (i === 0) {
                    const backgroundPicture = `<div class='parallax1'></div>`
                    allCardsHTML += backgroundPicture;
                }
                // The second half of the page
                if (i === 50) {
                    const backgroundPicture = `<div class='parallax2'></div>`
                    allCardsHTML += backgroundPicture;
                }
                allCardsHTML += coin;

            }
            $("#contentDiv").empty();
            $("#contentDiv").append(title + allCardsHTML);


        })
        getInfoFromAjaxCall().catch(err => {
            alert(err);
        })

    }
})