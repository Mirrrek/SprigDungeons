let wTimeout: any = -1;
let wInCooldown = false;
let wRead = false;

let aTimeout: any = -1;
let aInCooldown = false;
let aRead = false;

let sTimeout: any = -1;
let sInCooldown = false;
let sRead = false;

let dTimeout: any = -1;
let dInCooldown = false;
let dRead = false;

let iTimeout: any = -1;
let iInCooldown = false;
let iRead = false;

let jTimeout: any = -1;
let jInCooldown = false;
let jRead = false;

let kTimeout: any = -1;
let kInCooldown = false;
let kRead = false;

let lTimeout: any = -1;
let lInCooldown = false;
let lRead = false;

const input = {
    primary: {
        up() {
            if (!wInCooldown) return false;
            if (wRead) return false;
            wRead = true;
            return true;
        },
        down() {
            if (!sInCooldown) return false;
            if (sRead) return false;
            sRead = true;
            return true;
        },
        left() {
            if (!aInCooldown) return false;
            if (aRead) return false;
            aRead = true;
            return true;
        },
        right() {
            if (!dInCooldown) return false;
            if (dRead) return false;
            dRead = true;
            return true;
        }
    },
    secondary: {
        up() {
            if (!iInCooldown) return false;
            if (iRead) return false;
            iRead = true;
            return true;
        },
        down() {
            if (!kInCooldown) return false;
            if (kRead) return false;
            kRead = true;
            return true;
        },
        left() {
            if (!jInCooldown) return false;
            if (jRead) return false;
            jRead = true;
            return true;
        },
        right() {
            if (!lInCooldown) return false;
            if (lRead) return false;
            lRead = true;
            return true;
        }
    }
}

export default input;

onInput('w', () => {
    clearTimeout(wTimeout);
    wInCooldown = true;
    wTimeout = setTimeout(() => {
        wInCooldown = false;
        wRead = false;
    }, 100);
});

onInput('a', () => {
    clearTimeout(aTimeout);
    aInCooldown = true;
    aTimeout = setTimeout(() => {
        aInCooldown = false;
        aRead = false;
    }, 100);
});

onInput('s', () => {
    clearTimeout(sTimeout);
    sInCooldown = true;
    sTimeout = setTimeout(() => {
        sInCooldown = false;
        sRead = false;
    }, 100);
});

onInput('d', () => {
    clearTimeout(dTimeout);
    dInCooldown = true;
    dTimeout = setTimeout(() => {
        dInCooldown = false;
        dRead = false;
    }, 100);
});

onInput('i', () => {
    clearTimeout(iTimeout);
    iInCooldown = true;
    iTimeout = setTimeout(() => {
        iInCooldown = false;
        iRead = false;
    }, 100);
});

onInput('j', () => {
    clearTimeout(jTimeout);
    jInCooldown = true;
    jTimeout = setTimeout(() => {
        jInCooldown = false;
        jRead = false;
    }, 100);
});

onInput('k', () => {
    clearTimeout(kTimeout);
    kInCooldown = true;
    kTimeout = setTimeout(() => {
        kInCooldown = false;
        kRead = false;
    }, 100);
});

onInput('l', () => {
    clearTimeout(lTimeout);
    lInCooldown = true;
    lTimeout = setTimeout(() => {
        lInCooldown = false;
        lRead = false;
    }, 100);
});
