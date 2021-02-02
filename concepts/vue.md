# Vue

## Layers

- core view layer
- router
- state management
- cli

Components are declarative, given the same props, returns the same result.

- virtual dom

- template syntax
  `{{ likes }}`

- directives
  `v-if`
  `v-on:click`

- data

  ```js
  data() {
    return { likes: 0 }
  }
  ```

- methods
  ```js
  methods: {
    likeAndSubscribe() {
      alert('hi')
    }
  ```
