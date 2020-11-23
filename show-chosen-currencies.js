"use strict";
$(function () {
    $(document).off("click", "#showChosenCoinsBtn").on("click", "#showChosenCoinsBtn", () => {

        // If there are no coins selected
        if (getCurrenciesSymbol() === null || getCurrenciesSymbol().length < 1) {
            alert("Error: You must select coins to see them");
            return;
        }
        $("#contentDiv").empty();
        $("#contentDiv").html(`<img id="gif" src="/assets/gif/another-loading.gif">`);
        navBarActiveClass(this);
        getBackground();
        let html = "";

        const savedCurrenciesSymbol = getCurrenciesSymbol();
        const savedCurrenciesName = getCurrenciesName();
        const savedCurrenciesId = getCurrenciesId();
        
        // Creates the cards  
        for (let i = 0; i < savedCurrenciesSymbol.length; i++) {
            const coin = createCard(savedCurrenciesId[i], savedCurrenciesSymbol[i], savedCurrenciesName[i]);

            html += coin;


            $("#contentDiv").empty();
            $("#contentDiv").append(html);

        }


    })
})