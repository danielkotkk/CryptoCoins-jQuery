"use strict";
$(function () {
    $(document).ready(() => {
        createAllCoins(); // Call the function to build Crypto Coins
        navBarActiveClass($("#homeLink"));

    })

    //Gets the saved symbols from local storage.
    window.getCurrenciesSymbol = () => JSON.parse(localStorage.getItem("allChosenCurrenciesSymbols"));
    //Gets the saved coin name from local storage.
    window.getCurrenciesName = () => JSON.parse(localStorage.getItem("allChosenCurrenciesNames"));
    //Gets the saved coin id from local storage.
    window.getCurrenciesId = () => JSON.parse(localStorage.getItem("allChosenCurrenciesId"))
    // Sets background depends on the number that returns from the Math.random
    window.getBackground = () => {
        const randomNum = Math.round(Math.random() + 1);
        $('body').css('background-image', `url(/assets/images/background${randomNum}.jpg)`);
        $('body').css('background-repeat', 'no-repeat');
        $('body').css('background-size', 'cover');
        $('body').css('background-position', 'center');
        $('body').css('background-attachment', 'fixed');

    }
    window.navBarActiveClass = navLink => {
        const clickedItem = navLink;
        $(".nav-link").each(function () {
            $(this).removeClass("active");
        });
        $(clickedItem).addClass("active");
    }

    // Checks if symbol exists in local storage and add attribute "checked" if it is.
    window.checkExistsInLocalStorage = coinSymbol => {
        if (getCurrenciesSymbol() !== null && getCurrenciesSymbol().indexOf(coinSymbol) > -1) {
            return "checked";
        }
        return;
    }


    // Function that gets the information about the coins from the ajax call
    window.getInfoFromAjaxCall = () => {
        return new Promise((resolve, reject) => {


            $.ajax({
                url: `https://api.coingecko.com/api/v3/coins/list`,
                success: coins => {
                    const coinsToGet = 100;
                    let arrayOfCoinsToGet = [];
                    for (let i = 0; i < coinsToGet; i++) {
                        arrayOfCoinsToGet.push(coins[i]);
                    }
                    resolve(arrayOfCoinsToGet);

                },
                error: () => {
                    reject("Failed to get API");
                }
            })
        })
    }

    window.createCard = (id, symbol, name) => {
        return `<div class="card col-md-4 col-12"> 
        <h5 class="card-header paddingBottomOff"> ${symbol}    
            <label class="switch switchPositionFix">
                <input class="checkBoxToggle" id='${id}' name='${name}' type="checkbox" symbol='${symbol}' ${checkExistsInLocalStorage(symbol)}>
                <span class="slider round"></span>
            </label> 
        </h5>
          
        <div class="card-body" cardBodySymbol='${symbol}'>
            <h5 class="card-title"> Name: ${name} </h5>
            <button class="moreInfoBtn btn btn-warning" type="button" data-toggle="${id}" data-target="#${id}" aria-expanded="false" aria-controls="collapseExample">
                More info
            </button>
            
        <div class="collapse ${id}">
            <div class="card card-body"></div>
        </div>

        </div>
    </div>`
    }
    let currenciesSymbol;
    let namesOfCoins;
    let idsOfCoins;
    $(document).off("change", ".checkBoxToggle").on("change", ".checkBoxToggle", function () {

        // Prevent bugs, to make sure the data is updated.
        getCurrenciesSymbol() === null ? currenciesSymbol = [] : currenciesSymbol = getCurrenciesSymbol();
        getCurrenciesName() === null ? namesOfCoins = [] : namesOfCoins = getCurrenciesName();
        getCurrenciesId() === null ? idsOfCoins = [] : idsOfCoins = getCurrenciesId();

        if (currenciesSymbol !== null) {
            if (currenciesSymbol.length === 5 && $(this).is(':checked')) { // if max currencies reached,if the currency isn't checked.

                $(this).prop('checked', false);
                window.addCoinIfDeleted = $(this).attr("symbol"); // Saved symbol for the modal.
                let divOfAllCurrencies = ``;

                getCurrenciesSymbol().forEach(currency => {

                    const currentCurrency = `
                    <div class="card" id="cardModalMargin">
                        <div class="card-header">
                            <h5>${currency}</h5>
                        </div>

                        <div>                         
                            <label class="switch" id="modalToggle">
                            <input id="modalCheckBoxToggle" type="checkbox" symbol='${currency}'>
                            <span class="slider round"></span>
                            </label>
                        </div>
                    </div>`
                    divOfAllCurrencies += currentCurrency;
                })
                $("#modalOfchosenCurrencies").html(divOfAllCurrencies);
                $('#deleteModal').modal('show');

                return;
            }

            // If the coin is already checked and the user want to uncheck
            else if ($(this).is(":checked") === false) {
                const indexToDelete = currenciesSymbol.indexOf(`${$(this).attr("symbol")}`);

                currenciesSymbol.splice(indexToDelete, 1);
                namesOfCoins.splice(indexToDelete, 1);
                idsOfCoins.splice(indexToDelete, 1);

                localStorage.setItem("allChosenCurrenciesNames", JSON.stringify(namesOfCoins));
                localStorage.setItem("allChosenCurrenciesSymbols", JSON.stringify(currenciesSymbol));
                localStorage.setItem("allChosenCurrenciesId", JSON.stringify(idsOfCoins));
                return;
            }
        }

        namesOfCoins.push(this.name); // The names of the coins to save at the local storage
        currenciesSymbol.push($(this).attr("symbol"));  // The symbols of the coins to save at the local storage
        idsOfCoins.push(this.id);  // The ids of the coins to save at the local storage

        localStorage.setItem("allChosenCurrenciesSymbols", JSON.stringify(currenciesSymbol));
        localStorage.setItem("allChosenCurrenciesNames", JSON.stringify(namesOfCoins));
        localStorage.setItem("allChosenCurrenciesId", JSON.stringify(idsOfCoins));
    });

}) 
