// Automatically import ALL images inside the folder:
const imageModules = import.meta.glob(
  '/src/natural_ingredients/**/*.{jpg,jpeg,png,webp,avif}?*',
  {
    eager: true,
    import: 'default',
  },
)

type OptimizedImagesType = {
  [key: string]: string
}

const optimizedImages: OptimizedImagesType = {}

Object.entries(imageModules).forEach(([path, url]) => {
  // Extract only the filename without extension or query params
  const key = path
    .split('/')
    .pop()! // get "onions.jpg?w=..."
    .split('?')[0] // remove "?w=286&..."
    .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '') // remove extension
    .toLowerCase()

  optimizedImages[key] = url as string
})

type IngredientName = keyof typeof optimizedImages

function getIngredientImagess(name: IngredientName) {
  const path = optimizedImages[name]
  if (!path) {
    return 'https://placeimg.dev/286x148/222222?text=Image+Not+Found&textColor=fff'
  } else {
    return path
  }
}
