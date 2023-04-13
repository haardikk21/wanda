# Wanda - React Hooks for keyless AI

**wanda** is a collection of React Hooks to get you up and running with keyless AI in a matter of minutes.

```
npm install @wanda-dev/react
```

## Features

- Hooks for working with injected `window.ai`
- TypeScript ready

## Documentation

### Connectors

Wanda makes the use of connectors to identify keyless AI wallets. For now, there is only one connector - `injected` - which supports [Window.AI](https://windowai.io).

When setting up the context provider for Wanda in your React App, you need to supply a list of connectors you'd like to support. By default, it comes with the Injected Connector supported.

### Hooks

#### `useConnect`

The `useConnect` hook offers a way to connect to keyless AI through a given connector.

```tsx
export function MyComponent() {
  const [{ connectors, error }, connect] = useConnect()

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
```

#### `useModel`

The `useModel` hook provides the `ModelID` that is currently set as default through the connector.

This is useful for displaying what model is being used currently on the frontend. It's also useful for detecting if `window.ai` is currently injected or not, as `model` will be undefined if not.

```tsx
export function MyComponent() {
    const model = useModel();

    if (model) {
        return (
            <span>You are currently connected to {model}</span>
        )
    }

    return (
        // Show prompt to install window.ai
    )
}
```

#### `useCompletion`

This is the main hook you will be using. It provides a function to request the connector to provide a completion to a given prompt. You can also pass it an `options` object to customize the request. Currently supports all options supported by `window.ai`

```tsx
export function MyComponent() {
  const { getCompletion } = useCompletion()
  const [output, setOutput] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const completion = await getCompletion({ prompt })
    setOutput(completion.text)
  }

  return (
    <>
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
```

### Examples

Look in the `example` directory to see an example application using React.

## License

This project is licensed under the MIT License.

## Authors

- Haardik ([@haardikkk](https://twitter.com/haardikkk), [@haardikk21](https://github.com/haardikk21))
