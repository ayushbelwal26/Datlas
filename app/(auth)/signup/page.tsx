import { signup } from '../login/actions'
import AuthForm from '../AuthForm'

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const params = await props.searchParams
  return <AuthForm mode="signup" action={signup} error={params.error} />
}
