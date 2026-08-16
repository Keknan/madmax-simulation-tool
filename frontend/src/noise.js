const kB = 1.380649e-23; //Boltzmann constant
const P0 = 2.2e-27 //Reference power from MADMAX Paper [LINK]
const gRef = 1e-15 //reference coupling from MADMAX Paper

/**
 * First part is dedicated to get time t until axion noise is detected for specific
 * parameters, and calculate minimal axion photon coupling constant for conversion to happen
 **/
function getNoiseArrays(fMin, fMax, setup, eps, tand, thicknesses, BE, A, TSys, tIntSec, gTarget) {
    let freqs = [];
    let gVals = [];
    let timeVals = [];

    const BRel = BE/10.0;
    const ARel = A / 1.0;

    for (let i = 0; i <= 500; i++) {
        let fGHz = fMin + (fMax - fMin) * (i / 500);
        let fHz = fGHz * 1e9;
        freqs.push(fGHz);

        let deltaNuA = fHz * 1e-6; //Derivation also in MADMAX Paper
        let rbData = window.getRAndB(fHz, setup.distances, eps, tand, thicknesses);
        let betaComplex = rbData.b;
        let betaSquare = (betaComplex.re * betaComplex.re) + (betaComplex.im * betaComplex.im);
        
        let numerator = (5.0 * kB * TSys) / (betaSquare * P0 * ARel * Math.pow(BRel, 2));
        let denominator = deltaNuA / tIntSec;
        let gSens = gRef * Math.sqrt(numerator) * Math.pow(denominator, 0.25);
        gVals.push(gSens);

        let powerRatio = (5.0 * kB * TSys) / (betaSquare * P0 * ARel * Math.pow(BRel, 2) * Math.pow(gTarget / gRef, 2));
        let tReqSec = deltaNuA * Math.pow(powerRatio, 2);
        let tReqDays = tReqSec / (24 * 3600);
        timeVals.push(tReqDays);

    }

    return {freqs, gVals, timeVals}
}

//next we need to render the charts using Charts.js logic
let couplingChart = null;
let timeChart = null;

function renderNoiseCharts(freqs, gVals, timeVals, gTarget) {
    
}
