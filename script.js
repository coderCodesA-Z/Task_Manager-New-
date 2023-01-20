let addBtn = document.querySelector(".add");
let removeBtn = document.querySelector(".remove");
let mainContainer = document.querySelector(".main-container");
let modal = document.querySelector(".modalContainer");
let textAreaContainer = document.querySelector(".textAreaContainer");
let lockElement = document.querySelector(".ticket-lock");
let modalActive = false;
let removeFlag = false;

let lockClass = "fa-lock";
let unlockClass = "fa-unlock";

let colors = ["priority1", "priority2", "priority3", "priority4"];
let modalPriorityColor = colors[colors.length - 1];
let allPriorityColors = document.querySelectorAll(".priorityColor");


allPriorityColors.forEach((colorElement, idx) => {
    colorElement.addEventListener("click", (e) => {
        let color = null;
        allPriorityColors.forEach((priorityColorElement, idx) => {
            priorityColorElement.classList.remove("border");
        })
        colorElement.classList.add("border");
        modalPriorityColor = colorElement.classList[0];
    })
});

addBtn.addEventListener("click", (e) => {
    // Display Modal
    // Generate Tickets

    // modal Not active then display modal
    if(!modalActive) {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }

    console.log(modalActive);
    modalActive = !modalActive;
});

removeBtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
});

modal.addEventListener("keydown", (e) => {
    let keyName = e.key;
    if(keyName === "Shift") {
        const uid = function(){
            return "#" + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        createTicket(modalPriorityColor, textAreaContainer.value, uid());
        modal.style.display = "none";
        modalActive = false;
        textAreaContainer.value="";
        allPriorityColors.forEach((priorityColorElement, idx) => {
            priorityColorElement.classList.remove("border");
        })
        document.querySelector(".priorityColorContainer .priority4").classList.add("border");

    }
});


function createTicket(ticketColor, ticketTask, ticketId) {
    const ticketPriority = ticketColor.toString().toUpperCase();
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-container");
    ticketContainer.innerHTML = `
        <div class="ticket-color ${ticketColor}">${ticketPriority}</div>
        <div class="ticket-id">id : ${ticketId}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div>
    `;

    mainContainer.appendChild(ticketContainer);

    handleRemoval(ticketContainer);
    handleLock(ticketContainer);
    handleColor(ticketContainer);
}

// # added a comment 

function handleRemoval(ticket) {
    if(removeFlag) ticket.remove();
}

function handleLock(ticket) {
    let ticketLockElement = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElement.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");
    ticketLock.addEventListener("click", (e) => {
        if(ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticket.setAttribute("contenteditable", "true");
        } else {
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticket.setAttribute("contenteditable", "false");
        }
    });
}

function handleColor(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e) => {
        let currentTicketColor = ticketColor.classList[0];
        // Get ticketColor idx
        let currentTickerColorIdx = colors.findIndex((color) => {
            return currentTicketColor === color;
        });
        currentTicketColor = currentTickerColorIdx++ % colors.length;
        let newTicketColor = colors[currentTickerColorIdx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);
    });   
}