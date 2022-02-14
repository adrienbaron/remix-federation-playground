import {Link} from "@remix-run/react"
import {useState} from "react"

export const loader = () => {
  return {"data": "This is some data from the loader"}
}

export default function Remote() {
  const [counter, setCounter] = useState(0)

  return (
      <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.4"}}>
        <h1>Remote Remix page!</h1>
        <p>
          <div>
            <strong>{counter}</strong>
          </div>
          <button onClick={() => setCounter(c => c + 1)}>Increase Counter</button>
        </p>
        <Link to="/">Back to host</Link>
      </div>
  )
}
