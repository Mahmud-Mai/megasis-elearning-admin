import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUserToken = localStorage.getItem('bearer-token');

  // console.log(currentUserToken)
  // if (currentUserToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  // return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}