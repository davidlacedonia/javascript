# Organization

## Iterators

Iterators are a way of organizing ordered, sequential, pull-based consumption of data.

## Interface iterators

**Required**:

`next()`: (method) retrevies next `IteratorResult`

**Optional**:

`return()`: (method) stops iterator and returns `IteratorResult`
`throw()`: (method) signals error and returns `IteratorResult`

**IteratorResult**:

`value`: (propert), current iteration value or final return value
`done`: (property) boolean, indicates completion status

By general convention, calling `next(..)` on an iterator that's already been exhausted is not an error, but will simply continue to return the result `{ value: undefined, done: true}`.
