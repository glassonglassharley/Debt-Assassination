// Returns the current Clerk session token, or null if no session exists.
// Used to authenticate calls to Personal Oracle's API (Plaid, debt sync).
export async function getSessionToken() {
  const clerk = window.Clerk
  if (!clerk) return null
  if (!clerk.loaded) await clerk.load()
  if (!clerk.session) return null
  return clerk.session.getToken()
}
