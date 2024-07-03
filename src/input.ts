const input = {
    primary: {
        up: false,
        down: false,
        left: false,
        right: false
    },
    secondary: {
        up: false,
        down: false,
        left: false,
        right: false
    }
}

export default input;

let wTimeout: any = -1;
onInput('w', () => {
    clearTimeout(wTimeout);
    input.primary.up = true;
    wTimeout = setTimeout(() => {
        input.primary.up = false;
    }, 100);
});

let aTimeout: any = -1;
onInput('a', () => {
    clearTimeout(aTimeout);
    input.primary.left = true;
    aTimeout = setTimeout(() => {
        input.primary.left = false;
    }, 100);
});

let sTimeout: any = -1;
onInput('s', () => {
    clearTimeout(sTimeout);
    input.primary.down = true;
    sTimeout = setTimeout(() => {
        input.primary.down = false;
    }, 100);
});

let dTimeout: any = -1;
onInput('d', () => {
    clearTimeout(dTimeout);
    input.primary.right = true;
    dTimeout = setTimeout(() => {
        input.primary.right = false;
    }, 100);
});

let iTimeout: any = -1;
onInput('i', () => {
    clearTimeout(iTimeout);
    input.secondary.up = true;
    iTimeout = setTimeout(() => {
        input.secondary.up = false;
    }, 100);
});

let jTimeout: any = -1;
onInput('j', () => {
    clearTimeout(jTimeout);
    input.secondary.left = true;
    jTimeout = setTimeout(() => {
        input.secondary.left = false;
    }, 100);
});

let kTimeout: any = -1;
onInput('k', () => {
    clearTimeout(kTimeout);
    input.secondary.down = true;
    kTimeout = setTimeout(() => {
        input.secondary.down = false;
    }, 100);
});

let lTimeout: any = -1;
onInput('l', () => {
    clearTimeout(lTimeout);
    input.secondary.right = true;
    lTimeout = setTimeout(() => {
        input.secondary.right = false;
    }, 100);
});
