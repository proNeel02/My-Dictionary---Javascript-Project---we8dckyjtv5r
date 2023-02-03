let inp = document.getElementById("input");
let search = document.getElementById("searchbtn");
let hist = document.getElementById("history");
let main = document.querySelector(".maindiv");


main.style.borderRadius = "20px";
hist.addEventListener("click", () => {
    if(hist.innerText == "HISTORY"){
        document.querySelector(".result").innerHTML = "";
        document.querySelector(".inpword").innerText = "";
        document.querySelector(".searchpage").style.display = "none";
        document.getElementById("result").style.display = "none";
        document.querySelector(".history").style.display = "flex";
        main.style.backgroundColor = "rgb(247, 241, 241)";
        hist.innerText = "SEARCH";
        let history = document.querySelector(".maindiv");
        for(let i=0;i<localStorage.length;i++){
            if(localStorage.key(i)==="count"){
                continue;
            }
            let div = document.createElement("div");
            div.setAttribute("class","newdiv");
            div.style.borderRadius = "15px";
            div.innerHTML = `<span>Word: <span class="getdata">${localStorage.key(i)}</span></span>
            <br>
            <p>${localStorage.getItem(localStorage.key(i))}</p>
            <img onclick="deletediv(this)" id="dlt" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png">`;
            let histdiv = document.querySelector(".history");
            histdiv.appendChild(div);
        }
    }
    else if(hist.innerText == "SEARCH"){
        document.querySelector(".history").innerHTML = "";
        document.querySelector(".history").style.display = "none";
        document.querySelector(".searchpage").style.display = "flex";
        document.getElementById("result").style.display = "block";
        hist.innerText = "HISTORY";
        main.style.backgroundColor = "rgb(238, 231, 231)";
    }
});

function deletediv(currentElement){
    let key = currentElement.parentElement.querySelector(".getdata").innerText;
    currentElement.parentElement.remove();
    console.log(key);
    localStorage.removeItem(key);
    // console.log(currentElement.parentElement.firstChild.innerText);
}

search.addEventListener("click",()=>{
    document.querySelector(".searching").innerText = "Searching for the meaning....";
    let inVal = inp.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inVal}`).then((response)=>response.json())
    .then(data => {
        localStorage.setItem(`${inVal}`,data[0].meanings[0].definitions[0].definition);
        document.querySelector(".result").innerHTML = data[0].meanings[0].definitions[0].definition;
        document.querySelector(".searching").innerText = "";
        document.querySelector(".inpword").innerText = inVal;
        inp.value = "";
    });
});
