import {Link} from "@remix-run/react"

export const loader = () => {
  return {"data": "This is some data from the loader"}
}

export default function Other() {
  return (
      <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.4"}}>
        <h1>Test HMR</h1>
        <Link to="/">Back</Link>
      </div>
  )
}
