import { useRouter } from 'next/router'

export default function CommentPage() {
  const router = useRouter()
  const { id, token } = router.query

  return (
    <>
      <h1>User id: {id}</h1>
      <h1>User token: {token}</h1>
    </>
  )
}

export async function getServerSideProps({ query: { id, token } }) {
  const { token } = parseCookies(req)
  //to do it doesnt work.
  const res = await fetch(`${API_URL}/verify/${id}/${token}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await res.json()

  return {
    props: {
      user,
      token,
    },
  }
}
