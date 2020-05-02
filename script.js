function downloadCatalog()
{
    if(countCatalogs() == 0) return;
    if(countCatalogs() > 1)
    {
        // if there are multiple catalogues to download display a choice dialog instead
        downloadMultipleCatalogs();
        return;
    }
    let catalog = getAllCatalogs()[0];
    catalog.value_element.click();
}

function downloadMultipleCatalogs()
{
    if(countCatalogs() == 0) return;
    // spawn a new dialog window
    spawnWindow();
    fillWindow();
}

function fillWindow()
{
    if(!windowExists()) return;
    let list = document.createElement("ul");
    let pk_content = document.getElementById("pk_ramka").querySelector(".pk_ramka_content");
    pk_content.appendChild(list);
    for(let catalog of getAllCatalogs())
        {
            let list_elm = document.createElement("li");
            list_elm.className = "pk_content_element";
            let value_element = document.createElement("a");
    
            value_element.innerText = catalog.key;
            value_element.href = catalog.value;
    
            list_elm.appendChild(value_element);
            list.appendChild(list_elm);
        }
}

function spawnWindow()
{
    if(windowExists()) return;
    let pk_ramka_bg = document.createElement("div");
    let pk_ramka = document.createElement("div");
    let pk_ramka_title = document.createElement("div");
    let pk_ramka_title_text = document.createElement("span");
    let pk_ramka_title_exit = document.createElement("img");
    let pk_ramka_content = document.createElement("div");
    let pk_ramka_container = document.createElement("div");

    pk_ramka_bg.className = "pk_ramka_bg";
    pk_ramka.id = "pk_ramka";
    pk_ramka_title.className = "pk_ramka_title";
    pk_ramka_title_text.className = "pk_ramka_title_text";
    pk_ramka_title_exit.className = "pk_ramka_title_exit";
    pk_ramka_content.className = "pk_ramka_content";
    pk_ramka_container.className = "pk_ramka_container";

    pk_ramka.appendChild(pk_ramka_title);
    pk_ramka_title.appendChild(pk_ramka_title_text);
    pk_ramka_title.appendChild(pk_ramka_title_exit);
    pk_ramka.appendChild(pk_ramka_content);
    document.body.appendChild(pk_ramka_bg);
    document.body.appendChild(pk_ramka_container);
    document.body.appendChild(pk_ramka);

    pk_ramka_title_text.innerText = "Wybierz katalog"
    pk_ramka_title_exit.src = "x.png";

    pk_ramka_title_exit.onclick = destroyWindow
    pk_ramka_container.onclick = destroyWindow
}

function destroyWindow()
{
    if(!windowExists()) return;
    document.body.querySelector(".pk_ramka_bg").remove()
    document.body.querySelector(".pk_ramka_container").remove()
    document.getElementById("pk_ramka").remove()
}

function windowExists()
{
    return (document.getElementById("pk_ramka") != undefined);
}

function getAllCatalogs()
{
    let z_pliki_ul = document.querySelector(".tz_pliki");
    if(z_pliki_ul == undefined) return [];
    z_pliki_ul = z_pliki_ul.querySelector("ul");
    if(z_pliki_ul == undefined) return [];
    let catalogs = []
    for(let plik of z_pliki_ul.children)
    {
        let key_element = plik.querySelector(".opisPlikLink")
        let value_element = plik.querySelector("a")
        let key = key_element.innerText;
        let value = value_element.getAttribute("href");
        if(key.includes("katalog"))
        {
            catalogs.push({"key": key, "value": value, 
            "key_element": key_element, "value_element": value_element})
        }
    }
    return catalogs;
}

function countCatalogs()
{
    return getAllCatalogs().length;
}

function createBtn()
{
    if(countCatalogs() == 0) return;
    let lista = document.querySelector("div.ListaOpisy")
    let elm = document.createElement("div")
    elm.id = "pobierzkatalog"
    elm.onclick = downloadCatalog
    let text = document.createElement("p")
    text.id = "pobierzkatalog_text"
    text.innerText = "Pobierz katalog"
	let img = document.createElement("img")
	img.id = "pobierzkatalog_img"
	img.setAttribute("src", "/images/ikony/pobierz_plik_pdf_a__.png")
	elm.appendChild(img)
    elm.appendChild(text)
    lista.appendChild(elm)
}

$(document).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) {
        destroyWindow();
    }
});

