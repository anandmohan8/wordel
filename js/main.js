let successword = "PRIME";
const allwords=['PRIME','WATCH','PLACE','SEVEN','EIGHT','HAPPY','BRAVE','CLASS','CHIME','RHYME'];
let attemptcount = 0;
var hardcolorchars=[];
var hardyellowchars=[];

//This is word that user is entering as of now
var currentwordlistarr=[];

/*
* This method is executed after user hits enter.
* The method validates for the 5 letter entered and then marks the
* color of the cells based on the right or wrong values.
* Correct letters in the correct position are green
* Correct letters in the incorrect position are yellow
* Incorrect letters are marked in grey
*
* */
function checkword(){
  /* Validate if user has entered 5 chars when making an attempt*/
  if(!currentwordlistarr.length>0 || currentwordlistarr.length%5!==0){
    alert('Not enough letters');
    return false;
  }

  currentwordlistarr.sort();

  hardcolorchars.forEach(function(item,index) {
    if ('g'===hardcolorchars[index] && currentwordlistarr[index]!==successword[index]) {
        alert('Please use the character found '+successword[index]);
        return false;
    }
    if ('y'===hardcolorchars[index] && !successword.indexOf(currentwordlistarr[index])>0) {
      alert('Please use the right character already found');
      return false;
    }
  })


  let greenchars=0;
  currentwordlistarr.forEach(function(item,index){
    var id=item.substring(0,2);
    var char=item.charAt(item.length-1)

    if(char===successword.charAt(index)){
      document.getElementById(id).style.backgroundColor="lightgreen" ;
      document.getElementById(id).disabled=true;
      hardcolorchars.push('g');
      greenchars++;
    }
    else if(successword.indexOf(char)>0){
      document.getElementById(id).style.backgroundColor = "yellow" ;
      document.getElementById(id).disabled=true;
      hardcolorchars.push('y');
      // hardyellowchars.push(char);
    }
    else{
      document.getElementById(id).style.backgroundColor = "grey" ;
      document.getElementById(id).disabled=true;
      hardcolorchars.push('x');
    }
  });
  if(greenchars===5 ){
    alert('SUCCESS,YOU NAILED IT');
    return false;
  }
  else if (attemptcount===5){
    alert('Good Luck Next Time');
    return false;
  }
  attemptcount++;
  enabledisablecells(attemptcount);
  currentwordlistarr=[];
}

/*
  This method gets executed after every key press that user enters so that
  the program captures thr array of characters that user has entered in any attempt
  Input param: Event of the keypress
  Input param: DocumentId of the cell where the character is entered
 */

function collectword(event,id){
  if(event.keyCode!==9) {
    let charentered = String.fromCharCode(event.keyCode);
    var reg = /^[a-z]+$/i;
    /*Check if the cell already had a value then remove the value from he list */
    if (document.getElementById(id).value.length > 0) {
      const removeindex = currentwordlistarr.indexOf(id + document.getElementById(id).value);
      if (removeindex > -1) {
        currentwordlistarr.splice(removeindex, 1);
      }

    }

    /*Validate entered char to make sure it is alphabet to */
    if (reg.test(charentered)) {
      document.getElementById(id).value = charentered.toUpperCase();
      currentwordlistarr.push(id + charentered)
    }
  }
}

/*
  This function has the bootstrap code that prepares the game board for user and initializes
  with all needed values
 */
function bootupWordle() {
  var wordlength=5;
  var maxattempts=6;
  var result = "";
  for(var i=0; i<maxattempts; i++) {
    result += "<div style='border:1px ;margin-left:40%;margin-bottom: 1%;margin-right: 5%'>";
    for(var j=0; j<wordlength; j++){
      result += "<input type='text' maxlength='1' disabled style='width: 70px;height: 24px;' id="+i+j+" onkeydown='collectword(event,this.id)'/>&nbsp;";
    }
    result += "</br></div>";
  }

  document.getElementById("wordleapp").innerHTML =result;
  enabledisablecells(attemptcount);
  successword=allwords[Math.floor(Math.random()*allwords.length)];
}

/*
  This function enables or disables the cell based on the users current attempt
 */
function enabledisablecells(attemptcount){
  document.getElementById(attemptcount+'0').disabled=false;
  document.getElementById(attemptcount+'1').disabled=false;
  document.getElementById(attemptcount+'2').disabled=false;
  document.getElementById(attemptcount+'3').disabled=false;
  document.getElementById(attemptcount+'4').disabled=false;
}
