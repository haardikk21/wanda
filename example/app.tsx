import React, { FormEvent, useState } from 'react'

import { useCompletion, useConnect, useModel } from '../src'

export const App = () => {
  const [{ connectors, error }, connect] = useConnect()
  const model = useModel()
  const { getCompletion } = useCompletion()
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const completion = await getCompletion({ prompt })
    setOutput(completion.text)
  }

  if (model) {
    return (
      <>
        <span>You are currently connected to window.ai: {model}</span>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit">Get Completion</button>
        </form>

        {output && (
          <>
            <span style={{ fontWeight: 'bold' }}>Output: </span> {output}
          </>
        )}
      </>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.name} onClick={() => connect(connector)}>
          Connect to window.ai through {connector.name}
        </button>
      ))}

      {error && <span>Failed to connect: {error.message}</span>}
    </div>
  )
}
