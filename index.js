let game_status=0;
//0 game just opened
//1 game started
//2 game over
let starting_level=1;
let current_level=starting_level;
let level_sound=[];
let player_sound=[];
//1=blue,
//2=green
//3=red
//4=yellow

$(document).on("keydown",function(){
    if(game_status==0 || game_status==2)
    {
        level_sound=[];
        resetPlayerSound();
        current_level=starting_level;
        $("#level-title").text("Level "+current_level);
        game_status=1;
        setTimeout(randomSound,800);
    }
});

$(".btn").on("click",function(event){
    if(game_status)
    {
        player_sound.push(event.target.id);
        playsound(event.target.id);
        compareSound(level_sound,player_sound);
        $("#"+event.target.id).addClass("pressed")
        setTimeout(function(){$("#"+event.target.id).removeClass("pressed")},100);
    }
});

function compareSound(levelSound,playerinputSound)
{ 
    let compare_result=JSON.stringify(levelSound.slice(0,playerinputSound.length)) == JSON.stringify(playerinputSound)
    if(compare_result)
    {
        if(playerinputSound.length==levelSound.length)
        {
            setTimeout(function(){
                randomSound();
                current_level++;
                $("#level-title").text("Level "+current_level);
                resetPlayerSound();
            },800);        
        }
        return ;
    }
    else 
    {
        playsound("wrong");
        game_status=2;
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over") },100);
        return ;
    }
}
function resetPlayerSound()
{
    player_sound=[];
}

function randomSound()
{
    let sound_list=["blue","green","red","yellow"];
    let random_sound=sound_list[Math.floor(Math.random()*4)];
    level_sound.push(random_sound);
    playsound(random_sound)
    $("#"+random_sound).fadeOut(100).fadeIn(100);
}

function playsound(key)
{   
    let audio=new Audio("sounds/"+key+".mp3");
    audio.play();
}




