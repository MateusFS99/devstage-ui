import IconButton from '@/components/icon-button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { Copy, Link } from 'lucide-react'
import { useState } from 'react'

interface InviteLinkInputProps {
  inviteLink: string
}

export function InviteLinkInput({ inviteLink }: InviteLinkInputProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>

      <InputField defaultValue={inviteLink} readOnly />

      <div className="relative flex flex-col items-center">
        {copied && (
          <span className="absolute -top-9 bg-blue text-gray-800 text-xs px-2 py-1 rounded-md shadow-md animate-fade-in">
            Copiado!
          </span>
        )}

        <IconButton className="-mr-2" onClick={copyToClipboard}>
          <Copy className="size-5" />
        </IconButton>
      </div>
    </InputRoot>
  )
}
