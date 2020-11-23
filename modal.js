"use strict";
$(function () {

    let currenciesToDelete = [];
    $("#deleteModal").off("change", "#modalCheckBoxToggle").on("change", "#modalCheckBoxToggle", function () {

        // if the client unchecked the box, delete it from the currencies to delete
        if ($(this).is(":checked") === false) {
            currenciesToDelete.pop();
        // add it to the currencies to delete if the user checked the coin at the modal.
        } else
            currenciesToDelete.push($(this).attr("symbol"));

    })
    // If the user clicked on "save button"
    $("#saveModalChangesBtn").off("click").on("click", () => {
        if (currenciesToDelete.length > 0) {
            let currenciesSymbol = getCurrenciesSymbol();
            let namesOfCoins = getCurrenciesName();
            let idsOfCoins = getCurrenciesId();

            currenciesToDelete.forEach(currencyToDelete => {
                const indexOfCurrencyToDelete = currenciesSymbol.indexOf(currencyToDelete);
                currenciesSymbol.splice(indexOfCurrencyToDelete, 1);
                namesOfCoins.splice(indexOfCurrencyToDelete, 1);
                idsOfCoins.splice(indexOfCurrencyToDelete, 1);
                // Uncheck the coin
                $(`.checkBoxToggle[symbol='${currencyToDelete}']`).prop("checked", false);


            })

            // Check the coin that the client wanted to check.
            $(`.checkBoxToggle[symbol='${addCoinIfDeleted}']`).prop('checked', true);

            currenciesSymbol.push(addCoinIfDeleted);
            namesOfCoins.push($(`.checkBoxToggle[symbol='${addCoinIfDeleted}']`).attr("name"));
            idsOfCoins.push($(`.checkBoxToggle[symbol='${addCoinIfDeleted}']`).attr("id"));

            localStorage.setItem("allChosenCurrenciesSymbols", JSON.stringify(currenciesSymbol));
            localStorage.setItem("allChosenCurrenciesNames", JSON.stringify(namesOfCoins));
            localStorage.setItem("allChosenCurrenciesId", JSON.stringify(idsOfCoins));

            currenciesToDelete = [];
            $('#deleteModal').modal('hide');
            return;
        }
        // If the user didn't choose any coin to delete and clicked on "save"
        alert("Failed: You must choose coin to delete or close the modal.");
    })

})