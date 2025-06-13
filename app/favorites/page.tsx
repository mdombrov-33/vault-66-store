import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/items/ProductsGrid'
import { fetchUserFavorites } from '@/utils/actions/favorite'

//! FIXME: We don't see toaster notifications in this page after adding/removing favorites.
//! Probably something to do with component unmounting or with using client components in a server component.
async function FavoritesPage() {
  const favorites = await fetchUserFavorites()
  if (!favorites || favorites.length === 0) return <SectionTitle text="No favorites synced" />

  return (
    <div>
      <SectionTitle text="your Favorites" />
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  )
}

export default FavoritesPage
