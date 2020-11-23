"use strict";
$(function () {
    $(document).off("click", ".moreInfoBtn").on("click", ".moreInfoBtn", function () {
        const coinId = $(this).attr("data-toggle"); // Coin id stored as 'data-toggle'
        const loadingImg = `<img id="gif" src="/assets/gif/another-loading.gif">`; // Loading gif
        $(`.${coinId}`).children().html(loadingImg); // Collapse card-body html.
        $(`.${coinId}`).collapse('toggle');


        const localStorageInfo = localStorage.getItem(`infoAbout${coinId}`);
        $(`.${coinId}`).off('shown.bs.collapse').on('shown.bs.collapse', () => {

            // Check whether the coin exists at the local storage
            if (localStorageInfo === null) {
                getCoinInfoAjax(coinId).then(info => {
                    $(`.${coinId}`).children().html(info);

                    sessionStorage.setItem(`infoAbout${coinId}`, info);
                    setTimeout(() => {
                        sessionStorage.removeItem(`infoAbout${coinId}`);
                    }, 120000);
                })
                getCoinInfoAjax(coinId).catch(error => {
                    alert(error);
                })
            }
            else { // If the local storage exists load the data.
                $(`.${coinId}`).children().html(localStorageInfo);
            }
            $(this).html("Show less");
        });
        // Sets the text of the button back to "More info" after the collapse closed.
        $(`.${coinId}`).off('hidden.bs.collapse').on('hidden.bs.collapse', () => $(this).html("More info"));

    })

    window.getCoinInfoAjax = id => {
        return new Promise((resolve, reject) => { // Returns the data if success,or "failed" if error.
            $.ajax({

                url: `https://api.coingecko.com/api/v3/coins/${id}`,
                success: info => {

                    let usdPrice = info.market_data.current_price.usd;
                    let eurPrice = info.market_data.current_price.eur;
                    let ilsPrice = info.market_data.current_price.ils;

                    // Sets the price instead of undefined or 0 to "No details"
                    if (usdPrice === 0 || usdPrice === undefined)
                        usdPrice = "No details"
                    if (eurPrice === 0 || eurPrice === undefined)
                        eurPrice = "No details"
                    if (ilsPrice === 0 || ilsPrice === undefined)
                        ilsPrice = "No details"

                    // Sets the text depends if there are no details or there are.
                    let allInfo = `
                            <img class="coinImg" src=${info.image.small}>

                            <h5 class="moreInfoDetails"> 
                                USD: ${usdPrice === "No details" ? usdPrice : usdPrice + "$"}
                            </h5>
                            <h5 class="moreInfoDetails">
                                EUR: ${eurPrice === "No details" ? eurPrice : eurPrice + "€"} 
                            </h5>
                            <h5 class="moreInfoDetails"> 
                                ILS: ${ilsPrice === "No details" ? ilsPrice : ilsPrice + "&#8362"}
                            </h5>
                        `;
                    resolve(allInfo);

                },

                error: () => {
                    reject("failed");
                }
            })
        })

    }
})