# Delegation

Is all about objects being linked to other objects.

## OLOO

Objects linked to other objects. In JavaScript, the `[[Prototype]]` mechanism links objects to other objects. There are no abstract mechanisms like 'classes', no matter how much you try to convinece yourself otherwise.

## Behavior delegation

In behavior delegation we try to avoid naming things the same at different levels of the `[[Prototype]]` chain (called _shadowing_), to avoid brittle syntax.

Means to let some object (`XYZ`) provide a delegation (to `Task`) for property or method references if they are not found on the object (`XYZ`)

```js
Task = {
  setID: function (ID) {
    this.id = ID;
  },
  outputId: function () {
    console.log(this.id);
  },
};

XYZ = Object.create(Task);

XYZ.prepareTask = function (ID, Label) {
  this.setID(ID);
  this.label = Label;
};

const obj = Object.create(XYZ);
obj.prepareTask(23, "");
obj.outputId(); // 23
```
