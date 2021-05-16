//ADICIONAR FUNCIONALIDADES EM CASO DE ERRORS NO FETCH
const seasonPlots = ["High school chemistry teacher Walter White's life is suddenly transformed by a dire medical diagnosis. Street-savvy former student Jesse Pinkman teaches Walter a new trade.","In the second season, Walt must deal with the chain reaction of his choice, as he and Jesse face new and severe consequences. When danger and suspicion around Walt escalate, he is pushed to new levels of desperation. Just how much higher will the stakes rise? How far is Walt willing to go to ensure his family's security? Will his grand plan spiral out of control?","In the third season, Walt continues to battle dueling identities: a desperate husband and father trying to provide for his family, and a newly appointed key player in the Albuquerque drug trade. As the danger around him escalates, Walt is now entrenched in the complex worlds of an angst-ridden family on the verge of dissolution, and the ruthless and unrelenting drug cartel.","This season, Walt and Jesse must cope with the fallout of their previous actions, both personally and professionally. Tension mounts as Walt faces a true standoff with his employer, Gus, with neither side willing or able to back down. Walt must also adjust to a new relationship with Skyler, whom while still reconciling her relationship with Walt, is committed to properly laundering Walt’s money and ensuring her sister Marie and an ailing Hank are financially stable.","In season five, Walt is faced with the prospect of moving on in a world without his enemy. As the pressure of a criminal life starts to build, Skyler struggles to keep Walt’s terrible secrets. Facing resistance from sometime adversary and former Fring lieutenant Mike, Walt tries to keep his world from falling apart even as his DEA Agent brother in law, Hank, finds numerous leads that could blaze a path straight to Walt. \n\nAll bad things must come to an end."]
function funcaoBusca(){
    document.getElementById("divbusca2").innerHTML="";
    let opcao = document.getElementById("buscaform").value;
    if (opcao == "characters"){
        criarCharDatalist();
    }
    if (opcao == "episodes"){
        criarListaSeason();
    }
}

//-----CHARACTERS-------------------------------------------------------------------------------------------------------------
async function criarCharDatalist(){
    console.log("---characters selected---")
    let charInput = document.createElement("input");
    divbusca2.appendChild(charInput);
    charInput.id="charInput";
    charInput.placeholder="e.g. Walter "
    //criando DATALIST
    charInput.setAttribute('list',"charDataList");
    let lista = document.createElement("datalist");
    lista.id="charDataList";
    divbusca2.appendChild(lista);

    //criando botão OK e RANDOM
    let btnChar = document.createElement("button");
    btnChar.onclick = buscarChar;
    btnChar.innerText = "Ok";
    divbusca2.appendChild(btnChar);
    let btnRandomChar = document.createElement("button");
    btnRandomChar.onclick= randomChar;
    btnRandomChar.innerText= "Random character"
    divbusca2.appendChild(btnRandomChar);
    let divnavp = document.createElement("div");
    divnavp.id="divnavp";
    document.getElementById("nav").appendChild(divnavp);

    let url ="https://breakingbadapi.com/api/characters?category=Breaking+Bad";
    let response = await fetch (url);
    let json = await response.json();
    let listaChar = [];
    for (let personagens of json){
        let listaValues = document.createElement("option");
        listaValues.value = personagens.name;
        lista.appendChild(listaValues);
        //console.log(personagens.name);
        listaChar.push(personagens.name);
    }
    console.log(listaChar);
}

//-----CHARACTERS > OK 
async function buscarChar(){
    document.getElementById("main").innerHTML="";
    document.getElementById("main2").innerHTML="";
    document.getElementById("divnavp").innerHTML="";
    let nome = document.getElementById("charInput").value;
    let url ="https://breakingbadapi.com/api/characters?name="+nome;
    let response = await fetch (url);
    let json = await response.json();
    console.log("---click search character---")
    console.log(json);
    console.log(json.length);
    //#main p , quantos resultados
    let numResults = document.createElement("p");
    numResults.innerText = `${json.length} character(s) found`;
    document.getElementById("divnavp").appendChild(numResults);
    //criando a divChar com os resultados
    for (let personagens of json){
        console.log(personagens.name);
        let divChar = document.createElement("div");
        divChar.classList="results";
        divChar.style.backgroundImage=`url(${personagens.img})`;
        document.getElementById("main").appendChild(divChar);

        let divinfochar = document.createElement("div");
        divinfochar.classList="infochar";
        divChar.appendChild(divinfochar);
        let nomeChar = document.createElement("h3");
        nomeChar.innerText = personagens.name;
        divinfochar.appendChild(nomeChar);
        let nickChar = document.createElement("p");
        nickChar.innerText = `Nickname: ${personagens.nickname}`;
        divinfochar.appendChild(nickChar);
        let occuChar = document.createElement("p");
        occuChar.innerText = `Occupation: ${personagens.occupation[0]}`;
        divinfochar.appendChild(occuChar);
        let actorChar = document.createElement("p");
        actorChar.innerText = `Actor: ${personagens.portrayed}`;
        divinfochar.appendChild(actorChar); 
        // divChar.appendChild(imgChar);
    }

}
//-----CHARACTERS > RANDOM
async function randomChar(){
    document.getElementById("main").innerHTML="";
    document.getElementById("divnavp").innerHTML="";
    document.getElementById("main2").innerHTML="";
    let url ="https://breakingbadapi.com/api/character/random";
    let response = await fetch (url);
    let json = await response.json();
    console.log("--- click random character ---");
    console.log(json);
    console.log(json[0].name);
    let divChar = document.createElement("div");
    // divChar.classList="results";
    divChar.id="randomchar";
    document.getElementById("main").appendChild(divChar);
    //divChar.style.backgroundImage=`url(${json[0].img})`;

    let imgChar = document.createElement("img");
    imgChar.src=`${json[0].img}`;
    divChar.appendChild(imgChar);

    let divinfochar = document.createElement("div");
    divinfochar.id="inforandomchar";
    divChar.appendChild(divinfochar);
    
    let nomeChar = document.createElement("h3");
    nomeChar.innerText = `${json[0].name}`;
    divinfochar.appendChild(nomeChar);
    let nickChar = document.createElement("p");
    nickChar.innerText = `Nickname: ${json[0].nickname}`;
    divinfochar.appendChild(nickChar);
    let occuChar = document.createElement("p");
    occuChar.innerText = `Occupation: ${json[0].occupation[0]}`;
    divinfochar.appendChild(occuChar);
    let actorChar = document.createElement("p");
    actorChar.innerText = `Actor: ${json[0].portrayed}`;
    divinfochar.appendChild(actorChar); 
}

