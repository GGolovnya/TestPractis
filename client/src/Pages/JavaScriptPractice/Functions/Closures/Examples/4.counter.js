//Пример с счетчиком

function countMix (x) {

    let y = 0;
    let z = 3;
    let d = 7;
    let k = 8.8;

    return {
        method1 (mix) {
            return y+x+mix
        },
        method2 (mix) {
            return z+x+mix
        },
        method3 (mix) {
            return d+x+mix
        },
        method4 (mix) {
            return k+x+mix
        },
    }
}

const countMix1 = countMix(100)
console.log(countMix1.method1(10))

const countMix2 = countMix(100)
console.log(countMix2.method2(10))

const countMix3 = countMix(100)
console.log(countMix2.method3(10))

const countMix4 = countMix(100)
console.log(countMix4.method4(10))

///////////// Дубли

const countMix5 = countMix(7000)
console.log(countMix5.method1(200))

const countMix6 = countMix(7000)
console.log(countMix6.method2(300))

const countMix7 = countMix(7000)
console.log(countMix7.method3(400))

const countMix8 = countMix(7000)
console.log(countMix8.method4(500))
