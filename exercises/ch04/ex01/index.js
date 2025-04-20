// add
export function add(a, b) {
    return {
        real: a.real + b.real,
        imag: a.imag + b.imag
    };
}

// sub
export function sub(a, b) {
    return {
        real: a.real - b.real,
        imag: a.imag - b.imag
    };
}

// mul
export function mul(a, b) {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real
    };
}

// div
export function div(a, b) {
    const denominator = b.real ** 2 + b.imag ** 2;
    return {
      real: (a.real * b.real + a.imag * b.imag) / denominator,
      imag: (a.imag * b.real - a.real * b.imag) / denominator
    };
}