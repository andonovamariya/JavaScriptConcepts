const tryConfigurable = () => {
  let object = {};
  Object.defineProperty(object, "element", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
  });

  try {
    // Attempt to override non-configurable property descriptor
    Object.defineProperty(object, "element", {
      value: 1,
      writable: true,
      enumerable: true,
      configurable: false,
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const tryEnumerable = () => {
  let object = { element: 1 };
  Object.defineProperty(object, "stricterElement", {
    value: 2,
    writable: true,
    enumerable: false,
    configurable: true,
  });

  // 'element' is enumerable. 'stricterElement' in not enumerable
  for (let propertyName in object) {
    console.log(propertyName + " is " + object[propertyName]);
  }
};

const tryGetterAndSetter = () => {
  let object = {
    get id() {
      console.log("I am the getter function. The id is:");
      return this._id;
    },
    set id(id) {
      this._id = id;
      console.log("I am the setter function.");
    },
  };

  console.log("setting object.id to 1: ");
  object.id = 1;

  console.log("getting object.id: ", object.id);
};

const getSetPropertyDescriptor = () => {
  let object = {};
  Object.defineProperty(object, "id", {
    get: function () {
      console.log("I am the getter! The id is: ");
      return this._id;
    },
    set: function (id) {
      console.log("I am the setter!");
      this._id = id;
    },
    enumerable: true,
    configurable: true,
  });
  console.log("setting object.id to 1, ");
  object.id = 1;

  console.log("getting object.id: ", object.id);
};

const tryValuePropertyDescriptor = () => {
  let object = { id: 1 };
  Object.defineProperty(object, "power", { value: 4, enumerable: true });
  for (let propertyName in object) {
    console.log(propertyName + " value is " + object[propertyName]);
  }
};

const tryWritablePropertyDescriptor = () => {
  let object = { id: 1 };
  Object.defineProperty(object, "level", { value: 2, writable: false });

  object.id = 2;
  console.log(object.level);

  // level is not writable. Setting it silently fails.
  object.level = 3;
  console.log(object.level);
};