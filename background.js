'use strict'

var geradorCPF = (function () {

    chrome.browserAction.onClicked.addListener(function (tab) {
        SetTransferArea(gerar());
    });

    function SetTransferArea(str) {
        document.oncopy = function (event) {
            event.clipboardData.setData("text/plain", str);
            event.preventDefault();
        };
        document.execCommand("copy", false, null);
    }

    function gerar() {
        var digitosInicial = randomArray();
        var penultimoDigito = ajuste(somar(digitosInicial));
        var ultimoDigito = ajuste(somar(digitosInicial, (penultimoDigito * 2), 3));
        return digitosInicial.join('') + penultimoDigito + ultimoDigito;
    }

    function ajuste(soma) {
        soma = 11 - (mod(soma, 11));
        return (soma >= 10) ? 0 : soma;
    }

    function somar(array, soma = 0, count = 2) {
        for (var i = 8; i >= 0; i--) {
            soma = (array[i] * count) + soma;
            count++;
        }
        return soma;
    }

    function randomArray(array = []) {
        for (var i = 0; i < 9; i++)
            array.push(randomiza(9))
        return array;
    }

    function randomiza(n) {
        return Math.round(Math.random() * n);
    }

    function mod(dividendo, divisor) {
        return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
    }

    return {
        gerar: gerar
    };

})(chrome);
