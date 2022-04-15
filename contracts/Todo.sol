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

    // Create events for emiting when adding/deleting tasks
    event TaskCreated(
        uint id, 
        string content, 
        bool completed
    );
    event TaskCompleted(
        uint id, 
        bool completed
    );

    // Constructor for the smart contract
    constructor() public {
        // Default task
        createTask("Start getting familiar with blockchain applications by doing the chosen two online tutorials.");
    }

    // function to create new task 
    // underscore means local variable (i.e. _content)
    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
        // broadcast an event when a task is created
        emit TaskCreated(taskCount, _content, false);
    }


    // funciton to complete the task (move it to a different list)
    function toggleCompleted(uint _id) public {
        // Find the specific task id (the one user selected)
        // change its "bool completed" value
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        task[_id] = _task;
        emit TaskCompleted(id, _task.completed);
    }

}

// Creation steps
// 1. List tasks in the smart contract
// 2. List tasks in the console
// 3. List tasks in the client side application
// 4. List tasks in the test