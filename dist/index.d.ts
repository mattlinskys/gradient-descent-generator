declare function optimizeGenerator(init: number[], lambda: (...args: number[]) => number, maxIters?: number, rate?: number, precision?: number): IterableIterator<{
    coefficients: number[];
    slopes: number[];
    iter: number;
}>;
export default optimizeGenerator;
