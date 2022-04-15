pragma solidity ^0.5.0;

contract Todo {
    // State variable
    // uint: un-signed integer (can be negative)
    uint public taskCount = 0;

    // 1. List tasks in the smart contract
    // Define our own data type use struct
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // Make a place to put the tasks: create a storage on blockchain
    mapping(uint => Task) public tasks; // state variable

    // Constructor for the smart contract
    constructor() public {
        // Default task
        createTask("Start getting familiar with blockchain applications by doing the chosen two online tutorials.");
    }

    // function to create new task 
    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }


}

// 1. List tasks in the smart contract
// 2. List tasks in the console
// 3. List tasks in the client side application
// 4. List tasks in the test