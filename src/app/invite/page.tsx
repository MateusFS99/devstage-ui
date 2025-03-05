import { Suspense } from 'react'
import InviteContent from './invite-content'

export default function InvitePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <InviteContent />
    </Suspense>
  )
}
