"use strict";
$(function () {
    $(document).off("click", "#reportsLink").on("click", "#reportsLink", function () {



        const localSavedCoins = getCurrenciesSymbol();

        if (localSavedCoins === null || localSavedCoins.length < 1) {
            alert("Error: Can not load reports graph without adding coins!");
            return;
        }
        $("#contentDiv").html(`<img id="gif" src="/assets/gif/giphy.gif">`);

        const data = {};

        const updateInterval = 2000;
        let subtitleMissingCoins = []; // Array that has all the missing coins names to add to the subtitles.
        let subtitles = "";

        // Adds the coin details at the graph.
        for (let i = 0; i < localSavedCoins.length; i++) {
            data[localSavedCoins[i]] = {
                type: "line",
                visible: true,
                name: localSavedCoins[i],
                showInLegend: true,
                dataPoints: []
            };
        }

        const dataInfo = [];
        for (let x in data) {
            dataInfo.push(data[x]);
        }
        getBackground();
        navBarActiveClass(this);
        $("#contentDiv").removeClass("justify-content-center");
        $("#contentDiv").addClass("canvasjs-margin-top");
        for (let i = 0; i < localSavedCoins.length; i++) {
            const updateChart = function () {

                const date = new Date();
                let currentYear = date.getFullYear();
                let currentMonth = date.getMonth();
                let currentDay = date.getDate();
                let currentHour = date.getHours();
                let currentMinutes = date.getMinutes();
                let currentSeconds = date.getSeconds();

                $.ajax({
                    url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${localSavedCoins[i]}&tsyms=USD`,
                    success: information => {
                        // If there information about the coin brings an error.
                        if (information[Object.keys(information)[0]] === "Error") {
                            // Check if the coin already added to the subtitle.
                            if (subtitleMissingCoins.indexOf(`'${localSavedCoins[i]}'`) === -1)
                                subtitleMissingCoins.push(`'${localSavedCoins[i]}'`);

                            // To prevent from showing graph if there are no information about any of the coins.
                            if (i === localSavedCoins.length - 1 && subtitleMissingCoins.length === localSavedCoins.length) {
                                alert("Failed: All chosen coins have no information at the graph, Please choose another coins to see the information.")
                                clearInterval(intervalAjaxCalls);
                                $("#contentDiv").empty();
                                $("#contentDiv").removeClass("canvasjs-margin-top");
                                $.getScript("/main.js");
                            }

                            subtitles = {
                                text: `There are missing information about ${subtitleMissingCoins}`,
                                fontColor: "red",
                            }
                            return;
                        }



                        const chart = new CanvasJS.Chart("contentDiv", {
                            exportEnabled: true,

                            zoomEnabled: true,
                            zoomType: "xy",
                            toolTip: {
                                content: `${localSavedCoins[i]}: ${information[Object.keys(information)[0]].USD}`
                            },
                            title: {
                                text: "Coin Price Graph In USD"
                            },

                            subtitles: [subtitles],


                            axisX: {

                                valueFormatString: "HH:mm:ss",
                                title: "Time"
                            },
                            axisY: {

                                includeZero: false,
                                title: "Price in USD",
                                titleFontColor: "#4F81BC",
                                lineColor: "#4F81BC",
                                labelFontColor: "#4F81BC",
                                tickColor: "#4F81BC"

                            },
                            data: dataInfo,
                            legend: {
                                cursor: "pointer",
                                itemclick: function (e) {
                                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible)
                                        e.dataSeries.visible = false;
                                    else
                                        e.dataSeries.visible = true;
                                    e.chart.render();
                                }
                            }
                        })

                        const coinSymbol = Object.keys(information)[0].toLocaleLowerCase();
                        // Updates the data of the graph and of the coin.
                        if (coinSymbol in data) {
                            data[coinSymbol].dataPoints.push({
                                x: new Date(currentYear, currentMonth, currentDay, currentHour, currentMinutes, currentSeconds),
                                y: information[Object.keys(information)[0]].USD
                            });
                        }
                        chart.render();


                    },
                    error: () => {
                        alert("Error getting graph.");
                    }
                })
            }


            // Calls the function of "updateChart" in intervals depends on "updateInterval" value.

            const intervalAjaxCalls = setInterval(function () { updateChart() }, updateInterval);

            // If went to other page, stop the graph/interval running.
            $(document).on("click", "a ,button", () => {
                $("#contentDiv").removeClass("canvasjs-margin-top");
                $("#contentDiv").addClass("justify-content-center");

                clearInterval(intervalAjaxCalls);
            })

        }

    })
})


