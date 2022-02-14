import {Link} from "@remix-run/react"

export const loader = () => {
  return {"data": "This is some data from the loader"}
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Host Remix Page</h1>
      <ul>
        <li>
          <Link to="/remote">Remote Remix page</Link>
        </li>
      </ul>
    </div>
  );
}
