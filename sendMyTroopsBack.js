// ==UserScript==
// @name         Retirada de tropas
// @version      0.1
// @description  https://github.com/Smont/tw-scripts
// @author       @montagnanii
// @match        *screen=info_village*
// @include        https://br*.tribalwars.com.br/game.php?*screen=info_village*
// @icon         https://dsbr.innogamescdn.com/asset/59fb2ca0/graphic/icons/header.png
// @grant        none

// @downloadURL none
// @updateURL   none
// @run-at document-end

// ==/UserScript==


'use strict';
console.log('inicio')

//function sendMyTroopsBack() {
var bbody = document.querySelector('form#report_table');
var checkbox = document.querySelectorAll("input[type=checkbox]");


bbody.insertAdjacentHTML("beforeend", "<hr/><table id='bodTable'><tr><td valign='middle' colspan='3'></td><h3 id='locasw'>Retirada de tropas - Instrução</h3><p>O script funcionará <b>apenas</b> para as suas próprias aldeias</p><p>Coloque o número de tropas que você quer que fique na aldeia</p><p><b>Ex:</b><br>Tenho x aldeias apoiando com y numeros de lanças, quero que o máximo de tropa estacionada seja 250, então colocarei 250 no campo 'lanceiro'. <br>                                            </p><p>Se você deixar o campo vazio, ele entenderá que não tirará nenhuma tropa do tipo, caso tenha MENOS tropas estacionadas do que 250, ele deixará o total (se tiver 100, ele deixará 100)</p><hr/></tr></table><hr/><div style='margin-top:14px'><button class='btn'id='submitItens' > Tirar quantidade'</button><button class='btn'id='resetItens' disabled> Resetar '</button></div>");

var _table = document.querySelector('#bodTable');
// var get = location.href;
// location.href = "#locasw";

var units = [
    {
        twName: "spear",
        alias: "Lanceiro",
    }
    , {
        twName: "sword",
        alias: "Espada",
    }
    , {
        twName: "axe",
        alias: "Bárbaro",
    }
    , {
        twName: "spy",
        alias: "Explorador",
    }
    , {
        twName: "light",
        alias: "CLeve",
    }
    , {
        twName: "heavy",
        alias: "CPesada",
    }
    , {
        twName: "ram",
        alias: "Aríete",
    }
    , {
        twName: "catapult",
        alias: "Catapulta",
    }
    , {
        twName: "knight",
        alias: "Paladino",
    }
    , {
        twName: "snob",
        alias: "Nobre",
    }

]




units.forEach((u, i) => {
    _table.insertAdjacentHTML("beforeend", "<tr><td valign='middle'  width='20px'><img src='https://dsbr.innogamescdn.com/asset/59fb2ca0/graphic/unit/unit_" + u.twName + ".png'</td><td valign='middle'><span id='unit_" + i + "'>" + u.alias + ":<td valign='middle'><input id='id_" + u.twName + "' type='number' value='' name='[units][" + u.twName + "]' /></span><td valign='middle'> </td></tr>");
});

document.getElementById("submitItens").addEventListener("click", function () {

    event.preventDefault();


    document.getElementById("units_select_all").click();

    for (let check of checkbox) {
        if (check.name.includes("send_back")) {
            check.checked = false;
        } else if (check.name.includes("withdraw_unit")) {
            check.checked = true;
        }
    }

    var val = document.getElementsByClassName("call-unit-box");
    let sword = "[units][sword]";
    let valSword = document.querySelector("input[id='id_sword']").value;

    let heavy = "[units][heavy]";
    let valHeavy = document.querySelector("input[id='id_heavy']").value;

    let spear = "[units][spear]";
    let valSpear = document.querySelector("input[id='id_spear']").value;

    let archer = "[units][archer]";
    let valArcher = ''

    if (document.querySelector("input[id='id_archer']")) {
        valArcher = document.querySelector("input[id='id_archer']").value;

    }


    for (let item of val) {

        if (item.name.includes(sword)) {

            if (valSword !== '' && item.value > valSword) {
                item.value = item.value - valSword;
                item.style.backgroundColor = "lightgreen";
                item.style.border = "1px solid darkgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "lightred";
            }
        } else if (item.name.includes(heavy)) {
            if (heavy !== '' && item.value > valHeavy) {
                item.value = item.value - valHeavy;
                item.style.backgroundColor = "lightgreen";
                item.style.border = "1px solid darkgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "lightred";
            }
        } else if (item.name.includes(spear)) {

            if (valSpear !== '' && item.value > valSpear) {
                item.value = item.value - valSpear;
                console.log('valor', item.value)
                item.style.backgroundColor = "lightgreen";
                item.style.border = "1px solid darkgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "lightred";
            }
        } else if (item.name.includes(archer)) {
            if (valArcher !== '' && item.value > valArcher) {
                item.value = item.value - valArcher;
                item.style.backgroundColor = "lightgreen";
                item.style.border = "1px solid darkgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "lightred";
            }
        } else {
            item.value = 0;
        }
    }


    document.getElementById('submitItens').setAttribute('disabled', true);
    document.getElementById('resetItens').removeAttribute('disabled');

}); 
