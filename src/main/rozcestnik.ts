function rozcestnikOnStart() {
    reinitDOMToRemoveAdds()
}

document.addEventListener("DOMContentLoaded", rozcestnikOnStart);

function reinitDOMToRemoveAdds() {
    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = '<body>\n' +
        '        <h1 class="w3-text-white">Posloupnosti - rozcestník</h1>\n' +
        '        <div class="w3-bar-block w3-light-gray w3-black">\n' +
        '        <a href="p1" class="w3-bar-item w3-green w3-button">Posloupnosti - A</a>\n' +
        '        <a href="p2" class="w3-bar-item w3-green w3-button">Posloupnosti - B</a>\n' +
        '        <a href="p3" class="w3-bar-item w3-green w3-button">Posloupnosti - C</a>\n' +
        '        </div>\n' +
        '    </body>';
    document.getElementById("errorInfo").onclick = showBeginnersHint;
}