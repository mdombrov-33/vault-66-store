import { fetchFeaturedProducts } from '@/utils/actions/product'
import EmptyList from '../global/EmptyList'
import SectionTitle from '../global/SectionTitle'
import ProductsGrid from '../items/ProductsGrid'

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts()

  if (!products.length) return <EmptyList />

  return (
    <section className="pt-24">
      <SectionTitle text="FEATURED STOCK" />
      <ProductsGrid products={products} />
    </section>
  )
}

export default FeaturedProducts
