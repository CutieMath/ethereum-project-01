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

    it('Tasks are successfully listed', async () => {
        const taskCount = await this.todo.taskCount()
        const task = await this.todo.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.completed, false)
        assert.equal(taskCount.toNumber(), 1)
    })
})