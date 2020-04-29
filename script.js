function downloadCatalog()
{
    let z_pliki_ul = document.querySelector(".tz_pliki");
    if(z_pliki_ul == undefined) return;
    z_pliki_ul = z_pliki_ul.querySelector("ul");
    if(z_pliki_ul == undefined) return;
    for(let plik of z_pliki_ul.childNodes)
    {
        let key = plik.querySelector(".opisPlikLink").innerText;
        let value = plik.querySelector("a").getAttribute("href");
        if(key.includes("katalog"))
        {
            plik.querySelector("a").click();
            break;
        }
    }
}

function countCatalogs()
{
    let z_pliki_ul = document.querySelector(".tz_pliki")
    if(z_pliki_ul == undefined) return 0;
    z_pliki_ul = z_pliki_ul.querySelector("ul")
    if(z_pliki_ul == undefined) return 0;
    let catalog_count = 0
    for(let plik of z_pliki_ul.childNodes)
    {
        let key = plik.querySelector(".opisPlikLink").innerText;
        let value = plik.querySelector("a").getAttribute("href");
        if(key.includes("katalog"))
            catalog_count++;
    }

    return catalog_count;
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
    elm.appendChild(text)
    lista.appendChild(elm)
}