// Create the JS app that talks to the blockchain
App = {
    loading: false,
    contracts: {},
    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        App.account = web3.eth.accounts[0];
    },

    loadContract: async () => {
        // Pull out the smart contract JSON file
        const todo = await $.getJSON('Todo.json')
        // Create a truffle contract
        //  - A JS representation of the smart contract
        App.contracts.Todo = TruffleContract(todo)
        App.contracts.Todo.setProvider(App.web3Provider)

        // Fill the smart contract with values stored in blockchain
        App.todo = await App.contracts.Todo.deployed()
    },

    render: async () => {
        // prevent double rendering
        if (App.loading) {
            return
        }

        App.setLoading(true)
        // add the App.account information to the html element (id: account)
        $('#account').html(App.account)
        // render tasks
        await App.renderTasks()
        App.setLoading(false)
    }, 

    renderTasks: async () => {
        // load the number of tasks from the blockchain
        const taskCount = await App.todo.taskCount()
        const $taskTemplate = $('.taskTemplate')

        // render each task with a new task template
        for (let i = 1; i <= taskCount; i ++) {
            const task = await App.todo.tasks(i)
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]
            
            // add HTML element for the task
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            // .on('click', App.toggleCompleted)

            // put the task in th correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }

            // add task to the UI
            $newTaskTemplate.show()
        }
    },  

    // loading function to prevent double loading 
    // In service for the function above
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    },
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})