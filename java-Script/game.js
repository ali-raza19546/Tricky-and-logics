 let timer = 60;
        let score = 0;
        let hitrn = 0;
        //MAKE BUBBLE
        function makeBubble() {
            let clutter = "";
            for (let i = 0; i <= 167; i++) {
                let rn = Math.floor(Math.random() * 10);
                clutter += `<div class="bubble">${rn}</div>`
            }
            let bottom = document.querySelector(".p-btm").innerHTML = clutter;
        }
//TIMER DECREASE
        function decarese() {
            let endTimer = setInterval(function (){
            if (timer > 0) {
                    timer--;
                    document.querySelector("#timer").textContent = timer;
                } else{
                    clearInterval(endTimer);
                    document.querySelector(".p-btm").innerHTML = `<h1>Game Over</h1>`
                }
            }, 1000)
            }
//HIT VAL FUNCTION
        function hitNewVal(){
            hitrn =  Math.floor(Math.random() * 10);
            document.querySelector("#hitVal").textContent = hitrn;
        }
        hitNewVal();
        decarese();
        makeBubble();
//SCORE INCREASE
function scoreIncrease(){
let newScore =  score += 10;
 document.querySelector("#scoreval").textContent = newScore;
}
// scoreIncrease();

// MATCHING NUMBER
document.querySelector(".p-btm").addEventListener("click", function(dets){
    let match = Number(dets.target.textContent);
    if(match === hitrn){
        scoreIncrease();
        hitNewVal();
        makeBubble();
    }
})