//----- EPISODES ------------------------------------------------------------------------------------------------------------------
//escolheu 'episodes' > cria as opções de seasons e botao OK
function criarListaSeason(){
    document.getElementById("divbusca2").innerHTML="";
    console.log("---episodes selected---");
    let divbusca2 = document.getElementById("divbusca2");
    let buscaform2 = document.createElement("select");
    buscaform2.id="buscaform2";
    divbusca2.appendChild(buscaform2);
    for (let i=1; i<6; i++){
        let season  = document.createElement("option");
        season.value = `${i}`;
        season.innerText=`Season ${i}`;
        buscaform2.appendChild(season);
    }
    let btnSeasonEpi = document.createElement("button");
    btnSeasonEpi.onclick= seasonEpi;
    btnSeasonEpi.innerText= "Ok"
    divbusca2.appendChild(btnSeasonEpi);

}
//-----EPISODES > ESCOLHE SEASON
async function seasonEpi(){
    if(document.getElementById("divnavp")!==null){
        document.getElementById("divnavp").innerHTML="";
    }
    document.getElementById("main").innerHTML="";
    document.getElementById("main2").innerHTML="";

    let seasonNum = document.getElementById("buscaform2").value;
    let url =`https://api.themoviedb.org/3/tv/1396/season/${seasonNum}?api_key=0a0579885fc7af9f39e4a9f2bd74e2b8&language=en-US`;
    let response = await fetch (url);
    let json = await response.json();

    console.log("---json todos epi---");
    console.log(`buscando episódios da temporada ${seasonNum}`);
    console.log(json);
    console.log("https://image.tmdb.org/t/p/original"+`${json.poster_path}`);
    console.log(json.episodes);
    //div season poster
    let divseason = document.createElement("div");
    divseason.id="divseason";
    document.getElementById("main2").appendChild(divseason);
    //div season poster > season img + bg-img
    let divseasonimg = document.createElement("div");
    divseasonimg.id="divseasonimg";
    divseasonimg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${json.poster_path})`;
    divseason.appendChild(divseasonimg);
    //div season poster > season info   
    let divseasoninfo = document.createElement("div");
    divseasoninfo.id="divseasoninfo";
    divseason.appendChild(divseasoninfo);
    //info
    let seasontitle = document.createElement("h2");
    seasontitle.innerText = json.name;
    divseasoninfo.appendChild(seasontitle);
    let seasonairdate = document.createElement("p");
    seasonairdate.innerText = json.air_date;
    divseasoninfo.appendChild(seasonairdate);
    let seasonplot = document.createElement("p");
    seasonplot.innerText= json.overview;
    divseasoninfo.appendChild(seasonplot);
    
    let divepisodes = document.createElement("div");
    divepisodes.id="divepisodes";
    document.getElementById("main2").appendChild(divepisodes);

    for (let episodio of json.episodes){

        let divepisode = document.createElement("div");
        divepisode.classList="epiresults";
        document.getElementById("divepisodes").appendChild(divepisode);

        let divepisodeimg = document.createElement("div");
        divepisodeimg.classList="divepiimg";
        divepisode.appendChild(divepisodeimg);
        divepisodeimg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${episodio.still_path})`;

        let divepisodeinfo = document.createElement("div");
        divepisodeinfo.classList="divepiinfo";
        divepisode.appendChild(divepisodeinfo);

        let episeasnum = document.createElement("h2");
        episeasnum.innerText=`S:${episodio.season_number} | E:${episodio.episode_number}`;
        divepisodeinfo.appendChild(episeasnum); 

        let epiname = document.createElement("h2");
        epiname.innerText=episodio.name;
        divepisodeinfo.appendChild(epiname); 

        let epiplot = document.createElement("p");
        epiplot.innerText=episodio.overview;
        divepisodeinfo.appendChild(epiplot);  

        let epiairdate = document.createElement("p");
        epiairdate.innerText=episodio.air_date;
        divepisodeinfo.appendChild(epiairdate);
    }
}
