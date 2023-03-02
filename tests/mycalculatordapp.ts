// import * as anchor from "@coral-xyz/anchor";
const assert = require('assert')
const anchor = require('@project-serum/anchor')
const { SystemProgram } = anchor.web3


describe('mycalculatordapp', () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider)
  const calculator = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Mycalculatordapp

  it('Create a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [calculator]
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.greeting === "Welcome to Solana")
  })

  it('Adds two numbers', async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.results.eq(new anchor.BN(5)))
  })

  it('Subtract two numbers', async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.results.eq(new anchor.BN(-1)))
  })

  it('Multiply two numbers', async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.results.eq(new anchor.BN(6)))
  })

  it('Divide two numbers', async () => {
    await program.rpc.add(new anchor.BN(4), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.results.eq(new anchor.BN(1)))
    assert.ok(account.reminder.eq(new anchor.BN(1)))
  })
})