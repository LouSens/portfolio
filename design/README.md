# Design sources

`previews/` holds the NeuralVoid and Indonesian Legal RAG concept designs as React components.
They are **not** part of the site bundle. They are rendered to images with Playwright, and the site
uses only the images in `static/screenshots/concepts/`.

To re-render after editing a design, run the dev server and open
`/design/previews/render.html?c=<neuralvoid|neuralvoid-poster|legal-rag|legal-rag-poster>&view=<view>`,
then screenshot the `#stage` element at 2x.
