const arr = [1,[2,[3],[4,5]],[6,7,8,[9]]]

for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (Array.isArray(element)) {
        
    }
}
let count = 0;
while(arr[count]){
    const element = arr[count];
    if (Array.isArray(element)) {
        element.forEach(item => arr.push(item))
        arr.splice(count,1)
        count--
    }
    count++
}
console.log(arr)