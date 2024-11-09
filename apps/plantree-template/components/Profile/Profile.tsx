'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  ReownConnectButton,
  WalletConnectButton,
} from '@/components/WalletConnectButton'
import { cn } from '@/lib/utils'
import { AuthType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useAccount } from 'wagmi'
import { GoogleOauthButton } from '../GoogleOauthButton'
import { useSiteContext } from '../SiteContext'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { GoogleOauthDialog } from './GoogleOauthDialog/GoogleOauthDialog'
import { ProfileDialog } from './ProfileDialog/ProfileDialog'
import { ProfilePopover } from './ProfilePopover'

interface Props {}

export function Profile({}: Props) {
  const { data, status } = useSession()
  const { address = '' } = useAccount()
  const site = useSiteContext()

  // console.log('====address:', address, 'data:', data, 'status:', status)

  if (status === 'loading')
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )

  const authenticated = !!data
  const isGoogleOauth = site.authType === AuthType.GOOGLE

  return (
    <>
      <ProfileDialog />
      <GoogleOauthDialog />
      {!authenticated && (
        <>
          {isGoogleOauth && <GoogleOauthButton />}
          {site.authType === AuthType.REOWN && <ReownConnectButton />}
        </>
      )}
      {authenticated && <ProfilePopover />}
    </>
  )
}
