'use client'

import { useActionState, useEffect } from 'react'
import { actionFunction } from '@/types/form'
import { showToast } from '@/utils/show-toast'

const initialState = {
  message: '',
  srcUrl: '',
}

function FormContainer({
  action,
  children,
  onSuccess,
}: {
  action: actionFunction
  children: React.ReactNode
  onSuccess?: () => void
}) {
  const [state, formAction] = useActionState(action, initialState)

  useEffect(() => {
    if (state.message) {
      showToast(state.message, state.srcUrl)
      if (onSuccess) {
        onSuccess()
      }
    }
  }, [state.message, onSuccess, state.srcUrl])
  return <form action={formAction}>{children}</form>
}

export default FormContainer
