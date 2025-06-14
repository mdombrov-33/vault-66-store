import NukaColaSpinner from '@/components/global/NukaSpinner'

function loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <NukaColaSpinner />
    </div>
  )
}

export default loading
