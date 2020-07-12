
function makeRequest(){
    
  document.getElementById("mainbody").style.visibility = "hidden";
  var word = document.getElementById("textbox").value;
  var meaning = document.getElementById("word_meaning");
  var example = document.getElementById("example");
  var spell = document.getElementById("audio");
  var syns =  document.getElementById('synonyms');
  var sentence =  document.getElementById("sentence");
  var syn =  document.getElementById('syn');
  var definition =  document.getElementById('definition');
  var pos =  document.getElementById('pos');
  var wor_d =  document.getElementById('word');
  syns.innerHTML ="";
  syn.innerHTML ="";
  pos.innerHTML="";
  spell.innerHTML ="";
  sentence.innerHTML = "";
  meaning.innerHTML = '';
  example.innerHTML = '';
  definition.innerHTML = "";
  document.getElementById("word").innerHTML ="";
  var dict = "";


 if(word === ""){
  meaning.innerHTML = "BOX CAN'T BE EMPTY";
  document.getElementById("mainbody").style.visibility = "visible";

 }
 else if(Number.isInteger(parseInt(word))){
  
  meaning.innerHTML = "Invalid Input Enter a word";
  document.getElementById("mainbody").style.visibility = "visible";
 }
else{

  var request1 = new XMLHttpRequest();
  request1.open("GET", 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/'+word+'?key=81dc9ddd-6293-453b-9f11-bc6beeec9694',true);
  request1.onload = function () {
    console.log(request1.status +","+ request1.readyState)
    if(request1.readyState === 4 && request1.status === 200){
      var data = JSON.parse(request1.response);
    
    if(data.length === 0){
      
      meaning.innerHTML = "WRONG INPUT";
      
  document.getElementById("mainbody").style.visibility = "visible";
    }
    else if(data.length !== 0){

      var keysInFirstElement = Object.keys(data[0]);
      if(keysInFirstElement.includes("shortdef")){
      
  
        document.getElementById("sentence").innerHTML ="Sentences";
        document.getElementById("syn").innerHTML ="Synonyms";

        definition.innerHTML = 'Definition of '+ word +':';

      var ul =  document.createElement('ul');
      data.forEach(item =>{
        var li =  document.createElement('li');
        li.innerHTML = item.shortdef;
        ul.appendChild(li);
      });
      meaning.append(ul);

      var pos =  document.getElementById("pos");
      if(keysInFirstElement.includes("fl") === false){
        pos.innerHTML ="";
      }
      else{
        if(data[0].fl === "abbreviation" ){
          pos.innerHTML ="THIS IS AN ABBREVIATION";
           document.getElementById("sentence").innerHTML ="";
        document.getElementById("syn").innerHTML ="";

        definition.innerHTML = 'Definition of '+ word +':';
        }
        else{
          pos.innerHTML =data[0].fl;

          var ul2 = document.createElement('ul');
              
          var keysInFirstElement2 = Object.keys(data[0]);
      
          if(keysInFirstElement2.includes("meta")){
            data[0].meta.syns.forEach(item2=>{
            var listOfSyns = "";
            item2.forEach(value=>{
              listOfSyns += value + " , ";
            });
            var li = document.createElement('li');
            li.append(listOfSyns);
            ul2.appendChild(li);
          })
          syns.innerHTML ="";
          syns.append(ul2);
        
          }
          else{
            syns.innerHTML = "";
          }






          var request2 = new XMLHttpRequest();

          request2.open("GET", 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'+word+ '?key=a9ead9c5-628a-410d-af14-d42c7db4a48e',true);
          request2.onload = function(){
            if(request2.readyState === 4 && request2.status === 200){
              var data2 = JSON.parse(request2.response);
             
            var keysInFirstElement3 = Object.keys(data2[0]);
          if(keysInFirstElement3.includes("hwi")){
            var keysInFirstElement4 = Object.keys(data2[0].hwi);
            
           if(keysInFirstElement4.includes("prs")){

            var audioArrayLength = (data2[0].hwi.prs).length;
            var audioArray = data2[0].hwi.prs;
            
            for(var i=0; i<audioArrayLength; i++){
              var newObject = Object.keys(audioArray[i]);
              if(newObject.includes("sound")){
                dict =data2[0].hwi.prs[i].mw;
                wor_d.innerHTML = word +'/'+dict+'/';
                var baseFileName = data2[0].hwi.prs[i].sound.audio;
                var firstIndexOfbaseFileName = baseFileName.charAt(0);
    
                var audioUrl = "https://media.merriam-webster.com/audio/prons/en/us/mp3/" + firstIndexOfbaseFileName+ "/" + baseFileName+ ".mp3";
                var audio = document.createElement("AUDIO");
                audio.setAttribute("src",audioUrl);
                audio.setAttribute("controls","controls");
                audio.setAttribute("play","play");
                spell.innerHTML ="";
                spell.append(audio);
                break;
              
              }
              else{
                spell.innerHTML ="";
                
              }
            }
          }
          else{
            spell.innerHTML = "";
          }
          }
          else{
            spell.innerHTML = "";
          }
    
    
          }
            else{
              syns.innerHTML = "Error";
            }
        }
          request2.send();
    
          var request3 = new XMLHttpRequest();
          request3.open("GET", "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" +word,true);
          
          request3.setRequestHeader("x-rapidapi-host", "mashape-community-urban-dictionary.p.rapidapi.com");
          request3.setRequestHeader("x-rapidapi-key", "38d6b13627mshd59af571fd2cb59p160b7fjsndeecce520f78");
          request3.onload = function(){
            if(request3.readyState === 4 && request3.status === 200){
              var data3 = JSON.parse(request3.response);
              var ul = document.createElement('ul');
              console.log(data3);
              data3.list.forEach(item=>{
                var li = document.createElement('li');
                li.innerHTML = item.example;
                ul.appendChild(li);
                });
          
              example.append(ul);
            
            }
            else{
              example.innerHTML = "";
            }
            
          }
          
      
          document.getElementById("mainbody").style.visibility = "visible";
          request3.send();
          
        }

      }



     
      }
    
     else{
      
    definition.innerHTML = 'DO YOU MEAN:';
    var ul3 = document.createElement("ul");
    
      data.forEach(item=>{
        var li = document.createElement("li");
        li.innerHTML = item;
        ul3.appendChild(li);
      });
      meaning.append(ul3);
      document.getElementById("mainbody").style.visibility = "visible";

     }
    }

  }
    else{
      meaning.innerHTML = "Word Not Found";
      
  
  }
    }
  request1.send();
document.getElementById("mainbody").style.visibility = "visible";
}

 
}


export default makeRequest;
