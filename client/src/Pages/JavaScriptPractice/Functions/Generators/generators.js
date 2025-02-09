function* fibGenerator() {
    let prev = 0, curr = 1;
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}