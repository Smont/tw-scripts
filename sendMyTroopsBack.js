// ==UserScript==
// @name         Retirada de tropas
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @montagnanii
// @match        https://br*.tribalwars.com.br/game.php?*&screen=info_village*
// @icon         https://dsbr.innogamescdn.com/asset/59fb2ca0/graphic/icons/header.png
// @grant        none

// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

 //function sendMyTroopsBack() {
var bbody = document.querySelector('form#report_table');
var checkbox = document.querySelectorAll("input[type=checkbox]");


bbody.insertAdjacentHTML("beforeend", "<hr/>\n\
                                        <table id='bodTable'><tr><td valign='middle' colspan='3'>\n\
                                                </td><h3>Retirada de tropas - Instrução</h3>\n\
                                                <p>O script funcionará <b>apenas</b> para as suas próprias aldeias</p>\n\
                                                <p>Coloque o número de tropas que você quer que fique na aldeia</p>\n\
                                                <p><b>Ex:</b><br>Tenho x aldeias apoiando com y numeros de lanças, quero que o \n\
                                                máximo de tropa estacionada seja 250, então colocarei 250 no campo 'lanceiro'. <br>\n\
                                            </p><p>Se você deixar o campo vazio, ele entenderá que não tirará nenhuma tropa do tipo, caso tenha \n\
                                                MENOS tropas estacionadas do que 250, ele deixará o total (se tiver 100, ele deixará 100)</p>\n\
                                                <hr/>\n\
                                                </tr></table><hr/>\n\
                                        <div style='margin-top:14px'>\n\
                                                    <button class='btn' type ='submit' onclick='inputValuesSub()' > Tirar quantidade'</button>\n\
                                        </div>");

var _table = document.querySelector('#bodTable')
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



function inputValuesSub() {

    event.preventDefault();

    // document.getElementById("units_select_all").click();

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
let valArcher = '';
    if (document.querySelector("input[id='id_archer']")) {
         valArcher = document.querySelector("input[id='id_archer']").value;

    }


    for (let item of val) {

        if (item.name.includes(sword)) {

            if (valSword !== '' && valSword !== '' && item.value > valSword) {
                item.value = item.value - valSword;
                item.style.backgroundColor = "lightgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "red";
            }
        } else if (item.name.includes(heavy)) {
            if (valSword !== '' && item.value > valHeavy) {
                item.value = item.value - valHeavy;
                item.style.backgroundColor = "lightgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "red";
            }
        } else if (item.name.includes(spear)) {

            if (valSpear !== '' && valSword !== '' && item.value > valSpear) {
                item.value = item.value - valSpear;
                console.log('valor', item.value)
                item.style.backgroundColor = "lightgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "red";
            }
        } else if (item.name.includes(archer)) {
            if (valSword !== '' && item.value > valArcher) {
                item.value = item.value - valArcher;
                item.style.backgroundColor = "lightgreen";
            } else {
                item.value = 0;
                item.style.backgroundColor = "red";
            }
        } else {
            item.value = 0;
        }




    }
}





    //}
})();
