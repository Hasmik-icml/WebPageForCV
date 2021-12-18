function isEqual(obj1, obj2) {
    if (Object.keys(obj1).length === Object.keys(obj2).length){
        for (let key in obj1) {
            if (obj1[key] !== obj2[key]) {
              return false;
            }
        } 
        return true;
    }else {
        return false;
    }
}
// The first object parameter.

let person1 = {
  name: "Benny",
  phone: "3325558745",
  email: "benny@edabit.com"
};

// The second object parameter.

let person2 = {
  name: "Jason",
  phone: "9853759720",
  email: "jason@edabit.com"
};
console.log(isEqual(person1,person1));