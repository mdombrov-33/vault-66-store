import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckboxInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import PriceInput from '@/components/form/PriceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import { createProductAction } from '@/utils/actions/admin'
import { faker } from '@faker-js/faker' //* Importing faker for generating fake data

function AdminCreateProductPage() {
  const name = faker.commerce.productName()
  const company = faker.company.name()
  const description = faker.lorem.paragraph({ min: 10, max: 20 })

  return (
    <section>
      <h1 className="text-4xl font-semibold mb-8 capitalize">create item</h1>
      <div className="border p-6 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput type="text" name="name" label="item name" defaultValue={name} />
            <FormInput type="text" name="company" label="company" defaultValue={company} />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="item description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput name="featured" label="featured" />
          </div>
          <SubmitButton
            text="create item"
            loadingText="Registering New Item..."
            className="mt-8 text-3xl"
          />
        </FormContainer>
      </div>
    </section>
  )
}

export default AdminCreateProductPage
