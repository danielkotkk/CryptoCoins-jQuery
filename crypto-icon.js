"use strict";
$(function () {
    $("#cryptoIcon").click(function () {
        $(".nav-link").each(function () {
            $(this).removeClass("active");
        });
        $("#homeLink").addClass("active");
        $("#contentDiv").empty();
        let html = `
        <script src="/main.js"></script>
        `
        $("#contentDiv").append(html);
    })
})