"use strict";
$(function () {
    $("#homeLink").click(function () {

        navBarActiveClass(this);
        $("#contentDiv").empty();
        $.getScript("/main.js");

    })
})