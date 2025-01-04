// Add JavaScript code for your web site here and call it from index.html.

/*Toggle Dark Mode*/
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

toggleDarkModeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } 
    else {
        localStorage.setItem('dark-mode', 'disabled');
    }
}
);

if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

/*Submit Petition*/
const signNowButton = document.getElementById("sign-up-button");
const fullNameInput = document.getElementById("fullname");
const hometownInput = document.getElementById("hometown");
const emailInput = document.getElementById("email");
let count = 3;

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const addSignature = (person) => {  
    const {name, town, email} = person;

    if (name && town && email) {
        const newSignature = document.createElement("p");
        newSignature.textContent = `🖊️ ${name} from ${town} supports this.`;
        
        const signaturesSection = document.querySelector(".signatures");
        signaturesSection.appendChild(newSignature);

        fullNameInput.value = "";
        hometownInput.value = "";
        emailInput.value = "";

        count += 1;
        const counterElement = document.getElementById("counter");
        if (counterElement) {
            counterElement.remove();
        }
 
        const newCounter = document.createElement("p");
        newCounter.setAttribute("id", "counter");
        newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
        signaturesSection.appendChild(newCounter);
    } 
};

const validateForm = () => {
    let containsErrors = false;
    let petitionInputs = document.querySelectorAll("#sign-petition input");
    let person = {
        name: petitionInputs[0].value.trim(),
        town: petitionInputs[1].value.trim(),
        email: petitionInputs[2].value.trim()
    };

    petitionInputs.forEach((input) => {
        const value = input.value.trim();

        if (value.length < 2 || (input.type === "email" && !validateEmail(value))) {
            containsErrors = true;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!containsErrors) {
        addSignature(person);
        toggleModal(person);
    }
};
signNowButton.addEventListener('click', validateForm);

/*Animate Object*/
let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
}

const revealableContainers = document.querySelectorAll('.revealable');
function reveal() {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active');
        } 
        else {
            revealableContainers[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

/*Reduce Motion*/
const reduceMotionButton = document.getElementById("reduce-motion");

function reduceMotion() {
    animation.revealDistance = 5;  
    animation.transitionDuration = '0s';  
    animation.transitionDelay = '0s'; 
    animation.transitionTimingFunction = 'linear';
    
    for (let i = 0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transitionDuration = animation.transitionDuration;
        revealableContainers[i].style.transitionDelay = animation.transitionDelay;
        revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
    }
}
reduceMotionButton.addEventListener('click', reduceMotion);

/*Modal Image*/
let scaleFactor = 1; 
const modalImage = document.querySelector('#modal-img');

const scaleImage = () => {
    if (scaleFactor === 1) {
        scaleFactor = 0.8;
      } else {
        scaleFactor = 1;
      }
    modalImage.style.transform = `scale(${scaleFactor})`;
}

/*Modal*/
const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-modal-content");

    modal.style.display = "flex";
    modalContent.textContent = `Thank you, ${person.name}, for signing the petition from ${person.town}!`;

    const intervalId = setInterval(scaleImage, 500);
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 4000);
};

const closeModal = () => {
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "none";
};
const closeButton = document.getElementById("close-modal-btn");
closeButton.addEventListener("click", closeModal);

