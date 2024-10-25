
const tickboxList = document.querySelectorAll('.tick-box');

const inputfields = document.querySelectorAll('.goal-input');

const error1 = document.querySelector('.error-label');

const progressBAr = document.querySelector('.progress-bar');

const progressAmount = document.querySelector('.progress-amount');



tickboxList.forEach((tickbox)=>{
    tickbox.addEventListener('click',(e)=>{

        const allGoalsAdded = [...inputfields].every(function(input){
            return input.value;
        });

        if(allGoalsAdded){

            tickbox.parentElement.classList.toggle('completed');

            // progressAmount.style.width = '33.33%';

            const inputId = tickbox.nextElementSibling.id;

            // console.log(inputId)
            allGoals[inputId].completed =!allGoals[inputId].completed; 

            completedGoalsCount = Object.values(allGoals).filter((goal)=>goal.completed).length;

            localStorage.setItem('allGoals',JSON.stringify(allGoals));

            progressAmount.style.width =`${completedGoalsCount /inputfields.length * 100}%`;

            progressAmount.firstElementChild.innerText = `${completedGoalsCount}/${inputfields.length} completed`;

            progressLabel.innerText = allQuotes[completedGoalsCount];

        }else{
            // error1.style.display='block';
            progressBAr.classList.add('show-error');
        }
    });
});

const allGoals =JSON.parse(localStorage.getItem('allGoals')) || {
    first :{
        name:'',
        completed: false
    },
    second: {
        name: '',
        completed: false,
        },
    third: {
        name: '',
        completed: false,
        }
};

inputfields.forEach((input)=>{

    input.value = allGoals[input.id].name;
    // console.log(allGoals[input.id])

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed');
    }

    input.addEventListener('focus',()=>{
        progressBAr.classList.remove('show-error')
    });

    input.addEventListener('input',(e)=>{
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name;
            return;
        };

        allGoals[input.id].name = input.value;

        localStorage.setItem('allGoals',JSON.stringify(allGoals));
    })
});



let completedGoalsCount = Object.values(allGoals).filter((goal)=>goal.completed).length;

progressAmount.style.width =`${completedGoalsCount /inputfields.length * 100}%`;

progressAmount.firstElementChild.innerText = `${completedGoalsCount}/${inputfields.length} completed`;



const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time to chill :D'
];

const progressLabel = document.querySelector('.progress-label');

