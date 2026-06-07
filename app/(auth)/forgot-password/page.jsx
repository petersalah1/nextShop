import { redirect } from 'next/navigation';

function AuthUnavailablePage() {
  redirect('/login');
}

export default AuthUnavailablePage;
