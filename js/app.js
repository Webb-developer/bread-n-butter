// BBJS
// @codekit-prepend "_bbjs-app.js";





/*------------------------------------*\
    #APP
\*------------------------------------*/




var isPalindrome = function(string){

    // Preserve the og string 
    var OGSTRING = string;


    // Remove Spaces
    var pattern = new RegExp(/\s/g);


    // Apply regex and force lowercase
    var handledString = string.replace(pattern, "").toLowerCase(),
        testAgainst   = OGSTRING.replace(pattern, "").toLowerCase();


    // Split the word into letters, reverse it and bring it back
    var letters  = handledString.split(""),
        reversed = letters.reverse().join("");


    // Test if the handled string matches the reversed version of it
    if(reversed === testAgainst){
        return true;
    } else {

        // Not a palidrome...
        // Find the index of the character that doesnt make it a palidrome
        // Ex: wodw. Index is 2.
        var halfLength = testAgainst.length / 2,
            leftPart   = testAgainst.substring(0, halfLength),
            rightPart  = testAgainst.substring(halfLength);


        var differentIndexes = [];

        
        for (var i = 0; i < halfLength; i++) {


            if(leftPart.split("")[i] !== rightPart.split("").reverse()[i]){
                
                differentIndexes.push([i]);

                console.log(leftPart[i]);
                console.log(rightPart[i]);

            }

        }


        


    }

};


if(isPalindrome("heldeh")){
    console.log("Im a palindrome");
} else {
    console.log("Not a palindrome");
}

