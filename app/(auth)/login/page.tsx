import { login } from './actions'
import AuthForm from '../AuthForm'

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const params = await props.searchParams
  return <AuthForm mode="login" action={login} error={params.error} />
}
