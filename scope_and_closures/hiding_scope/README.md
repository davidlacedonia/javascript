## Hiding in plain scope

You can hide variables and functions by enclosing them in the scope of a function.
Why? Principle of Least Privilege: you should expose only what is minimal necessary, and hide everything else.
Keeping private details private, which leads to better software.

## Collision avoidance

Another benefit is to prevent collision between two differente identifiers with the same name, but different intended usages.
Collision results often in unexpected overwriting of values.

## Global namespaces

Libraries often create a single variable declaration, often an object, in the global scope. This object is used as a namespace for that library, where all specific exposures of that functionality are made as properties off that object.

## Module management

Another option is the module approach, in this way no libraries ever add any identifiers to the global scope, but are instead required to have their identifiers be explicitly imported into another specific scope through usage of the dependency manager's varios mechanisms.
