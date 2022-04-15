const { assert } = require("chai");

const Todo = artifacts.require("Todo");


contract('Todo', (accounts) => {
    before(async () => {
        this.todo = await Todo.deployed()
    })  

    it('Deploys successfully', async () => {
        const address = await this.todo.address 
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
})