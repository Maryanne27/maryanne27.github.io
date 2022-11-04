let playerLives= 10;
//initial Time
let seconds = 0;
minutes = 0;
let interval;
let winCount= 0;

const section = document.querySelector('section');
const moves = document.getElementById('moves-count');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const gameContainer = document.querySelector('.game-container');
const result = document.getElementById('result');
const controls = document.querySelector('.controls-container');
const stats = document.querySelector('.stats-container');
const livesCount = document.querySelector('span');


// link textcontent 
livesCount.textContent = playerLives;

//Generate the data i.e d images and name
//using an array of objects
const getData = () => [
    {image:'./images/mango.JPG', name:'mango'},
    {image:'./images/banana.JPG', name:'banana'},
    {image:'./images/berry.JPG', name:'berry'},
    {image:'/images/orange.JPG', name:'orange'},
    {image:'./images/pineapple.JPG', name:'pineapple'},
    {image:'./images/corn.JPG', name:'corn'},
    {image:'./images/quebec.JPG', name:'quebec'},
    {image:'./images/apple.JPG', name:'apple'},
    {image:'./images/mango.JPG', name:'mango'},
    {image:'./images/banana.JPG', name:'banana'},
    {image:'./images/berry.JPG', name:'berry'},
    {image:'/images/orange.JPG', name:'orange'},
    {image:'./images/pineapple.JPG', name:'pineapple'},
    {image:'./images/corn.JPG', name:'corn'},
    {image:'./images/quebec.JPG', name:'quebec'},
    {image:'./images/apple.JPG', name:'apple'},
];
    
//ramdomize the function
const randomize= () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};
randomize()

//generate the html for d cards
const cardGenerator = () => {
    const cardData = randomize();
    cardData.forEach((item ) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        //ADD CLASSES TO THEM
        card.classList= 'card-container';
        face.classList= 'card-after';
        back.classList= 'card-before';
        //ATTACH THE INFO TO THE CARDS
        face.src= item.image
        card.setAttribute('name', item.name)
        back.textContent='?'
    //ATTACH THE CARDS TO THE SECTION SO WE HAVE THEM ON THE SCREEN
   //APPEND THE ELEMENTS TOGETHER
     section.appendChild(card);
     card.appendChild(face); 
     card.appendChild(back);

     card.addEventListener('click', (e)=> {
         card.classList.toggle('toggleCard');
         checkCards(e)
    });
  }); 
};


//for timer
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
 //format time before displaying
let secondsValue= seconds < 10 ? `0${seconds}`: seconds;
let minutesValue= minutes < 10 ? `0${minutes}`: minutes;
timeValue.innerHTML= `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//check if cards match
const checkCards= (e) => { 
    const clickedCard= e.target ; 
    clickedCard.classList.add('flipped'); 
    const flippedCard= document.querySelectorAll('.flipped');
    const toggleCard= document.querySelectorAll('.toogleCard')
    //LOGIC
    
    if(flippedCard.length === 2) {
        if( flippedCard[0].getAttribute('name')===
           flippedCard[1].getAttribute('name'))
           {
               flippedCard.forEach((card)=>{
                   card.classList.remove('flipped');
                   card.style.pointerEvents='none';
               });
           }else {
               flippedCard.forEach((card)=> {
                 card.classList.remove('flipped');
                 setTimeout(() => card.classList.remove('toggleCard'), 1000)
               });
               playerLives--;
               livesCount.textContent = playerLives;
               if(playerLives == 0){
                result.innerHTML= `<h2>You lost!</h2>`;
                  stopGame();
           }
        }
   }
    if(toggleCard.length === 16){
        result.innerHTML='You Won!';
       restart()
   }
  };


//Restart when live gets to 0
const restart = () => {
    let cardData= randomize();
    let faces= document.querySelectorAll('.card-after');
    let cards = document.querySelectorAll('.card-container');
    section.style.pointerEvents='none'
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        setTimeout(() => {
            cards[index].style.pointerEvents='all';
            faces[index].src= item.image;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents='all'
        }, 1000);
    });
     playerLives = 10;
     livesCount.textContent= playerLives;
};
cardGenerator(); 

startButton.addEventListener('click',() => {
    seconds= 0;
    minutes=0;
     //controls and buttons visibility
     controls.classList.add('hide');
     stopButton.classList.remove('hide')
     startButton.classList.add('hide')
     //start timer
     interval= setInterval(timeGenerator, 1000);
     restart () 
 });
 
 //STOP GAME
 stopButton.addEventListener('click', (stopGame = () => {
      controls.classList.remove('hide');
      stopButton.classList.add('hide');
      startButton.classList.remove('hide');
      clearInterval(interval);
      restart()
 })
 )
 




