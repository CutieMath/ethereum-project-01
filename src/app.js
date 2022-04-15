// Create the JS app that talks to the blockchain
App = {
    contracts: {},
    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
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
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})