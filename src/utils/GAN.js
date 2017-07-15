import Config from '../Config';
import Utils from '../utils/Utils';

class GAN {

    constructor() {
        this.runner = null;
    }

    async init(onInitProgress) {
        this.runner = await window.WebDNN.load('/model', {progressCallback: onInitProgress});

        try {
            this.runner.getInputViews()[0].toActual();
        }
        catch (err) {
            throw new Error('Network Error');
        }
    }

    async run(label) {
        let noise = Array.apply(null, {length: Config.gan.noiseLength}).map(Utils.randomNormal);
        let input = noise.concat(label);
        this.runner.getInputViews()[0].set(input);
        await this.runner.run();
        let output = this.runner.getOutputViews()[0].toActual();
        return output;
    }
}

export default GAN;