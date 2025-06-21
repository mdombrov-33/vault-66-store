'use client'
import { Input } from '../ui/input'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'
import { useTypingSounds } from '@/hooks/useTypingSounds'

function NavSearch() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')

  const { playTypingSound } = useTypingSounds()

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`/items?${params.toString()}`)
  }, 300)

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams.get('search')])

  return (
    <Input
      type="search"
      placeholder=":: SEARCHING DATABASE █"
      className="max-w-xs dark:bg-muted md:text-xl font-[vt323]"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
        playTypingSound()
      }}
    />
  )
}

export default NavSearch
