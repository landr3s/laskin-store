import { Button, Label, TextInput } from 'flowbite-react'

function CategoryForm({
  handleSubmit,
  btnText = 'Submit',
  handleDelete,
  value,
  handleChange
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2'
    >
      <Label>Category Name:</Label>
      <TextInput
        value={value}
        onChange={handleChange}
      />
      <div className='flex justify-center'>
        <Button type='submit'>{btnText}</Button>
        {handleDelete && <Button onClick={handleDelete}>Delete</Button>}
      </div>
    </form>
  )
}

export default CategoryForm
