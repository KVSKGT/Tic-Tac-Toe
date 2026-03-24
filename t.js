
let boxes = document.querySelectorAll(".boxes");
let resetbtn = document.querySelector("#reset");
let state = document.querySelector("#winner");
let turnO = true;
let handler = (eve) =>{
    if(turnO){
        eve.target.innerText = "O";
        eve.target.disabled = true;
        turnO = false;
    }
    else{
        eve.target.innerText = "X";
        eve.target.disabled = true;
        turnO = true;
    }
    checkWinner();
    checkDraw();
}
winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const checkWinner = () => {
    for(let pattern of winPatterns){
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;
        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                state.classList.remove("hide");
                state.setAttribute("id","winner1");
                state.innerText = `Winner ${posVal1}`;
                disableBoxes();
                return;
            }
        }
    }
}
const checkDraw = () => {
   if(boxes[0].innerText != "" && boxes[1].innerText != "" && boxes[2].innerText != "" && boxes[3].innerText != "" &&boxes[4].innerText != "" && boxes[5].innerText != "" && boxes[6].innerText != "" && boxes[7].innerText != "" && boxes[8].innerText != ""){
    console.log("Game Draw!");
    state.classList.remove("hide");
    state.innerText = "Game Draw!";
    disableBoxes();
   }
}
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
    }
}
const resetGame = () => {
    turnO = true;
    enableBoxes();
    for(let box of boxes){
        box.innerText = "";
    }
    state.innerText = "";
}
for(let box of boxes){
    box.addEventListener("click", handler);
}
resetbtn.addEventListener("click",resetGame);

