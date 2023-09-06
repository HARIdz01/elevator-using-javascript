document.addEventListener("DOMContentLoaded", function() {
    const elevator = document.querySelector(".elevator");
    const levels = elevator.querySelectorAll(".level");
    const upButton = document.querySelector(".up-button");
    const downButton = document.querySelector(".down-button");

    let currentLevel = 0;

    function moveElevator(targetLevel, callback) {
        const timeToReachLevel = Math.abs(targetLevel - currentLevel) * 5 * 1000; // 5 seconds per level
        setTimeout(() => {
            currentLevel = targetLevel;
            updateElevatorPosition();
            if (callback) callback();
        }, timeToReachLevel);
    }

    function updateElevatorPosition() {
        levels.forEach((level, index) => {
            level.classList.remove("active");
            if (index === currentLevel) {
                level.classList.add("active");
            }
        });
    }

    function onUpButtonClick() {
        if (currentLevel === 0) {
            moveElevator(1, () => {
                if (upButton.classList.contains("active")) {
                    moveElevator(2);
                }
            });
        } else if (currentLevel === 1) {
            moveElevator(2);
        }
    }

    function onDownButtonClick() {
        if (currentLevel === 2) {
            moveElevator(1, () => {
                if (downButton.classList.contains("active")) {
                    moveElevator(0);
                }
            });
        } else if (currentLevel === 1) {
            moveElevator(0);
        }
    }

    upButton.addEventListener("click", onUpButtonClick);
    downButton.addEventListener("click", onDownButtonClick);

    // Initial setup
    updateElevatorPosition();
});