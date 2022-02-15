import {Form, Link, useActionData, useLoaderData, useTransition} from "@remix-run/react"
import {useState} from "react"
import {ActionFunction} from "remix"

export const loader = () => {
  return {"data": "This is some data from the loader"}
}

export const action: ActionFunction = async ({request}) => {
  const body = await request.formData();

  console.log("Got username from action:", body.get("username"))

  return {"username": body.get("username")}
}

export default function Remote() {
  const [counter, setCounter] = useState(0)
  const loaderData = useLoaderData()
  const transition = useTransition()
  const actionData = useActionData()

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
        <Form method="post">
          <input type="text" name="username" defaultValue="someName"/>
          <button disabled={transition.state === "loading"}>Submit</button>
          {actionData && <p>You submitted to the action: {actionData.username}</p>}
        </Form>
        <Link to="/">Back to host</Link>
      </div>
  )
}
