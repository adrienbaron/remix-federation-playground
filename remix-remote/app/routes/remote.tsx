import {Link, useLoaderData} from "@remix-run/react"
import {useState} from "react"

export const loader = () => {
  return {"data": "This is some data from the loader"}
}

export default function Remote() {
  const [counter, setCounter] = useState(0)
  const loaderData = useLoaderData()

  return (
      <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.4"}}>
        <h1>Remote Remix page!</h1>
        <p>Loader Data: <strong>{loaderData.data}</strong></p>
        <div style={{marginBottom: "1rem"}}>
          <div>
            <strong>{counter}</strong>
          </div>
          <button onClick={() => setCounter(c => c + 1)}>Increase Counter</button>
        </div>
        <Link to="/">Back to host</Link>
      </div>
  )
}
